import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import Search from '../Search/Search';
import bg from '../../assets/bg.png';
import { Fields } from '../../helpers/functions';

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

const MovieListPageSearchContainer = styled.div`
  padding: 0 3.75rem;
`;

const MovieListPageSearchTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 2.375rem;
  letter-spacing: 1.1px;
`;

export default function MovieSearchSection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');

  useEffect(() => {
    searchQuery
      ? searchParams.set(Fields.SEARCH, searchQuery)
      : searchParams.delete(Fields.SEARCH);
    searchParams.sort();
    setSearchParams(searchParams);
  }, [searchQuery]);

  return (
    <MovieListPageHeader data-cy="movie-search-bar">
      <MovieListPageRow align={'flex-start'}>
        <Logo />
        <Button size={'small'} theme={'blurred'}>
          + Add Movie
        </Button>
      </MovieListPageRow>
      <MovieListPageSearchContainer>
        <MovieListPageSearchTitle>
          FIND YOUR MOVIE
        </MovieListPageSearchTitle>
        <Search initialValue={searchQuery} onSearch={setSearchQuery} />
      </MovieListPageSearchContainer>
    </MovieListPageHeader>
  )
}
