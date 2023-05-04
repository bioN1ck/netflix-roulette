import MovieForm, { MovieDTO } from '../MovieForm/MovieForm';
import { useNavigate } from 'react-router-dom';
import React from 'react';

import Modal from '../Modal/Modal';
import { BASE_URL } from '../../helpers/constants';


export default function AddMovieForm() {
  const navigate = useNavigate();

  const handleSubmit = (movie: MovieDTO) => {
    const controller = new AbortController();

    fetch(BASE_URL, {
      body: JSON.stringify(movie),
      method: 'post',
      signal: controller.signal
    })
      .then((res) => res.json())
      .then(result => {
        console.log('post result', result);
      });
  };

  return (
    <Modal title={'Add movie'} onClose={() => navigate('/')}>
      <MovieForm onChange={handleSubmit} />
    </Modal>
  );
};
