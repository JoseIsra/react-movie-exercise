import { useState, useCallback } from 'react';
import './App.css';
import { Movies } from './components/Movies/Movies';
import { useMovies } from './hooks/useMovies';
import debounce from 'just-debounce-it';
import { useSearch } from './hooks/useSearch';

const regex = /^(?!\s*$).+/;

function App() {
  const { search, setSearch, error, setError } = useSearch();
  const [sort, setSort] = useState(false);
  const { getMovies, sortedMovies } = useMovies({ search, sort });

  const debounceGetMovie = useCallback(
    debounce((search) => {
      console.log('the debounce');
      getMovies({ search });
    }, 600),
    []
  );

  const handleSearch = (e) => {
    const newSearch = e.target.value;
    setSearch(e.target.value);
    debounceGetMovie(newSearch);
  };

  const handleSearchMovie = (e) => {
    e.preventDefault();
    if (!regex.test(search)) {
      setError('No ha ingresado el nombre de la película');
      return;
    }
    getMovies({ search });
    setError(null);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="layout">
      <p>Mis peliculas</p>
      <form onSubmit={handleSearchMovie}>
        <input type="text" value={search} onChange={handleSearch} />
        <input type="checkbox" onChange={handleSort} checked={sort} />
        <button type="submit">BUSCAR</button>
        <div style={{ padding: '40px' }}>
          {error && <p style={{ color: 'red' }}> {error}</p>}
        </div>
      </form>
      <main className="movies-container">
        {!sortedMovies?.length ? (
          <p>Sin resultados</p>
        ) : (
          <Movies movies={sortedMovies} />
        )}
      </main>
    </div>
  );
}

export default App;
