import React, { useState } from 'react';
import { FaSave, FaUndo } from 'react-icons/fa';
import '../../styles/admin.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    // Cài đặt chung
    siteName: 'Tìm Jobs cùng tôi',
    siteDescription: 'Nền tảng tìm việc làm hàng đầu Việt Nam',
    contactEmail: 'support@timjobs.vn',
    contactPhone: '1900-xxxx',
    
    // Cài đặt tuyển dụng
    autoApproveJobs: false,
    maxJobsPerEmployer: 50,
    jobExpiryDays: 30,
    
    // Cài đặt người dùng
    requireEmailVerification: true,
    allowGuestView: true,
    maxCVsPerUser: 10,
    
    // Cài đặt bảo mật
    sessionTimeout: 60,
    passwordMinLength: 8,
    enableTwoFactor: false,
    
    // Cài đặt thông báo
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  const [activeTab, setActiveTab] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    if (window.confirm('Lưu các thay đổi cài đặt?')) {
      // Ở đây sẽ gọi API để lưu settings
      console.log('Saving settings:', settings);
      alert('✅ Đã lưu cài đặt thành công!');
      setHasChanges(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Khôi phục cài đặt mặc định? Tất cả thay đổi sẽ bị mất.')) {
      // Reset về giá trị mặc định
      window.location.reload();
    }
  };

  const tabs = [
    { id: 'general', title: 'Cài đặt chung', icon: '⚙️' },
    { id: 'jobs', title: 'Tuyển dụng', icon: '💼' },
    { id: 'users', title: 'Người dùng', icon: '👥' },
    { id: 'security', title: 'Bảo mật', icon: '🔒' },
    { id: 'notifications', title: 'Thông báo', icon: '🔔' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontWeight: 'normal', color: '#333', margin: 0 }}>
          ⚙️ Cài đặt hệ thống
        </h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="block-btn" 
            onClick={handleReset}
            style={{ background: '#f3f4f6', color: '#333' }}
          >
            <FaUndo style={{ marginRight: '5px' }} /> Khôi phục mặc định
          </button>
          <button 
            className="block-btn block-add" 
            onClick={handleSave}
            disabled={!hasChanges}
            style={{ opacity: hasChanges ? 1 : 0.5 }}
          >
            <FaSave style={{ marginRight: '5px' }} /> Lưu thay đổi
          </button>
        </div>
      </div>

      {hasChanges && (
        <div style={{ 
          background: '#fff3cd', 
          border: '1px solid #ffc107', 
          padding: '12px 20px', 
          borderRadius: '4px', 
          marginBottom: '20px',
          color: '#856404'
        }}>
          ⚠️ Bạn có thay đổi chưa lưu. Nhớ nhấn "Lưu thay đổi" để áp dụng.
        </div>
      )}

      {/* Tabs */}
      <div style={{ marginBottom: '20px', borderBottom: '2px solid #e0e0e0' }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 24px',
                border: 'none',
                background: activeTab === tab.id ? '#1e73d9' : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#666',
                cursor: 'pointer',
                borderRadius: '4px 4px 0 0',
                fontWeight: activeTab === tab.id ? '500' : 'normal',
                transition: 'all 0.3s'
              }}
            >
              {tab.icon} {tab.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="dashboard-panel" style={{ padding: '30px' }}>
        
        {/* General Settings */}
        {activeTab === 'general' && (
          <div>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Thông tin chung</h3>
            
            <div className="form-row" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Tên website</label>
              <input
                className="input"
                value={settings.siteName}
                onChange={(e) => handleInputChange('siteName', e.target.value)}
                style={{ width: '100%', maxWidth: '500px' }}
              />
            </div>

            <div className="form-row" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Mô tả website</label>
              <textarea
                className="input"
                value={settings.siteDescription}
                onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                rows="3"
                style={{ width: '100%', maxWidth: '500px' }}
              />
            </div>

            <div className="form-row" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email liên hệ</label>
              <input
                className="input"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                style={{ width: '100%', maxWidth: '500px' }}
              />
            </div>

            <div className="form-row" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Số điện thoại</label>
              <input
                className="input"
                value={settings.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                style={{ width: '100%', maxWidth: '500px' }}
              />
            </div>
          </div>
        )}

        {/* Jobs Settings */}
        {activeTab === 'jobs' && (
          <div>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Cài đặt tuyển dụng</h3>
            
            <div className="form-row" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.autoApproveJobs}
                  onChange={(e) => handleInputChange('autoApproveJobs', e.target.checked)}
                />
                <span style={{ fontWeight: '500' }}>Tự động duyệt tin tuyển dụng</span>
              </label>
              <small style={{ display: 'block', marginTop: '5px', color: '#666', marginLeft: '30px' }}>
                Tin tuyển dụng sẽ được đăng ngay lập tức mà không cần admin duyệt
              </small>
            </div>

            <div className="form-row" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Số lượng tin tối đa mỗi nhà tuyển dụng
              </label>
              <input
                className="input"
                type="number"
                value={settings.maxJobsPerEmployer}
                onChange={(e) => handleInputChange('maxJobsPerEmployer', parseInt(e.target.value))}
                style={{ width: '200px' }}
              />
            </div>

            <div className="form-row" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Thời gian hết hạn tin tuyển dụng (ngày)
              </label>
              <input
                className="input"
                type="number"
                value={settings.jobExpiryDays}
                onChange={(e) => handleInputChange('jobExpiryDays', parseInt(e.target.value))}
                style={{ width: '200px' }}
              />
              <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                Tin tuyển dụng sẽ tự động ẩn sau số ngày này
              </small>
            </div>
          </div>
        )}

        {/* Users Settings */}
        {activeTab === 'users' && (
          <div>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Cài đặt người dùng</h3>
            
            <div className="form-row" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.requireEmailVerification}
                  onChange={(e) => handleInputChange('requireEmailVerification', e.target.checked)}
                />
                <span style={{ fontWeight: '500' }}>Yêu cầu xác thực email</span>
              </label>
              <small style={{ display: 'block', marginTop: '5px', color: '#666', marginLeft: '30px' }}>
                Người dùng phải xác thực email trước khi sử dụng đầy đủ tính năng
              </small>
            </div>

            <div className="form-row" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.allowGuestView}
                  onChange={(e) => handleInputChange('allowGuestView', e.target.checked)}
                />
                <span style={{ fontWeight: '500' }}>Cho phép khách xem việc làm</span>
              </label>
              <small style={{ display: 'block', marginTop: '5px', color: '#666', marginLeft: '30px' }}>
                Người dùng chưa đăng nhập vẫn có thể xem danh sách việc làm
              </small>
            </div>

            <div className="form-row" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Số lượng CV tối đa mỗi người dùng
              </label>
              <input
                className="input"
                type="number"
                value={settings.maxCVsPerUser}
                onChange={(e) => handleInputChange('maxCVsPerUser', parseInt(e.target.value))}
                style={{ width: '200px' }}
              />
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Cài đặt bảo mật</h3>
            
            <div className="form-row" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Thời gian hết phiên đăng nhập (phút)
              </label>
              <input
                className="input"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
                style={{ width: '200px' }}
              />
              <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                Người dùng sẽ tự động đăng xuất sau thời gian không hoạt động
              </small>
            </div>

            <div className="form-row" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Độ dài mật khẩu tối thiểu
              </label>
              <input
                className="input"
                type="number"
                value={settings.passwordMinLength}
                onChange={(e) => handleInputChange('passwordMinLength', parseInt(e.target.value))}
                style={{ width: '200px' }}
              />
            </div>

            <div className="form-row" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.enableTwoFactor}
                  onChange={(e) => handleInputChange('enableTwoFactor', e.target.checked)}
                />
                <span style={{ fontWeight: '500' }}>Bật xác thực 2 yếu tố (2FA)</span>
              </label>
              <small style={{ display: 'block', marginTop: '5px', color: '#666', marginLeft: '30px' }}>
                Yêu cầu mã xác thực từ điện thoại khi đăng nhập
              </small>
            </div>
          </div>
        )}

        {/* Notifications Settings */}
        {activeTab === 'notifications' && (
          <div>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Cài đặt thông báo</h3>
            
            <div className="form-row" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                />
                <span style={{ fontWeight: '500' }}>Gửi thông báo qua Email</span>
              </label>
            </div>

            <div className="form-row" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                />
                <span style={{ fontWeight: '500' }}>Gửi thông báo qua SMS</span>
              </label>
            </div>

            <div className="form-row" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
                />
                <span style={{ fontWeight: '500' }}>Gửi thông báo đẩy (Push)</span>
              </label>
            </div>

            <div style={{ 
              background: '#e3f2fd', 
              border: '1px solid #2196f3', 
              padding: '15px', 
              borderRadius: '4px',
              marginTop: '30px'
            }}>
              <strong style={{ color: '#1976d2' }}>💡 Lưu ý:</strong>
              <p style={{ margin: '10px 0 0 0', color: '#555', lineHeight: '1.6' }}>
                Để sử dụng tính năng gửi Email và SMS, bạn cần cấu hình SMTP server và SMS gateway trong file cấu hình hệ thống.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
