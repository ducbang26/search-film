import React from 'react';

const MovieCard = ({ movie: { release_date, poster_path, title, Type } }) => {
  return (
    <div className="movie" >
      <div>
        <p>{release_date}</p>
      </div>

      <div>
        <img src={poster_path !== "N/A" ? `https://image.tmdb.org/t/p/w500${poster_path}` : "https://via.placeholder.com/400"} alt={title} />
      </div>

      <div>
        <span>{Type}</span>
        <h3>{title}</h3>
      </div>
    </div>
  );
}

export default MovieCard;