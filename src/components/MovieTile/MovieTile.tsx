import './MovieTile.scss';
import { Movie } from '../../models/movie.model';

type MovieTileProps = Omit<Movie, 'rating' | 'duration' | 'description'> & {
  onClick: () => void;
}

export function MovieTile({ imageUrl, movieName, releaseYear, relevantGenres, onClick }: MovieTileProps) {
  const handleClick = () => onClick();

  return (
    <div className={'movie-tile'} onClick={handleClick}>
      <img src={imageUrl} alt=""/>
      <div className={'movie-tile__description'}>
        <div>
          <h3>{movieName}</h3>
          <span>{relevantGenres.join(', ')}</span>
        </div>
        <div className={'movie-tile__description-year'}>{releaseYear}</div>
      </div>

      <div className={'movie-tile__kebab-menu'}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
