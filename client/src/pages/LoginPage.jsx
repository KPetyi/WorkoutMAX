import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // Kivesszük a login függvényt a globális Contextből
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        //BELÉPÉS (Az AuthContext-en keresztül, hogy frissüljön a globális állapot)
        await login(email, password);
        alert("Sikeres bejelentkezés!");
        navigate('/');
      } else {
        //REGISZTRÁCIÓ
        await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
        alert("Sikeres regisztráció! Most már beléphetsz.");
        setIsLogin(true);
      }
    } catch (err) {
      // Megjelenítjük a backendtől kapott hibaüzenetet
      alert(err.response?.data?.message || err.response?.data?.msg || "Valami hiba történt!");
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: 'white' }}>
      <div>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          {isLogin ? 'Bejelentkezés' : 'Regisztráció'}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Felhasználónév</label>
              <input
                type="text"
                placeholder="Add meg a neved"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              />
            </div>
          )}

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
            <input
              type="email"
              placeholder="email@pelda.hu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Jelszó</label>
            <input
              type="password"
              placeholder="Jelszó"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>

          <button type="submit" className="btn" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
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