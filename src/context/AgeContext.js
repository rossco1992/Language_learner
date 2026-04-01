import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AGE_PROFILES } from '../data/ageProfiles';

const AGE_STORAGE_KEY = 'hola_mundo_age_profile';

const AgeContext = createContext(null);

export function AgeProvider({ children }) {
  const [ageProfile, setAgeProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(AGE_STORAGE_KEY)
      .then((id) => {
        if (id && AGE_PROFILES[id]) {
          setAgeProfile(AGE_PROFILES[id]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const selectAge = async (profileId) => {
    await AsyncStorage.setItem(AGE_STORAGE_KEY, profileId);
    setAgeProfile(AGE_PROFILES[profileId]);
  };

  const clearAge = async () => {
    await AsyncStorage.removeItem(AGE_STORAGE_KEY);
    setAgeProfile(null);
  };

  return (
    <AgeContext.Provider value={{ ageProfile, selectAge, clearAge, loading }}>
      {children}
    </AgeContext.Provider>
  );
}

export const useAge = () => useContext(AgeContext);
