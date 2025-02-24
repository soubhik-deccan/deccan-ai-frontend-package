import React, { useCallback, useEffect, useRef, useState } from "react";
import { TPTimerProps } from "./type";

type DigitRollerProps = {
  value: string;
};
const DigitRoller: React.FC<DigitRollerProps> = ({ value }) => {
  const digits: number[] = [...Array(10)].map((_, i) => i);
  const currentIndex: number = digits.indexOf(parseInt(value));

  return (
    <div className="digit-roller">
      <div
        className="digit-roller-container"
        style={{ transform: `translateY(-${currentIndex * 100}%)` }}
      >
        {digits.map((digit) => (
          <div key={digit} className="digit">
            {digit}
          </div>
        ))}
      </div>
    </div>
  );
};

const PTimer: React.FC<TPTimerProps> = ({
  initialSeconds = 0,
  onDurationChange,
  updateInterval = 60,
  mode = "COUNT_UP",
  onComplete,
  isRunning = true,
  customClassName = "",
}) => {
  const [totalElapsedSeconds, setTotalElapsedSeconds] =
    useState<number>(initialSeconds);
  const animationFrameRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(Date.now());

  const updateTimer = useCallback(() => {
    const now: number = Date.now();
    const delta: number = Math.floor((now - lastUpdateRef.current) / 1000);
    lastUpdateRef.current = now;

    setTotalElapsedSeconds((prev: number) => {
      let newTime: number = prev;

      if (mode === "COUNT_UP") {
        newTime = prev + delta;
      } else if (mode === "COUNT_DOWN") {
        newTime = prev - delta;
        if (newTime <= 0) {
          newTime = 0;
          if (onComplete) {
            onComplete();
          }
          return newTime;
        }
      }

      if (onDurationChange && newTime >= 0 && newTime % updateInterval === 0) {
        onDurationChange(newTime);
      }

      return newTime;
    });

    if (isRunning) {
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    }
  }, [mode, onDurationChange, updateInterval, onComplete, isRunning]);

  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (isRunning) {
      lastUpdateRef.current = Date.now();
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isRunning, updateTimer]);

  useEffect(() => {
    setTotalElapsedSeconds(initialSeconds);
    lastUpdateRef.current = Date.now();
  }, [initialSeconds, mode]);

  const padTime = (value: number): string => String(value).padStart(2, "0");

  const totalSeconds: number = totalElapsedSeconds % 60;
  const totalMinutes: number = Math.floor((totalElapsedSeconds % 3600) / 60);
  const totalHours: number = Math.floor(totalElapsedSeconds / 3600);

  const hours: string = padTime(totalHours);
  const minutes: string = padTime(totalMinutes);
  const seconds: string = padTime(totalSeconds);

  return (
    <div className={`p-timer-container ${customClassName}`}>
      <p className="p-timer-text">Timer:</p>
      <div className="p-timer-values">
        <div className="p-timer-value">
          <DigitRoller value={hours[0]} />
          <DigitRoller value={hours[1]} />
        </div>
        <span className="p-timer-separator">:</span>
        <div className="p-timer-value">
          <DigitRoller value={minutes[0]} />
          <DigitRoller value={minutes[1]} />
        </div>
        <span className="p-timer-separator">:</span>
        <div className="p-timer-value">
          <DigitRoller value={seconds[0]} />
          <DigitRoller value={seconds[1]} />
        </div>
      </div>
    </div>
  );
};

export default PTimer;
