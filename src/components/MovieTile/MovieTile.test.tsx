import React from 'react';
import { render, screen } from '@testing-library/react';

import MovieTile from './MovieTile';
import { Genres } from '../../models/genres.model';
import { Movie } from '../../models/movie.model';


describe('MovieTile', () => {
  let movie: Movie = {
    imageUrl: 'some/url',
    movieName: 'Some Movie Name',
    description: `Some description.`,
    duration: 100,
    rating: 6.1,
    releaseYear: 2016,
    relevantGenres: [Genres.DOCUMENTARY]
  };
  let onClick = () => {}

  it('should render passed props', () => {
    render(<MovieTile
      movie={movie}
      onClick={onClick}
    />);

    expect(screen.getByText(movie.movieName)).toBeInTheDocument();
    expect(screen.getByText(movie.releaseYear)).toBeInTheDocument();
    expect(screen.getByText(movie.relevantGenres[0])).toBeInTheDocument();
  });
});
