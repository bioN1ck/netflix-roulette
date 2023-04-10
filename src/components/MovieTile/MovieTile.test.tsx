import React from 'react';
import { render, screen } from '@testing-library/react';

import { MovieTile } from './MovieTile';
import { Genres } from '../../models/genres.model';


describe('MovieTile', () => {
  let imageUrl = 'some/url';
  let movieName = 'Some Movie Name';
  let releaseYear = 2015;
  let relevantGenres = [Genres.HORROR];
  let onClick = () => {}

  it('should render passed props', () => {
    render(<MovieTile
      imageUrl={imageUrl}
      movieName={movieName}
      releaseYear={releaseYear}
      relevantGenres={relevantGenres}
      onClick={onClick}
    />);

    expect(screen.getByText(movieName)).toBeInTheDocument();
    expect(screen.getByText(releaseYear)).toBeInTheDocument();
    expect(screen.getByText(relevantGenres[0])).toBeInTheDocument();
  });
});
