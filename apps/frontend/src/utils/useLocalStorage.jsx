import { useState } from 'react';
const useLocalStorage = (key, initialValue) => {
  // get the value from local storage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return [initialValue];
    }
  });

  return { storedValue, setStoredValue };
};

export default useLocalStorage;
