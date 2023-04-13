import { BaseSyntheticEvent } from 'react';
import styled from 'styled-components';

type Props<R = string> = {
  type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
  initValue?: R;
  placeholder?: string;
  onChange?: (value: R) => void;
}

const InputBody = styled('input')`
  width: 100%;
  height: 57px;
  background: rgba(50, 50, 50, 0.95);
  mix-blend-mode: normal;
  opacity: 0.8;
  border-radius: 4px;
  box-shadow: none;
  border: none;
  padding-left: 1.2rem;
  box-sizing: border-box;
  font-size: 20px;
  font-weight: 400;
  color: #ffffff;
`;

function Input<T extends string | number>({
  type = 'text',
  initValue,
  placeholder = '',
  onChange = () => {}
}: Props<T>) {
  const handleChange = ({ target }: BaseSyntheticEvent) => onChange(target.value);

  return (
    <InputBody
      type={type}
      defaultValue={initValue}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}

export default Input;
