import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VotePage from './pages/debate/vote/layout/VotePage';
import DiscussionRoom from './pages/debate/live/layout/DebateLivePage';
import MainPage from './pages/main/MainPage';
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/discussion" element={<DiscussionRoom />} />
        <Route path="/discussion/vote" element={<VotePage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
