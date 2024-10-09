import { useState, useEffect } from 'react';
import { formatDate, getInitialDates } from '../utils/dateUtils';

export const useDates = () => {
  const [dates, setDates] = useState(getInitialDates());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDates(getInitialDates());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  return dates;
};