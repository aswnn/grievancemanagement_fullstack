import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

const API_BASE_URL = 'http://localhost:8080';

function StudentDashboard({ user, setUser }) {
  const [grievances, setGrievances] = useState([]);
  const [newGrievance, setNewGrievance] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/grievances`);
      setGrievances(response.data.filter(grievance => grievance.student.id === user.id));
    } catch (error) {
      console.error('Failed to fetch grievances', error);
    }
  };

  const addGrievance = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/grievances/register`, {
        description: newGrievance,
        student: user
      });
      console.log('Grievance submitted:', response.data);
      setNewGrievance('');
      fetchGrievances();
    } catch (error) {
      console.error('Failed to add grievance', error);
    }
  };

  return (
    <div className="student-dashboard">
      <h1>Welcome, <span className='user-name-student'>{user.username}!</span></h1>
      
      <div className="grievance-section">
        <h2>Add New Grievance</h2>
        <form onSubmit={addGrievance} className="grievance-form">
          <textarea
            value={newGrievance}
            onChange={(e) => setNewGrievance(e.target.value)}
            placeholder="Describe your grievance..."
            className="grievance-textarea"
            required
          />
          <div className="submit-container">
            <button type="submit" className="submit-button">Submit</button>
          </div>
        </form>
      </div>
      <div className="grievance-list">
        <h2>My Grievances</h2>
        {grievances.length === 0 ? (
          <p className="no-grievances">You have not submitted any grievances yet.</p>
        ) : (
          grievances.map(grievance => (
            <div key={grievance.id} className="grievance-item">
              <p><strong>Description:</strong> {grievance.description}</p>
              <p><strong>Status:</strong> <span className={`status ${grievance.status.toLowerCase()}`}>{grievance.status}</span></p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;