import './MovieTile.scss';
import { Movie } from '../../models/movie.model';
import { Link, useLocation } from 'react-router-dom';

type MovieTileProps = {
  movie: Movie;
}

function MovieTile({ movie }: MovieTileProps) {
  const { search } = useLocation();

  return (
    <Link
      to={`/${movie.id}${search}`}
      className={'movie-tile'}
      data-cy="movie-tile"
    >
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
    </Link>
  );
}

export default MovieTile;
