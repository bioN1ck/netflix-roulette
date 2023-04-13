import { render, screen } from '@testing-library/react';

import Button from './Button';
import { PRIMARY_COLOR } from '../../styles/constants';


describe('Button', () => {
  it('should render primary type', () => {
    const text = 'Click me!';
    render(<Button>{text}</Button>);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByText(text)).toHaveStyle(`background-color: ${PRIMARY_COLOR}`);
  });

  it('should render secondary type', () => {
    const text = 'Click me!';
    render(<Button theme={'secondary'}>{text}</Button>);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByText(text)).toHaveStyle(`background-color: transparent`);
  });
});
