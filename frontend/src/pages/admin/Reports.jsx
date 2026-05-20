import React, { useState } from 'react';
import { FaExclamationTriangle, FaEye, FaCheck, FaTimes, FaFilter } from 'react-icons/fa';
import '../../styles/admin.css';

// Mock data báo cáo vi phạm
const mockReports = [
  {
    id: 1,
    type: 'job',
    targetId: 'VL001',
    targetTitle: 'Tuyển Frontend Developer - Lương cao',
    reason: 'Thông tin lương không đúng sự thật',
    reportedBy: 'Nguyễn Văn A',
    reportedAt: '2026-05-20T10:30:00',
    status: 'pending',
    description: 'Công ty đăng lương 30-50 triệu nhưng thực tế chỉ trả 15 triệu'
  },
  {
    id: 2,
    type: 'company',
    targetId: 'CT002',
    targetTitle: 'Công ty TNHH ABC',
    reason: 'Lừa đảo, không trả lương',
    reportedBy: 'Trần Thị B',
    reportedAt: '2026-05-22T14:20:00',
    status: 'pending',
    description: 'Công ty này đã không trả lương cho nhân viên 3 tháng liên tiếp'
  },
  {
    id: 3,
    type: 'job',
    targetId: 'VL003',
    targetTitle: 'Tuyển Marketing Manager',
    reason: 'Nội dung không phù hợp',
    reportedBy: 'Lê Văn C',
    reportedAt: '2026-05-23T09:15:00',
    status: 'resolved',
    description: 'Tin tuyển dụng có nội dung phân biệt giới tính'
  },
  {
    id: 4,
    type: 'user',
    targetId: 'ND004',
    targetTitle: 'Người dùng: fake_recruiter@gmail.com',
    reason: 'Giả mạo nhà tuyển dụng',
    reportedBy: 'Phạm Thị D',
    reportedAt: '2026-05-24T16:45:00',
    status: 'rejected',
    description: 'Tài khoản này giả mạo là nhà tuyển dụng để lấy thông tin cá nhân'
  },
  {
    id: 5,
    type: 'job',
    targetId: 'VL005',
    targetTitle: 'Tuyển Nhân viên kinh doanh',
    reason: 'Spam, đăng trùng lặp',
    reportedBy: 'Hoàng Văn E',
    reportedAt: '2026-05-25T11:00:00',
    status: 'pending',
    description: 'Công ty đăng cùng 1 tin tuyển dụng 10 lần trong 1 ngày'
  },
];

const Reports = () => {
  const [reports] = useState(mockReports);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleViewDetail = (report) => {
    setSelectedReport(report);
    setShowDetailModal(true);
  };

  const handleResolve = (reportId) => {
    if (window.confirm('Xác nhận đã xử lý vi phạm này?')) {
      alert(`Đã đánh dấu báo cáo #${reportId} là đã xử lý`);
      // Ở đây sẽ gọi API để cập nhật status
    }
  };

  const handleReject = (reportId) => {
    const reason = window.prompt('Nhập lý do từ chối báo cáo:');
    if (reason) {
      alert(`Đã từ chối báo cáo #${reportId}`);
      // Ở đây sẽ gọi API để cập nhật status
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="status-badge" style={{ background: '#ffc107', color: '#fff' }}>Chờ xử lý</span>;
      case 'resolved':
        return <span className="status-badge active">Đã xử lý</span>;
      case 'rejected':
        return <span className="status-badge" style={{ background: '#f44336', color: '#fff' }}>Đã từ chối</span>;
      default:
        return <span className="status-badge">Không xác định</span>;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'job':
        return <span style={{ color: '#1e73d9', fontWeight: '500' }}>💼 Việc làm</span>;
      case 'company':
        return <span style={{ color: '#f39c12', fontWeight: '500' }}>🏢 Công ty</span>;
      case 'user':
        return <span style={{ color: '#e74c3c', fontWeight: '500' }}>👤 Người dùng</span>;
      default:
        return <span>❓ Khác</span>;
    }
  };

  // Filter reports
  const filteredReports = reports.filter(report => {
    const matchStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchType = filterType === 'all' || report.type === filterType;
    return matchStatus && matchType;
  });

  // Statistics
  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'pending').length,
    resolved: reports.filter(r => r.status === 'resolved').length,
    rejected: reports.filter(r => r.status === 'rejected').length,
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <h2 style={{ fontWeight: 'normal', color: '#333', margin: 0 }}>
          <FaExclamationTriangle style={{ color: '#f39c12', marginRight: '10px' }} />
          Báo cáo & Vi phạm
        </h2>
      </div>

      {/* Statistics Cards */}
      <div className="dashboard-grid" style={{ marginBottom: '20px' }}>
        <div className="stat-card" style={{ background: '#3c8dbc' }}>
          <div className="inner" style={{ color: '#fff' }}>
            <h3 style={{ color: '#fff' }}>{stats.total}</h3>
            <p style={{ color: '#fff' }}>Tổng báo cáo</p>
          </div>
        </div>
        <div className="stat-card" style={{ background: '#ffc107' }}>
          <div className="inner" style={{ color: '#fff' }}>
            <h3 style={{ color: '#fff' }}>{stats.pending}</h3>
            <p style={{ color: '#fff' }}>Chờ xử lý</p>
          </div>
        </div>
        <div className="stat-card" style={{ background: '#00a65a' }}>
          <div className="inner" style={{ color: '#fff' }}>
            <h3 style={{ color: '#fff' }}>{stats.resolved}</h3>
            <p style={{ color: '#fff' }}>Đã xử lý</p>
          </div>
        </div>
        <div className="stat-card" style={{ background: '#dd4b39' }}>
          <div className="inner" style={{ color: '#fff' }}>
            <h3 style={{ color: '#fff' }}>{stats.rejected}</h3>
            <p style={{ color: '#fff' }}>Đã từ chối</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="dashboard-panel" style={{ marginBottom: '20px', padding: '20px' }}>
        <div style={{ display: 'flex', gap: 15, alignItems: 'center', flexWrap: 'wrap' }}>
          <FaFilter style={{ color: '#666' }} />
          <span style={{ fontWeight: '500', color: '#333' }}>Lọc:</span>
          
          <select 
            className="input" 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ width: '200px' }}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="resolved">Đã xử lý</option>
            <option value="rejected">Đã từ chối</option>
          </select>

          <select 
            className="input" 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            style={{ width: '200px' }}
          >
            <option value="all">Tất cả loại</option>
            <option value="job">Việc làm</option>
            <option value="company">Công ty</option>
            <option value="user">Người dùng</option>
          </select>

          <span style={{ color: '#666', fontSize: '14px', marginLeft: 'auto' }}>
            Hiển thị <strong>{filteredReports.length}</strong> / {reports.length} báo cáo
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="dashboard-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>ID</th>
              <th>Loại</th>
              <th>Đối tượng</th>
              <th>Lý do</th>
              <th>Người báo cáo</th>
              <th>Thời gian</th>
              <th>Trạng thái</th>
              <th style={{ width: '180px' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', color: '#888', padding: '40px' }}>
                  Không có báo cáo nào.
                </td>
              </tr>
            ) : (
              filteredReports.map((report) => (
                <tr key={report.id}>
                  <td>#{report.id}</td>
                  <td>{getTypeBadge(report.type)}</td>
                  <td>
                    <strong style={{ color: '#d32f2f' }}>{report.targetTitle}</strong>
                    <br />
                    <small style={{ color: '#999' }}>ID: {report.targetId}</small>
                  </td>
                  <td>{report.reason}</td>
                  <td>{report.reportedBy}</td>
                  <td style={{ fontSize: '13px', color: '#666' }}>{formatDate(report.reportedAt)}</td>
                  <td>{getStatusBadge(report.status)}</td>
                  <td>
                    <div className="action-buttons" style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      <button 
                        className="block-btn" 
                        onClick={() => handleViewDetail(report)}
                        style={{ padding: '6px 10px', fontSize: '12px' }}
                        title="Xem chi tiết"
                      >
                        <FaEye />
                      </button>
                      {report.status === 'pending' && (
                        <>
                          <button 
                            className="block-btn block-add" 
                            onClick={() => handleResolve(report.id)}
                            style={{ padding: '6px 10px', fontSize: '12px' }}
                            title="Đã xử lý"
                          >
                            <FaCheck />
                          </button>
                          <button 
                            className="block-btn" 
                            onClick={() => handleReject(report.id)}
                            style={{ padding: '6px 10px', fontSize: '12px', background: '#ff9800' }}
                            title="Từ chối"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedReport && (
        <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>Chi tiết báo cáo #{selectedReport.id}</h3>
              <button 
                className="block-btn block-delete" 
                onClick={() => setShowDetailModal(false)}
                style={{ padding: '8px 16px' }}
              >
                ✕ Đóng
              </button>
            </div>

            <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
              <div style={{ marginBottom: '15px' }}>
                <strong>Loại:</strong> {getTypeBadge(selectedReport.type)}
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>Đối tượng bị báo cáo:</strong>
                <div style={{ marginTop: '5px', color: '#d32f2f', fontWeight: '500' }}>
                  {selectedReport.targetTitle}
                </div>
                <small style={{ color: '#999' }}>ID: {selectedReport.targetId}</small>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>Lý do:</strong> {selectedReport.reason}
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>Người báo cáo:</strong> {selectedReport.reportedBy}
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>Thời gian:</strong> {formatDate(selectedReport.reportedAt)}
              </div>
              <div>
                <strong>Trạng thái:</strong> {getStatusBadge(selectedReport.status)}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ borderLeft: '4px solid #f39c12', paddingLeft: '12px', marginBottom: '15px' }}>
                Mô tả chi tiết
              </h4>
              <p style={{ lineHeight: '1.8', color: '#555', background: '#fff', padding: '15px', borderRadius: '4px' }}>
                {selectedReport.description}
              </p>
            </div>

            {selectedReport.status === 'pending' && (
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                <button 
                  className="block-btn block-add" 
                  onClick={() => {
                    handleResolve(selectedReport.id);
                    setShowDetailModal(false);
                  }}
                >
                  <FaCheck style={{ marginRight: '5px' }} /> Đánh dấu đã xử lý
                </button>
                <button 
                  className="block-btn" 
                  onClick={() => {
                    handleReject(selectedReport.id);
                    setShowDetailModal(false);
                  }}
                  style={{ background: '#ff9800' }}
                >
                  <FaTimes style={{ marginRight: '5px' }} /> Từ chối báo cáo
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
