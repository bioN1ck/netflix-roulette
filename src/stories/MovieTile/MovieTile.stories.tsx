import type { Meta, StoryObj } from '@storybook/react';

import png from '../../assets/pulp-fiction.png';
import { MovieTile } from '../../components/MovieTile/MovieTile';
import { Genres } from '../../models/genres.model';

const MOVIE = {
  imageUrl: png,
  movieName: 'Pulp Fiction',
  releaseYear: 1994,
  relevantGenres: [Genres.CRIME, Genres.COMEDY],
  onClick: () => {}
}

const meta = {
  title: 'Example/MovieTile',
  component: MovieTile,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof MovieTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageUrl: MOVIE.imageUrl,
    movieName: MOVIE.movieName,
    releaseYear: MOVIE.releaseYear,
    relevantGenres: MOVIE.relevantGenres,
  }
}
