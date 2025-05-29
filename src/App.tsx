import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VotePage from './pages/debate/vote/layout/VotePage';
import DiscussionRoom from './pages/debate/live/layout/DebateLivePage';
import MainPage from './pages/main/MainPage';
import SearchResultPage from './pages/main/SearchResultPage';
import DebateLobby from './pages/debate/lobby/layout/DebateLobbyPage';
import OutcomePage from './pages/debate/outcome/layout/OutcomePage';
import './App.css'
import ArchivePage from './pages/main/ArchivePage';
import { DebateProvider } from './contexts/debateInfoContext';

const App: React.FC = () => {
  return (
    <DebateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/main" element={<MainPage />} />
          <Route path="/discussion" element={<DiscussionRoom />} />
          <Route path="/discussion/vote" element={<VotePage />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/discussion/lobby" element={<DebateLobby />} />
          <Route path="/discussion/outcome" element={<OutcomePage />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </Router>
    </DebateProvider>
  );
};

export default App;
