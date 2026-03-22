import { Link } from 'react-router-dom';
import '../styles/Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo-section">
          <Link to="/" className="logo-link">
            <span className="logo-icon">💼</span>
            <span className="logo-text">JobsGO</span>
          </Link>
        </div>

        {/* Menu chính */}
        <nav className="nav-menu">
          <div className="nav-item">
            <Link to="/jobs" className="nav-link">Việc làm <span>▼</span></Link>
          </div>
          <div className="nav-item">
            <Link to="/companies" className="nav-link">Công ty <span>▼</span></Link>
          </div>
          <div className="nav-item">
            <Link to="/candidates" className="nav-link">CV/Hồ sơ <span>▼</span></Link>
          </div>
          <div className="nav-item">
            <Link to="/tools" className="nav-link">Công cụ <span>▼</span></Link>
          </div>
          <div className="nav-item">
            <Link to="/blog" className="nav-link">Cẩm nang nghề nghiệp</Link>
          </div>
        </nav>

        {/* Nút hành động */}
        <div className="header-auth">
          <Link to="/register" className="btn-register">Đăng ký</Link>
          <Link to="/login" className="btn-login">Đăng nhập</Link>
          <Link to="/employer" className="btn-employer">NHÀ TUYỂN DỤNG</Link>
        </div>
      </div>
    </header>
  );
}