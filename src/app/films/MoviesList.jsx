import React, { useEffect, useState } from "react";
import { searchMovies } from "./api";
import { Link, useLocation } from "react-router-dom";

const MoviesSearch = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (!query) return;

    const load = async () => {
      try {
        const data = await searchMovies(query);
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    };
    load();
  }, [query]);

  useEffect(() => {
    if (location.state?.query) {
      setQuery(location.state.query);
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Movie List</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="mb-6 p-2 border border-gray-300 rounded-md w-full max-w-md"
      />
      <div className="flex flex-wrap gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="w-48">
            <Link
              to={`/films/movies/${movie.id}`}
              state={{ from: location, searchQuery: query }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded-md shadow-md"
              />
              <p className="mt-2 text-sm font-medium">{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesSearch;
