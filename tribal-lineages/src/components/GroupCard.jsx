import { useNavigate } from 'react-router-dom';
import { getPersonById, getAggregatedMemberCount, getAllDescendantGroupIds, getGroupById } from '../utils/dataUtils';

function GroupCard({ group, isHighlighted = false }) {
  const navigate = useNavigate();
  const aggregatedCount = getAggregatedMemberCount(group.id);

  const handleMembersClick = (e) => {
    e.stopPropagation();

    // Collect all member IDs from current group and descendants
    const descendantGroupIds = getAllDescendantGroupIds(group.id);
    const allMemberIds = new Set();

    // Add members from current group
    group.memberPersonIds.forEach(id => allMemberIds.add(id));

    // Add members from all descendant groups
    descendantGroupIds.forEach(descendantId => {
      const descendantGroup = getGroupById(descendantId);
      if (descendantGroup) {
        descendantGroup.memberPersonIds.forEach(id => allMemberIds.add(id));
      }
    });

    if (allMemberIds.size === 0) return;

    // Find root candidates: people whose father is null or not in the aggregated set
    const memberIds = Array.from(allMemberIds);
    const rootCandidates = memberIds.filter(id => {
      const person = getPersonById(id);
      return person && (!person.fatherId || !allMemberIds.has(person.fatherId));
    });

    if (rootCandidates.length === 0) return;

    // Helper: Calculate descendant chain length within the aggregated set
    const getDescendantChainLength = (personId, visited = new Set()) => {
      if (visited.has(personId)) return 0;
      visited.add(personId);

      // Find children within the aggregated set
      const children = memberIds.filter(id => {
        const person = getPersonById(id);
        return person && person.fatherId === personId;
      });

      if (children.length === 0) return 0;

      // Return 1 + max chain length of children
      const childChainLengths = children.map(childId => getDescendantChainLength(childId, visited));
      return 1 + Math.max(...childChainLengths);
    };

    // Find root with longest descendant chain
    let selectedRoot = rootCandidates[0];
    let maxChainLength = getDescendantChainLength(selectedRoot);

    for (let i = 1; i < rootCandidates.length; i++) {
      const candidateId = rootCandidates[i];
      const chainLength = getDescendantChainLength(candidateId);

      if (chainLength > maxChainLength || (chainLength === maxChainLength && candidateId < selectedRoot)) {
        selectedRoot = candidateId;
        maxChainLength = chainLength;
      }
    }

    // Navigate to the selected root ancestor with group context
    const rootPerson = getPersonById(selectedRoot);
    if (rootPerson) {
      navigate(`/individual/${rootPerson.id}?groupId=${group.id}`);
    }
  };

  return (
    <div className={`group-card ${isHighlighted ? 'highlighted' : ''}`}>
      <div className="group-badge">
        <div className="badge-circle">{group.id.toUpperCase()}</div>
        <div className="group-classification-badge">{group.classification}</div>
      </div>

      <div className="group-names">
        <div className="group-name-arabic">{group.arabicName}</div>
        <div className="group-name-latin">({group.latinName})</div>
      </div>

      {aggregatedCount > 0 && (
        <div className="group-members-link" onClick={handleMembersClick}>
          {aggregatedCount} Individual{aggregatedCount !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}

export default GroupCard;
