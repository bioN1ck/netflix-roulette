import { Movie, MovieRaw, MovieResponse } from '../models/movie.model';
import { Genres } from '../models/genres.model';
import { BASE_URL } from './constants';
import { GenreOption, MovieFormType } from '../components/MovieForm/MovieForm';

export const mapRawToMovie = (res: MovieRaw): Movie => ({
  id: res.id,
  imageUrl: res.poster_path,
  movieName: res.title,
  relevantGenres: res.genres as Genres[],
  releaseYear: new Date(res.release_date).getFullYear().toString(),
  duration: res.runtime,
  description: res.overview,
  rating: res.vote_average,
});

const mapGenreToOption = (genre: Genres): GenreOption => ({
  label: genre,
  value: genre.toString(),
});

export const mapMovieToForm = (movie?: Movie): MovieFormType => ({
  poster_path: movie ? movie.imageUrl : '',
  title: movie ? movie.movieName : '',
  release_date: movie ? movie.releaseYear.toString() : '', // TODO: rework with Date object
  vote_average: movie ? movie.rating : 0,
  runtime: movie ? movie.duration : 0,
  overview: movie ? movie.description : '',
  genres: movie ? movie.relevantGenres.map(mapGenreToOption) : [],
});

type MovieSet = {
  movies: Movie[];
  total: number;
}

export enum Fields {
  SEARCH = 'search',
  FILTER = 'filter',
  SORT_BY = 'sortBy',
}

export const searchMovie = (signal: AbortSignal, searchParams: URLSearchParams): Promise<MovieSet> => {
  const baseParams = {
    sortBy: 'release_date',
    searchBy: 'title',
    sortOrder: 'asc',
    limit: '12',
  };

  const extraParams= Array
    .from(searchParams.entries())
    .reduce((acc, [key, val]) => {
      acc[key as Fields] = val;
      return acc;
    }, {} as {[key in Fields]: string});

  return fetch(`${BASE_URL}?` + new URLSearchParams({
      ...baseParams,
      ...extraParams,
    }), { signal })
      .then((res) => res.json())
      .then(({data, totalAmount}: MovieResponse) => ({
          movies: data.map(mapRawToMovie),
          total: totalAmount,
        })
      );
}
