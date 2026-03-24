import { useState } from 'react';
import { getChildrenOfPerson } from '../utils/dataUtils';
import PersonCard from './PersonCard';
import TreeConnector from './TreeConnector';

function PersonNode({ person, isRoot = false, depth = 0, groupMemberIds = null }) {
  const children = getChildrenOfPerson(person.id);
  const hasChildren = children.length > 0;

  // Nodes with depth < 2 are expanded by default
  const [isExpanded, setIsExpanded] = useState(depth < 2);

  // Determine if person should be muted (not in group context)
  const isMuted = groupMemberIds !== null && !groupMemberIds.has(person.id);

  return (
    <div className="person-node">
      {/* Person Card */}
      <PersonCard person={person} isHighlighted={isRoot} isMuted={isMuted} />

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
            {children.map(child => (
              <PersonNode
                key={child.id}
                person={child}
                isRoot={false}
                depth={depth + 1}
                groupMemberIds={groupMemberIds}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonNode;
