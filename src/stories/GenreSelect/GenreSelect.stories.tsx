import type { Meta, StoryObj } from '@storybook/react';

import GenreSelect from '../../components/GenreSelect/GenreSelect';
import { Genres } from '../../models/genres.model';


const GENRES = Object.values(Genres);

const meta = {
  title: 'Example/GenreSelect',
  component: GenreSelect,
  tags: ['autodocs'],
} satisfies Meta<typeof GenreSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    genres: GENRES,
  },
};

export const Predefined: Story = {
  args: {
    genres: GENRES,
    selectedGenre: Genres.DOCUMENTARY,
  },
};
