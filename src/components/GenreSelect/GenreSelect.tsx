import { useState } from 'react';
import './GenreSelect.scss';

import { Genre, Genres } from '../../models/genres.model';
import classNames from 'classnames';


type ResultsFilterProps = {
  genres: Genre[];
  selectedGenre: Genres;
  onSelect: (genre: Genres) => void;
}

function GenreSelect(props: ResultsFilterProps) {
  const [genres] = useState(props.genres);
  const [selectedGenre, setSelectedGenre] = useState(props.selectedGenre);

  const handleGenreSelect = (genre: Genres): void => {
    props.onSelect(genre);
    setSelectedGenre(genre);
  };
  const isGenreSelected = (genre: Genres): boolean => {
    return genre === selectedGenre;
  }

  return (
    <div className={'genre-select'} role="tablist">
      {genres.map(({ id, genre }) => {
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

GenreSelect.defaultProps = {
  genres: [],
  selectedGenre: Genres.ALL,
  onSelect: () => {}
}

export default GenreSelect;
