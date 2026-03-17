import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllCandidates } from '../services/candidateService';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    candidates: 0,
    jobs: 0,
  });

  useEffect(() => {
    getAllCandidates()
      .then(res => {
        setStats(prev => ({
          ...prev,
          candidates: res.data.length
        }));
      })
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Quản Lý Việc Làm & Ứng Viên</h1>
          <p className="hero-subtitle">
            Nền tảng toàn diện giúp bạn quản lý hồ sơ, đơn ứng tuyển và theo dõi cơ hội việc làm một cách hiệu quả
          </p>
          
          <div className="hero-buttons">
            <button 
              className="btn-primary"
              onClick={() => navigate('/candidates')}
            >
              Xem Danh Sách Ứng Viên →
            </button>
            <button className="btn-secondary">
              Tìm Hiểu Thêm
            </button>
          </div>

          <div className="hero-image">
            <div className="illustration">
              <div className="illustration-card">
                <span className="card-icon">👤</span>
                <p>Ứng Viên</p>
                <p className="card-count">{stats.candidates}</p>
              </div>
              <div className="illustration-card">
                <span className="card-icon">💼</span>
                <p>Việc Làm</p>
                <p className="card-count">∞</p>
              </div>
              <div className="illustration-card">
                <span className="card-icon">✉️</span>
                <p>Đơn Ứng Tuyển</p>
                <p className="card-count">Unlimited</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="features-container">
          <h2>Các Tính Năng Chính</h2>
          <p className="section-subtitle">Tất cả những gì bạn cần để quản lý việc làm</p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Quản Lý Ứng Viên</h3>
              <p>Lưu trữ, tìm kiếm và quản lý thông tin ứng viên một cách tập trung và dễ dàng</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📄</div>
              <h3>Hệ Thống Hồ Sơ</h3>
              <p>Tổ chức hồ sơ chi tiết, theo dõi kinh nghiệm và kỹ năng của từng ứng viên</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">✉️</div>
              <h3>Quản Lý Đơn Ứng Tuyển</h3>
              <p>Theo dõi tất cả đơn ứng tuyển và cập nhật tình trạng từng đơn</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Tìm Kiếm Nâng Cao</h3>
              <p>Tìm ứng viên nhanh chóng theo nhiều tiêu chí khác nhau</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Phân Tích Dữ Liệu</h3>
              <p>Xem thống kê chi tiết về các đơn ứng tuyển và tỷ lệ thành công</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Bảo Mật Cao</h3>
              <p>Bảo vệ thông tin ứng viên với các tiêu chuẩn bảo mật quốc tế</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics" id="stats">
        <div className="stats-container">
          <h2>Thống Kê Hệ Thống</h2>
          <p className="section-subtitle">Dữ liệu thực tế từ nền tảng của chúng tôi</p>

          <div className="stats-grid">
            <div className="stat-item">
              <h3>{stats.candidates}</h3>
              <p>Ứng Viên Đã Đăng Ký</p>
              <div className="stat-bar">
                <div className="stat-fill" style={{width: '75%'}}></div>
              </div>
            </div>

            <div className="stat-item">
              <h3>500+</h3>
              <p>Công Ty Đối Tác</p>
              <div className="stat-bar">
                <div className="stat-fill" style={{width: '85%'}}></div>
              </div>
            </div>

            <div className="stat-item">
              <h3>10K+</h3>
              <p>Việc Làm Có Sẵn</p>
              <div className="stat-bar">
                <div className="stat-fill" style={{width: '90%'}}></div>
              </div>
            </div>

            <div className="stat-item">
              <h3>95%</h3>
              <p>Tỷ Lệ Thành Công</p>
              <div className="stat-bar">
                <div className="stat-fill" style={{width: '95%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Bắt Đầu Quản Lý Ngay Hôm Nay</h2>
          <p>Đơn giản, hiệu quả và nhanh chóng</p>
          
          <div className="cta-buttons">
            <button 
              className="btn-primary"
              onClick={() => navigate('/candidates')}
            >
              Truy Cập Hệ Thống
            </button>
            <button className="btn-secondary">Xem Demo</button>
          </div>

          <div className="cta-features">
            <span>✓ Không cần cài đặt</span>
            <span>✓ Sử dụng ngay lập tức</span>
            <span>✓ Hỗ trợ 24/7</span>
          </div>
        </div>
      </section>
    </div>
  );
}