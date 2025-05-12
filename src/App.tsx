import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VotePage from './pages/debate/vote/layout/VotePage';
import DiscussionRoom from './pages/debate/live/layout/DebateLivePage';
import MainPage from './pages/main/MainPage';
import SearchResultPage from './pages/main/SearchResultPage';
import './App.css'
import ArchivePage from './pages/main/ArchivePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/discussion" element={<DiscussionRoom />} />
        <Route path="/discussion/vote" element={<VotePage />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
