import { useState, useCallback } from 'react';

export const useFullscreenLoading = () => {
  const [spinning, setSpinning] = useState(false);
  const [percent, setPercent] = useState(0);

  const showLoader = useCallback((duration = 2000, onFinish = () => {}) => {
    setSpinning(true);
    const totalSteps = 100;
    const stepTime = duration / totalSteps;
    let ptg = 0;

    const interval = setInterval(() => {
      ptg += 100 / totalSteps;
      setPercent(Math.min(ptg, 100));

      if (ptg >= 100) {
        clearInterval(interval);
        setSpinning(false);
        setPercent(0);
        onFinish();
      }
    }, stepTime);
  }, []);

  return {
    spinning,
    percent,
    showLoader,
  };
};
