import { useState } from 'react';
import './GenreSelect.scss';

import { Genre, Genres } from '../../models/genres.model';
import classNames from 'classnames';


type ResultsFilterProps = {
  genres: Genre[];
  activeGenre: Genres;
  onSelect: (genre: Genres) => void;
}

function GenreSelect(props: ResultsFilterProps) {
  const [state, setState] = useState(props);

  const handleGenreSelect = (genre: Genres): void => {
    state.onSelect(genre);
    setState({ ...state, activeGenre: genre });
  };
  const checkActiveness = (genre: Genres): string => {
    return genre === state.activeGenre ? ' active' : '';
  }

  return (
    <div className={'genre-select'}>
      {state.genres.map(({ id, genre }) => {
        return (
          <div
            className={classNames({
              'genre-select__item': true,
              'active': checkActiveness(genre)
            })}
            key={id}
          >
            <a href={'/#'} onClick={() => handleGenreSelect(genre)}>{genre}</a>
          </div>
        );
      })}
    </div>
  )
}

GenreSelect.defaultProps = {
  genres: [],
  activeGenre: Genres.ALL,
}

export default GenreSelect;
