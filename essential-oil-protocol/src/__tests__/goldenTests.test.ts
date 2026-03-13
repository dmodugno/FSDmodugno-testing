import { describe, it, expect, beforeAll } from 'vitest';
import { generatePlan } from '../engine/generatePlan';
import { applyOverrides } from '../engine/rulesLoader';
import type { EffectiveRules, BaseRules } from '../engine/types';

// Mock baseRules data
const mockBaseRules: BaseRules = {
  version: '1.0.0',
  metadata: {
    description: 'Test Rules',
    generatedAt: '2026-03-12T00:00:00Z',
    frequencyPerDay: 3,
  },
  globalRules: {
    mode: 1,
    stackPerArea: true,
    mix: {
      alwaysUseMix: true,
      maxHearts: 7,
      applyAreas: ['Face', 'Arms'],
      equalVolumes: true,
      topicalPrecedenceOverMix: true,
    },
    mouthFumesDefault: 'both',
    inhalationUsesPropoliDosage: true,
    topicalPrecedenceStatement: 'If an oil is used topically, it must not be included in the mix.',
    limoneSplitRule: {
      enabled: true,
      lowerBodyDefinition: 'LegsAndBelow',
      rule: 'Limone split rule applies',
    },
    rotation: {
      type: 'sequentialFinite',
      cycle: false,
      description: 'Sequential finite rotation',
    },
    topicalColumnRule: {
      additiveOnlyWhen: 'oilIsMixOnlyAndMixConstructionFullOverflowRotation',
      description: 'Topical column rule',
    },
    kids: {
      allowedOilsOnly: ['Lavanda Vera', 'Cajeput', 'Eucalipto Radiata', 'Eucalipto Citrato', 'Limone'],
      limoneKids: {
        ageRange: [6, 18],
        dilution100ml: '2 drops',
        inflammationOralDose: '20 drops',
        frequencyPerDay: 3,
      },
    },
    inflammationTopical: {
      allowedOils: ['Lavanda Vera'],
      carrier: 'olive oil',
      adultDrops100ml: 5,
      kidsDrops100mlByAge: { '0-3': '1' },
    },
    feverLavandaVera: {
      oil: 'Lavanda Vera',
      adultDropsPerTbsp: '7-15',
      adultAreas: ['Face', 'Arms'],
      kidsAreasRule: '0-7 feet only',
      kidsDropsPerTbspByAge: { '0-3': '1-3' },
    },
  },
  oils: {
    'Timo zygis': {
      aliases: [],
      noteRole: 'Base',
      mixEligible: true,
      mouthFumes: false,
      lampAllowed: false,
      placements: [],
      dosage_100ml: '3 drops',
      dosage_30ml: '1 drops',
      propoli_30ml: null,
      lampOnly: false,
    },
    Cipresso: {
      aliases: [],
      noteRole: 'Base',
      mixEligible: false,
      mouthFumes: false,
      lampAllowed: false,
      placements: ['Legs'],
      dosage_100ml: '5 drops',
      dosage_30ml: '2 drops',
      propoli_30ml: null,
      lampOnly: false,
    },
    Finocchio: {
      aliases: [],
      noteRole: 'Heart',
      mixEligible: true,
      mouthFumes: false,
      lampAllowed: false,
      placements: ['Belly'],
      dosage_100ml: '3 drops',
      dosage_30ml: '1 drops',
      propoli_30ml: null,
      lampOnly: false,
    },
    'Arancia Amara': {
      aliases: [],
      noteRole: 'Head',
      mixEligible: true,
      mouthFumes: false,
      lampAllowed: false,
      placements: [],
      dosage_100ml: '5 drops',
      dosage_30ml: '2 drops',
      propoli_30ml: null,
      lampOnly: false,
    },
    Manuka: {
      aliases: [],
      noteRole: 'Heart',
      mixEligible: true,
      mouthFumes: false,
      lampAllowed: false,
      placements: ['Topical'],
      dosage_100ml: '5 drops',
      dosage_30ml: '2 drops',
      propoli_30ml: null,
      lampOnly: false,
    },
    Salvia: {
      aliases: [],
      noteRole: 'Heart',
      mixEligible: true,
      mouthFumes: false,
      lampAllowed: false,
      placements: [],
      dosage_100ml: '5 drops',
      dosage_30ml: '2 drops',
      propoli_30ml: null,
      lampOnly: false,
    },
    Limone: {
      aliases: [],
      noteRole: 'Head',
      mixEligible: false,
      mouthFumes: true,
      lampAllowed: false,
      placements: ['Legs', 'Lower back', 'Punti di rene'],
      dosage_100ml: '5 drops',
      dosage_30ml: '2 drops',
      propoli_30ml: null,
      lampOnly: false,
    },
    'Limone VA': {
      aliases: [],
      noteRole: 'Head',
      mixEligible: false,
      mouthFumes: false,
      lampAllowed: false,
      placements: ['Lower back', 'Punti di rene'],
      dosage_100ml: null,
      dosage_30ml: null,
      propoli_30ml: null,
      lampOnly: false,
    },
    'Carrot seed': {
      aliases: [],
      noteRole: 'Base',
      mixEligible: true,
      mouthFumes: false,
      lampAllowed: false,
      placements: [],
      dosage_100ml: null,
      dosage_30ml: null,
      propoli_30ml: null,
      lampOnly: false,
    },
    'Pepe nero': {
      aliases: [],
      noteRole: 'Base',
      mixEligible: true,
      mouthFumes: false,
      lampAllowed: false,
      placements: [],
      dosage_100ml: null,
      dosage_30ml: null,
      propoli_30ml: null,
      lampOnly: false,
    },
    Eucalipto: {
      aliases: [],
      noteRole: 'Head',
      mixEligible: false,
      mouthFumes: true,
      lampAllowed: false,
      placements: [],
      dosage_100ml: '5 drops',
      dosage_30ml: '2 drops',
      propoli_30ml: '2 drops + 1 limone',
      lampOnly: false,
    },
    Menta: {
      aliases: [],
      noteRole: 'Head',
      mixEligible: false,
      mouthFumes: false,
      lampAllowed: false,
      placements: ['Face', 'Deltoide'],
      dosage_100ml: '1 drops',
      dosage_30ml: '-',
      propoli_30ml: null,
      lampOnly: false,
    },
    'Eucalipto Radiata': {
      aliases: [],
      noteRole: 'Head',
      mixEligible: false,
      mouthFumes: false,
      lampAllowed: true,
      placements: ['Face'],
      dosage_100ml: null,
      dosage_30ml: null,
      propoli_30ml: null,
      lampOnly: false,
    },
  },
};

describe('Golden Test Cases', () => {
  let effectiveRules: EffectiveRules;

  beforeAll(async () => {
    effectiveRules = applyOverrides(mockBaseRules, {});
  });

  it('TEST 1 - Mix + Topical Precedence', () => {
    const plan = generatePlan(
      {
        selection: [
          'Timo z',
          'Cipresso',
          'Finocchio',
          'Arancio amaro',
          'Manuka',
          'Salvia',
        ],
        profile: { type: 'adult' },
        dayIndex: 1,
      },
      effectiveRules
    );

    // Finocchio has Belly placement → must NOT appear in mix
    // Manuka has Topical placement → must NOT appear in mix
    expect(plan.mix).not.toBeNull();
    expect(plan.mix!.oils).not.toContain('Finocchio');
    expect(plan.mix!.oils).not.toContain('Manuka');

    // Mix composition
    expect(plan.mix!.base).toBe('Timo zygis');
    expect(plan.mix!.head).toBe('Arancia Amara');
    expect(plan.mix!.hearts).toContain('Salvia');
    expect(plan.mix!.applyAreas).toEqual(['Face', 'Arms']);

    // Topical areas
    expect(plan.topicalByArea['Belly']).toContain('Finocchio');
    expect(plan.topicalByArea['Legs']).toContain('Cipresso');
    expect(plan.topicalByArea['Topical']).toContain('Manuka');

    // No rotation (Cipresso has mixEligible=false, so not a rotation candidate)
    // Finocchio and Manuka have placements so are topical-only
    expect(plan.rotation).toBeNull();

    // No mouth/fumes
    expect(plan.mouth).toHaveLength(0);
    expect(plan.fumes).toHaveLength(0);
  });

  it('TEST 2 - Limone Split Rule', () => {
    const plan = generatePlan(
      {
        selection: ['Limone', 'Limone V.A.'],
        profile: { type: 'adult' },
        dayIndex: 1,
      },
      effectiveRules
    );

    // Limone → ONLY Legs
    expect(plan.topicalByArea['Legs']).toContain('Limone');
    expect(plan.topicalByArea['Legs']).toHaveLength(1);

    // Limone VA → Lower back + Punti di rene (not Legs)
    expect(plan.topicalByArea['Lower back']).toContain('Limone VA');
    expect(plan.topicalByArea['Punti di rene']).toContain('Limone VA');
    expect(plan.topicalByArea['Legs']).not.toContain('Limone VA');

    // Neither appears in mix
    expect(plan.mix).toBeNull();

    // No rotation
    expect(plan.rotation).toBeNull();
  });

  it('TEST 3 - Sequential Finite Rotation', () => {
    const selection = ['Timo z', 'Carota', 'Pepe nero', 'Arancio amaro'];

    // Day 1
    const plan1 = generatePlan(
      {
        selection,
        profile: { type: 'adult' },
        dayIndex: 1,
      },
      effectiveRules
    );

    expect(plan1.mix).not.toBeNull();
    expect(plan1.mix!.base).toBe('Timo zygis');
    expect(plan1.mix!.head).toBe('Arancia Amara');

    // Carota + Pepe nero are overflow Base oils
    expect(plan1.rotation).not.toBeNull();
    expect(plan1.rotation!.schedule).toHaveLength(2); // 2 overflow oils
    expect(plan1.rotation!.schedule[0]).toEqual({ day: 1, oils: ['Carrot seed'] });
    expect(plan1.rotation!.schedule[1]).toEqual({ day: 2, oils: ['Pepe nero'] });
    expect(plan1.rotation!.stopsAfterDay).toBe(2);

    // Rotating oils for day 1 should appear in topicalByArea under "Topical"
    expect(plan1.topicalByArea['Topical']).toContain('Carrot seed');

    // Day 2
    const plan2 = generatePlan(
      {
        selection,
        profile: { type: 'adult' },
        dayIndex: 2,
      },
      effectiveRules
    );

    expect(plan2.rotation).not.toBeNull();
    expect(plan2.rotation!.schedule).toHaveLength(2);
    expect(plan2.topicalByArea['Topical']).toContain('Pepe nero');

    // Day 3 - beyond rotation schedule
    const plan3 = generatePlan(
      {
        selection,
        profile: { type: 'adult' },
        dayIndex: 3,
      },
      effectiveRules
    );

    expect(plan3.rotation).not.toBeNull(); // Rotation object still exists
    expect(plan3.rotation!.schedule).toHaveLength(2); // Schedule is still 2 days
    // But no rotating oil for day 3 in topicalByArea
    expect(plan3.topicalByArea['Topical']).toBeUndefined(); // or empty

    // NO CYCLING
  });

  it('TEST 4 - Mouth/Fumes Default Both', () => {
    const plan = generatePlan(
      {
        selection: ['Eucalipto'],
        profile: { type: 'adult' },
        dayIndex: 1,
      },
      effectiveRules
    );

    // Mouth (ingestion)
    expect(plan.mouth).toHaveLength(1);
    expect(plan.mouth[0].oil).toBe('Eucalipto');
    expect(plan.mouth[0].propoliFormula).toBe('2 drops + 1 limone');
    expect(plan.mouth[0].frequencyPerDay).toBe(3);

    // Fumes (inhalation) - uses same formula
    expect(plan.fumes).toHaveLength(1);
    expect(plan.fumes[0].oil).toBe('Eucalipto');
    expect(plan.fumes[0].boilingWaterFormula).toBe('2 drops + 1 limone');
    expect(plan.fumes[0].frequencyPerDay).toBe(3);
  });

  it('Should warn on unresolved oil names', () => {
    const plan = generatePlan(
      {
        selection: ['NonExistentOil', 'Eucalipto'],
        profile: { type: 'adult' },
        dayIndex: 1,
      },
      effectiveRules
    );

    expect(plan.warnings).toContain('Unresolved oil name: "NonExistentOil"');
  });

  it('Should warn on kid profile with disallowed oils', () => {
    const plan = generatePlan(
      {
        selection: ['Eucalipto', 'Menta'], // Menta not allowed for kids
        profile: { type: 'kid', age: 8 },
        dayIndex: 1,
      },
      effectiveRules
    );

    expect(plan.warnings.some((w) => w.includes('disallowed'))).toBe(true);
  });

  it('Should warn on mouthFumes without propoli formula', () => {
    // Create effective rules with missing propoli formula
    const modifiedRules = JSON.parse(JSON.stringify(effectiveRules));
    modifiedRules.oils['Eucalipto'].propoli_30ml = null;

    const plan = generatePlan(
      {
        selection: ['Eucalipto'],
        profile: { type: 'adult' },
        dayIndex: 1,
      },
      modifiedRules
    );

    expect(
      plan.warnings.some((w) => w.includes('missing propoliFormula'))
    ).toBe(true);
  });

  it('Should warn on topical precedence exclusion', () => {
    const plan = generatePlan(
      {
        selection: ['Finocchio'],
        profile: { type: 'adult' },
        dayIndex: 1,
      },
      effectiveRules
    );

    expect(
      plan.warnings.some((w) => w.includes('Topical precedence'))
    ).toBe(true);
  });
});
