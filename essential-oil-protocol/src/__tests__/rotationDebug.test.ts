import { describe, it, expect, beforeAll } from 'vitest';
import { generatePlan } from '../engine/generatePlan';
import { applyOverrides } from '../engine/rulesLoader';
import type { BaseRules, EffectiveRules } from '../engine/types';

// Minimal mock for rotation testing
const mockBaseRules: BaseRules = {
  version: '1.0.0',
  metadata: {
    description: 'Test Rules',
    generatedAt: '2026-03-12',
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
      rule: 'Split rule',
    },
    rotation: {
      type: 'sequentialFinite',
      cycle: false,
      description: 'Sequential finite rotation',
    },
    topicalColumnRule: {
      additiveOnlyWhen: 'oilIsMixOnlyAndMixConstructionFullOverflowRotation',
      description: 'Topical is additive for overflow',
    },
    kids: {
      allowedOilsOnly: [],
      limoneKids: {
        ageRange: [6, 18],
        dilution100ml: '2 drops',
        inflammationOralDose: '20 drops',
        frequencyPerDay: 3,
      },
    },
    inflammationTopical: {
      allowedOils: [],
      carrier: 'olive oil',
      adultDrops100ml: 5,
      kidsDrops100mlByAge: {},
    },
    feverLavandaVera: {
      oil: 'Lavanda vera',
      adultDropsPerTbsp: '7-15',
      adultAreas: [],
      kidsAreasRule: '',
      kidsDropsPerTbspByAge: {},
    },
  },
  oils: {
    'Oil A': {
      aliases: [],
      noteRole: 'Base',
      mixEligible: true,
      mouthFumes: false,
      lampAllowed: false,
      placements: [],
      dosage_100ml: '5 drops',
      dosage_30ml: '2 drops',
      propoli_30ml: null,
      lampOnly: false,
    },
    'Oil B': {
      aliases: [],
      noteRole: 'Base',
      mixEligible: true,
      mouthFumes: false,
      lampAllowed: false,
      placements: [],
      dosage_100ml: '5 drops',
      dosage_30ml: '2 drops',
      propoli_30ml: null,
      lampOnly: false,
    },
    'Oil C': {
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
  },
};

describe('Rotation Topical Application Debug', () => {
  let effectiveRules: EffectiveRules;

  beforeAll(() => {
    effectiveRules = applyOverrides(mockBaseRules, {});
  });

  it('Day 1: Only Day 1 rotation oil appears in Topical', () => {
    const plan = generatePlan(
      {
        selection: ['Oil A', 'Oil B', 'Oil C'],
        profile: { type: 'adult' },
        dayIndex: 1,
      },
      effectiveRules
    );

    console.log('Day 1 Plan:');
    console.log('Mix:', plan.mix);
    console.log('Rotation:', plan.rotation);
    console.log('TopicalByArea:', plan.topicalByArea);

    // Mix should have: Base=Oil A, Head=Oil C
    expect(plan.mix).not.toBeNull();
    expect(plan.mix!.base).toBe('Oil A');
    expect(plan.mix!.head).toBe('Oil C');

    // Oil B is overflow → goes to rotation
    expect(plan.rotation).not.toBeNull();
    expect(plan.rotation!.schedule).toHaveLength(1);
    expect(plan.rotation!.schedule[0]).toEqual({ day: 1, oils: ['Oil B'] });

    // Day 1: Oil B should appear in Topical
    expect(plan.topicalByArea['Topical']).toEqual(['Oil B']);
  });

  it('Day 2: No rotation oil appears in Topical (beyond schedule)', () => {
    const plan = generatePlan(
      {
        selection: ['Oil A', 'Oil B', 'Oil C'],
        profile: { type: 'adult' },
        dayIndex: 2,
      },
      effectiveRules
    );

    console.log('Day 2 Plan:');
    console.log('Mix:', plan.mix);
    console.log('Rotation:', plan.rotation);
    console.log('TopicalByArea:', plan.topicalByArea);

    // Rotation schedule still exists
    expect(plan.rotation).not.toBeNull();
    expect(plan.rotation!.schedule).toHaveLength(1); // Still only 1 day

    // Day 2: Beyond schedule, so Topical should be undefined or empty
    expect(plan.topicalByArea['Topical']).toBeUndefined();
  });

  it('Multi-day rotation: Each day shows only its scheduled oil', () => {
    // Add a 4th oil to create 2 overflow oils
    const extendedRules = {
      ...effectiveRules,
      oils: {
        ...effectiveRules.oils,
        'Oil D': {
          aliases: [],
          noteRole: 'Base',
          mixEligible: true,
          mouthFumes: false,
          lampAllowed: false,
          placements: [],
          dosage_100ml: '5 drops',
          dosage_30ml: '2 drops',
          propoli_30ml: null,
          lampOnly: false,
        },
      },
    };

    // Day 1
    const plan1 = generatePlan(
      {
        selection: ['Oil A', 'Oil B', 'Oil D', 'Oil C'],
        profile: { type: 'adult' },
        dayIndex: 1,
      },
      extendedRules
    );

    console.log('Multi-Day Day 1:');
    console.log('Rotation:', plan1.rotation);
    console.log('TopicalByArea:', plan1.topicalByArea);

    expect(plan1.rotation!.schedule).toHaveLength(2);
    expect(plan1.rotation!.schedule[0]).toEqual({ day: 1, oils: ['Oil B'] });
    expect(plan1.rotation!.schedule[1]).toEqual({ day: 2, oils: ['Oil D'] });
    expect(plan1.topicalByArea['Topical']).toEqual(['Oil B']); // Only Oil B on day 1

    // Day 2
    const plan2 = generatePlan(
      {
        selection: ['Oil A', 'Oil B', 'Oil D', 'Oil C'],
        profile: { type: 'adult' },
        dayIndex: 2,
      },
      extendedRules
    );

    console.log('Multi-Day Day 2:');
    console.log('TopicalByArea:', plan2.topicalByArea);

    expect(plan2.topicalByArea['Topical']).toEqual(['Oil D']); // Only Oil D on day 2

    // Day 3 (beyond schedule)
    const plan3 = generatePlan(
      {
        selection: ['Oil A', 'Oil B', 'Oil D', 'Oil C'],
        profile: { type: 'adult' },
        dayIndex: 3,
      },
      extendedRules
    );

    console.log('Multi-Day Day 3:');
    console.log('TopicalByArea:', plan3.topicalByArea);

    expect(plan3.topicalByArea['Topical']).toBeUndefined(); // No rotation oil on day 3
  });
});
