import { useNavigate } from 'react-router-dom';
import useTimer from './useTimer';

const useTimerNavigate = (
  initialTime: number,
  targetPath: string,
  state?: any
) => {
  const navigate = useNavigate();
  const timerSec = useTimer({
    initialTime,
    onTimeEnd: () => navigate(targetPath, { state }),
  });
  return timerSec;
};

export default useTimerNavigate; 