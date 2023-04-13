import { PropsWithChildren } from 'react';
import styled from 'styled-components';

type Props = {
  label: string;
}

const InputContainer = styled('div')``;
const InputLabel = styled('label')`
  color: #F65261;
  text-transform: uppercase;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 13px;
`;

function LabeledInput({ children, label }: PropsWithChildren<Props>) {
  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      {children}
    </InputContainer>
  )
}

export default LabeledInput;
