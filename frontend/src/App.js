import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import SupervisorDashboard from './components/SupervisorDashboard';
import AssigneeDashboard from './components/AssigneeDashboard';
import Register from './components/Register'; 
function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/student" 
          element={user && user.role === 'STUDENT' ? <StudentDashboard user={user} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/supervisor" 
          element={user && user.role === 'SUPERVISOR' ? <SupervisorDashboard user={user} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/assignee" 
          element={user && user.role === 'ASSIGNEE' ? <AssigneeDashboard user={user} /> : <Navigate to="/" />} 
        />
      </Routes>

    </Router>
  );
}

export default App;