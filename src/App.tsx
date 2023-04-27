import React from 'react';
import './App.scss';

import MovieListPage from './components/MovieListPage/MovieListPage';


function App() {
  return (
    <div className="app">
      <header className="app-header" data-testid="app-header">
        <MovieListPage></MovieListPage>
      </header>
    </div>
  )
}

export default App;
