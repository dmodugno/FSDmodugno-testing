import { useSearchParams } from 'react-router-dom';
import { getGroupById, getAllDescendantGroupIds, getPersonById } from '../utils/dataUtils';
import PersonCard from '../components/PersonCard';

function GroupMembersListView() {
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get('group');
  const group = getGroupById(groupId);

  if (!group) {
    return <div className="page-container"><div className="error">Group not found</div></div>;
  }

  // Get aggregated members from current group and all descendants
  const descendantGroupIds = getAllDescendantGroupIds(groupId);
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

  // Convert to person objects
  const members = Array.from(allMemberIds).map(id => getPersonById(id)).filter(Boolean);

  return (
    <div className="page-container fade-in">
      <div className="group-members-list">
        <div className="page-header">
          <h2>{group.arabicName}</h2>
          <p className="group-meta">
            {group.latinName} • {group.classification} • {members.length} أفراد
          </p>
        </div>

        <div className="members-grid">
          {members.map(person => (
            <PersonCard key={person.id} person={person} isClickable={true} />
          ))}
        </div>

        {members.length === 0 && (
          <div className="empty-state">لا يوجد أعضاء في هذه المجموعة</div>
        )}
      </div>
    </div>
  );
}

export default GroupMembersListView;
