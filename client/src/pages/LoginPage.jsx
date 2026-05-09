// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // <-- Navigációhoz kell

  const handleLogin = (e) => {
    e.preventDefault(); // Megakadályozza az oldal újratöltését
    navigate('/dashboard'); // Átirányít a Dashboardra
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
      <div className="card">
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          {isLogin ? 'Bejelentkezés' : 'Regisztráció'}
        </h2>

        <form onSubmit={handleLogin}> {/* <-- Form küldésekor lefut a handleLogin */}
          {!isLogin && (
            <div className="form-group">
              <label>Név</label>
              <input type="text" placeholder="Add meg a neved" />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="email@pelda.hu" />
          </div>

          <div className="form-group">
            <label>Jelszó</label>
            <input type="password" placeholder="Jelszó" />
          </div>

          <button type="submit" className="btn" style={{ width: '100%' }}>
            {isLogin ? 'Belépek' : 'Regisztrálok'}
          </button>
        </form>

        <p
          style={{ textAlign: 'center', marginTop: '15px', color: '#007BFF', cursor: 'pointer' }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Nincs fiókod? Regisztrálj!' : 'Már van fiókod? Lépj be!'}
        </p>
      </div>
    </div>
  );
};

export default Login;