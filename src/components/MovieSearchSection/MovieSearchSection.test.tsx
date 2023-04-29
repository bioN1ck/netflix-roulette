import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

import MovieSearchSection from './MovieSearchSection';


describe('MovieSearchSection', () => {
  it('should render', async () => {
    render(<MovieSearchSection />, { wrapper: BrowserRouter });

    expect(screen.getByText(/find your movie/i)).toBeInTheDocument();
  });
});
