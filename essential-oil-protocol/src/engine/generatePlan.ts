import type {
  EffectiveRules,
  GeneratePlanInput,
  PlanOutput,
  MixOutput,
  MouthOutput,
  FumesOutput,
  RotationOutput,
} from './types';
import { resolveOilNames } from './normalize';

function hasBodyPlacements(
  oilData: EffectiveRules['oils'][string] | undefined
): boolean {
  if (!oilData?.placements) return false;
  return oilData.placements.length > 0;
}

/**
 * Main engine function: generates a protocol plan
 * MUST be a pure function
 */
export function generatePlan(
  input: GeneratePlanInput,
  effectiveRules: EffectiveRules
): PlanOutput {
  const warnings: string[] = [];
  const frequencyPerDay = effectiveRules.metadata.frequencyPerDay;

  // Step 1: Resolve oil names
  let { resolved: canonicalSelection, warnings: resolveWarnings } =
    resolveOilNames(input.selection, effectiveRules);
  warnings.push(...resolveWarnings);

  // Step 2: Kid profile validation
  if (input.profile.type === 'kid') {
    const allowedOils = effectiveRules.globalRules.kids.allowedOilsOnly;
    const disallowedOils = canonicalSelection.filter(
      (oil) => !allowedOils.includes(oil)
    );
    if (disallowedOils.length > 0) {
      warnings.push(
        `Kid profile: disallowed oils [${disallowedOils.join(', ')}]`
      );
      canonicalSelection = canonicalSelection.filter((oil) =>
        allowedOils.includes(oil)
      );
    }
  }

  // Step 3: Separate oils by topical usage
  const topicalOils: string[] = [];
  const mixCandidates: string[] = [];
  const excludedFromMix: string[] = [];

  for (const oil of canonicalSelection) {
    const oilData = effectiveRules.oils[oil];
    if (!oilData) continue;

    // NEW RULE: Oils with specific body placements (not "Topical") are excluded from mix
    const hasSpecificBodyPlacements =
      oilData.placements.length > 0 &&
      oilData.placements.some(p => p !== 'Topical');

    if (hasSpecificBodyPlacements) {
      // Oils with specific body placements go to topical only
      topicalOils.push(oil);
      if (oilData.mixEligible) {
        excludedFromMix.push(oil);
      }
    } else {
      // Oils with only "Topical" placement (or no placements)
      if (oilData.mixEligible) {
        mixCandidates.push(oil);
      }
      // Also add to topicalOils if it has "Topical" placement
      if (oilData.placements.includes('Topical')) {
        topicalOils.push(oil);
      }
    }
  }

  // Step 4: Apply Limone split rule
  const { topicalByArea } = buildTopicalByArea(
    topicalOils,
    effectiveRules
  );

  // Step 5: Build mix
  const { mix, mixWarnings } = buildMix(mixCandidates, effectiveRules, frequencyPerDay);
  warnings.push(...mixWarnings);

  // Step 6: Build rotation (overflow mix-only oils)
  const rotation = buildRotation(
    mixCandidates,
    mix,
    effectiveRules
  );

  // Step 6b: Add rotating oils for current day ONLY to topicalByArea under "Topical"
  // STRICT: Only oils scheduled for input.dayIndex appear in Topical
  // If dayIndex doesn't match any schedule day, Topical remains empty for rotation oils
  if (rotation) {
    const currentDaySchedule = rotation.schedule.find(
      (s) => s.day === input.dayIndex
    );
    // Only add if we found a matching schedule for this specific day
    if (currentDaySchedule && currentDaySchedule.oils.length > 0) {
      if (!topicalByArea['Topical']) {
        topicalByArea['Topical'] = [];
      }
      topicalByArea['Topical'].push(...currentDaySchedule.oils);
    }
    // If no match (e.g., dayIndex=3 but schedule only has days 1-2),
    // nothing is added to Topical for rotation oils
  }

  // Step 7: Build mouth/fumes
  const { mouth, fumes } = buildMouthAndFumes(
    canonicalSelection,
    effectiveRules,
    frequencyPerDay,
    warnings
  );

  // Add warnings for excluded oils
  for (const oil of excludedFromMix) {
    warnings.push(
      `"${oil}" excluded from mix (has specific body placements)`
    );
  }

  return {
    mix,
    topicalByArea,
    mouth,
    fumes,
    rotation,
    warnings,
  };
}

/**
 * Build topical application by area
 * Implements Limone split rule
 */
function buildTopicalByArea(
  topicalOils: string[],
  rules: EffectiveRules
): { topicalByArea: Record<string, string[]>; limoneSplitApplied: boolean } {
  const topicalByArea: Record<string, string[]> = {};
  let limoneSplitApplied = false;

  // Check for Limone split rule
  const hasLimone = topicalOils.includes('Limone');
  const hasLimoneVA = topicalOils.includes('Limone VA');
  const splitEnabled = rules.globalRules.limoneSplitRule.enabled;

  if (splitEnabled && hasLimone && hasLimoneVA) {
    // Apply split rule
    limoneSplitApplied = true;

    // Limone → Legs only
    if (!topicalByArea['Legs']) topicalByArea['Legs'] = [];
    topicalByArea['Legs'].push('Limone');

    // Limone VA → all non-legs areas
    const limoneVAData = rules.oils['Limone VA'];
    if (limoneVAData && limoneVAData.placements) {
      for (const area of limoneVAData.placements) {
        if (area !== 'Topical' && area.toLowerCase() !== 'legs') {
          if (!topicalByArea[area]) topicalByArea[area] = [];
          topicalByArea[area].push('Limone VA');
        }
      }
    }

    // Process other oils normally
    for (const oil of topicalOils) {
      if (oil === 'Limone' || oil === 'Limone VA') continue;
      const oilData = rules.oils[oil];
      if (oilData && oilData.placements) {
        for (const area of oilData.placements) {
          if (area === 'Topical') continue;
          if (!topicalByArea[area]) topicalByArea[area] = [];
          topicalByArea[area].push(oil);
        }
      }
    }
  } else {
    // Normal processing: apply each oil to ALL marked areas
    for (const oil of topicalOils) {
      const oilData = rules.oils[oil];
      if (oilData && oilData.placements) {
        for (const area of oilData.placements) {
          if (!topicalByArea[area]) topicalByArea[area] = [];
          topicalByArea[area].push(oil);
        }
      }
    }
  }

  return { topicalByArea, limoneSplitApplied };
}

/**
 * Build mix from eligible candidates
 * NEW RULES:
 * 1. Build mix using non-topical oils first, then weak-topical oils
 * 2. If mix cannot be completed (missing Base or Head), return null
 * 3. Add warning about incomplete mix
 * 4. Do NOT auto-fill using excluded oils
 */
function buildMix(
  mixCandidates: string[],
  rules: EffectiveRules,
  frequencyPerDay: number
): { mix: MixOutput | null; mixWarnings: string[] } {
  const mixWarnings: string[] = [];

  if (mixCandidates.length === 0) {
    return { mix: null, mixWarnings };
  }

  const maxHearts = rules.globalRules.mix.maxHearts;
  const applyAreas = rules.globalRules.mix.applyAreas;

  // Separate candidates by topical status
  const nonTopicalOils: string[] = [];
  const weakTopicalOils: string[] = [];

  for (const oil of mixCandidates) {
    const oilData = rules.oils[oil];
    if (!oilData) continue;

    const hasOnlyTopical =
      oilData.placements.length > 0 &&
      oilData.placements.every(p => p === 'Topical');

    if (hasOnlyTopical) {
      weakTopicalOils.push(oil);
    } else {
      nonTopicalOils.push(oil);
    }
  }

  // Build mix: prioritize non-topical oils, then weak-topical oils
  const orderedCandidates = [...nonTopicalOils, ...weakTopicalOils];

  let base: string | undefined;
  let head: string | undefined;
  const hearts: string[] = [];

  for (const oil of orderedCandidates) {
    const oilData = rules.oils[oil];
    if (!oilData) continue;

    const role = oilData.noteRole.toLowerCase();

    if (role === 'base' && !base) {
      base = oil;
    } else if (role === 'head' && !head) {
      head = oil;
    } else if (role === 'heart' && hearts.length < maxHearts) {
      hearts.push(oil);
    }
  }

  // Check if mix is complete
  const missing: string[] = [];
  if (!base) missing.push('Base');
  if (!head) missing.push('Head');

  if (missing.length > 0) {
    mixWarnings.push(
      `Mix incomplete: missing ${missing.join(' and ')}. Consider adding another oil.`
    );
    return { mix: null, mixWarnings };
  }

  const oils: string[] = [];
  if (base) oils.push(base);
  if (head) oils.push(head);
  oils.push(...hearts);

  return {
    mix: {
      oils,
      base,
      head,
      hearts,
      applyAreas,
      frequencyPerDay,
    },
    mixWarnings,
  };
}

/**
 * Build rotation for overflow mix-only oils
 * Sequential finite rotation (no cycling)
 *
 * Rotating oil definition:
 * - mixEligible === true
 * - placements.length === 0
 * - excluded from mix due to slot overflow
 */
function buildRotation(
  mixCandidates: string[],
  mix: MixOutput | null,
  rules: EffectiveRules
): RotationOutput | null {
  if (!mix) return null;

  const overflowOils: string[] = [];

  for (const oil of mixCandidates) {
    if (mix.oils.includes(oil)) continue;

    const oilData = rules.oils[oil];
    if (!oilData) continue;
    if (oilData.placements.length > 0) continue;

    const role = oilData.noteRole.toLowerCase();

    const isOverflowBase = role === 'base' && !!mix.base && oil !== mix.base;
    const isOverflowHead = role === 'head' && !!mix.head && oil !== mix.head;
    const isOverflowHeart =
      role === 'heart' && !mix.hearts.includes(oil) && mix.hearts.length >= rules.globalRules.mix.maxHearts;

    if (isOverflowBase || isOverflowHead || isOverflowHeart) {
      overflowOils.push(oil);
    }
  }

  if (overflowOils.length === 0) {
    return null;
  }

  const schedule = overflowOils.map((oil, index) => ({
    day: index + 1,
    oils: [oil],
  }));

  return {
    schedule,
    stopsAfterDay: overflowOils.length,
  };
}

/**
 * Build mouth and fumes outputs
 * Implements mouthFumesDefault="both" logic
 */
function buildMouthAndFumes(
  canonicalSelection: string[],
  rules: EffectiveRules,
  frequencyPerDay: number,
  warnings: string[]
): { mouth: MouthOutput[]; fumes: FumesOutput[] } {
  const mouth: MouthOutput[] = [];
  const fumes: FumesOutput[] = [];

  for (const oil of canonicalSelection) {
    const oilData = rules.oils[oil];
    if (!oilData) continue;

    if (oilData.mouthFumes) {
      // Check for propoli formula
      if (oilData.propoli_30ml) {
        const formula = oilData.propoli_30ml;

        // Add to mouth (ingestion)
        mouth.push({
          oil,
          propoliFormula: formula,
          frequencyPerDay,
        });

        // Add to fumes (inhalation) - uses same formula per inhalationUsesPropoliDosage
        fumes.push({
          oil,
          boilingWaterFormula: formula,
          frequencyPerDay,
        });
      } else {
        warnings.push(
          `mouthFumes=true but missing propoliFormula for "${oil}"`
        );
      }
    }
  }

  return { mouth, fumes };
}
