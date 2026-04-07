// WordTrackerContext — per-word learning tracker
// Tracks: exposure count, last seen timestamp, activity types encountered,
// and mastery level. This replaces the scattered wordsHeard tracking in
// ParentContext with a unified, spaced-repetition-ready system.
//
// Mastery levels:
//   0 = new (never seen)
//   1 = introduced (1-3 exposures)
//   2 = familiar (4-9 exposures across 2+ activity types)
//   3 = learned (10+ exposures across 3+ activity types, seen on 3+ days)

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'oye_word_tracker';

const WordTrackerContext = createContext(null);

function computeMastery(record) {
  if (!record || record.exposureCount === 0) return 0;
  const uniqueActivities = record.activityTypes.length;
  const uniqueDays = record.seenDates.length;

  if (record.exposureCount >= 10 && uniqueActivities >= 3 && uniqueDays >= 3) return 3;
  if (record.exposureCount >= 4 && uniqueActivities >= 2) return 2;
  return 1;
}

function todayString() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

export function WordTrackerProvider({ children }) {
  // wordData: { [wordId]: { exposureCount, lastSeen, activityTypes: [], seenDates: [], mastery } }
  const [wordData, setWordData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try { setWordData(JSON.parse(raw)); } catch (_) {}
      }
      setLoading(false);
    });
  }, []);

  const persist = useCallback((data) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data)).catch(() => {});
  }, []);

  // Record that a word was encountered in a specific activity type
  // activityType: 'tap_say' | 'peekaboo' | 'show' | 'game' | 'lesson' | 'word_grid'
  const recordExposure = useCallback((wordId, activityType) => {
    setWordData((prev) => {
      const existing = prev[wordId] ?? {
        exposureCount: 0,
        lastSeen: null,
        activityTypes: [],
        seenDates: [],
      };

      const today = todayString();
      const activityTypes = existing.activityTypes.includes(activityType)
        ? existing.activityTypes
        : [...existing.activityTypes, activityType];
      const seenDates = existing.seenDates.includes(today)
        ? existing.seenDates
        : [...existing.seenDates, today];

      const updated = {
        exposureCount: existing.exposureCount + 1,
        lastSeen: Date.now(),
        activityTypes,
        seenDates,
      };
      updated.mastery = computeMastery(updated);

      const next = { ...prev, [wordId]: updated };
      persist(next);
      return next;
    });
  }, [persist]);

  const getWordRecord = useCallback((wordId) => {
    return wordData[wordId] ?? {
      exposureCount: 0,
      lastSeen: null,
      activityTypes: [],
      seenDates: [],
      mastery: 0,
    };
  }, [wordData]);

  const getWordMastery = useCallback((wordId) => {
    return getWordRecord(wordId).mastery ?? 0;
  }, [getWordRecord]);

  // Words due for review based on spaced repetition intervals
  // Intervals: mastery 1 → 1 day, mastery 2 → 3 days, mastery 3 → 7 days
  const getWordsForReview = useCallback(() => {
    const now = Date.now();
    const intervals = { 1: 1, 2: 3, 3: 7 };

    return Object.entries(wordData)
      .filter(([, record]) => {
        if (!record.lastSeen) return false;
        const mastery = computeMastery(record);
        const daysSince = (now - record.lastSeen) / (1000 * 60 * 60 * 24);
        return daysSince >= (intervals[mastery] ?? 1);
      })
      .map(([wordId]) => wordId);
  }, [wordData]);

  // Stats
  const totalWordsIntroduced = Object.keys(wordData).length;
  const totalWordsMastered = Object.values(wordData).filter(
    (r) => computeMastery(r) >= 3
  ).length;

  const resetTracker = useCallback(() => {
    setWordData({});
    AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
  }, []);

  return (
    <WordTrackerContext.Provider
      value={{
        loading,
        wordData,
        recordExposure,
        getWordRecord,
        getWordMastery,
        getWordsForReview,
        totalWordsIntroduced,
        totalWordsMastered,
        resetTracker,
      }}
    >
      {children}
    </WordTrackerContext.Provider>
  );
}

export const useWordTracker = () => {
  const ctx = useContext(WordTrackerContext);
  if (!ctx) throw new Error('useWordTracker must be inside WordTrackerProvider');
  return ctx;
};
