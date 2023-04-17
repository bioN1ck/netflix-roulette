import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

import Select from '../../components/Select/Select';
import { Genres } from '../../models/genres.model';


const options = Object.values(Genres);
const SelectContainer = styled('div')`
  width: 300px;
`;

const meta = {
  title: 'Example/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    optionList: [],
  },
  render: () =>
    <SelectContainer>
      <Select optionList={options} />
    </SelectContainer>
};

export const WithPlaceholder: Story = {
  args: {
    optionList: [],
  },
  render: () =>
    <SelectContainer>
      <Select optionList={options} placeholder={'Select genre'}/>
    </SelectContainer>
}

export const WithRightAlign: Story = {
  args: {
    optionList: [],
  },
  render: () =>
    <SelectContainer>
      <Select optionList={options} placeholder={'Select genre'} align={'right'}/>
    </SelectContainer>
}

export const WithBorder: Story = {
  args: {
    optionList: [],
  },
  render: () =>
    <SelectContainer>
      <Select optionList={options} placeholder={'Select genre'} bordered={true}/>
    </SelectContainer>
}
