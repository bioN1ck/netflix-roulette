import { useEffect, useRef, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { Genres } from '../../models/genres.model';
import { Movie } from '../../models/movie.model';
import { BG_COLOR } from '../../styles/constants';

import { Fields, searchMovie } from '../../helpers/functions';
import SortControl, { SortOption } from '../SortControl/SortControl';
import GenreSelect from '../GenreSelect/GenreSelect';
import MovieTile from '../MovieTile/MovieTile';
import Logo from '../Logo/Logo';


const MovieListPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${BG_COLOR};
`;

const MovieListPageRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: ${({ align }: { align: string }) => align};
  margin-bottom: 2.2rem;
  position: relative;
  
  &.bordered {
    &:before, &:after {
      content: '';
      width: 100%;
      position: absolute;
    }
    &:before {
      height: 2px;
      background: #424242;
      bottom: 2px;
    }
    &:after {
      height: 1px;
      background: #080707;
      bottom: 0;
    }
  }
`;

const MovieListPageDivider = styled.div`
  height: 10px;
  background: #888888;
`;

const MovieListPageBody = styled.div`
  padding: 0 3.563rem;
`;

const MovieListPageSearchResultTitle = styled.div`
  span {
    font-weight: 600;
  }
`;
const SearchResultTitle = ({ count }: { count: number }) => (
  <MovieListPageSearchResultTitle data-cy="movie-count">
    <span>{count}</span> movie{count !== 1 ? 's' : ''} found
  </MovieListPageSearchResultTitle>
)

const MovieListPageSearchResultGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 60px;
  grid-row-gap: 50px;
  padding-bottom: 50px;
`;

const MovieListPageFooter = styled.div`
  height: 4.375rem;
  background: #424242;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
`;


function MovieListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [total, setTotal] = useState(0);

  const isInitialMount = useRef(true);

  const handleSorting = (option: SortOption) => {
    option === SortOption.TITLE
      ? searchParams.set(Fields.SORT_BY, 'title')
      : searchParams.set(Fields.SORT_BY, 'release_date');
    searchParams.sort();
    setSearchParams(searchParams);
  };

  const handleGenreSelection = (genre: Genres) => {
    genre !== Genres.ALL
      ? searchParams.set(Fields.FILTER, genre)
      : searchParams.delete(Fields.FILTER);
    searchParams.sort();
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const controller = new AbortController();

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      searchMovie(controller.signal, searchParams)
        .then(({ movies, total }) => {
          setMovieList(movies);
          setTotal(total);
        })
        .catch(() => {
          setMovieList([]);
          setTotal(0);
        });
    }

    return () => { controller.abort() };
  }, [searchParams]);

  return (
    <MovieListPageContainer>
      <Outlet />
      <MovieListPageDivider />

      <MovieListPageBody>
        <MovieListPageRow align={'center'} className={'bordered'}>
          <GenreSelect
            genres={Object.values(Genres)}
            preSelectedGenre={searchParams.get(Fields.FILTER) as Genres || Genres.ALL}
            onSelect={handleGenreSelection}
          />
          <SortControl
            initValue={searchParams.get(Fields.SORT_BY) === 'title' ? SortOption.TITLE : SortOption.RELEASE_DATE}
            onSelect={handleSorting}
          />
        </MovieListPageRow>
        <MovieListPageRow align={'center'}>
          <SearchResultTitle count={total} />
        </MovieListPageRow>
        <MovieListPageSearchResultGrid data-cy="movie-list">
          {movieList.map((movie, index) => (
            <MovieTile
              key={index}
              movie={movie}
            />
          ))}
        </MovieListPageSearchResultGrid>
      </MovieListPageBody>

      <MovieListPageFooter>
        <Logo />
      </MovieListPageFooter>
    </MovieListPageContainer>
  );
}

export default MovieListPage;
