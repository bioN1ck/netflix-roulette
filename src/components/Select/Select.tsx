import React, { useState } from 'react';
import styled from 'styled-components';

const TEXT_COLOR = '#ffffff';
const PRIMARY_COLOR = '#f65261';
const BG_COLOR = '#424242';

const HEIGHT = '57px';
const FONT_SIZE = '1.25rem';

const SelectContainer = styled('div')`
  display: flex;
  align-items: center;
`;

const SelectBody = styled('div')`
  padding: 0.4rem 3.5rem 0.4rem 1rem;
  font-size: ${FONT_SIZE};
  color: ${TEXT_COLOR};
  
  position: relative;
  width: 100%;
  height: ${HEIGHT};
  box-sizing: border-box;
  text-transform: uppercase;
  
  display: flex;
  align-items: center;
  
  &.right {
    justify-content: flex-end;
  }
  &.bordered {
    background: rgba(50, 50, 50, 0.95);
    border-radius: 4px;
  }
`;

const SelectHeader = styled('div')`
  font-weight: 500;
`;

const SelectPlaceholder = styled('div')`
  font-weight: 300;
  opacity: 0.3;
  text-transform: none;
`;

const SelectArrowDown = styled('div')`
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid ${PRIMARY_COLOR};
  
  position: absolute;
  right: 20px;
  top: 24px;
  
  &.open {
    transform: rotate(180deg);
  }
`;

const SelectList = styled('ul')`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: ${FONT_SIZE};
  font-weight: 500;
  
  position: absolute;
  top: ${HEIGHT};
  right: 0;
  left: 0;
  z-index: 1000;
`;

const SelectListItem = styled('li')`
  list-style: none;
  white-space: nowrap;
  font-weight: 500;
  background: ${BG_COLOR};
  padding: 0 2rem 0 1rem;
  height: 42px;
  display: flex;
  align-items: center;

  &:hover {
    background: ${PRIMARY_COLOR};
  }
  
  &.right {
    justify-content: flex-end;
  }
`;

type Props<T = string> = {
  optionList: T[];
  initValue?: T | null;
  placeholder?: string;
  align?: 'left' | 'right';
  bordered?: boolean;
  onChange?: (option: T) => void;
}

function Select<T extends string>({
  optionList,
  align = 'left',
  bordered = false,
  initValue = null,
  placeholder = '',
  onChange,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initValue);

  const toggling = (): void => setIsOpen(!isOpen);

  const onOptionClicked = (option: T) => (): void => {
    if (option !== selectedOption) {
      setSelectedOption(option);
      onChange && onChange(option);
    }
    setIsOpen(false);
  };

  return (
    <SelectContainer>
      <SelectBody
        className={`${align} ${bordered && 'bordered'}`}
        onClick={toggling}
        data-testid="select-body"
      >
        {!!selectedOption
          ? <SelectHeader>{selectedOption}</SelectHeader>
          : <SelectPlaceholder>{placeholder}</SelectPlaceholder>
        }
        <SelectArrowDown className={isOpen ? 'open' : ''} />

        {isOpen && (
          <SelectList data-testid="select-list">
            {optionList.map((option, i) => (
              <SelectListItem className={align} onClick={onOptionClicked(option)} key={i}>
                {option}
              </SelectListItem>
            ))}
          </SelectList>
        )}
      </SelectBody>
    </SelectContainer>
  );
};

export default Select;
