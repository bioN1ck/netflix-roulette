import type { Meta, StoryObj } from '@storybook/react';

import SortControl from '../../components/SortControl/SortControl';


const meta = {
  title: 'Example/SortControl',
  component: SortControl,
  tags: ['autodocs'],
} satisfies Meta<typeof SortControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

