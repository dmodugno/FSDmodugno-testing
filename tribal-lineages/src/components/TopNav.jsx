import { Link } from 'react-router-dom';

function TopNav() {
  return (
    <nav className="top-nav">
      <div className="nav-container">
        <Link to="/" className="nav-brand">Tribal Genealogy</Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/individual/P1" className="nav-link">Individual View</Link>
          <Link to="/group/G3" className="nav-link">Group View</Link>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
