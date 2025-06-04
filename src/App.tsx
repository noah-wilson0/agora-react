import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VotePage from './pages/debate/vote/layout/VotePage';
import DiscussionRoom from './pages/debate/live/layout/DebateLivePage';
import MainPage from './pages/main/MainPage';
import SearchResultPage from './pages/main/SearchResultPage';
import DebateLobby from './pages/debate/lobby/layout/DebateLobbyPage';
import OutcomePage from './pages/debate/outcome/layout/OutcomePage';
import ChatRoom from './pages/test/ChatRoom';
import './App.css'
import ArchivePage from './pages/main/ArchivePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/discussion" element={<DiscussionRoom />} />
        <Route path="/discussion/vote" element={<VotePage />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/discussion/lobby" element={<DebateLobby />} />
        <Route path="/discussion/outcome" element={<OutcomePage />} />
        <Route path="/chat/room1" element={<ChatRoom />} />
        <Route path="*" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default App;
