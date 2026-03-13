export interface OilData {
  aliases: string[];
  noteRole: string;
  mixEligible: boolean;
  mouthFumes: boolean;
  lampAllowed: boolean;
  placements: string[];
  dosage_100ml: string | null;
  dosage_30ml: string | null;
  propoli_30ml: string | null;
  lampOnly: boolean;
}

export interface BaseRules {
  version: string;
  metadata: {
    description: string;
    generatedAt: string;
    frequencyPerDay: number;
  };
  globalRules: {
    mode: number;
    stackPerArea: boolean;
    mix: {
      alwaysUseMix: boolean;
      maxHearts: number;
      applyAreas: string[];
      equalVolumes: boolean;
      topicalPrecedenceOverMix: boolean;
    };
    mouthFumesDefault: string;
    inhalationUsesPropoliDosage: boolean;
    topicalPrecedenceStatement: string;
    limoneSplitRule: {
      enabled: boolean;
      lowerBodyDefinition: string;
      rule: string;
    };
    rotation: {
      type: string;
      cycle: boolean;
      description: string;
    };
    topicalColumnRule: {
      additiveOnlyWhen: string;
      description: string;
    };
    kids: {
      allowedOilsOnly: string[];
      limoneKids: {
        ageRange: number[];
        dilution100ml: string;
        inflammationOralDose: string;
        frequencyPerDay: number;
      };
    };
    inflammationTopical: {
      allowedOils: string[];
      carrier: string;
      adultDrops100ml: number;
      kidsDrops100mlByAge: Record<string, string>;
    };
    feverLavandaVera: {
      oil: string;
      adultDropsPerTbsp: string;
      adultAreas: string[];
      kidsAreasRule: string;
      kidsDropsPerTbspByAge: Record<string, string>;
    };
  };
  oils: Record<string, OilData>;
}

export interface Profile {
  type: "adult" | "kid";
  age?: number;
}

export interface GeneratePlanInput {
  selection: string[];
  profile: Profile;
  dayIndex: number;
}

export interface MixOutput {
  oils: string[];
  base?: string;
  head?: string;
  hearts: string[];
  applyAreas: string[];
  frequencyPerDay: number;
}

export interface MouthOutput {
  oil: string;
  propoliFormula: string;
  frequencyPerDay: number;
}

export interface FumesOutput {
  oil: string;
  boilingWaterFormula: string;
  frequencyPerDay: number;
}

export interface RotationOutput {
  schedule: Array<{ day: number; oils: string[] }>;
  stopsAfterDay: number;
}

export interface PlanOutput {
  mix: MixOutput | null;
  topicalByArea: Record<string, string[]>;
  mouth: MouthOutput[];
  fumes: FumesOutput[];
  rotation: RotationOutput | null;
  warnings: string[];
}

export interface EffectiveRules extends BaseRules {
  // Effective rules after applying overrides
}

export interface OilOverride {
  mixEligible?: boolean;
  placements?: string[];
  mouthFumes?: boolean;
  propoli_30ml?: string;
  dosage_100ml?: string;
  dosage_30ml?: string;
}

export type Overrides = Record<string, OilOverride>;
