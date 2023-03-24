import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Counter from './Counter';

describe('Counter', () => {
  it('should render default value', async () => {
    render(<Counter/>);
    const element = await screen.findByText(0);
    expect(element).toBeInTheDocument();
  });

  it('should render an initial value', async () => {
    const initialValue = 123;
    render(<Counter counter={initialValue}/>);
    const counter = await screen.findByText(initialValue);
    expect(counter).toBeInTheDocument();
  });

  it('should decrement value by clicking on the "-" button', async () => {
    const initialValue = 10;
    render(<Counter counter={initialValue}/>);
    let element = await screen.findByText(initialValue);
    expect(element).toBeInTheDocument();

    const decrementBtn = await screen.findByText('-');
    fireEvent.click(decrementBtn);

    element = await screen.findByText(initialValue - 1);
    expect(element).toBeInTheDocument();
  });

  it('should increment value by clicking on the "+" button', async () => {
    const initialValue = 10;
    render(<Counter counter={initialValue}/>);
    let element = await screen.findByText(initialValue);
    expect(element).toBeInTheDocument();

    const incrementBtn = await screen.findByText('+');
    fireEvent.click(incrementBtn);

    element = await screen.findByText(initialValue + 1);
    expect(element).toBeInTheDocument();
  });
});

