import { useState } from 'react';
import { getChildGroupsOfGroup } from '../utils/dataUtils';
import GroupCard from './GroupCard';
import TreeConnector from './TreeConnector';

function GroupNode({ group, isRoot = false, depth = 0 }) {
  const childGroups = getChildGroupsOfGroup(group.id);
  const hasChildren = childGroups.length > 0;

  // Nodes with depth < 1 are expanded by default
  const [isExpanded, setIsExpanded] = useState(depth < 1);

  return (
    <div className="group-node">
      {/* Group Card */}
      <GroupCard group={group} isHighlighted={isRoot} />

      {/* Chevron - only show if there are children */}
      {hasChildren && (
        <TreeConnector
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
          direction="down"
        />
      )}

      {/* Children - render recursively when expanded */}
      {hasChildren && isExpanded && (
        <div className="tree-level">
          <div className="cards-row">
            {childGroups.map(child => (
              <GroupNode key={child.id} group={child} isRoot={false} depth={depth + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupNode;
