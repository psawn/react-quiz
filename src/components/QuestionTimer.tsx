import { useEffect, useState } from "react";

export function QuestionTimer({ timeout, onTimeout }: { timeout: number; onTimeout: () => void }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    setTimeout(() => {
      onTimeout();
    }, timeout);
  }, [onTimeout, timeout]);

  useEffect(() => {
    setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);
    // this will cause infinity loop if do not wrap in useEffect
  }, []);

  return <progress id="question-time" max={timeout} value={remainingTime} />;
}
