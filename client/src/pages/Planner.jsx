import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useParams hozzáadva!
import axios from 'axios';

const Planner = () => {
  const { id } = useParams(); // Megnézzük, van-e ID az URL-ben
  const navigate = useNavigate();
  const [planName, setPlanName] = useState('');
  const [exercises, setExercises] = useState([{ id: Date.now(), name: '', weight: '', reps: '', sets: '' }]);
  const [isEditMode, setIsEditMode] = useState(false);

  // Ha van ID, betöltjük a meglévő edzés adatait
  useEffect(() => {
    if (id) {
      const fetchWorkout = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get(`http://localhost:5000/api/workouts`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          // Megkeressük a listából a konkrét edzést
          const workoutToEdit = res.data.find(w => w._id === id);
          if (workoutToEdit) {
            setIsEditMode(true);
            setPlanName(workoutToEdit.title);
            // Átalakítjuk a formátumot a frontendnek (kell egy egyedi id a mappoláshoz)
            setExercises(workoutToEdit.exercises.map(ex => ({ ...ex, id: Math.random() })));
          }
        } catch (err) { console.error(err); }
      };
      fetchWorkout();
    }
  }, [id]);

  const handleExerciseChange = (id, field, value) => {
    setExercises(exercises.map(ex => ex.id === id ? { ...ex, [field]: value } : ex));
  };

  const savePlan = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const payload = {
        title: planName,
        exercises: exercises.map(ex => ({
          name: ex.name,
          weight: Number(ex.weight),
          reps: Number(ex.reps),
          sets: Number(ex.sets)
        }))
      };

      if (isEditMode) {
        // MÓDOSÍTÁS (PUT)
        await axios.put(`http://localhost:5000/api/workouts/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Edzésterv módosítva!');
      } else {
        // ÚJ MENTÉS (POST)
        await axios.post('http://localhost:5000/api/workouts', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Új edzésterv elmentve!');
      }
      navigate('/');
    } catch (err) { alert('Hiba a mentésnél!'); }
  };

  return (
    <div className="container" style={{ maxWidth: '850px', margin: '30px auto', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2>{isEditMode ? 'Edzésterv Szerkesztése ✏️' : 'Új Edzésterv Összeállítása ✍️'}</h2>
      <form onSubmit={savePlan}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Edzésterv Neve</label>
          <input type="text" value={planName} onChange={(e) => setPlanName(e.target.value)} required style={{ width: '100%', padding: '12px' }} />
        </div>

        {exercises.map((ex) => (
          <div key={ex.id} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input type="text" placeholder="Gyakorlat" value={ex.name} onChange={(e) => handleExerciseChange(ex.id, 'name', e.target.value)} required style={{ flex: 2, padding: '8px' }} />
            <input type="number" placeholder="Kör" value={ex.sets} onChange={(e) => handleExerciseChange(ex.id, 'sets', e.target.value)} required style={{ flex: 1, padding: '8px' }} />
            <input type="number" placeholder="Kg" value={ex.weight} onChange={(e) => handleExerciseChange(ex.id, 'weight', e.target.value)} required style={{ flex: 1, padding: '8px' }} />
            <input type="number" placeholder="Reps" value={ex.reps} onChange={(e) => handleExerciseChange(ex.id, 'reps', e.target.value)} required style={{ flex: 1, padding: '8px' }} />
            <button type="button" onClick={() => setExercises(exercises.filter(e => e.id !== ex.id))} style={{backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px'}}>X</button>
          </div>
        ))}

        <button type="button" onClick={() => setExercises([...exercises, { id: Date.now(), name: '', weight: '', reps: '', sets: '' }])} style={{ marginBottom: '20px' }}>+ Új gyakorlat hozzáadása</button>
        <button type="submit" style={{ width: '100%', padding: '15px', backgroundColor: isEditMode ? '#007BFF' : '#28a745', color: 'white', fontWeight: 'bold' }}>
          {isEditMode ? '💾 Módosítások mentése' : '💾 Edzésterv Mentése'}
        </button>
      </form>
    </div>
  );
};

export default Planner;