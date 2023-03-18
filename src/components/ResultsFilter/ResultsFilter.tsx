import { useState } from 'react';
import './ResultsFilter.scss';

import { Genre, Genres } from '../../models/genres.model';


type ResultsFilterProps = {
  genres: Genre[];
  activeGenre: Genres;
  onSelect: (genre: Genres) => void;
}

function ResultsFilter(props: ResultsFilterProps) {
  const [state, setState] = useState(props);

  const handleGenreSelect = (genre: Genres): void => {
    state.onSelect(genre);
    setState({ ...state, activeGenre: genre });
  };
  const checkActiveness = (genre: Genres): string => {
    return genre === state.activeGenre ? ' active' : '';
  }

  return (
    <div className={'ResultsFilter'}>
      {state.genres.map(({ id, genre }) => {
        return (
          <div
            className={`ResultsFilter-item${checkActiveness(genre)}`}
            key={id}
          >
            <a href={'/#'} onClick={() => handleGenreSelect(genre)}>{genre}</a>
          </div>
        );
      })}
    </div>
  )
}

ResultsFilter.defaultProps = {
  genres: [],
  activeGenre: Genres.ALL,
}

export default ResultsFilter;
