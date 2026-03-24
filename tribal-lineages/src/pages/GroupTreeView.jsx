import { useParams } from 'react-router-dom';
import { getGroupById } from '../utils/dataUtils';
import GroupNode from '../components/GroupNode';

function GroupTreeView() {
  const { groupId } = useParams();
  const group = getGroupById(groupId);

  if (!group) {
    return <div className="page-container"><div className="error">Group not found</div></div>;
  }

  return (
    <div className="page-container fade-in">
      <div className="group-tree">
        <GroupNode group={group} isRoot={true} />
      </div>
    </div>
  );
}

export default GroupTreeView;
