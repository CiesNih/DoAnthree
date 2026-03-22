import '../styles/Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3>📊 Thống Kê</h3>
        <ul>
          <li>📈 Tổng Quan</li>
          <li>👥 Ứng Viên</li>
          <li>📋 Việc Làm</li>
          <li>💼 Hồ Sơ</li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>⚙️ Cài Đặt</h3>
        <ul>
          <li>🎨 Giao Diện</li>
          <li>🔐 Bảo Mật</li>
          <li>📧 Thông Báo</li>
        </ul>
      </div>
    </aside>
  );
}