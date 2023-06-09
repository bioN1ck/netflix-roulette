import React, { PropsWithChildren, ReactNode, useEffect } from 'react';
import { Portal } from 'react-portal';
import styled from 'styled-components';
import { BG_COLOR, TEXT_COLOR } from '../../styles/constants';

type Props = {
  title?: string | ReactNode;
  onClose?: () => void;
}

const DialogBackdrop = styled('div')`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background: rgba(35, 35, 35, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DialogBody = styled('div')`
  background: ${BG_COLOR};
  min-width: 686px;
  box-sizing: border-box;
  padding: 40px 60px;
  color: ${TEXT_COLOR};
  position: relative;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1),
              0 2px 10px rgba(0, 0, 0, 0.07),
              0 10px 20px rgba(0, 0, 0, 0.05),
              0 10px 50px rgba(0, 0, 0, 0.05);
`;

const DialogTitle = styled('h2')`
  font-size: 40px;
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 38px;
`;

const DialogCloseBtn = styled('button')`
  position: absolute;
  top: 30px;
  right: 30px;
  background: none;
  width: 30px;
  height: 30px;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 14px;
    display: inline-block;
    height: 2px;
    width: 28px;
    background: ${TEXT_COLOR};
    border-radius: 1px;
  }
  
  &::before {
    left: 2px;
    transform: rotate(45deg);
  }
  
  &::after {
    right: 1px;
    transform: rotate(-45deg);
  }
`;

export default function Modal({ title, children, onClose }: PropsWithChildren<Props>) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    }
  });

  return (
    <Portal>
      <DialogBackdrop>
        <DialogBody>
          {title && <DialogTitle>{title}</DialogTitle>}
          {children}
          <DialogCloseBtn onClick={() => {onClose && onClose()}}></DialogCloseBtn>
        </DialogBody>
      </DialogBackdrop>
    </Portal>
  )
}
