import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

// 1. Import Layouts (Đã sửa thành UserLayout cho khớp với tên file của bạn)
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// 2. Import Pages (Đã thêm đường dẫn /user/ cho khớp với thư mục của bạn)
import Home from './pages/user/Home';
import CandidateListPage from './pages/user/CandidateListPage';
import CompaniesPage from './pages/user/CompanyListPage';
import CompanyDetail from './pages/user/CompanyDetail';
import JobDetail from './pages/user/JobDetail';
import JobListPage from './pages/user/JobListPage';

// (Nếu bạn để TestAPI ở ngoài cùng thư mục pages thì giữ đường dẫn này)
import TestAPI from './pages/TestAPI'; 

// 3. Import Components
import ScrollToTop from './components/ScrollToTop';
import AuthModal from './components/AuthModal';
import './styles/App.css';

const AdminDashboard = () => <h1>Chào mừng đến với Bảng Điều Khiển Admin!</h1>;

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const openAuth = (mode = 'login') => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        setAuthMode(mode);
        setShowAuth(true);
      }, 80);
    } else {
      setAuthMode(mode);
      setShowAuth(true);
    }
  };

  const closeAuth = () => setShowAuth(false);

  return (
    <>
      <ScrollToTop />
      
      <Routes>
        {/* =========================================
            NHÁNH 1: DÀNH CHO USER
            Sử dụng UserLayout
        ========================================= */}
        <Route element={<UserLayout onOpenAuth={openAuth} />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobListPage />} />
          <Route path="/candidates" element={<CandidateListPage />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/companies/:id" element={<CompanyDetail />} />
        </Route>

        {/* =========================================
            NHÁNH 2: DÀNH CHO ADMIN
        ========================================= */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>

        {/* =========================================
            CÁC TRANG ĐỘC LẬP
        ========================================= */}
        <Route path="/test-api" element={<TestAPI />} />
      </Routes>

      {location.pathname === '/' && showAuth && (
        <AuthModal mode={authMode} onClose={closeAuth} />
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}