import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VotePage from './pages/debate/vote/layout/VotePage';
import DiscussionRoom from './pages/debate/live/layout/DebateLivePage';
import MyPage from './pages/user/MyPage';
import DebateHistory from './pages/user/DebateHistory';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/discussion" element={<DiscussionRoom />} />
        <Route path="/discussion/vote" element={<VotePage />} />
        <Route path="*" element={<Home />} />
        
        {/* /mypage 경로에서 MyPage를 표시하고, 그 안에서 DebateHistory를 중첩해서 표시 */}
        <Route path="/mypage" element={<MyPage />}>
          <Route path="history" element={<DebateHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
