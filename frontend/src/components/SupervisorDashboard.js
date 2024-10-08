import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SupervisorDashboard.css';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8082';

function SupervisorDashboard({ user }) {
  const [grievances, setGrievances] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const navigate = useNavigate();

  const fetchGrievances = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/grievances`);
      setGrievances(response.data);
    } catch (error) {
      console.error('Failed to fetch grievances', error);
    }
  };

  const fetchAssignees = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users`);
      setAssignees(response.data.filter(user => user.role === 'ASSIGNEE'));
    } catch (error) {
      console.error('Failed to fetch assignees', error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users`);
      setAllUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  useEffect(() => {
    fetchGrievances();
    fetchAssignees();
    fetchAllUsers();
  }, []);

  const assignGrievance = async (grievanceId, assigneeId) => {
    try {
      await axios.post(`${API_BASE_URL}/api/grievances/assign/${grievanceId}`, { id: assigneeId });
      fetchGrievances();
    } catch (error) {
      console.error('Failed to assign grievance', error);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      await axios.put(`${API_BASE_URL}/api/users/update/${userId}`, { role: newRole });
      fetchAllUsers();
      setEditingUserId(null); 
    } catch (error) {
      console.error('Failed to update user role', error);
    }
  };

  const deleteGrievance = async (grievanceId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/grievances/delete/${grievanceId}`);
      fetchGrievances(); // Refresh grievances list after deletion
      alert('Grievance deleted successfully');
    } catch (error) {
      console.error('Failed to delete grievance', error);
      alert('Failed to delete grievance');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/users/delete/${id}`);
      alert('User deleted successfully');
      fetchAllUsers(); 
    } catch (error) {
      console.error('Error deleting user', error);
      alert('Failed to delete user');
    }
  };

  const toggleRoleDropdown = (userId) => {
    console.log("Edit button clicked for userId:", userId);
    setEditingUserId(editingUserId === userId ? null : userId);
  };

  return (
    <div className="supervisor-dashboard">
      <h1>Supervisor Dashboard</h1>

      <div className="grievances-list1">
        <h2>All Grievances</h2>
        {grievances.map(grievance => (
          <div key={grievance.id} className="grievance-item1">
            <p><strong>Description:</strong> {grievance.description}</p>
            <p><strong>Status:</strong> <span className={`status-${grievance.status.toLowerCase().replace(' ', '-')}`}>{grievance.status}</span></p>
            <p><strong>Assigned to:</strong> {grievance.assignee ? grievance.assignee.username : 'Not Assigned'}</p>
            <select 
              onChange={(e) => assignGrievance(grievance.id, e.target.value)} 
              defaultValue={grievance.assignee ? grievance.assignee.id : ""} 
              disabled={!!grievance.assignee} // Disable dropdown if grievance is already assigned
            >
              <option value="" disabled>Assign to...</option>
              {assignees.map(assignee => (
                <option key={assignee.id} value={assignee.id}>{assignee.username}</option>
              ))}
            </select>
            <button className='delete-button1' onClick={() => deleteGrievance(grievance.id)}>🗑️</button> {/* Delete button */}
          </div>
        ))}
      </div>

      <div className="users-list">
        <h2>All Users</h2>
        {allUsers.map(user => (
          <div key={user.id} className="user-item">
            <div className="user-info">
              <p className="username">UserName: {user.username}</p>
              <div className="role-container">
                <p className="role">{user.role}</p>
                <div className='icon-buttons'>
                  <button className="edit-button" onClick={() => toggleRoleDropdown(user.id)}>
                    ✎
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(user.id)}>
                    🗑️
                  </button>
                </div>
                {editingUserId === user.id && (
                  <div className="role-select">
                    <select 
                      value={user.role} 
                      onChange={(e) => updateUserRole(user.id, e.target.value)}
                    >
                      <option value="STUDENT">Student</option>
                      <option value="SUPERVISOR">Supervisor</option>
                      <option value="ASSIGNEE">Assignee</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='superlogout'>
        <button className='logout1' onClick={() => navigate('/')}>Logout</button>
      </div>
    </div>
  );
}

export default SupervisorDashboard;