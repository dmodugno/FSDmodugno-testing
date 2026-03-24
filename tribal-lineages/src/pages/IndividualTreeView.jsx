import { useParams, useSearchParams } from 'react-router-dom';
import { getPersonById, getGroupById, getAllDescendantGroupIds } from '../utils/dataUtils';
import PersonNode from '../components/PersonNode';

function IndividualTreeView() {
  const { personId } = useParams();
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get('groupId');

  const person = getPersonById(personId);

  if (!person) {
    return <div className="page-container"><div className="error">Person not found</div></div>;
  }

  // Calculate aggregated members if viewing in group context
  let groupMemberIds = null;
  if (groupId) {
    const group = getGroupById(groupId);
    if (group) {
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

      groupMemberIds = allMemberIds;
    }
  }

  return (
    <div className="page-container fade-in">
      <div className="individual-tree">
        <PersonNode person={person} isRoot={true} groupMemberIds={groupMemberIds} />
      </div>
    </div>
  );
}

export default IndividualTreeView;
