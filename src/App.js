
import React, { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';


function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = 'http://www.omdbapi.com?apikey=e9f4b8a9';
  const searchMovies = async (tittle) => {
    const response = await fetch(`${API_URL} &s=${tittle}`);
    const data = await response.json();
    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies('spiderman');
  }, [])

  const setTermHandler = (event) => {
    setSearchTerm(event.target.value)

  }

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input placeholder='search for movies'
          value={searchTerm}
          onChange={setTermHandler} />
        <img src={SearchIcon} alt="searchIcon"
          onClick={() => {
            searchMovies(searchTerm)

          }} />
      </div>

      {movies?.length > 0 ?
        (<div className='container'>
          {movies.map((movie, i) => {
            return <MovieCard movie={movie} key={i} />
          })}
        </div>)
        :
        (<div className='empty'>
          <h2>No Movies Found</h2>
        </div>)}

    </div>
  );
}

export default App;
