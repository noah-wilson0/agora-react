import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import DiscussionRoom from './pages/discussion/live/layout/DiscussionRoom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discussion" element={<DiscussionRoom />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
