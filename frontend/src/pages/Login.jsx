import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('login', { email, password });
    navigate('/'); 
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Đăng nhập</h2>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <label>Mật khẩu</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="auth-btn" type="submit">Đăng nhập</button>
        <p className="auth-switch">Chưa có tài khoản? <span onClick={() => navigate('/register')}>Đăng ký</span></p>
      </form>
    </div>
  );
}