import { Movie, MovieRaw, MovieResponse } from '../models/movie.model';
import { Genres } from '../models/genres.model';

export const mapMovie = (res: MovieRaw): Movie => ({
  id: res.id,
  imageUrl: res.poster_path,
  movieName: res.title,
  relevantGenres: res.genres as Genres[],
  releaseYear: new Date(res.release_date).getFullYear(),
  duration: res.runtime,
  description: res.overview,
  rating: res.vote_average,
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
  const url: string = 'http://localhost:4000/movies';
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

  return fetch(`${url}?` + new URLSearchParams({
      ...baseParams,
      ...extraParams,
    }), { signal })
      .then((res) => res.json())
      .then(({data, totalAmount}: MovieResponse) => ({
          movies: data.map(mapMovie),
          total: totalAmount,
        })
      );
}
