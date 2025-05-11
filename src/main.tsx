import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
/**
 * TODO:토론 대기-진행-투표-결과 화면 랜더링 구현
 * TODO: F5와 같은 동작 제어 구현
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
