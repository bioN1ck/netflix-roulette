import styled from 'styled-components';
import { PropsWithChildren } from 'react';

import { PRIMARY_COLOR, PRIMARY_COLOR_ACCENT, TEXT_COLOR } from '../../styles/constants';


type Props = {
  theme?: 'primary' | 'secondary';
  type?:  'button' | 'submit' | 'reset';
  className?: string;
}

const ButtonBody = styled('button')`
  height: 57px;
  border-radius: 4px;
  font-size: 1.23rem;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  border: 1px solid ${PRIMARY_COLOR};
  box-shadow: none;
  white-space: nowrap;
  padding: 0 3rem;
  
  &.primary {
    color: ${TEXT_COLOR};
    background-color: ${PRIMARY_COLOR};

    &:active {
      background-color: ${PRIMARY_COLOR_ACCENT};
      border-color: ${PRIMARY_COLOR_ACCENT};
    }
  }
  
  &.secondary {
    color: ${PRIMARY_COLOR};
    background: transparent;

    &:active {
      color: ${PRIMARY_COLOR_ACCENT};
      border-color: ${PRIMARY_COLOR_ACCENT};
    }
  }
`;

function Button({
  theme = 'primary',
  type = 'button',
  className,
  children
}: PropsWithChildren<Props>) {
  return (
    <ButtonBody className={`${className} ${theme}`} type={type}>{children}</ButtonBody>
  );
}

export default Button;
