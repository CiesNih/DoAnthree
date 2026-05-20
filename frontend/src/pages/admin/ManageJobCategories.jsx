import React, { useState, useEffect } from 'react';
import '../../styles/admin-categories.css'; // File CSS (mình để bên dưới)

// Mock data mẫu - sau này bạn sẽ lấy từ API 
const mockIndustries = [
  { maNganh: 1, tenNganh: 'IT - Phần mềm', ngayTao: '2026-01-15' },
  { maNganh: 2, tenNganh: 'Marketing / Truyền thông', ngayTao: '2026-01-16' },
  { maNganh: 3, tenNganh: 'Kế toán / Kiểm toán', ngayTao: '2026-02-01' },
  { maNganh: 4, tenNganh: 'Kinh doanh / Bán hàng', ngayTao: '2026-02-05' },
  { maNganh: 5, tenNganh: 'Nhân sự / Tuyển dụng', ngayTao: '2026-02-10' },
  { maNganh: 6, tenNganh: 'Thiết kế / Sáng tạo', ngayTao: '2026-02-15' },
];

const mockSkills = [
  { maKyNang: 101, tenKyNang: 'ReactJS', ngayTao: '2026-01-20' },
  { maKyNang: 102, tenKyNang: 'C# / .NET', ngayTao: '2026-01-20' },
  { maKyNang: 103, tenKyNang: 'Figma', ngayTao: '2026-03-10' },
  { maKyNang: 104, tenKyNang: 'Python', ngayTao: '2026-03-12' },
  { maKyNang: 105, tenKyNang: 'Java', ngayTao: '2026-03-15' },
  { maKyNang: 106, tenKyNang: 'SQL', ngayTao: '2026-03-18' },
];

const mockEducation = [
  { maHocVan: 201, tenHocVan: 'Trung học phổ thông', ngayTao: '2026-01-10' },
  { maHocVan: 202, tenHocVan: 'Trung cấp', ngayTao: '2026-01-10' },
  { maHocVan: 203, tenHocVan: 'Cao đẳng', ngayTao: '2026-01-10' },
  { maHocVan: 204, tenHocVan: 'Đại học', ngayTao: '2026-01-10' },
  { maHocVan: 205, tenHocVan: 'Thạc sĩ', ngayTao: '2026-01-10' },
  { maHocVan: 206, tenHocVan: 'Tiến sĩ', ngayTao: '2026-01-10' },
];

const mockJobTypes = [
  { maLoaiHinh: 301, tenLoaiHinh: 'Toàn thời gian', ngayTao: '2026-01-05' },
  { maLoaiHinh: 302, tenLoaiHinh: 'Bán thời gian', ngayTao: '2026-01-05' },
  { maLoaiHinh: 303, tenLoaiHinh: 'Thực tập', ngayTao: '2026-01-05' },
  { maLoaiHinh: 304, tenLoaiHinh: 'Remote', ngayTao: '2026-01-05' },
  { maLoaiHinh: 305, tenLoaiHinh: 'Freelance', ngayTao: '2026-01-05' },
];

export default function ManageJobCategories() {
  const [activeTab, setActiveTab] = useState('industry'); 
  const [loading, setLoading] = useState(false);
  
  // States cho từng danh mục
  const [industries] = useState(mockIndustries);
  const [skills] = useState(mockSkills);
  const [education] = useState(mockEducation);
  const [jobTypes] = useState(mockJobTypes);

  // States cho Modal Thêm/Sửa
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ ten: '' });


  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchDataByTab();
  }, [activeTab]);

  const fetchDataByTab = async () => {
    setLoading(true);
    
    await new Promise(r => setTimeout(r, 500)); 
    setLoading(false);
  };

  // 2. Logic Mở Modal Add/Edit
  const handleOpenAdd = () => {
    setIsEditing(false);
    setFormData({ ten: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setIsEditing(true);
    setEditId(item.maNganh || item.maKyNang); // Lấy khóa chính tương ứng
    setFormData({ ten: item.tenNganh || item.tenKyNang });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, ten: e.target.value });
  };

  // 3. Logic Submit Form (POST hoặc PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Đang ${isEditing ? 'Sửa' : 'Thêm'} ${activeTab}:`, formData, `ID: ${editId}`);
    
    // Ở ĐÂY GỌI API THẬT:
    // try {
    //    if (isEditing) { await updateCategoryApi(activeTab, editId, formData); }
    //    else { await createCategoryApi(activeTab, formData); }
    //    fetchDataByTab(); // Reload dữ liệu
    //    setShowModal(false);
    // } catch ...
    
    setShowModal(false);
    alert('Logic Thêm/Sửa Demo thành công!');
  };

  // 4. Logic Xóa
  const handleDelete = async (item) => {
    const id = item.maNganh || item.maKyNang;
    const name = item.tenNganh || item.tenKyNang;
    
    if (window.confirm(`Bạn có chắc chắn muốn xóa danh mục "${name}" không?`)) {
      console.log(`Đang Xóa ${activeTab} ID:`, id);
      // GỌI API XÓA THẬT:
      // await deleteCategoryApi(activeTab, id);
      // fetchDataByTab();
      alert('Logic Xóa Demo thành công!');
    }
  };

  // Định nghĩa các thẻ Tab
  const tabs = [
    { id: 'industry', title: 'Ngành nghề', icon: '💼' },
    { id: 'skill', title: 'Kỹ năng', icon: '⚡' },
    { id: 'education', title: 'Học vấn', icon: '🎓' }, 
    { id: 'type', title: 'Loại hình', icon: '📋' },
  ];

  return (
    <div className="admin-page-layout">
      
      {/* 1. Header & Tabs */}
      <div className="category-header">
        <h1>Quản lý Danh mục Việc làm</h1>
        <div className="tab-navigator">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.title}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Content Area */}
      <div className="category-content detail-card">
        <div className="action-bar mb-15 text-right">
          <button className="btn-primary" onClick={handleOpenAdd}>
            + Thêm {tabs.find(t=>t.id===activeTab).title} mới
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>Đang tải dữ liệu...</div>
        ) : (
          <table className="admin-table category-table">
            <thead>
              <tr>
                <th style={{width: '60px'}}>STT</th>
                <th>Tên Danh Mục</th>
                <th>Ngày Tạo</th>
                <th style={{width: '180px', textAlign: 'center'}}>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {activeTab === 'industry' && industries.map((item, index) => (
                <tr key={item.maNganh}>
                  <td>{index + 1}</td>
                  <td className="fw-bold">{item.tenNganh}</td>
                  <td>{new Date(item.ngayTao).toLocaleDateString()}</td>
                  <td className="action-cell">
                    <button className="text-btn edit-btn" onClick={() => handleOpenEdit(item)}>Sửa</button>
                    <button className="text-btn delete-btn" onClick={() => handleDelete(item)}>Xóa</button>
                  </td>
                </tr>
              ))}
              {activeTab === 'skill' && skills.map((item, index) => (
                <tr key={item.maKyNang}>
                  <td>{index + 1}</td>
                  <td className="fw-bold">{item.tenKyNang}</td>
                  <td>{new Date(item.ngayTao).toLocaleDateString()}</td>
                  <td className="action-cell">
                    <button className="text-btn edit-btn" onClick={() => handleOpenEdit(item)}>Sửa</button>
                    <button className="text-btn delete-btn" onClick={() => handleDelete(item)}>Xóa</button>
                  </td>
                </tr>
              ))}
              {activeTab === 'education' && education.map((item, index) => (
                <tr key={item.maHocVan}>
                  <td>{index + 1}</td>
                  <td className="fw-bold">{item.tenHocVan}</td>
                  <td>{new Date(item.ngayTao).toLocaleDateString()}</td>
                  <td className="action-cell">
                    <button className="text-btn edit-btn" onClick={() => handleOpenEdit(item)}>Sửa</button>
                    <button className="text-btn delete-btn" onClick={() => handleDelete(item)}>Xóa</button>
                  </td>
                </tr>
              ))}
              {activeTab === 'type' && jobTypes.map((item, index) => (
                <tr key={item.maLoaiHinh}>
                  <td>{index + 1}</td>
                  <td className="fw-bold">{item.tenLoaiHinh}</td>
                  <td>{new Date(item.ngayTao).toLocaleDateString()}</td>
                  <td className="action-cell">
                    <button className="text-btn edit-btn" onClick={() => handleOpenEdit(item)}>Sửa</button>
                    <button className="text-btn delete-btn" onClick={() => handleDelete(item)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 3. Modal Add/Edit */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content detail-card" style={{ maxWidth: '500px' }}>
            <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' }}>
              {isEditing ? 'Sửa' : 'Thêm'} {tabs.find(t=>t.id===activeTab).title}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-20">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Tên danh mục (*)</label>
                <input 
                  type="text" 
                  value={formData.ten} 
                  onChange={handleInputChange} 
                  required 
                  style={{ width: '100%', padding: '10px', border: '1px solid #dfe8f8', borderRadius: '4px' }}
                  placeholder={`VD: ${activeTab === 'skill' ? 'Python' : 'Du lịch'}`}
                />
              </div>
              <div className="modal-actions" style={{ textAlign: 'right', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                <button type="button" className="btn-secondary mr-10" onClick={() => setShowModal(false)}>Hủy</button>
                <button type="submit" className="btn-primary">Lưu dữ liệu</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}