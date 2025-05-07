import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VotePage from './pages/debate/vote/layout/VotePage';
import DiscussionRoom from './pages/debate/live/layout/DebateLivePage';
import DebateLobby from './pages/debate/lobby/layout/DebateLobbyPage';
import OutcomePage from './pages/debate/outcome/layout/OutcomePage';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/discussion" element={<DiscussionRoom />} />
        <Route path="/discussion/vote" element={<VotePage />} />
        <Route path="/discussion/lobby" element={<DebateLobby />} />
        <Route path="/discussion/outcome" element={<OutcomePage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
