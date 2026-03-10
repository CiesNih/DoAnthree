import { useState } from 'react';
import { getAllCandidates, getCandidateById } from '../services/candidateService';

export default function TestAPI() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [id, setId] = useState('');

  const handleGetAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAllCandidates();
      setData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetById = async () => {
    if (!id) {
      setError('Vui lòng nhập ID');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await getCandidateById(id);
      setData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Test API UngVienAPI</h1>
      
      <button onClick={handleGetAll}>Get All UngVien</button>
      
      <div style={{ marginTop: '10px' }}>
        <input 
          type="text" 
          placeholder="Nhập ID" 
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={handleGetById}>Get By ID</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
