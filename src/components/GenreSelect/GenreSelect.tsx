import { useState } from 'react';
import './GenreSelect.scss';

import { Genres } from '../../models/genres.model';
import classNames from 'classnames';


type ResultsFilterProps = {
  /**
   * The list of genres which will be rendered
   */
  genres: Genres[];
  /**
   * A preselected genre
   */
  selectedGenre?: Genres;
  /**
   * Callback for pass a selected genre to a parent
   * @param genre
   */
  onSelect?: (genre: Genres) => void;
}

/**
 * The UI component for selecting a genre from the list of genres
 */
function GenreSelect({
  genres = [],
  selectedGenre = Genres.ALL,
  onSelect
}: ResultsFilterProps) {
  const [genresState] = useState(genres);
  const [selectedGenreState, setSelectedGenreState] = useState(selectedGenre);

  const handleGenreSelect = (genre: Genres): void => {
    onSelect && onSelect(genre);
    setSelectedGenreState(genre);
  };
  const isGenreSelected = (genre: Genres): boolean => {
    return genre === selectedGenreState;
  }

  return (
    <div className={'genre-select'} role="tablist">
      {genresState.map((genre, id) => {
        return (
          <button
            className={classNames({
              'genre-select__item': true,
              'selected': isGenreSelected(genre)
            })}
            aria-selected={isGenreSelected(genre)}
            key={id}
            role="tab"
            onClick={() => handleGenreSelect(genre)}
          >
            {genre}
          </button>
        );
      })}
    </div>
  )
}

export default GenreSelect;
