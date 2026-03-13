import type { EffectiveRules } from './types';

/**
 * Local alias map for MVP
 * Maps common user-facing names to canonical oil names in baseRules.json
 */
const ALIAS_MAP: Record<string, string> = {
  // Test case aliases
  'timo z': 'Timo zygis',
  'carota': 'Carrot seed',
  'arancio amaro': 'Arancia Amara',
  'limone v.a.': 'Limone VA',
  'limone va': 'Limone VA',

  // Common variations
  'eucalipto citriodora': 'Eucalipto Citrato',
  'lavanda vera': 'Lavanda Vera',
  'tea tree': 'Tea Tree',
  'ylang ylang': 'Ylang ylang',
};

/**
 * Normalizes an input oil name to its canonical form
 *
 * Matching rules:
 * - Case-insensitive
 * - Whitespace-trimmed
 * - Exact match against canonical names OR alias list
 * - NO fuzzy matching
 *
 * @param inputName - The user-provided oil name
 * @param effectiveRules - The effective rules containing oil data
 * @returns Canonical oil name or null if unresolved
 */
export function resolveOilName(
  inputName: string,
  effectiveRules: EffectiveRules
): string | null {
  // Normalize input: trim and lowercase
  const normalized = inputName.trim().toLowerCase();

  if (!normalized) {
    return null;
  }

  // Check local alias map first
  if (ALIAS_MAP[normalized]) {
    const canonicalName = ALIAS_MAP[normalized];
    // Verify canonical name exists in rules
    if (effectiveRules.oils[canonicalName]) {
      return canonicalName;
    }
  }

  // Check exact match against canonical names (case-insensitive)
  for (const oilName of Object.keys(effectiveRules.oils)) {
    if (oilName.toLowerCase() === normalized) {
      return oilName;
    }
  }

  // Check aliases in baseRules.json
  for (const [oilName, oilData] of Object.entries(effectiveRules.oils)) {
    if (oilData.aliases && oilData.aliases.length > 0) {
      for (const alias of oilData.aliases) {
        if (alias.toLowerCase() === normalized) {
          return oilName;
        }
      }
    }
  }

  // Unresolved
  return null;
}

/**
 * Resolves multiple oil names
 * Returns only successfully resolved oils and a list of warnings
 */
export function resolveOilNames(
  inputNames: string[],
  effectiveRules: EffectiveRules
): { resolved: string[]; warnings: string[] } {
  const resolved: string[] = [];
  const warnings: string[] = [];

  for (const inputName of inputNames) {
    const canonical = resolveOilName(inputName, effectiveRules);
    if (canonical) {
      resolved.push(canonical);
    } else {
      warnings.push(`Unresolved oil name: "${inputName}"`);
    }
  }

  return { resolved, warnings };
}
