import { useEffect, useState } from 'react';
import { getAllCandidates } from '../services/candidateService';

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllCandidates()
      .then(res => {
        setCandidates(res.data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p style={{ color: 'red' }}>Lỗi: {error}</p>;

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tiêu đề</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Địa chỉ</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Kinh nghiệm</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map(item => (
          <tr key={item.maUngVien}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.tieuDeHoSo}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.diaChi}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.soNamKinhNghiem} năm</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}