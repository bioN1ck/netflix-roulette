import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieListPage from './MovieListPage';

const MOVIES_RESPONSE = {
  data: {
    data: [{
      budget: 104000000,
      genres: ["Action", "Adventure", "Comedy"],
      id: 343668,
      overview: "When an attack on the Kingsman headquarters takes place and a new villain rises, Eggsy and Merlin are forced to work together with the American agency known as the Statesman to save the world.",
      poster_path: "https://image.tmdb.org/t/p/w500/34xBL6BXNYFqtHO9zhcgoakS4aP.jpg",
      release_date: "2017-09-20",
      revenue: 394247609,
      runtime: 141,
      tagline: "Reports of my death have been greatly exaggerated.",
      title: "Kingsman: The Golden Circle",
      vote_average: 7,
      vote_count: 3193,
    }],
    limit: 10,
    offset: 0,
    totalAmount: 1,
  }
};

describe('MovieListPage', () => {
  it('should render', async () => {
    render(<MovieListPage />);

    expect(screen.getByText('FIND YOUR MOVIE')).toBeInTheDocument();
  });
});
