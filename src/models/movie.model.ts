import { Genres } from './genres.model';

export type Movie = {
  imageUrl: string;
  movieName: string;
  releaseYear: number;
  rating: number;
  duration: string;
  description: string;
  relevantGenres: Genres[];
}
