import { useState, useEffect } from 'react';
import type { EffectiveRules, OilOverride } from '../engine/types';
import { loadOverrides, saveOverrides } from '../db';

interface Props {
  effectiveRules: EffectiveRules;
  onUpdate: () => void;
}

export default function Overrides({ effectiveRules, onUpdate }: Props) {
  const [selectedOil, setSelectedOil] = useState('');
  const [override, setOverride] = useState<OilOverride>({});
  const [isSaving, setIsSaving] = useState(false);

  const oilNames = Object.keys(effectiveRules.oils).sort();

  useEffect(() => {
    if (selectedOil) {
      loadOilOverride(selectedOil);
    }
  }, [selectedOil]);

  const loadOilOverride = async (oil: string) => {
    const overrides = await loadOverrides();
    const existing = overrides[oil] || {};

    // Populate with current effective values
    const oilData = effectiveRules.oils[oil];
    setOverride({
      mixEligible: existing.mixEligible ?? oilData.mixEligible,
      placements: existing.placements ?? [...oilData.placements],
      mouthFumes: existing.mouthFumes ?? oilData.mouthFumes,
      propoli_30ml: existing.propoli_30ml ?? oilData.propoli_30ml ?? '',
      dosage_100ml: existing.dosage_100ml ?? oilData.dosage_100ml ?? '',
      dosage_30ml: existing.dosage_30ml ?? oilData.dosage_30ml ?? '',
    });
  };

  const handleSave = async () => {
    if (!selectedOil) return;

    setIsSaving(true);
    try {
      const currentOverrides = await loadOverrides();
      currentOverrides[selectedOil] = override;
      await saveOverrides(currentOverrides);
      onUpdate();
      alert('Override saved successfully!');
    } catch (error) {
      alert('Failed to save override');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!selectedOil) return;
    if (!confirm('Reset this oil to base rules?')) return;

    setIsSaving(true);
    try {
      const currentOverrides = await loadOverrides();
      delete currentOverrides[selectedOil];
      await saveOverrides(currentOverrides);
      onUpdate();
      loadOilOverride(selectedOil);
      alert('Override reset successfully!');
    } catch (error) {
      alert('Failed to reset override');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddPlacement = () => {
    const placement = prompt('Enter placement name:');
    if (placement) {
      setOverride({
        ...override,
        placements: [...(override.placements || []), placement],
      });
    }
  };

  const handleRemovePlacement = (placement: string) => {
    setOverride({
      ...override,
      placements: (override.placements || []).filter((p) => p !== placement),
    });
  };

  return (
    <div className="overrides">
      <h2>Overrides (By Oil)</h2>
      <p className="info">
        Override specific fields for individual oils. Changes apply to protocol generation.
      </p>

      <div className="oil-selector">
        <label>
          Select Oil:
          <select
            value={selectedOil}
            onChange={(e) => setSelectedOil(e.target.value)}
          >
            <option value="">-- Choose an oil --</option>
            {oilNames.map((oil) => (
              <option key={oil} value={oil}>
                {oil}
              </option>
            ))}
          </select>
        </label>
      </div>

      {selectedOil && (
        <div className="override-form">
          <h3>Override: {selectedOil}</h3>

          <div className="form-field">
            <label>
              <input
                type="checkbox"
                checked={override.mixEligible ?? false}
                onChange={(e) =>
                  setOverride({ ...override, mixEligible: e.target.checked })
                }
              />
              Mix Eligible
            </label>
          </div>

          <div className="form-field">
            <label>
              <input
                type="checkbox"
                checked={override.mouthFumes ?? false}
                onChange={(e) =>
                  setOverride({ ...override, mouthFumes: e.target.checked })
                }
              />
              Mouth/Fumes
            </label>
          </div>

          <div className="form-field">
            <label>
              Propoli Formula (30ml):
              <input
                type="text"
                value={override.propoli_30ml ?? ''}
                onChange={(e) =>
                  setOverride({ ...override, propoli_30ml: e.target.value })
                }
                placeholder="e.g., 2 drops + 1 limone"
              />
            </label>
          </div>

          <div className="form-field">
            <label>
              Dosage (100ml):
              <input
                type="text"
                value={override.dosage_100ml ?? ''}
                onChange={(e) =>
                  setOverride({ ...override, dosage_100ml: e.target.value })
                }
                placeholder="e.g., 5 drops"
              />
            </label>
          </div>

          <div className="form-field">
            <label>
              Dosage (30ml):
              <input
                type="text"
                value={override.dosage_30ml ?? ''}
                onChange={(e) =>
                  setOverride({ ...override, dosage_30ml: e.target.value })
                }
                placeholder="e.g., 2 drops"
              />
            </label>
          </div>

          <div className="form-field">
            <label>Placements:</label>
            <div className="placements-list">
              {(override.placements || []).map((placement) => (
                <div key={placement} className="placement-item">
                  <span>{placement}</span>
                  <button
                    onClick={() => handleRemovePlacement(placement)}
                    className="small"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button onClick={handleAddPlacement} className="small">
                + Add Placement
              </button>
            </div>
          </div>

          <div className="actions">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="primary"
            >
              Save Override
            </button>
            <button onClick={handleReset} disabled={isSaving}>
              Reset to Base Rules
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
