import './Movies.css';

export const Movies = ({ movies }) => {
  return movies?.map((movie) => (
    <div className="movie" key={movie.imdbID}>
      <div className="movie-info">
        <p>{movie.Title}</p>
        <p>{movie.Year}</p>
      </div>
      <div className="movie-posterWrapper">
        <img
          className="movie-poster"
          alt="The respective poster of the movie"
          src={movie.Poster}
        />
      </div>
    </div>
  ));
};
