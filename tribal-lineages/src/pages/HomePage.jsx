import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="page-container fade-in">
      <div className="home-page">
        <h1>Tribal Genealogy System</h1>
        <p className="home-subtitle">Explore family trees and group hierarchies</p>

        <div className="home-actions">
          <Link to="/individual/P1" className="home-action-card">
            <div className="action-icon">👤</div>
            <h3>Individual View</h3>
            <p>Browse family pedigree trees</p>
          </Link>

          <Link to="/group/G3" className="home-action-card">
            <div className="action-icon">🏛️</div>
            <h3>Group View</h3>
            <p>Explore tribal hierarchies</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
