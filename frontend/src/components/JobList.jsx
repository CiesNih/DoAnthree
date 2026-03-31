import { useEffect, useState } from 'react';
import { getAllJobs } from '../services/jobService'; 

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllJobs()
      .then(res => {
        setJobs(res.data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Đang tải danh sách việc làm...</p>;
  if (error) return <p style={{ color: 'red' }}>Lỗi: {error}</p>;

  return (
    <div className="job-list-table">
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#2d56a1', color: '#fff' }}>
            <th style={{ border: '1px solid #ddd', padding: '12px' }}>Tên Công Việc</th>
            <th style={{ border: '1px solid #ddd', padding: '12px' }}>Công Ty</th>
            <th style={{ border: '1px solid #ddd', padding: '12px' }}>Lương</th>
            <th style={{ border: '1px solid #ddd', padding: '12px' }}>Địa Điểm</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.maViecLam} style={{ textAlign: 'center' }}>
              <td style={{ border: '1px solid #ddd', padding: '10px', color: '#d32f2f', fontWeight: 'bold' }}>
                {job.tenViecLam}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{job.tenCongTy}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px', color: '#28a745' }}>{job.mucLuong}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{job.diaChi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}