import type { Meta, StoryObj } from '@storybook/react';

import Dialog from '../../components/Dialog/Dialog';


function TriggerButton() {
  return (
      <button>Open a dialog</button>
    );
}

const meta = {
  title: 'Example/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    background: 'yellow'
  }
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: ''
  },
  render: () => (
    <Dialog trigger={<TriggerButton/>} onClose={() => {}}>
      Content of dialog component. You can close it by clicking on X button or pressing ESC.
    </Dialog>
  ),
};

export const WithTitle: Story = {
  args: {
    trigger: ''
  },
  render: () => (
    <Dialog
      title={'Title of dialog'}
      trigger={<TriggerButton/>}
      onClose={() => {}}
    >
      Content of dialog component. You can close it by clicking on X button or pressing ESC.
    </Dialog>
  ),
}
