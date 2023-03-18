import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Counter from './components/Counter/Counter';
import Search from './components/Search/Search';
import ResultsFilter from './components/ResultsFilter/ResultsFilter';
import { Genres } from './models/genres.model';

class App extends React.Component {

  private genres = Object.values(Genres).map((genre, id) => ({ id, genre }));

  render() {
    return <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" data-testid="react-logo"/>
        <Counter/>
        <Search initialValue={''} onSearch={this.handleSearch}/>
        <ResultsFilter genres={this.genres} onSelect={this.handleGenreSelect}/>
      </header>
    </div>
  }

  private handleSearch = (text: string) => {
    console.log('searched value:', text)
  }

  private handleGenreSelect = (genre: Genres) => {
    console.log('selected genre: ', genre);
  }
}

export default App;
