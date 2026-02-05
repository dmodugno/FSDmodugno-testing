import LeftNavigation from './LeftNavigation';

export default function LeftSidebarB({ isCollapsed, currentPage, onPageChange, onToggleSidebar }) {
  return (
    <LeftNavigation
      isCollapsed={isCollapsed}
      onToggleSidebar={onToggleSidebar}
      currentPage={currentPage}
      onPageChange={onPageChange}
      showHeader={false}
    />
  );
}
