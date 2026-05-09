// src/pages/Planner.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Planner = () => {
  const navigate = useNavigate();
  const [planName, setPlanName] = useState('');

  // Ez az állapot tárolja a gyakorlatok listáját
  const [exercises, setExercises] = useState([
    { id: 1, name: '', sets: '', reps: '' }
  ]);

  // Új gyakorlat sor hozzáadása
  const addExercise = () => {
    setExercises([...exercises, { id: Date.now(), name: '', sets: '', reps: '' }]);
  };

  // Gyakorlat adatainak frissítése gépeléskor
  const handleExerciseChange = (id, field, value) => {
    const updatedExercises = exercises.map(ex =>
      ex.id === id ? { ...ex, [field]: value } : ex
    );
    setExercises(updatedExercises);
  };

  // Gyakorlat törlése
  const removeExercise = (id) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  // Mentés gomb (egyelőre csak konzoloz)
  const savePlan = (e) => {
    e.preventDefault();
    console.log('Mentésre váró terv:', { planName, exercises });
    alert('Edzésterv sikeresen elmentve (jelenleg csak a konzolon)!');
    navigate('/dashboard'); // Visszavisz a főoldalra
  };

  return (
    <div className="container" style={{ maxWidth: '800px', marginTop: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Új Edzésterv Összeállítása ✍️</h2>
        <button className="btn" style={{ backgroundColor: '#6c757d' }} onClick={() => navigate('/dashboard')}>
          Vissza
        </button>
      </div>

      <div className="card">
        <form onSubmit={savePlan}>
          <div className="form-group">
            <label>Edzésterv Neve (pl. Felsőtest nap)</label>
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="Add meg a terv nevét..."
              required
              style={{ fontSize: '18px', padding: '12px' }}
            />
          </div>

          <h3 style={{ marginTop: '30px', marginBottom: '15px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
            Gyakorlatok
          </h3>

          {/* Dinamikus gyakorlat lista */}
          {exercises.map((exercise, index) => (
            <div key={exercise.id} style={{ display: 'flex', gap: '10px', marginBottom: '15px', alignItems: 'flex-end' }}>
              <div style={{ flex: 2 }}>
                <label style={{ fontSize: '12px', color: '#666' }}>Gyakorlat neve</label>
                <input
                  type="text"
                  value={exercise.name}
                  onChange={(e) => handleExerciseChange(exercise.id, 'name', e.target.value)}
                  placeholder="pl. Fekvenyomás"
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', color: '#666' }}>Sorozat (Sets)</label>
                <input
                  type="number"
                  value={exercise.sets}
                  onChange={(e) => handleExerciseChange(exercise.id, 'sets', e.target.value)}
                  placeholder="pl. 4"
                  min="1" required
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', color: '#666' }}>Ismétlés (Reps)</label>
                <input
                  type="number"
                  value={exercise.reps}
                  onChange={(e) => handleExerciseChange(exercise.id, 'reps', e.target.value)}
                  placeholder="pl. 10"
                  min="1" required
                />
              </div>
              {/* Csak akkor engedjük törölni, ha több mint 1 gyakorlat van */}
              {exercises.length > 1 && (
                <button type="button" onClick={() => removeExercise(exercise.id)} className="btn" style={{ backgroundColor: '#dc3545', padding: '10px 15px' }}>
                  X
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={addExercise} className="btn" style={{ backgroundColor: '#17a2b8', marginBottom: '30px' }}>
            + Új gyakorlat hozzáadása
          </button>

          <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ccc' }} />

          <button type="submit" className="btn" style={{ width: '100%', fontSize: '18px', padding: '15px' }}>
            💾 Edzésterv Mentése
          </button>
        </form>
      </div>
    </div>
  );
};

export default Planner;