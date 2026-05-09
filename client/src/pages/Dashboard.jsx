// src/pages/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Később ezeket az adatokat a backendről kapjuk majd!
  const mockWorkouts = [
    { id: 1, name: 'Felsőtest nap', date: '2026-05-08' },
    { id: 2, name: 'Láb nap', date: '2026-05-06' },
  ];

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Üdvözlünk az Edzéskövetőben! 💪</h2>
        <button
          className="btn"
          style={{ backgroundColor: '#dc3545' }}
          onClick={() => navigate('/')}
        >
          Kijelentkezés
        </button>
      </div>

      <div className="card">
        <h3>Saját edzéstervek</h3>
        <p style={{ color: '#666', marginBottom: '15px' }}>Itt látod az elmentett edzéseidet.</p>

        {mockWorkouts.map((workout) => (
          <div key={workout.id} style={{ padding: '10px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
            <strong>{workout.name}</strong>
            <span style={{ color: '#888' }}>Utoljára: {workout.date}</span>
          </div>
        ))}

        <button
          className="btn"
          style={{ width: '100%', marginTop: '20px' }}
          onClick={() => navigate('/planner')}
        >
          + Új edzésterv készítése
        </button>
      </div>
    </div>
  );
};

export default Dashboard;