import React from 'react';
import { render, screen } from '@testing-library/react';

import MovieDetails, { getDuration } from './MovieDetails';
import { Movie } from '../../models/movie.model';
import { Genres } from '../../models/genres.model';

describe('MovieDetails', () => {
  let movie: Movie = {
    imageUrl: 'some/url',
    movieName: 'Some Movie Name',
    description: `Some description.`,
    duration: 100,
    rating: 6.1,
    releaseYear: 2016,
    relevantGenres: [Genres.DOCUMENTARY]
  };

  it('should render passed movie', () => {
    render(<MovieDetails movie={movie} />);

    const duration = getDuration(movie.duration);

    expect(screen.getByText(movie.movieName)).toBeInTheDocument();
    expect(screen.getByText(movie.description)).toBeInTheDocument();
    expect(screen.getByText(duration)).toBeInTheDocument();
    expect(screen.getByText(movie.rating)).toBeInTheDocument();
    expect(screen.getByText(movie.releaseYear)).toBeInTheDocument();
    expect(screen.getByText(movie.relevantGenres[0])).toBeInTheDocument();
  });
});
