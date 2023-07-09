import { useRef, useState, useMemo, useCallback } from 'react';
import { searchMovies } from '../services';
// const regex = /^(?!\s*$).+/;
export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  // No olvidar que el useRef persiste en cada re-renderizado
  // de nuestra app. Es como un valor inmortal
  const previousMovie = useRef(search);
  // useEffect(() => {
  //   if (!search.length || !regex.test(search)) return;
  //   fetchMovies();
  // }, [search]);

  const getMovies = useCallback(async ({ search }) => {
    if (previousMovie.current == search) return;
    try {
      previousMovie.current = search;
      const data = await searchMovies({ search });
      setMovies(data);
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.Title.localeCompare(b.Title))
      : movies;
  }, [sort, movies]);

  return {
    movies,
    getMovies,
    sortedMovies,
  };
}
