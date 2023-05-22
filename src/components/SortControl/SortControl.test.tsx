import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import SortControl, { SortOption } from './SortControl';


describe('SortControl', () => {
  it('should render a label', () => {
    render(<SortControl />);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });

  it('should render an initial option', () => {
    render(<SortControl initValue={SortOption.RELEASE_DATE} />);

    expect(screen.getByText(SortOption.RELEASE_DATE)).toBeInTheDocument();
  });

  it('should open an option-list by click', () => {
    render(<SortControl initValue={SortOption.RELEASE_DATE} />);

    const header = screen.getByTestId('sort-control-header');

    expect(screen.queryByTestId('sort-control-list')).not.toBeInTheDocument();
    expect(header).toHaveTextContent(SortOption.RELEASE_DATE);

    fireEvent.click(header);

    expect(screen.getByTestId('sort-control-list')).toBeInTheDocument();

    const option = screen.getByText(SortOption.TITLE);
    fireEvent.click(option);

    expect(screen.queryByTestId('sort-control-list')).not.toBeInTheDocument();
    expect(header).toHaveTextContent(SortOption.TITLE);
  });
});
