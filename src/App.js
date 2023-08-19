import React, { useState, useEffect } from 'react';
import SearchIcon from './search.svg';
import './App.css';
import MovieCard from './Components/MovieCard';

const API_URL = 'http://www.omdbapi.com/?apikey=f52ce215';

const movie1={
  "Title": "Italian Spiderman",
  "Year": "2007",
  "imdbID": "tt2705436",
  "Type": "movie",
  "Poster": "N/A"
}

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('spiderman');
  }, []);

  const handleSearchChange = (event) => {
    setSearchTitle(event.target.value);
  }

  const handleSearchClick = () => {
    searchMovies(searchTitle);
  }

  return (
    <div className="app">
      <h1>movieland</h1>  

      <div className="search">
        <input
          placeholder="what are you searching for ?"
          value={searchTitle}
          onChange={handleSearchChange}
        />
        <img src={SearchIcon} alt="search" onClick={handleSearchClick} />
      </div>
    {
      movies?.length > 0
      ?(
<div className="container">
  {movies.map((movie)=>(
      <MovieCard movie={movie} />
  ))}
       
    
      </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )
    }
      
    </div>
  );  
}

export default App;
