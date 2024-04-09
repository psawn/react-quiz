import { useEffect, useState } from "react";

export function QuestionTimer({
  timeout,
  mode,
  onTimeout,
}: {
  timeout: number;
  mode: string;
  onTimeout: (() => void) | null;
}) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onTimeout) {
        onTimeout();
      }
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);
    // this will cause infinity loop if do not wrap in useEffect

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={mode}
    />
  );
}
