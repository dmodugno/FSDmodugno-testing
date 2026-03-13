import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { EffectiveRules, Profile } from '../engine/types';
import { db } from '../db';

interface Props {
  effectiveRules: EffectiveRules;
}

export default function PickOils({ effectiveRules }: Props) {
  const navigate = useNavigate();
  const [selection, setSelection] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [profile, setProfile] = useState<Profile>({ type: 'adult' });
  const [dayIndex, setDayIndex] = useState(1);
  const [setName, setSetName] = useState('');

  const oilNames = Object.keys(effectiveRules.oils).sort();

  const filteredOils = searchTerm
    ? oilNames.filter((name) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : oilNames;

  const handleToggleOil = (oil: string) => {
    if (selection.includes(oil)) {
      setSelection(selection.filter((o) => o !== oil));
    } else {
      setSelection([...selection, oil]);
    }
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    const newSelection = [...selection];
    const [moved] = newSelection.splice(fromIndex, 1);
    newSelection.splice(toIndex, 0, moved);
    setSelection(newSelection);
  };

  const handleGenerateProtocol = () => {
    navigate('/protocol', {
      state: { selection, profile, dayIndex },
    });
  };

  const handleSaveSet = async () => {
    if (!setName.trim()) {
      alert('Please enter a name for this set');
      return;
    }
    try {
      await db.savedSets.add({
        name: setName.trim(),
        selection,
        createdAt: new Date(),
      });
      alert('Set saved successfully!');
      setSetName('');
    } catch (error) {
      alert('Failed to save set');
    }
  };

  return (
    <div className="pick-oils">
      <h2>Pick Oils</h2>

      <div className="profile-section">
        <label>
          Profile:
          <select
            value={profile.type}
            onChange={(e) =>
              setProfile({
                type: e.target.value as 'adult' | 'kid',
                age: e.target.value === 'kid' ? 10 : undefined,
              })
            }
          >
            <option value="adult">Adult</option>
            <option value="kid">Kid</option>
          </select>
        </label>
        {profile.type === 'kid' && (
          <label>
            Age:
            <input
              type="number"
              min="0"
              max="18"
              value={profile.age || 10}
              onChange={(e) =>
                setProfile({ ...profile, age: parseInt(e.target.value) || 10 })
              }
            />
          </label>
        )}
        <label>
          Day Index:
          <input
            type="number"
            min="1"
            value={dayIndex}
            onChange={(e) => setDayIndex(parseInt(e.target.value) || 1)}
          />
        </label>
      </div>

      <div className="selection-section">
        <h3>Selected Oils ({selection.length})</h3>
        {selection.length === 0 ? (
          <p>No oils selected</p>
        ) : (
          <div className="selected-oils">
            {selection.map((oil, index) => (
              <div key={oil} className="selected-oil">
                <span className="order">{index + 1}.</span>
                <span className="name">{oil}</span>
                <button onClick={() => handleReorder(index, Math.max(0, index - 1))}>↑</button>
                <button onClick={() => handleReorder(index, Math.min(selection.length - 1, index + 1))}>↓</button>
                <button onClick={() => handleToggleOil(oil)}>Remove</button>
              </div>
            ))}
          </div>
        )}
        <div className="actions">
          <button
            onClick={handleGenerateProtocol}
            disabled={selection.length === 0}
            className="primary"
          >
            Generate Protocol
          </button>
          <div className="save-set">
            <input
              type="text"
              placeholder="Set name"
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
            />
            <button
              onClick={handleSaveSet}
              disabled={selection.length === 0 || !setName.trim()}
            >
              Save Set
            </button>
          </div>
        </div>
      </div>

      <div className="oil-picker">
        <h3>Available Oils</h3>
        <input
          type="text"
          placeholder="Search oils..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search"
        />
        <div className="oil-list">
          {filteredOils.map((oil) => (
            <div
              key={oil}
              className={`oil-item ${selection.includes(oil) ? 'selected' : ''}`}
              onClick={() => handleToggleOil(oil)}
            >
              <input
                type="checkbox"
                checked={selection.includes(oil)}
                readOnly
              />
              <span>{oil}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
