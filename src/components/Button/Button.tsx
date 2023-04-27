import styled from 'styled-components';
import { PropsWithChildren } from 'react';

import { PRIMARY_COLOR, PRIMARY_COLOR_ACCENT, TEXT_COLOR } from '../../styles/constants';


type Props = {
  theme?: 'primary' | 'secondary' | 'blurred';
  type?:  'button' | 'submit' | 'reset';
  size?: 'small' | 'large';
  className?: string;
}

const ButtonBody = styled('button')`
  height: 57px;
  border-radius: 4px;
  font-size: 1.25rem;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  border: 1px solid ${PRIMARY_COLOR};
  box-shadow: none;
  white-space: nowrap;
  padding: 0 3rem;

  &.small {
    height: 46px;
    padding: 0 1.12rem;
    font-weight: 600;
  }

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

  &.blurred {
    color: ${PRIMARY_COLOR};
    background-color: rgba(151, 151, 151, 0.68);
    border: none;

    &:active {
      background-color: rgba(138, 138, 138, 0.68);
    }
  }
`;

function Button({
  theme = 'primary',
  type = 'button',
  size = 'large',
  className,
  children
}: PropsWithChildren<Props>) {
  return (
    <ButtonBody className={`${className} ${theme} ${size}`} type={type}>{children}</ButtonBody>
  );
}

export default Button;
