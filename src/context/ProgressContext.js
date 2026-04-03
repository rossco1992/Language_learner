import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'hola_mundo_progress';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  // completedLessons: Set of "unitId/lessonId" strings
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const arr = JSON.parse(raw);
          setCompletedLessons(new Set(arr));
        } catch (_) {}
      }
      setLoading(false);
    });
  }, []);

  const persist = useCallback((nextSet) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...nextSet])).catch(() => {});
  }, []);

  const markLessonComplete = useCallback((unitId, lessonId) => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      next.add(`${unitId}/${lessonId}`);
      persist(next);
      return next;
    });
  }, [persist]);

  const isLessonComplete = useCallback(
    (unitId, lessonId) => completedLessons.has(`${unitId}/${lessonId}`),
    [completedLessons],
  );

  const getUnitProgress = useCallback(
    (unit) => {
      if (!unit?.lessons?.length) return 0;
      const done = unit.lessons.filter((l) => completedLessons.has(`${unit.id}/${l.id}`)).length;
      return done / unit.lessons.length;
    },
    [completedLessons],
  );

  const resetProgress = useCallback(() => {
    setCompletedLessons(new Set());
    AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
  }, []);

  return (
    <ProgressContext.Provider
      value={{ loading, completedLessons, markLessonComplete, isLessonComplete, getUnitProgress, resetProgress }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
};
