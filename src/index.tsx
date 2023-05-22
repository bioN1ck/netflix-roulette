import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import MovieListPage from './components/MovieListPage/MovieListPage';
import MovieDetailsSection, { loader as movieLoader } from './components/MovieDetailsSection/MovieDetailsSection';
import MovieSearchSection from './components/MovieSearchSection/MovieSearchSection';
import AddMovieForm from './components/AddMovieForm/AddMovieForm';
import EditMovieForm from './components/EditMovieForm/EditMovieForm';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MovieListPage />,
    children: [
      {
        path: '/',
        element: <MovieSearchSection />,
        children: [
          {
            path: 'new',
            element: <AddMovieForm />
          }
        ]
      },
      {
        path: ':movieId',
        loader: movieLoader,
        element: <MovieDetailsSection />,
        children: [
          {
            path: 'edit',
            element: <EditMovieForm />
          }
        ]
      }
    ]
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
