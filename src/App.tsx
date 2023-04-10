import React from 'react';
import './App.scss';
import Counter from './components/Counter/Counter';
import Search from './components/Search/Search';
import GenreSelect from './components/GenreSelect/GenreSelect';
import { Genres } from './models/genres.model';


function App() {

  const genres = Object.values(Genres);

  const handleSearch = (text: string) => {
    console.log('searched value:', text)
  }

  const handleGenreSelect = (genre: Genres) => {
    console.log('selected genre: ', genre);
  }

  return (
    <div className="app">
      <header className="app-header" data-testid="app-header">
        <Counter/>
        <Search initialValue={''} onSearch={handleSearch}/>
        <GenreSelect genres={genres} onSelect={handleGenreSelect}/>
      </header>
    </div>
  )
}

export default App;
