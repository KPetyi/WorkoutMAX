// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // 1. Ezt importálni kell!

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  // 2. State-ek az adatok tárolásához
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  // 1. Megadjuk az alap URL-t a környezeti változóból
  const baseUrl = import.meta.env.VITE_API_URL;

  // 2. Összerakjuk a teljes címet attól függően, hogy belépés vagy regisztráció van
  const url = isLogin
    ? `${baseUrl}/api/auth/login`
    : `${baseUrl}/api/auth/register`;

  const userData = isLogin
    ? { email, password }
    : { username, email, password };

  try {
    const res = await axios.post(url, userData);
    // ... a többi kód marad változatlan

      if (isLogin) {
        // Ha belépés van, elmentjük a tokent
        localStorage.setItem('token', res.data.token);
        alert("Sikeres bejelentkezés!");
        navigate('/dashboard');
      } else {
        // Ha regisztráció van, átváltunk a loginra
        alert("Sikeres regisztráció! Most már beléphetsz.");
        setIsLogin(true);
      }
    } catch (err) {
      // Megjelenítjük a backendtől kapott hibaüzenetet
      alert(err.response?.data?.message || "Valami hiba történt!");
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
      <div className="card">
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          {isLogin ? 'Bejelentkezés' : 'Regisztráció'}
        </h2>

        {/* 4. A handleSubmit-re cseréltük a handleLogin-t */}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Név</label>
              <input
                type="text"
                placeholder="Add meg a neved"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="email@pelda.hu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Jelszó</label>
            <input
              type="password"
              placeholder="Jelszó"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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