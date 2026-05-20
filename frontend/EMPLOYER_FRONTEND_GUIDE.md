# 🏢 Hướng Dẫn Frontend Nhà Tuyển Dụng

## ✅ ĐÃ TẠO

### **1. Services**
- ✅ `src/services/employerService.js` - API calls cho NTD

### **2. Layout**
- ✅ `src/layouts/EmployerLayout.jsx` - Layout với sidebar

### **3. Pages**
- ✅ `src/pages/employer/Dashboard.jsx` - Tổng quan
- ✅ `src/pages/employer/JobManagement.jsx` - Quản lý tin tuyển dụng

### **4. Cần tạo tiếp**
- ⏳ `src/pages/employer/ApplicationManagement.jsx` - Quản lý đơn ứng tuyển
- ⏳ `src/pages/employer/InterviewManagement.jsx` - Lịch phỏng vấn
- ⏳ `src/pages/employer/CompanyProfile.jsx` - Hồ sơ công ty

---

## 📝 CODE MẪU CHO CÁC TRANG CÒN LẠI

### **ApplicationManagement.jsx** (Quản lý Đơn ứng tuyển)

```jsx
import React, { useState, useEffect } from 'react';
import { getDonUngTuyen, capNhatTrangThaiDon, taoLichPhongVan } from '../../services/employerService';

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState('');
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Form data cho lịch phỏng vấn
  const [interviewData, setInterviewData] = useState({
    thoiGian: '',
    thoiLuong: '60 phút',
    diaDiem: '',
    ghiChu: ''
  });

  useEffect(() => {
    // Lấy maViecLam từ URL query hoặc cho chọn
    const params = new URLSearchParams(window.location.search);
    const maViecLam = params.get('maViecLam');
    if (maViecLam) {
      setSelectedJob(maViecLam);
      fetchApplications(maViecLam);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchApplications = async (maViecLam, filters = {}) => {
    try {
      setLoading(true);
      const response = await getDonUngTuyen({
        maViecLam,
        ...filters
      });

      if (response.success) {
        setApplications(response.data.items);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Không thể tải danh sách đơn ứng tuyển!');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (maDon, newStatus) => {
    try {
      const response = await capNhatTrangThaiDon(maDon, {
        trangThai: newStatus
      });

      if (response.success) {
        alert('Cập nhật trạng thái thành công!');
        fetchApplications(selectedJob);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Không thể cập nhật trạng thái!');
    }
  };

  const handleOpenInterviewModal = (application) => {
    setSelectedApplication(application);
    setShowInterviewModal(true);
  };

  const handleCreateInterview = async (e) => {
    e.preventDefault();

    try {
      const response = await taoLichPhongVan({
        maDon: selectedApplication.maDonUngTuyen,
        ...interviewData
      });

      if (response.success) {
        alert('Tạo lịch phỏng vấn thành công!');
        setShowInterviewModal(false);
        fetchApplications(selectedJob);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert(error.message || 'Không thể tạo lịch phỏng vấn!');
    }
  };

  if (loading) {
    return <div className="loading-container">Đang tải...</div>;
  }

  if (!selectedJob) {
    return (
      <div className="admin-page-container">
        <h2>Vui lòng chọn tin tuyển dụng để xem đơn ứng tuyển</h2>
        <a href="/employer/jobs" className="btn-primary">
          Quay lại Quản lý Tin tuyển dụng
        </a>
      </div>
    );
  }

  return (
    <div className="admin-page-container">
      <h2>Quản lý Đơn ứng tuyển</h2>

      {/* Filters */}
      <div style={{ marginBottom: '20px' }}>
        <select 
          className="form-control" 
          style={{ maxWidth: '200px', display: 'inline-block' }}
          onChange={(e) => fetchApplications(selectedJob, { trangThai: e.target.value })}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="DaNop">Đơn mới</option>
          <option value="DaXem">Đã xem</option>
          <option value="PhongVan">Phỏng vấn</option>
          <option value="ChapNhan">Chấp nhận</option>
          <option value="TuChoi">Từ chối</option>
        </select>
      </div>

      {/* Table */}
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Ứng viên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Kinh nghiệm</th>
              <th>Ngày nộp</th>
              <th>Trạng thái</th>
              <th>CV</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                  Chưa có đơn ứng tuyển nào
                </td>
              </tr>
            ) : (
              applications.map(app => (
                <tr key={app.maDonUngTuyen}>
                  <td className="fw-bold">{app.hoTen}</td>
                  <td>{app.email}</td>
                  <td>{app.soDienThoai}</td>
                  <td>{app.soNamKinhNghiem || 'N/A'}</td>
                  <td>{new Date(app.ngayNop).toLocaleDateString('vi-VN')}</td>
                  <td>
                    <select
                      className="form-control"
                      value={app.trangThai || 'DaNop'}
                      onChange={(e) => handleStatusChange(app.maDonUngTuyen, e.target.value)}
                      style={{ minWidth: '120px' }}
                    >
                      <option value="DaNop">Đơn mới</option>
                      <option value="DaXem">Đã xem</option>
                      <option value="PhongVan">Phỏng vấn</option>
                      <option value="ChapNhan">Chấp nhận</option>
                      <option value="TuChoi">Từ chối</option>
                    </select>
                  </td>
                  <td>
                    {app.duongDanLuuTru ? (
                      <a href={app.duongDanLuuTru} target="_blank" rel="noopener noreferrer" className="text-link">
                        📄 Xem CV
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>
                    <button 
                      className="btn-primary" 
                      style={{ fontSize: '12px', padding: '4px 8px' }}
                      onClick={() => handleOpenInterviewModal(app)}
                      disabled={app.daCoLichPhongVan}
                    >
                      {app.daCoLichPhongVan ? '✅ Đã có lịch' : '📅 Tạo lịch PV'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal tạo lịch phỏng vấn */}
      {showInterviewModal && (
        <div className="modal-overlay" onClick={() => setShowInterviewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Tạo lịch phỏng vấn</h3>
            <p><strong>Ứng viên:</strong> {selectedApplication?.hoTen}</p>
            <form onSubmit={handleCreateInterview}>
              <div className="form-group">
                <label>Thời gian <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={interviewData.thoiGian}
                  onChange={(e) => setInterviewData({ ...interviewData, thoiGian: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Thời lượng</label>
                <input
                  type="text"
                  className="form-control"
                  value={interviewData.thoiLuong}
                  onChange={(e) => setInterviewData({ ...interviewData, thoiLuong: e.target.value })}
                  placeholder="60 phút"
                />
              </div>

              <div className="form-group">
                <label>Địa điểm</label>
                <input
                  type="text"
                  className="form-control"
                  value={interviewData.diaDiem}
                  onChange={(e) => setInterviewData({ ...interviewData, diaDiem: e.target.value })}
                  placeholder="Phòng họp A, Tầng 5"
                />
              </div>

              <div className="form-group">
                <label>Ghi chú</label>
                <textarea
                  className="form-control"
                  value={interviewData.ghiChu}
                  onChange={(e) => setInterviewData({ ...interviewData, ghiChu: e.target.value })}
                  rows="3"
                  placeholder="Mang theo CMND, bằng cấp..."
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowInterviewModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn-primary">
                  Tạo lịch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationManagement;
```

---

## 🔧 CẤU HÌNH ROUTES

Thêm vào `App.jsx`:

```jsx
import EmployerLayout from './layouts/EmployerLayout';
import Dashboard from './pages/employer/Dashboard';
import JobManagement from './pages/employer/JobManagement';
import ApplicationManagement from './pages/employer/ApplicationManagement';
// ... import các page khác

// Trong routes:
<Route path="/employer" element={<EmployerLayout />}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="jobs" element={<JobManagement />} />
  <Route path="applications" element={<ApplicationManagement />} />
  <Route path="interviews" element={<InterviewManagement />} />
  <Route path="company" element={<CompanyProfile />} />
</Route>
```

---

## 🎯 WORKFLOW SỬ DỤNG

### **1. Đăng nhập**
```
Login → Role: NhaTuyenDung → Redirect to /employer/dashboard
```

### **2. Cấu hình Mã Công Ty**
```
Dashboard → Nhập GUID công ty → Lưu vào localStorage
```

### **3. Quản lý Tin tuyển dụng**
```
/employer/jobs → Xem danh sách → Đăng tin mới / Sửa / Xóa
```

### **4. Xem Đơn ứng tuyển**
```
/employer/jobs → Click "X đơn" → Chuyển đến /employer/applications?maViecLam=xxx
→ Xem danh sách ứng viên → Xem CV → Cập nhật trạng thái
```

### **5. Tạo Lịch phỏng vấn**
```
/employer/applications → Click "Tạo lịch PV" → Nhập thông tin → Lưu
→ Trạng thái đơn tự động chuyển thành "PhongVan"
```

---

## 💡 TIPS QUAN TRỌNG

### **1. Xử lý GUID**
```javascript
// ✅ Đúng
const maCongTy = "abc-123-def-456-ghi";

// ❌ Sai
const maCongTy = 123; // Không phải GUID
```

### **2. Xử lý Boolean**
```javascript
// Database: bit (0/1)
// Frontend: boolean (true/false)

// ✅ Hiển thị
{job.daDuyet ? '✅ Đã duyệt' : '⏳ Chờ duyệt'}
```

### **3. Xử lý DateTime**
```javascript
// ✅ Gửi lên API
const date = new Date('2024-12-31').toISOString();

// ✅ Hiển thị
new Date(job.ngayDang).toLocaleDateString('vi-VN');
```

### **4. Authorization Header**
```javascript
// Luôn gửi token trong header
headers: {
  Authorization: `Bearer ${localStorage.getItem('token')}`
}
```

---

## 🚨 XỬ LÝ LỖI THƯỜNG GẶP

### **Lỗi 401 Unauthorized**
```javascript
// Nguyên nhân: Token hết hạn hoặc không hợp lệ
// Giải pháp: Redirect về trang login
if (error.response?.status === 401) {
  localStorage.removeItem('token');
  window.location.href = '/login';
}
```

### **Lỗi 400 Bad Request**
```javascript
// Nguyên nhân: Thiếu maCongTy hoặc dữ liệu không hợp lệ
// Giải pháp: Validate form trước khi submit
if (!maCongTy) {
  alert('Vui lòng cấu hình Mã Công Ty!');
  return;
}
```

---

## 📞 SUPPORT

Nếu gặp vấn đề:
1. Check console log
2. Check Network tab (F12)
3. Verify token còn hạn
4. Verify maCongTy đúng format GUID

---

**Status:** ✅ READY FOR DEVELOPMENT
**Version:** 1.0.0
