import React, { useEffect, useState } from "react";
import { fetchNextPlayingMovies, fetchNowPlayingMovies } from "./api";
import { Link } from "react-router-dom"; // використовуємо Link для переходу на сторінку фільму

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // Додаємо стан для сторінки
  const [loading, setLoading] = useState(false); // Стан для завантаження
  const [hasMore, setHasMore] = useState(true); // Перевірка на наявність ще фільмів для завантаження

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchNowPlayingMovies();
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchNextPlayingMovies(page); // Передаємо сторінку
        if (data.length > 0) {
          setMovies((prevMovies) => [...prevMovies, ...data]); // Додаємо нові фільми до списку
        } else {
          setHasMore(false); // Якщо даних більше немає
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [page]); // Завантаження фільмів при зміні сторінки
  const loadMoreMovies = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1); // Завантажуємо наступну сторінку
    }
  };
  return (
    <div>
      <h1>Новинки кіно</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {movies.map((movie) => (
          <div key={movie.id} style={{ width: "200px" }}>
            <Link to={`/films/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </Link>
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>

      {hasMore && (
        <button onClick={loadMoreMovies}>
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
};
export default Home;
