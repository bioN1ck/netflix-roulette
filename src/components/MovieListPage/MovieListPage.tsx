import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Genres } from '../../models/genres.model';
import { Movie } from '../../models/movie.model';
import bg from '../../assets/bg.png';
import search from '../../assets/search.svg';
import { BG_COLOR, PRIMARY_COLOR } from '../../styles/constants';

import { SortControl, SortOption } from '../SortControl/SortControl';
import Button from '../Button/Button';
import Search from '../Search/Search';
import GenreSelect from '../GenreSelect/GenreSelect';
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieTile from '../MovieTile/MovieTile';


type MovieResponse = {
  budget: number;
  genres: string[];
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

const mapMovie = (res: MovieResponse): Movie => ({
  imageUrl: res.poster_path,
  movieName: res.title,
  relevantGenres: res.genres as Genres[],
  releaseYear: new Date(res.release_date).getFullYear(),
  duration: res.runtime,
  description: res.overview,
  rating: res.vote_average,
});

const MovieListPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MovieListPageHeader = styled.div`
  height: 396px;
  background-image: url(${bg});
  background-position: center;
  padding: 20px 60px;
  box-sizing: border-box;
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

const MovieListPageLogo = styled.div`
  display: inline-block;
  font-size: 20px;
  color: ${PRIMARY_COLOR};
  font-weight: 500;
  span {
    font-weight: 900;
  }
`;

const NetflixRouletteLogo = () => (
  <MovieListPageLogo>
    <span>netflix</span>roulette
  </MovieListPageLogo>
);

const MovieListPageSearchContainer = styled.div`
  padding: 0 3.75rem;
`;

const MovieListPageSearchTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 2.375rem;
  letter-spacing: 1.1px;
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

const MovieListPageDetailsContainer = styled.div`
  background: ${BG_COLOR};
  padding: 24px 60px 30px;
  box-sizing: border-box;
`;

const MovieListPageSearchButton = styled.button`
  width: 50px;
  height: 50px;
  background: url(${search}) no-repeat 50% 50%;
  border-radius: 50%;
`;


function MovieListPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortCriterion, setSortCriterion] = useState<SortOption>(SortOption.RELEASE_DATE);
  const [activeGenre, setActiveGenre] = useState<Genres>(Genres.ALL);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const url = 'http://localhost:4000/movies';

    fetch(
      `${url}?` + new URLSearchParams({
        search: searchQuery,
        searchBy: 'title',
        sortOrder: 'asc',
        sortBy: sortCriterion === SortOption.TITLE ? 'title' : 'release_date',
        filter: activeGenre === Genres.ALL ? '' : activeGenre,
        limit: '12',
      }),
      {
        method: 'get',
        signal: controller.signal,
      })
      .then(res => res.json())
      .then(({ data, totalAmount }) => {
        setMovieList(data.map(mapMovie));
        setTotal(totalAmount);
      })
      .catch(() => {
        setMovieList([]);
        setTotal(0);
      });

    return () => { controller.abort() };
  }, [searchQuery, sortCriterion, activeGenre]);

  return (
    <MovieListPageContainer>
      {selectedMovie
        ? <MovieListPageDetailsContainer data-cy="movie-details">
            <MovieListPageRow align={'center'}>
              <NetflixRouletteLogo />
              <MovieListPageSearchButton onClick={() => setSelectedMovie(null)} />
            </MovieListPageRow>
            <MovieDetails movie={selectedMovie} />
          </MovieListPageDetailsContainer>
        : <MovieListPageHeader data-cy="movie-search-bar">
            <MovieListPageRow align={'flex-start'}>
              <NetflixRouletteLogo />
              <Button size={'small'} theme={'blurred'}>
                + Add Movie
              </Button>
            </MovieListPageRow>
            <MovieListPageSearchContainer>
              <MovieListPageSearchTitle>
                FIND YOUR MOVIE
              </MovieListPageSearchTitle>
              <Search onSearch={setSearchQuery} />
            </MovieListPageSearchContainer>
          </MovieListPageHeader>
      }
      <MovieListPageDivider />

      <MovieListPageBody>
        <MovieListPageRow align={'center'} className={'bordered'}>
          <GenreSelect
            genres={Object.values(Genres)}
            preSelectedGenre={activeGenre}
            onSelect={setActiveGenre}
          />
          <SortControl
            initValue={SortOption.RELEASE_DATE}
            onSelect={setSortCriterion}
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
              onClick={setSelectedMovie}
            />
          ))}
        </MovieListPageSearchResultGrid>
      </MovieListPageBody>

      <MovieListPageFooter>
        <NetflixRouletteLogo />
      </MovieListPageFooter>
    </MovieListPageContainer>
  );
}

export default MovieListPage;
