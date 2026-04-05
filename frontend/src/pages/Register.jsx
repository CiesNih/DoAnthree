import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('register', { name, email, password });
    navigate('/login'); 
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Đăng ký</h2>
        <label>Họ & Tên</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <label>Mật khẩu</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="auth-btn" type="submit">Tạo tài khoản</button>
        <p className="auth-switch">Đã có tài khoản? <span onClick={() => navigate('/login')}>Đăng nhập</span></p>
      </form>
    </div>
  );
}