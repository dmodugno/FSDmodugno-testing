import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IndividualTreeView from './pages/IndividualTreeView';
import GroupMembersListView from './pages/GroupMembersListView';
import GroupTreeView from './pages/GroupTreeView';
import HomePage from './pages/HomePage';
import TopNav from './components/TopNav';
import './App.css';

function App() {
  return (
    <Router>
      <TopNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/individual/:personId" element={<IndividualTreeView />} />
        <Route path="/individual" element={<GroupMembersListView />} />
        <Route path="/group/:groupId" element={<GroupTreeView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
