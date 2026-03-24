import { useLocation, useNavigate } from 'react-router-dom';
import type { EffectiveRules, Profile } from '../engine/types';
import { generatePlan } from '../engine/generatePlan';
import { resolveOilName } from '../engine/normalize';

interface Props {
  effectiveRules: EffectiveRules;
}

interface LocationState {
  selection: string[];
  profile: Profile;
  dayIndex: number;
}

export default function ProtocolOutput({ effectiveRules }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  if (!state || !state.selection) {
    return (
      <div className="protocol-output">
        <p>No protocol data. Please go back and select oils.</p>
        <button onClick={() => navigate('/')}>Back to Pick Oils</button>
      </div>
    );
  }

  const plan = generatePlan(
    {
      selection: state.selection,
      profile: state.profile,
      dayIndex: state.dayIndex,
    },
    effectiveRules
  );

  // Collect ALL rotation oils from schedule (not just current day)
  const allRotationOils: string[] = [];
  if (plan.rotation) {
    const uniqueOils = new Set<string>();
    plan.rotation.schedule.forEach((daySchedule) => {
      daySchedule.oils.forEach((oil) => uniqueOils.add(oil));
    });
    allRotationOils.push(...Array.from(uniqueOils));
  }

  // Build complete topical display (excluding rotation oils temporarily)
  const topicalAreasExcludingRotation = { ...plan.topicalByArea };
  delete topicalAreasExcludingRotation['Topical'];

  return (
    <div className="protocol-output">
      <h2>Essential Oil Protocol</h2>
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Pick Oils
      </button>

      {plan.warnings.length > 0 && (
        <div className="warnings">
          <h3>⚠️ Warnings</h3>
          <ul>
            {plan.warnings.map((warning, i) => (
              <li key={i}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      {plan.mix && (
        <div className="section mix">
          <h3>Mix</h3>
          <div className="mix-composition">
            {plan.mix.base && (
              <div className="mix-component">
                <span className="label">Base:</span>
                <span className="value">{plan.mix.base}</span>
              </div>
            )}
            {plan.mix.head && (
              <div className="mix-component">
                <span className="label">Head:</span>
                <span className="value">{plan.mix.head}</span>
              </div>
            )}
            {plan.mix.hearts.length > 0 && (
              <div className="mix-component">
                <span className="label">Hearts:</span>
                <span className="value">{plan.mix.hearts.join(', ')}</span>
              </div>
            )}
          </div>
          <p style={{ marginTop: '1rem' }}>
            <strong>Apply to:</strong> {plan.mix.applyAreas.join(', ')}
          </p>
          <p><strong>Frequency:</strong> {plan.mix.frequencyPerDay} times per day</p>
        </div>
      )}

      {(Object.keys(topicalAreasExcludingRotation).length > 0 || allRotationOils.length > 0) && (
        <div className="section topical">
          <h3>Topical Application</h3>

          {Object.entries(topicalAreasExcludingRotation).map(([area, oils]) => (
            <div key={area} className="topical-area" style={{ marginBottom: '0.75rem' }}>
              <strong>{area}:</strong> {oils.join(', ')}
            </div>
          ))}

          {allRotationOils.length > 0 && (
            <div className="topical-area" style={{ marginBottom: '0.75rem' }}>
              <strong>Topical (where it hurts):</strong> {allRotationOils.join(', ')}
              <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.25rem', marginLeft: '0' }}>
                See rotation schedule below for day-by-day application
              </p>
            </div>
          )}
        </div>
      )}

      {plan.rotation && plan.rotation.schedule.length > 0 && (
        <div className="section rotation">
          <h3>Rotation Plan</h3>
          <p style={{ fontSize: '0.95rem', color: '#555', marginBottom: '1rem' }}>
            Apply these oils topically in sequence. After day {plan.rotation.stopsAfterDay}, rotation stops (no cycling).
          </p>
          <div>
            {plan.rotation.schedule.map((daySchedule) => (
              <div
                key={daySchedule.day}
                style={{
                  padding: '0.75rem',
                  marginBottom: '0.5rem',
                  backgroundColor: '#f9f9f9',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                }}
              >
                <strong>Day {daySchedule.day}:</strong> {daySchedule.oils.join(', ')}
              </div>
            ))}
          </div>
        </div>
      )}

      {plan.mouth.length > 0 && (
        <div className="section mouth">
          <h3>Mouth (Ingestion)</h3>
          {plan.mouth.map((item, i) => (
            <div key={i} className="application">
              <p><strong>{item.oil}</strong></p>
              <p>Formula: {item.propoliFormula}</p>
              <p>Frequency: {item.frequencyPerDay} times per day</p>
            </div>
          ))}
        </div>
      )}

      {plan.fumes.length > 0 && (
        <div className="section fumes">
          <h3>Fumes (Inhalation)</h3>
          {plan.fumes.map((item, i) => (
            <div key={i} className="application">
              <p><strong>{item.oil}</strong></p>
              <p>Formula: {item.boilingWaterFormula}</p>
              <p>Frequency: {item.frequencyPerDay} times per day</p>
            </div>
          ))}
        </div>
      )}

      {!plan.mix && Object.keys(plan.topicalByArea).length === 0 && plan.mouth.length === 0 && (
        <div className="section">
          <p>No protocol generated. Check warnings above.</p>
        </div>
      )}

      {/* DEBUG PANEL */}
      <div className="section debug-panel" style={{ marginTop: '2rem', opacity: 0.7 }}>
        <details>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>🔍 Debug Info (Dev Only)</summary>
          <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd' }}>
                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Input Name</th>
                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Canonical Key</th>
                <th style={{ textAlign: 'left', padding: '0.5rem' }}>noteRole</th>
                <th style={{ textAlign: 'center', padding: '0.5rem' }}>mixEligible</th>
                <th style={{ textAlign: 'center', padding: '0.5rem' }}>placements.length</th>
              </tr>
            </thead>
            <tbody>
              {state.selection.map((inputName, idx) => {
                const canonical = resolveOilName(inputName, effectiveRules);
                const oilData = canonical ? effectiveRules.oils[canonical] : null;
                return (
                  <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.5rem' }}>{inputName}</td>
                    <td style={{ padding: '0.5rem', color: canonical ? '#2c3e50' : '#e74c3c' }}>
                      {canonical || 'UNRESOLVED'}
                    </td>
                    <td style={{ padding: '0.5rem' }}>{oilData?.noteRole || '-'}</td>
                    <td style={{ textAlign: 'center', padding: '0.5rem' }}>
                      {oilData?.mixEligible ? '✓' : '✗'}
                    </td>
                    <td style={{ textAlign: 'center', padding: '0.5rem' }}>
                      {oilData?.placements.length ?? '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </details>
      </div>
    </div>
  );
}
