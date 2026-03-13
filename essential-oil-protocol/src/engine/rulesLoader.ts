import type { BaseRules, EffectiveRules, Overrides } from './types';

/**
 * Loads baseRules.json from public directory
 * NEVER stored in IndexedDB
 */
export async function loadBaseRules(): Promise<BaseRules> {
  // Use import.meta.env.BASE_URL to handle both dev and production paths
  const basePath = import.meta.env.BASE_URL || '/';
  const url = `${basePath}baseRules.json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load baseRules.json from ${url}`);
  }
  return await response.json();
}

/**
 * Applies user overrides to base rules
 * Creates effective rules for the engine
 */
export function applyOverrides(
  baseRules: BaseRules,
  overrides: Overrides
): EffectiveRules {
  const effectiveRules: EffectiveRules = JSON.parse(
    JSON.stringify(baseRules)
  ) as EffectiveRules;

  for (const [oilName, override] of Object.entries(overrides)) {
    if (effectiveRules.oils[oilName]) {
      const oil = effectiveRules.oils[oilName];

      if (override.mixEligible !== undefined) {
        oil.mixEligible = override.mixEligible;
      }
      if (override.placements !== undefined) {
        oil.placements = [...override.placements];
      }
      if (override.mouthFumes !== undefined) {
        oil.mouthFumes = override.mouthFumes;
      }
      if (override.propoli_30ml !== undefined) {
        oil.propoli_30ml = override.propoli_30ml;
      }
      if (override.dosage_100ml !== undefined) {
        oil.dosage_100ml = override.dosage_100ml;
      }
      if (override.dosage_30ml !== undefined) {
        oil.dosage_30ml = override.dosage_30ml;
      }
    }
  }

  return effectiveRules;
}
