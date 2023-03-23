import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Counter from './components/Counter/Counter';
import Search from './components/Search/Search';
import GenreSelect from './components/GenreSelect/GenreSelect';
import { Genres } from './models/genres.model';

function App() {

  const genres = Object.values(Genres).map((genre, id) => ({ id, genre }));

  const handleSearch = (text: string) => {
    console.log('searched value:', text)
  }

  const handleGenreSelect = (genre: Genres) => {
    console.log('selected genre: ', genre);
  }

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" data-testid="react-logo"/>
        <Counter/>
        <Search initialValue={''} onSearch={handleSearch}/>
        <GenreSelect genres={genres} onSelect={handleGenreSelect}/>
      </header>
    </div>
  )
}

export default App;
