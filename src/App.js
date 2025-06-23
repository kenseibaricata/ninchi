import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ClientDetail from './components/ClientDetail';
import NewSession from './components/NewSession';
import Reports from './components/Reports';
import Layout from './components/Layout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <Router>
      <div className="App">
        {!isAuthenticated ? (
          <Login onLogin={() => setIsAuthenticated(true)} />
        ) : (
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/client/:id" element={<ClientDetail />} />
              <Route path="/session/new" element={<NewSession />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
        )}
      </div>
    </Router>
  );
}

export default App; 