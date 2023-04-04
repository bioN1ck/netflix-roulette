import type { Meta, StoryObj } from '@storybook/react';

import Counter from '../../components/Counter/Counter';


const meta = {
  title: 'Example/Counter',
  component: Counter,
  tags: ['autodocs']
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Counter />,
};

export const Predefined: Story = {
  render: () => <Counter counter={5} />
}
