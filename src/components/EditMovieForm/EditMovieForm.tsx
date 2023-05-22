import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import React from 'react';

import MovieForm, { MovieDTO } from '../MovieForm/MovieForm';
import { BASE_URL } from '../../helpers/constants';
import Modal from '../Modal/Modal';
import { Movie } from '../../models/movie.model';


export default function EditMovieForm() {
  const navigate = useNavigate();
  const movie = useOutletContext<Movie>();
  const { search } = useLocation();

  const handleSubmit = (movie: MovieDTO) => {
    const controller = new AbortController();
    fetch(BASE_URL, {
      body: JSON.stringify(movie),
      method: 'put',
      signal: controller.signal
    })
      .then((res) => res.json())
      .then(result => {
        console.log('edit request result', result);
        navigate(`/${movie.id}${search}`);
      });
  };

  return (
    <Modal title={'Edit movie'} onClose={() => navigate(`/${movie.id}${search}`)}>
      <MovieForm movie={movie} onChange={handleSubmit} />
    </Modal>
  );
};
