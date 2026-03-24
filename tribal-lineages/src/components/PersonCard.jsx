import { useNavigate } from 'react-router-dom';
import { getGroupsByPerson } from '../utils/dataUtils';

function PersonCard({ person, isHighlighted = false, isMuted = false }) {
  const navigate = useNavigate();
  const memberGroups = getGroupsByPerson(person.id);

  const handleGroupClick = (groupId, e) => {
    e.stopPropagation();
    navigate(`/group/${groupId}`);
  };

  return (
    <div className={`person-card ${isHighlighted ? 'highlighted' : ''} ${isMuted ? 'muted' : ''}`}>
      <div className="person-avatar">
        <div className="avatar-circle">{person.arabicName.charAt(0)}</div>
      </div>

      <div className="person-names">
        <div className="person-name-arabic">{person.arabicName}</div>
        <div className="person-name-latin">({person.latinName})</div>
      </div>

      <div className="person-meta">
        <span className="person-id">ID: {person.id}</span>
      </div>

      {memberGroups.length > 0 && (
        <div className="person-group-info member">
          <span className="group-label">Member of:</span>{' '}
          {memberGroups.map((group, index) => (
            <span key={group.id}>
              <span
                className="group-link"
                onClick={(e) => handleGroupClick(group.id, e)}
              >
                {group.arabicName}
              </span>
              {index < memberGroups.length - 1 && ', '}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default PersonCard;
