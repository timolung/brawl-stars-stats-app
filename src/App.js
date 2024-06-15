import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ClubPage from './pages/ClubPage';
import PlayerPage from './pages/PlayerPage';
import Navbar from './components/Navbar';
import './App.css';

function App() {

  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content-wrapper">
          <Routes>
            <Route path="/club" element={<ClubPage />} />
            <Route path="/player" element={<PlayerPage />} />
            <Route path="*" element={<Navigate to="/club" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
