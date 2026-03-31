import { useState, useEffect, useRef, useCallback } from 'react';

export function useAutoPlay(length, intervalMs = 4000) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setIndex((prev) => {
        if (prev >= length - 1) {
          clearTimer();
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, intervalMs);
  }, [length, intervalMs]);

  useEffect(() => {
    if (isPlaying) {
      startTimer();
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [isPlaying, startTimer]);

  // Reset when length changes (category switch)
  useEffect(() => {
    setIndex(0);
    setIsPlaying(false);
    clearTimer();
  }, [length]);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const toggle = () => setIsPlaying((p) => !p);

  const next = () => {
    clearTimer();
    setIndex((prev) => Math.min(prev + 1, length - 1));
    if (isPlaying) startTimer();
  };

  const prev = () => {
    clearTimer();
    setIndex((prev) => Math.max(prev - 1, 0));
    if (isPlaying) startTimer();
  };

  const goTo = (i) => {
    clearTimer();
    setIndex(i);
    if (isPlaying) startTimer();
  };

  return { index, isPlaying, play, pause, toggle, next, prev, goTo };
}
