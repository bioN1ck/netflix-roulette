import type { Meta, StoryObj } from '@storybook/react';

import Search from '../../components/Search/Search';


const meta = {
  title: 'Example/Search',
  component: Search,
  tags: ['autodocs'],
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Predefined: Story = {
  args: {
    initialValue: 'some initial value',
  },
};
