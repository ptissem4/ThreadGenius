// FIX: The 'React' namespace is required for types like React.Dispatch.
import React, { useState, useEffect } from 'react';

function getStorageValue<T,>(key: string, defaultValue: T): T {
  // getting stored value
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const initial = JSON.parse(saved);
        return initial;
      } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
        return defaultValue;
      }
    }
  }
  return defaultValue;
}

export const useLocalStorage = <T,>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};