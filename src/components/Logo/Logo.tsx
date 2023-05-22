import React from 'react';
import styled from 'styled-components';
import { PRIMARY_COLOR } from '../../styles/constants';
import { useNavigate } from 'react-router-dom';

const MovieListPageLogo = styled.div`
  display: inline-block;
  font-size: 20px;
  color: ${PRIMARY_COLOR};
  font-weight: 500;
  cursor: pointer;
  
  span {
    color: ${PRIMARY_COLOR};
    font-weight: 900;
  }
`;

export default function Logo() {
  const navigate = useNavigate()

  return (
    <MovieListPageLogo onClick={() => navigate('/')}>
      <span>netflix</span>roulette
    </MovieListPageLogo>
  );
}
