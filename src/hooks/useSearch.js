import { useState, useEffect, useRef } from 'react';

export function useSearch() {
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const firstTime = useRef(true);

  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = search == '';
      return;
    }
    if (search == '') {
      setError('Complete el campo para buscar');
      return;
    }
    setError(null);
  }, [search]);

  return {
    search,
    setSearch,
    error,
    setError,
  };
}
