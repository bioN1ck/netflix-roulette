import './MovieDetails.scss';
import { Movie } from '../../models/movie.model';


export type MovieDetailsProps = {
  movie: Movie;
};

export function MovieDetails({ movie }: MovieDetailsProps) {
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
          <span>{movie.duration}</span>
        </div>
        <p className={'movie-details__description'}>{movie.description}</p>
      </div>
    </div>
  )
}
