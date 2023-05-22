import { KeyboardEvent, useRef } from 'react';
import './Search.scss';

type SearchProps = {
  /**
   * Set if it needs a predefined value
   */
  initialValue?: string;
  /**
   * Callback which pass the search string to the parent component
   * @param val A search string
   */
  onSearch: (val: string) => void;
}

/**
 * The UI component for searching a film
 */
function Search({ initialValue = '', onSearch }: SearchProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = ({ key, target }: KeyboardEvent<HTMLInputElement>): void => {
    (key === 'Enter') && onSearch((target as HTMLInputElement).value);
  };

  const handleClick = (): void => {
    !!inputRef && onSearch((inputRef.current as HTMLInputElement).value);
  }

  return (
    <div className={'search'} data-cy="search">
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

Search.defaultProps = {
  initialValue: '',
  onSearch: () => {},
}

export default Search;
