import React from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';

import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';
import Button from '../Button/Button';
import LabeledInput from '../LabeledInput/LabeledInput';
import { Movie } from '../../models/movie.model';
import { Genres } from '../../models/genres.model';
import { PRIMARY_COLOR } from '../../styles/constants';
import StyledSelect from '../StyledSelect/StyledSelect';
import { mapMovieToForm } from '../../helpers/functions';


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

const ErrorText = styled('span')`
  display: inline-block;
  margin-top: 5px;
  font-size: 14px;
  color: ${PRIMARY_COLOR};
`;

type Props = {
  movie?: Movie;
  onChange?: (movie: MovieDTO) => void;
}

export type GenreOption = { label: Genres; value: string; };

export type MovieFormType = {
  title: string;
  tagline?: string;
  vote_average: number;
  vote_count?: number;
  release_date: string;
  poster_path: string;
  overview: string;
  budget?: number;
  revenue?: number;
  runtime: number;
  genres: GenreOption[];
};

export type MovieDTO = Omit<MovieFormType, 'genres'> & { genres: string[]; id?: number };

function MovieForm({ movie, onChange }: Props) {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<MovieFormType>({ shouldUseNativeValidation: false });

  const defaultMovieForm: MovieFormType = mapMovieToForm(movie);

  const onReset = () => {
    reset(defaultMovieForm);
  }

  const onSubmit = (data: MovieFormType) => {
    const movieDto: MovieDTO = {...data, genres: data.genres.map(g => g.value)};
    onChange && onChange(movieDto);
  }

  const options = Object.values(Genres).slice(1).map(value => ({
    value: value as string,
    label: value.toString(),
  }));

  return (
    <MovieFormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      <MovieFormRow>
        <MovieFormLeftCol>
          <LabeledInput label={'Name'}>
            <Input
              type={'text'}
              defaultValue={movie?.movieName}
              placeholder={'Enter a name of movie'}
              { ...register('title', {required: true})}
            />
            {errors.title && <ErrorText>Movie name is required</ErrorText>}
          </LabeledInput>
        </MovieFormLeftCol>
        <MovieFormRightCol>
          <LabeledInput label={'Release Year'}>
            <Input
              type={'number'}
              defaultValue={movie?.releaseYear}
              min={1900}
              max={new Date().getFullYear()}
              placeholder={'Select Year'}
              {...register('release_date', {min: 1900, max: new Date().getFullYear()})}
            />
            {errors.release_date?.type === 'min' && <ErrorText>Rating must be greater than 1900</ErrorText>}
            {errors.release_date?.type === 'max' && <ErrorText>Rating must be less than {new Date().getFullYear()}</ErrorText>}
          </LabeledInput>
        </MovieFormRightCol>
      </MovieFormRow>
      <MovieFormRow>
        <MovieFormLeftCol>
          <LabeledInput label={'Movie Image URL'}>
            <Input
              type={'url'}
              defaultValue={movie?.imageUrl}
              placeholder={'https://'}
              {...register('poster_path', {required: true})}
            />
            {errors.poster_path && <ErrorText>Movie poster URL is required</ErrorText>}
          </LabeledInput>
        </MovieFormLeftCol>
        <MovieFormRightCol>
          <LabeledInput label={'Rating'}>
            <Input
              type={'number'}
              defaultValue={movie?.rating}
              placeholder={'7.8'}
              {...register('vote_average', {min: 0, max: 10})}
            />
            {errors.vote_average?.type === 'min' && <ErrorText>Rating must be greater than 0</ErrorText>}
            {errors.vote_average?.type === 'max' && <ErrorText>Rating must be less than 10</ErrorText>}
          </LabeledInput>
        </MovieFormRightCol>
      </MovieFormRow>
      <MovieFormRow>
        <MovieFormLeftCol>
          <LabeledInput label={'Genre'}>
            <Controller
              name={'genres'}
              control={control}
              rules={{required: true}}
              render={({ field }) => {
                return (
                  <StyledSelect
                    classNames={{
                      control: (state) => state.isFocused ? 'focused' : ''
                    }}
                    placeholder={'Select Genre'}
                    options={options}
                    isMulti
                    {...field}
                  />
                );
              }}
            />
            {errors.genres && <ErrorText>Select at least one genre to proceed</ErrorText>}
          </LabeledInput>
        </MovieFormLeftCol>
        <MovieFormRightCol>
          <LabeledInput label={'Runtime (min)'}>
            <Input
              type={'number'}
              defaultValue={movie?.duration}
              placeholder={'Minutes'}
              {...register('runtime', {required: true})}
            />
            {errors.runtime && <ErrorText>Runtime is required</ErrorText>}
          </LabeledInput>
        </MovieFormRightCol>
      </MovieFormRow>
      <MovieFormRow>
        <MovieFormLeftCol>
          <LabeledInput label={'Overview'}>
            <Textarea
              placeholder={'Movie Description'}
              defaultValue={movie?.description}
              {...register('overview')}
            />
          </LabeledInput>
        </MovieFormLeftCol>
      </MovieFormRow>
      <MovieFormRow>
        <Button
          type={'reset'}
          theme={'secondary'}
          onClick={onReset}
        >
          Reset
        </Button>
        <SubmitButton type={'submit'}>Submit</SubmitButton>
      </MovieFormRow>
    </MovieFormContainer>
  );
}

export default MovieForm;
