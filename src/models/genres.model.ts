export enum Genres {
  ALL = 'All',
  DOCUMENTARY = 'Documentary',
  COMEDY = 'Comedy',
  HORROR = 'Horror',
  CRIME = 'Crime'
}

export type Genre = {
  id: number;
  genre: Genres;
}
