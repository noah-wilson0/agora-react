import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
/**
 * TODO:토론 대기-진행-투표-결과 화면 랜더링 구현
 * TODO: F5와 같은 동작 제어 구현
 * TODO: 타이머 0초일때 화면 전환은 모든 내부 기능이 구현되면 작업
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
