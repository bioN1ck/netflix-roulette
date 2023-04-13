import { BaseSyntheticEvent } from 'react';
import styled from 'styled-components';


type Props = {
  initValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const TextareaBody = styled('textarea')`
  width: 100%;
  height: 197px;
  background: rgba(50, 50, 50, 0.95);
  mix-blend-mode: normal;
  opacity: 0.8;
  border-radius: 4px;
  box-shadow: none;
  border: none;
  padding-left: 1.2rem;
  padding-top: 1.2rem;
  box-sizing: border-box;
  font-size: 20px;
  font-weight: 400;
  color: #ffffff;
  resize: none;
`;

function Textarea({
  initValue = '',
  placeholder = '',
  onChange = () => {}
}: Props) {
  const handleValueChange = ({ target }: BaseSyntheticEvent) => onChange(target.value);

  return (
    <TextareaBody
      defaultValue={initValue}
      placeholder={placeholder}
      onChange={handleValueChange}
    />
  );
};

export default Textarea;
