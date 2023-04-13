import React, { useState } from 'react';
import styled from 'styled-components';

import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';
import Button from '../Button/Button';
import Select from '../Select/Select';
import LabeledInput from '../LabeledInput/LabeledInput';
import { Movie } from '../../models/movie.model';
import { Genres } from '../../models/genres.model';


type Props = {
  movie?: Movie;
  onChange?: (movie: Movie) => void;
}

const MovieFormContainer = styled('form')`
  width: 856px;
`;

const MovieFormRow = styled('div')`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

const MovieFormLeftCol = styled('div')`
  flex: 1;
`;
const MovieFormRightCol = styled('div')`
  width: 300px;
  padding-left: 30px;
`;

const SubmitButton = styled(Button)`
  margin-left: 13px;
`;

function MovieForm({ movie, onChange }: Props) {
  const [imageUrl, setImageUrl] = useState<string>(movie?.imageUrl || '');
  const [movieName, setMovieName] = useState<string>(movie?.movieName || '');
  const [releaseYear, setReleaseYear] = useState<number>(movie?.releaseYear || 0);
  const [rating, setRating] = useState<number>(movie?.rating || 0);
  const [duration, setDuration] = useState<number>(movie?.duration || 0);
  const [description, setDescription] = useState<string>(movie?.description || '');
  const [relevantGenres, setRelevantGenres] = useState<Genres[]>(movie?.relevantGenres || []);

  const handleSubmit = (event: any) => {
    const editedMovie = {
      imageUrl,
      movieName,
      releaseYear,
      rating,
      duration,
      description,
      relevantGenres,
    };
    onChange && onChange(editedMovie);
    event.preventDefault();
  }
  return (
    <MovieFormContainer onSubmit={handleSubmit}>
      <MovieFormRow>
        <MovieFormLeftCol>
          <LabeledInput label={'Name'}>
            <Input
              initValue={movie?.movieName}
              placeholder={'Enter a name of movie'}
              onChange={setMovieName}
            />
          </LabeledInput>
        </MovieFormLeftCol>
        <MovieFormRightCol>
          <LabeledInput label={'Release Year'}>
            <Input<number>
              type={'number'}
              initValue={movie?.releaseYear}
              placeholder={'Select Year'}
              onChange={setReleaseYear}
            />
          </LabeledInput>
        </MovieFormRightCol>
      </MovieFormRow>
      <MovieFormRow>
        <MovieFormLeftCol>
          <LabeledInput label={'Movie Image URL'}>
            <Input
              type={'url'}
              initValue={movie?.imageUrl}
              placeholder={'https://'}
              onChange={setImageUrl}
            />
          </LabeledInput>
        </MovieFormLeftCol>
        <MovieFormRightCol>
          <LabeledInput label={'Rating'}>
            <Input<number>
              initValue={movie?.rating}
              type={'number'}
              placeholder={'7.8'}
              onChange={setRating}
            />
          </LabeledInput>
        </MovieFormRightCol>
      </MovieFormRow>
      <MovieFormRow>
        <MovieFormLeftCol>
          <LabeledInput label={'Genre'}>
            <Select
              optionList={Object.values(Genres)}
              bordered={true}
              placeholder={'Select Genre'}
              initValue={movie?.relevantGenres[0]}
              onChange={(g) => setRelevantGenres([g])}
            />
          </LabeledInput>
        </MovieFormLeftCol>
        <MovieFormRightCol>
          <LabeledInput label={'Runtime'}>
            <Input<number>
              type={'number'}
              initValue={movie?.duration}
              placeholder={'Minutes'}
              onChange={setDuration}
            />
          </LabeledInput>
        </MovieFormRightCol>
      </MovieFormRow>
      <MovieFormRow>
        <MovieFormLeftCol>
          <LabeledInput label={'Overview'}>
            <Textarea
              placeholder={'Movie Description'}
              initValue={movie?.description}
              onChange={setDescription}
            />
          </LabeledInput>
        </MovieFormLeftCol>
      </MovieFormRow>
      <MovieFormRow>
        <Button type={'reset'} theme={'secondary'}>Reset</Button>
        <SubmitButton type={'submit'}>Submit</SubmitButton>
      </MovieFormRow>
    </MovieFormContainer>
  );
};

export default MovieForm;
