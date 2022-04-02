import { useEffect, useState } from "react";
import './App.css';
import Loading from "./components/Loading/Loading";
import MovieCard from "./components/MovieCard/MovieCard";
import SearchIcon from './search.svg';
import useDebounce from "./hook/useDebounce";

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'api_key=4f60185c585c69c847c6c83048cb86ab';
const API_URL = BASE_URL + 'discover/movie?api_key=4f60185c585c69c847c6c83048cb86ab&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate';
const API_SEARCH = "https://api.themoviedb.org/3/search/movie?"

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const getMovie = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setMovies(data.results);
  }

  const searchMovie = async (title) => {
    const response = await fetch(`${API_SEARCH + API_KEY}&query=${title}`);
    const data = await response.json();
    console.log(data);
    setMovies(data.results);
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
        setLoading(true);
        getMovie(API_URL);
        setLoading(false);
      }
    },
    // This is the useEffect input array
    // Our useEffect function will only execute if this value changes ...
    // ... and thanks to our hook it will only change if the original ...
    // value (searchTerm) hasn't changed for more than 500ms.
    [debouncedSearchTerm]
  );
 
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
      {loading ? <Loading /> : <>{movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
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