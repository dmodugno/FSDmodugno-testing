import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Profile } from '../engine/types';
import { db } from '../db';
import type { SavedSet } from '../db';

export default function SavedSets() {
  const navigate = useNavigate();
  const [sets, setSets] = useState<SavedSet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSets();
  }, []);

  const loadSets = async () => {
    try {
      const allSets = await db.savedSets.toArray();
      setSets(allSets.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    } catch (error) {
      console.error('Failed to load sets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUseSet = (set: SavedSet) => {
    const profile: Profile = { type: 'adult' };
    navigate('/protocol', {
      state: {
        selection: set.selection,
        profile,
        dayIndex: 1,
      },
    });
  };

  const handleDeleteSet = async (id: number | undefined) => {
    if (!id) return;
    if (!confirm('Delete this set?')) return;
    try {
      await db.savedSets.delete(id);
      loadSets();
    } catch (error) {
      alert('Failed to delete set');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="saved-sets">
      <h2>Saved Sets</h2>

      {sets.length === 0 ? (
        <p>No saved sets yet. Create one from the Pick Oils page.</p>
      ) : (
        <div className="sets-list">
          {sets.map((set) => (
            <div key={set.id} className="set-card">
              <h3>{set.name}</h3>
              <p className="date">
                Created: {new Date(set.createdAt).toLocaleDateString()}
              </p>
              <p className="count">{set.selection.length} oils</p>
              <div className="oils-preview">
                {set.selection.slice(0, 5).join(', ')}
                {set.selection.length > 5 && '...'}
              </div>
              <div className="actions">
                <button onClick={() => handleUseSet(set)} className="primary">
                  Generate Protocol
                </button>
                <button onClick={() => handleDeleteSet(set.id)} className="danger">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
