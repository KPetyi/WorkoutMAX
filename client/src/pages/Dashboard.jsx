import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Állapot a kiválasztott (lenyitott) edzés ID-jának
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  // Edzések lekérése a backendről
  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/workouts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWorkouts(res.data);
    } catch (error) {
      console.error("Hiba az edzések betöltésekor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Törlés funkció
  const handleDelete = async (id) => {
    if (window.confirm("Biztosan törölni szeretnéd ezt az edzést?")) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/workouts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Frissítjük a listát a törlés után
        fetchWorkouts();
        setSelectedWorkout(null);
      } catch (error) {
        alert("Hiba történt a törlés során!");
      }
    }
  };

  return (
    <div className="container" style={{ maxWidth: '700px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ margin: 0 }}>Üdv, {user?.username}! 💪</h2>
        <button
          onClick={() => { logout(); navigate('/login'); }}
          style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Kijelentkezés
        </button>
      </div>

      <div className="card" style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginTop: 0, borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>Saját edzéstervek</h3>

        {isLoading ? (
          <p>Betöltés...</p>
        ) : workouts.length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center', padding: '20px 0' }}>Még nincsenek edzéseid. Kezdj el egyet!</p>
        ) : (
          workouts.map((workout) => (
            <div key={workout._id} style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
              <div
                onClick={() => setSelectedWorkout(selectedWorkout === workout._id ? null : workout._id)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
              >
                <div>
                  <strong style={{ fontSize: '18px', color: '#007bff' }}>{workout.title}</strong>
                  <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>
                    {new Date(workout.date).toLocaleDateString('hu-HU')}
                  </div>
                </div>
                <span style={{ color: '#666' }}>{selectedWorkout === workout._id ? '▲ Bezár' : '▼ Részletek'}</span>
              </div>

              {/* Lenyíló részletek */}
              {selectedWorkout === workout._id && (
                <div style={{ marginTop: '20px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                    <thead>
                      <tr style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                        <th style={{ paddingBottom: '8px' }}>Gyakorlat</th>
                        <th style={{ paddingBottom: '8px' }}>Sorozat</th>
                        <th style={{ paddingBottom: '8px' }}>Súly</th>
                        <th style={{ paddingBottom: '8px' }}>Ism.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workout.exercises.map((ex, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '8px 0' }}>{ex.name}</td>
                          <td>{ex.sets ? `${ex.sets}x` : '-'}</td>
                          <td>{ex.weight} kg</td>
                          <td>{ex.reps}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Funkciógombok */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => navigate(`/planner/${workout._id}`)}
                      style={{ flex: 1, padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      ✏️ Szerkesztés / Hozzáadás
                    </button>
                    <button
                      onClick={() => handleDelete(workout._id)}
                      style={{ flex: 1, padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      🗑️ Törlés
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        <button
          onClick={() => navigate('/planner')}
          style={{ width: '100%', marginTop: '25px', padding: '15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
        >
          + Új edzésterv készítése
        </button>
      </div>
    </div>
  );
};

export default Dashboard;