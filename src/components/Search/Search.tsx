import { KeyboardEvent, useRef } from 'react';
import './Search.scss';

type SearchProps = {
  initialValue: string;
  onSearch: (val: string) => void;
}

function Search({ initialValue, onSearch }: SearchProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = ({ key, target }: KeyboardEvent<HTMLInputElement>): void => {
    (key === 'Enter') && onSearch((target as HTMLInputElement).value);
  };

  const handleClick = (): void => {
    !!inputRef && onSearch((inputRef.current as HTMLInputElement).value);
  }

  return (
    <div className={'search'}>
      <input
        type="text"
        ref={inputRef}
        placeholder={'What do you want to search?'}
        defaultValue={initialValue}
        onKeyDown={handleKeyDown}
      />
      <button type="submit" onClick={handleClick}>Search</button>
    </div>
  );
}

export default Search;
