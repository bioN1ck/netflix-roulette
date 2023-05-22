import { Genres } from './genres.model';

export type Movie = {
  id?: number;
  imageUrl: string;
  movieName: string;
  releaseYear: string;
  rating: number;
  duration: number;
  description: string;
  relevantGenres: Genres[];
}

export type MovieRaw = {
  budget: number;
  genres: string[];
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export type MovieResponse = {
  data: MovieRaw[],
  limit: number,
  offset: number,
  totalAmount: number,
}
