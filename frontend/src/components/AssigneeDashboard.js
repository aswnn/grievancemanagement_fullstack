import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AssigneeDashboard.css'; 

const API_BASE_URL = 'http://localhost:8080';

function AssigneeDashboard({ user }) {
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/grievances`);
      setGrievances(response.data.filter(grievance => grievance.assignee && grievance.assignee.id === user.id));
    } catch (error) {
      console.error('Failed to fetch grievances', error);
    }
  };

  const resolveGrievance = async (grievanceId) => {
    try {
      await axios.post(`${API_BASE_URL}/api/grievances/resolve/${grievanceId}`);
      fetchGrievances();
    } catch (error) {
      console.error('Failed to resolve grievance', error);
    }
  };

  return (
    <div className="assignee-dashboard">
      <h1>Assignee Dashboard</h1>
      <p className="user-welcome">Welcome, <span className="user-name">{user.username}</span>!</p>
      <div className="grievances-list">
        <h2>Assigned Grievances</h2>
        {grievances.length === 0 ? (
          <p className="no-grievances">No grievances assigned at the moment.</p>
        ) : (
          grievances.map(grievance => (
            <div key={grievance.id} className="grievance-item">
              <p><strong>Description:</strong> {grievance.description}</p>
              <p><strong>Status:</strong> <span className={`status status-${grievance.status.toLowerCase()}`}>{grievance.status}</span></p>
              {grievance.status !== 'RESOLVED' && (
                <button className="resolve-button" onClick={() => resolveGrievance(grievance.id)}>Resolve</button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AssigneeDashboard;