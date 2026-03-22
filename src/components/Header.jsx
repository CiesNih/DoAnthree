import { Link } from 'react-router-dom';
import '../styles/Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>💼 JobManager</h1>
        </div>
        <nav className="nav">
          <Link to="/" className="nav-link">🏠 Trang Chủ</Link>
          <Link to="/candidates" className="nav-link">👥 Ứng Viên</Link>
          <Link to="/test-api" className="nav-link">🔧 Test API</Link>
        </nav>
      </div>
    </header>
  );
}