import styled from 'styled-components';
import Select from 'react-select';

import { PRIMARY_COLOR } from '../../styles/constants';


const StyledSelect = styled(Select)`
  & > [class$='-control'] {
    background-color: rgba(50, 50, 50, 0.95);
    min-height: 57px;
    border: none;
    border-radius: 4px;
    box-shadow: none;
    
    &.focused {
      box-shadow: 0 0 0 1px white;
    }
  }
  & [id$='-placeholder'] {
    font-size: 20px;
  }
  & [class$='-ValueContainer'] {
    padding: 5px 1.2rem;
  }
  & [class$='-indicatorSeparator'] {
    display: none;
  }
  & [class$='-indicatorContainer'] {
    padding-right: 16px;
    svg {
      fill: ${PRIMARY_COLOR};
    }
  }
  & [class$='-singleValue'] {
    font-size: 20px;
    color: white;
    text-transform: uppercase;
  }
  & [class$='-MultiValueGeneric'] {
    font-size: 100%;
    background-color: ${PRIMARY_COLOR};
    color: white;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    text-transform: uppercase;
  }
  & [class$='-MultiValueRemove'] {
    background-color: ${PRIMARY_COLOR};
    color: white;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
  }
  & [id$='-listbox'] {
    background-color: rgba(50, 50, 50, 0.95);
    margin: 0;
    border-radius: 0;
  }
  & [class$='-option'] {
    height: 42px;
    font-size: 20px;
    background-color: transparent;
    padding-left: 1.2rem;
    text-transform: uppercase;
    
    &:hover {
      background-color: ${PRIMARY_COLOR};
    }
  }
`;

export default StyledSelect;
