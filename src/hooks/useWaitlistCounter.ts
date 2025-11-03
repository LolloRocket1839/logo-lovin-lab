import { useState, useEffect } from 'react';

const WAITLIST_COUNT_KEY = 'jungle_rent_waitlist_count';
const INITIAL_COUNT = 32;

export const useWaitlistCounter = () => {
  const [count, setCount] = useState<number>(() => {
    const stored = localStorage.getItem(WAITLIST_COUNT_KEY);
    return stored ? parseInt(stored, 10) : INITIAL_COUNT;
  });

  useEffect(() => {
    localStorage.setItem(WAITLIST_COUNT_KEY, count.toString());
  }, [count]);

  const incrementCount = () => {
    setCount(prev => prev + 1);
  };

  return { count, incrementCount };
};
