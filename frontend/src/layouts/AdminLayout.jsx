import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f7f6' }}>
      {/* Thanh Sidebar bên trái dành cho Admin */}
      <aside style={{ width: '250px', background: '#1e293b', color: 'white', padding: '20px' }}>
        <h2>Admin Panel</h2>
        <ul style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
          <li><Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link></li>
          <li><Link to="/admin/jobs" style={{ color: 'white', textDecoration: 'none' }}>Quản lý Việc làm</Link></li>
          <li><Link to="/admin/users" style={{ color: 'white', textDecoration: 'none' }}>Quản lý Ứng viên</Link></li>
          <li><Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>← Về trang chủ</Link></li>
        </ul>
      </aside>

      {/* Nội dung trang quản trị nằm bên phải */}
      <main style={{ flex: 1, padding: '30px' }}>
        <Outlet />
      </main>
    </div>
  );
}