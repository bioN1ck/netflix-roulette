import { Genres } from './genres.model';

export type Movie = {
  imageUrl: string;
  movieName: string;
  releaseYear: number;
  rating: number;
  duration: number;
  description: string;
  relevantGenres: Genres[];
}
