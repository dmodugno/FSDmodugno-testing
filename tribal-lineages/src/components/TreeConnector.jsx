function TreeConnector({ isExpanded, onToggle, direction = 'down' }) {
  // Chevron points toward the content it controls
  // direction='up': controls content above (grandparents/parents)
  //   - collapsed: show ▲ (points up toward hidden content)
  //   - expanded: show ▼ (points away, indicating it will collapse up)
  // direction='down': controls content below (children/grandchildren)
  //   - collapsed: show ▼ (points down toward hidden content)
  //   - expanded: show ▲ (points away, indicating it will collapse down)

  let chevronIcon;
  if (direction === 'up') {
    chevronIcon = isExpanded ? '▼' : '▲';
  } else {
    chevronIcon = isExpanded ? '▲' : '▼';
  }

  return (
    <div className="tree-connector">
      {onToggle && (
        <button className="connector-chevron" onClick={onToggle} title={isExpanded ? 'Collapse' : 'Expand'}>
          {chevronIcon}
        </button>
      )}
    </div>
  );
}

export default TreeConnector;
