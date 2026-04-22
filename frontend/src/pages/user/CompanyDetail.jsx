import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCompanyById } from '../../services/companyService';
import { getAllJobs } from '../../services/jobService';
import '../../styles/CompanyDetail.css';

export default function CompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [companyJobs, setCompanyJobs] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchCompanyData = async () => {
      setLoading(true);
      try {
        const companyData = await getCompanyById(id);
        setCompany(companyData);
        
        // lấy danh sách việc làm
        const allJobsRes = await getAllJobs();
        const rawJobs = Array.isArray(allJobsRes.data) ? allJobsRes.data : [];

        // LỌC THEO TÊN CÔNG TY (tenCongTy)
        const filtered = rawJobs.filter(job => {
          const jobCompanyName = (job.tenCongTy || '').trim().toLowerCase();
          const currentCompanyName = (companyData.tenCongTy || '').trim().toLowerCase();
          
          return jobCompanyName === currentCompanyName && currentCompanyName !== '';
        });

        setCompanyJobs(filtered);
      } catch (err) {
        console.error("Lỗi tải chi tiết công ty:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyData();
  }, [id]);

  if (loading) return <div className="loading">Đang tải thông tin...</div>;
  if (!company) return <div className="error">Không tìm thấy công ty!</div>;

  return (
    <div className="cd-page-wrapper">
      {/* 1. Header Banner (Màu xám nhạt) */}
      <header className="cd-header-banner">
        <div className="cd-container cd-header-content">
          <div className="cd-logo">
            {company.logo ? (
              <img src={company.logo} alt={company.tenCongTy} />
            ) : (
              <span>{company.tenCongTy?.charAt(0)}</span>
            )}
          </div>
          <div className="cd-info-main">
            <h1 className="cd-name">{company.tenCongTy}</h1>
            <p className="cd-group">Cập nhật từ hệ thống</p>
            <div className="cd-meta">
              <span>📍 Trụ sở chính: Việt Nam</span>
              <span>Lĩnh vực: Đa ngành nghề</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Content (Hai cột) */}
      <div className="cd-container cd-main-grid">
        {/* Cột trái (Chính) */}
        <div className="cd-left-col">
          {/* Việc đang tuyển */}
          <section className="cd-section">
            <h2 className="cd-section-title">Việc đang tuyển ({companyJobs.length})</h2>
            <div className="cd-job-list">
              {companyJobs.length > 0 ? (
                companyJobs.map(job => (
                  <div key={job.maViecLam} className="cd-job-item" onClick={() => navigate(`/jobs/${job.maViecLam}`)}>
                    <div className="cd-job-logo">
                      {company.logo ? <img src={company.logo} alt="" /> : <span>{company.tenCongTy?.charAt(0)}</span>}
                    </div>
                    <div className="cd-job-info-brief">
                      <h4>{job.tieuDe}</h4>
                      <div className="cd-job-meta">
                        <span className="salary">
                          💰 {job.luongToiThieu?.toLocaleString()} - {job.luongToiDa?.toLocaleString()} VNĐ
                        </span>
                        <span className="location">📍 {job.diaDiem || 'Bình Dương'}</span>
                      </div>
                      <div className="cd-job-tags">
                        <span className="tag">Full-time</span>
                        <span className="tag">Mới đăng</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="cd-no-jobs">Hiện công ty chưa có vị trí tuyển dụng nào.</p>
              )}
            </div>
          </section>

          {/* Giới thiệu công ty */}
          <section className="cd-section">
            <h2 className="cd-section-title">Giới thiệu công ty</h2>
            <div className="cd-description">{company.moTa || "Chưa có mô tả chi tiết."}</div>
          </section>
        </div>

        {/* Cột phải (Sidebar) */}
        <aside className="cd-right-col">
          <div className="cd-sidebar-card">
            <h3 className="cd-sidebar-title">Thông tin công ty</h3>
            <ul className="cd-sidebar-list">
              <li> Tầng 10, tòa nhà Viglacera... (Cập nhật từ hệ thống)</li>
              <li><a href={company.website} target="_blank" rel="noreferrer">{company.website}</a></li>
              <li>50-100 cán bộ/nhân viên</li>
              <li> Danh sách chi nhánh: Cập nhật từ hệ thống</li>
            </ul>
          </div>
          <div className="cd-sidebar-card">
            <h3 className="cd-sidebar-title">Chính sách & Phúc lợi</h3>
            <ul className="cd-policy-list">
              <li>
                <span className="policy-icon"></span>
                <span>Được hưởng bảo hiểm sức khỏe.</span>
              </li>
              <li>
                <span className="policy-icon"></span>
                <span>Được hưởng bảo hiểm xã hội.</span>
              </li>
              <li>
                <span className="policy-icon"></span>
                <span>Lương thưởng và các chế độ đãi ngộ khác theo quy định công ty.</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}