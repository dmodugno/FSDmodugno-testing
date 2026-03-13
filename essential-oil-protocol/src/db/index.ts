import Dexie from 'dexie';
import type { Table } from 'dexie';
import type { Overrides } from '../engine/types';

export interface SavedSet {
  id?: number;
  name: string;
  selection: string[];
  createdAt: Date;
}

export interface Settings {
  id?: number;
  key: string;
  value: string;
}

export interface OverridesEntry {
  id?: number;
  overrides: Overrides;
  updatedAt: Date;
}

export class OilProtocolDB extends Dexie {
  savedSets!: Table<SavedSet, number>;
  settings!: Table<Settings, number>;
  overrides!: Table<OverridesEntry, number>;

  constructor() {
    super('OilProtocolDB');
    this.version(1).stores({
      savedSets: '++id, name, createdAt',
      settings: '++id, &key',
      overrides: '++id',
    });
  }
}

export const db = new OilProtocolDB();

/**
 * Load overrides from IndexedDB
 */
export async function loadOverrides(): Promise<Overrides> {
  const entries = await db.overrides.toArray();
  if (entries.length > 0) {
    return entries[0].overrides;
  }
  return {};
}

/**
 * Save overrides to IndexedDB
 */
export async function saveOverrides(overrides: Overrides): Promise<void> {
  await db.overrides.clear();
  await db.overrides.add({
    overrides,
    updatedAt: new Date(),
  });
}

/**
 * Export all data for backup
 */
export async function exportData(): Promise<string> {
  const savedSets = await db.savedSets.toArray();
  const settings = await db.settings.toArray();
  const overrides = await db.overrides.toArray();

  const exportData = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    data: {
      savedSets,
      settings,
      overrides,
    },
  };

  return JSON.stringify(exportData, null, 2);
}

/**
 * Import data from backup
 */
export async function importData(jsonString: string): Promise<void> {
  const importData = JSON.parse(jsonString);

  if (!importData.data) {
    throw new Error('Invalid import format');
  }

  await db.transaction('rw', [db.savedSets, db.settings, db.overrides], async () => {
    if (importData.data.savedSets) {
      await db.savedSets.clear();
      await db.savedSets.bulkAdd(importData.data.savedSets);
    }
    if (importData.data.settings) {
      await db.settings.clear();
      await db.settings.bulkAdd(importData.data.settings);
    }
    if (importData.data.overrides) {
      await db.overrides.clear();
      await db.overrides.bulkAdd(importData.data.overrides);
    }
  });
}
