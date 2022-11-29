import { useEffect, useState } from 'react';

const useDebounce = (enteredSearchValue: string) => {
  const [activeSearchValue, setActiveSearchValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setActiveSearchValue(enteredSearchValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [enteredSearchValue]);

  return activeSearchValue;
};

export default useDebounce;
