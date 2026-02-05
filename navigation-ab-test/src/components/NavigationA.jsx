import LeftNavigation from './LeftNavigation';

export default function NavigationA({ isCollapsed, onToggleCollapse, currentPage, onPageChange }) {
  return (
    <LeftNavigation
      isCollapsed={isCollapsed}
      onToggleSidebar={onToggleCollapse}
      currentPage={currentPage}
      onPageChange={onPageChange}
      showHeader={true}
    />
  );
}
