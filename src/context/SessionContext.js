import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { useParent } from './ParentContext';

const SessionContext = createContext(null);

const MAX_WORDS_PER_SESSION = 6;

export function SessionProvider({ children }) {
  const { settings, incrementSession } = useParent();

  const [sessionActive, setSessionActive] = useState(false);
  const [wordsThisSession, setWordsThisSession] = useState([]);
  const [sessionExpired, setSessionExpired] = useState(false);
  const startTimeRef = useRef(null);
  const timerRef = useRef(null);

  const sessionMinutes = settings.sessionMinutes ?? 5;

  const startSession = useCallback(() => {
    startTimeRef.current = Date.now();
    setWordsThisSession([]);
    setSessionExpired(false);
    setSessionActive(true);
    incrementSession();

    // Set a timer for the session limit
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSessionExpired(true);
    }, sessionMinutes * 60 * 1000);
  }, [sessionMinutes, incrementSession]);

  const endSession = useCallback(() => {
    setSessionActive(false);
    setSessionExpired(false);
    setWordsThisSession([]);
    startTimeRef.current = null;
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const recordWordInSession = useCallback((wordId) => {
    setWordsThisSession((prev) => {
      if (prev.includes(wordId)) return prev;
      const next = [...prev, wordId];
      if (next.length >= MAX_WORDS_PER_SESSION) {
        setSessionExpired(true);
      }
      return next;
    });
  }, []);

  // Auto-start session if not active (first interaction starts it)
  const ensureSession = useCallback(() => {
    if (!sessionActive) startSession();
  }, [sessionActive, startSession]);

  const wordsRemaining = MAX_WORDS_PER_SESSION - wordsThisSession.length;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <SessionContext.Provider
      value={{
        sessionActive,
        sessionExpired,
        wordsThisSession,
        wordsRemaining,
        maxWords: MAX_WORDS_PER_SESSION,
        startSession,
        endSession,
        recordWordInSession,
        ensureSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be inside SessionProvider');
  return ctx;
};
