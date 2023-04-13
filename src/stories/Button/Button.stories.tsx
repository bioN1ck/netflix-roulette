import type { Meta, StoryObj } from '@storybook/react';

import Button from '../../components/Button/Button';


const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs']
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <Button>Primary button</Button>,
};

export const Secondary: Story = {
  render: () => <Button theme={'secondary'}>Secondary button</Button>,
};
