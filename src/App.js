import { useEffect, useState } from "react";
import './App.css';
import MovieCard from "./MovieCard";
import SearchIcon from './search.svg';
import useDebounce from "./useDebounce";

const API_URL = 'http://www.omdbapi.com?apikey=27a9d1b3'

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  useEffect(
    () => {
      // Make sure we have a value (user has entered something in input)
      if (debouncedSearchTerm) {
        // Set isSearching state
        setLoading(true);
        // Fire off our API call
        searchMovie(debouncedSearchTerm);

        setLoading(false);

      } else {
        searchMovie('')
      }
    },
    // This is the useEffect input array
    // Our useEffect function will only execute if this value changes ...
    // ... and thanks to our hook it will only change if the original ...
    // value (searchTerm) hasn't changed for more than 500ms.
    [debouncedSearchTerm]
  );

  // useEffect(()=>{
  //   if(searchTerm.trim()) {
  //     searchMovie(searchTerm);
  //   }
  // }, [searchTerm]);
  
  useEffect(()=>{
    searchMovie('')
  }, []);
 
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="app">
      <h1>Movie App</h1>

      <div className="search">
        <input         
          type="text"
          placeholder="Search Movies"
          value={searchTerm}
          onChange={handleSearchTermChange}          
        />
        <img src={SearchIcon} alt="search" onClick={()=>searchMovie(searchTerm)}/>
      </div>
      {loading ? 'Dang tai' : <>{movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}</>}
      
    </div>
  );
}

export default App;
