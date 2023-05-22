import React, { useState } from 'react';
import styled from 'styled-components';

const TEXT_COLOR = '#ffffff';
const PRIMARY_COLOR = '#f65261';
const BG_COLOR = '#424242';

const SortControlContainer = styled('div')`
  display: flex;
  align-items: center;
  letter-spacing: 1.1px;
  z-index: 1;
`;

const SortControlLabel = styled('div')`
  color: ${TEXT_COLOR};
  text-transform: uppercase;
  opacity: 0.6;
`;

const SortControlHeader = styled('div')`
  padding: 0.4rem 2rem 0.4rem 1rem;
  font-weight: 500;
  font-size: 1rem;
  color: ${TEXT_COLOR};
  
  position: relative;
  width: 197px;
  box-sizing: border-box;
  text-align: right;
  text-transform: uppercase;
`;

const SortControlArrowDown = styled('div')`
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid ${PRIMARY_COLOR};
  
  position: absolute;
  right: 0;
  top: 12px;
`;

const SortControlList = styled('ul')`
  margin: 0;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 500;
  
  position: absolute;
  top: 42px;
  right: 0;
`;

const SortControlListItem = styled('li')`
  list-style: none;
  white-space: nowrap;
  background: ${BG_COLOR};
  padding: 0 2rem;
  height: 32px;
  display: flex;
  align-items: center;

  &:hover {
    background: ${PRIMARY_COLOR};
  }
`;

export enum SortOption {
  RELEASE_DATE = 'Release Date',
  TITLE = 'Title',
}

type SortControlProps = {
  initValue?: SortOption;
  onSelect?: (option: SortOption) => void;
}

const options = Object.values(SortOption);

export default function SortControl({ onSelect, initValue }: SortControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initValue);

  const toggling = (): void => setIsOpen(!isOpen);

  const onOptionClicked = (option: SortOption) => (): void => {
    if (option !== selectedOption) {
      setSelectedOption(option);
      onSelect && onSelect(option);
    }
    setIsOpen(false);
  };

  return (
    <SortControlContainer>
      <SortControlLabel>Sort by</SortControlLabel>
      <SortControlHeader onClick={toggling} data-testid="sort-control-header" data-cy="sort-control">
        {selectedOption} <SortControlArrowDown />
        {isOpen && (
          <SortControlList data-testid="sort-control-list" data-cy="sort-control-list">
            {options.map((option, i) => (
              <SortControlListItem onClick={onOptionClicked(option)} key={i}>
                {option}
              </SortControlListItem>
            ))}
          </SortControlList>
        )}
      </SortControlHeader>
    </SortControlContainer>
  );
}
