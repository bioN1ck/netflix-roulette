import './MovieDetails.scss';
import { Movie } from '../../models/movie.model';

export const getDuration = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return `${hours && hours + 'h '}${minutes ? minutes : '0'}m`;
}

export type MovieDetailsProps = {
  movie: Movie;
};

function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <div className={'movie-details'}>
      <img src={movie.imageUrl} alt=""/>
      <div>
        <div className={'movie-details__header'}>
          <h2>{movie.movieName}</h2>
          <div>{movie.rating}</div>
        </div>
        <div className={'movie-details__genres'}>
          {movie.relevantGenres.join(', ')}
        </div>
        <div className={'movie-details__metadata'}>
          <span>{movie.releaseYear}</span>
          <span>{getDuration(movie.duration)}</span>
        </div>
        <p className={'movie-details__description'}>{movie.description}</p>
      </div>
    </div>
  )
}

export default MovieDetails;
