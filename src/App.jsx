import { useEffect, useState } from 'react';
import { getAllCandidates } from './services/candidateService';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllCandidates()
      .then(res => setCandidates(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h1>Danh sách ứng viên từ API</h1>
      <ul>
        {candidates.map(item => (
          <li key={item.id}>{item.fullName}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
