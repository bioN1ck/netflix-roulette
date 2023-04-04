import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Genres } from '../../models/genres.model';
import GenreSelect from './GenreSelect';

describe('GenreSelect', () => {
  let genres: Genres[];

  beforeEach(() => {
    genres = Object.values(Genres);
  });

  it('should render all passed genres', () => {
    render(<GenreSelect genres={genres}/>);

    expect(screen.getByText(Genres.ALL)).toBeInTheDocument();
    expect(screen.getByText(Genres.DOCUMENTARY)).toBeInTheDocument();
    expect(screen.getByText(Genres.COMEDY)).toBeInTheDocument();
    expect(screen.getByText(Genres.HORROR)).toBeInTheDocument();
    expect(screen.getByText(Genres.CRIME)).toBeInTheDocument();
  });

  it('should highlight a selected genre passed in props', () => {
    render(<GenreSelect genres={genres} selectedGenre={Genres.HORROR}/>);
    const element = screen.getByRole('tab', { selected: true });

    expect(element).toHaveTextContent(Genres.HORROR);
    expect(element).toHaveClass('selected');
  });

  it('should pass selected genre in props arguments', async () => {
    const onSelectStub = jest.fn();
    render(<GenreSelect genres={genres} onSelect={onSelectStub}/>);

    const element = screen.getByText(Genres.HORROR);
    fireEvent.click(element);

    expect(onSelectStub).toHaveBeenCalledTimes(1);
    expect(onSelectStub).toHaveBeenCalledWith(Genres.HORROR);
  });
});
