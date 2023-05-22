import './MovieTile.scss';
import { Movie } from '../../models/movie.model';

type MovieTileProps = {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

function MovieTile({ movie, onClick }: MovieTileProps) {
  return (
    <div className={'movie-tile'} onClick={() => onClick(movie)} data-cy="movie-tile">
      <img src={movie.imageUrl} alt=""/>
      <div className={'movie-tile__description'}>
        <div>
          <h3>{movie.movieName}</h3>
          <span>{movie.relevantGenres.join(', ')}</span>
        </div>
        <div className={'movie-tile__description-year'}>{movie.releaseYear}</div>
      </div>

      <div className={'movie-tile__kebab-menu'}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default MovieTile;
