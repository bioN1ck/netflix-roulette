import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

import MovieForm from '../../components/MovieForm/MovieForm';
import { Movie } from '../../models/movie.model';
import { Genres } from '../../models/genres.model';


const Container = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const MOVIE: Movie = {
  imageUrl: 'https://some-movie.com/some-movie',
  movieName: 'Pulp Fiction',
  releaseYear: '1994',
  rating: 7.9,
  duration: 94,
  description: 'Very interesting movie',
  relevantGenres: [Genres.CRIME],
}

const meta = {
  title: 'Example/MovieForm',
  component: MovieForm,
  tags: ['autodocs'],
} satisfies Meta<typeof MovieForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddMovie: Story = {
  render: () =>
    <Container>
      <MovieForm />
    </Container>
};

export const EditMovie: Story = {
  render: () =>
    <Container>
      <MovieForm movie={MOVIE} />
    </Container>
};
