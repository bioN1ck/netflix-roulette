import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Movie } from '../../models/movie.model';
import Logo from '../Logo/Logo';
import MovieDetails from '../MovieDetails/MovieDetails';
import { BG_COLOR } from '../../styles/constants';
import search from '../../assets/search.svg';
import { mapMovie } from '../../helpers/functions';


export async function loader({ params }: { params: any }) {
  const url: string = `http://localhost:4000/movies/${params.movieId}`;
  const result = await fetch(url);
  const data = await result.json();
  return mapMovie(data);
}

const MovieListPageDetailsContainer = styled.div`
  background: ${BG_COLOR};
  padding: 24px 60px 30px;
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

const MovieListPageSearchButton = styled.button`
  width: 50px;
  height: 50px;
  background: url(${search}) no-repeat 50% 50%;
  border-radius: 50%;
`;

export default function MovieDetailsSection() {
  const movie = useLoaderData() as Movie;
  const navigate = useNavigate();
  const { search } = useLocation();

  return (
    <MovieListPageDetailsContainer data-cy="movie-details">
      <MovieListPageRow align={'center'}>
        <Logo />
        <MovieListPageSearchButton onClick={() => navigate(`/${search}`)} />
      </MovieListPageRow>
      <MovieDetails movie={movie} />
    </MovieListPageDetailsContainer>
  )
}
