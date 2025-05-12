import { useState, useEffect } from 'react';

interface UseTimerProps {
  initialTime: number;
  onTimeEnd?: () => void;
}

const useTimer = ({ initialTime, onTimeEnd }: UseTimerProps) => {
  const [timerSec, setTimerSec] = useState(initialTime);

  useEffect(() => {
    if (timerSec <= 0) {
      onTimeEnd?.();
      return;
    }

    const interval = setInterval(() => {
      setTimerSec((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timerSec, onTimeEnd]);

  return timerSec;
};

export default useTimer; 