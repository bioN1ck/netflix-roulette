import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Search from './Search';

describe('Search', () => {

  it('should render an input with the initial value', async () => {
    const initialValue = 'tomb';
    render(<Search initialValue={initialValue}/>);

    const element = await screen.findByPlaceholderText('What do you want to search?');
    expect(element).toHaveValue(initialValue);
  });

  it('should call "onSearch" prop with proper value after typing and clicking the button', async () => {
    const onSearchStub = jest.fn();
    const typedValue = 'tomb';
    render(<Search onSearch={onSearchStub}/>);

    const inputElement = await screen.findByPlaceholderText('What do you want to search?');
    fireEvent.change(inputElement, { target: { value: typedValue }});
    const buttonElement = await screen.findByText('Search');
    fireEvent.click(buttonElement);

    expect(onSearchStub).toHaveBeenCalledTimes(1);
    expect(onSearchStub).toHaveBeenCalledWith(typedValue);
  });

  it('should call "onSearch" prop with proper value after typing and pressing "Enter"', async () => {
    const onSearchStub = jest.fn();
    const typedValue = 'tomb';
    render(<Search onSearch={onSearchStub}/>);

    const inputElement = await screen.findByRole('textbox');
    fireEvent.change(inputElement, { target: { value: typedValue }});
    fireEvent.keyDown(inputElement, { key: 'Enter' });

    expect(onSearchStub).toHaveBeenCalledTimes(1);
    expect(onSearchStub).toHaveBeenCalledWith(typedValue);
  })
});
