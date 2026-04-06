import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'hola_mundo_parent_settings';

const DEFAULTS = {
  bilingualMode: true,      // show English alongside Spanish
  sessionMinutes: 5,        // suggested session length
  unlockedPacks: ['animals', 'food', 'family', 'body'], // all unlocked for now
  wordsHeard: {},           // { wordId: playCount }
  totalSessions: 0,
};

const ParentContext = createContext(null);

export function ParentProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          setSettings({ ...DEFAULTS, ...JSON.parse(raw) });
        } catch (_) {}
      }
      setLoading(false);
    });
  }, []);

  const save = (next) => {
    setSettings(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
  };

  const updateSetting = (key, value) => save({ ...settings, [key]: value });

  const recordWordHeard = (wordId) => {
    const count = (settings.wordsHeard[wordId] ?? 0) + 1;
    save({ ...settings, wordsHeard: { ...settings.wordsHeard, [wordId]: count } });
  };

  const incrementSession = () =>
    save({ ...settings, totalSessions: settings.totalSessions + 1 });

  const isPackUnlocked = (packId) => settings.unlockedPacks.includes(packId);

  const uniqueWordsHeard = Object.keys(settings.wordsHeard).length;

  return (
    <ParentContext.Provider
      value={{
        loading,
        settings,
        updateSetting,
        recordWordHeard,
        incrementSession,
        isPackUnlocked,
        uniqueWordsHeard,
      }}
    >
      {children}
    </ParentContext.Provider>
  );
}

export const useParent = () => {
  const ctx = useContext(ParentContext);
  if (!ctx) throw new Error('useParent must be inside ParentProvider');
  return ctx;
};
