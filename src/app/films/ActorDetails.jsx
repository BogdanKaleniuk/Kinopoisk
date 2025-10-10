import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { actorDetails, actorDetailsFilm } from "./api";

const ActorDetails = () => {
  const { actorID, movieID } = useParams();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [filmOpen, setFilmOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const actorData = await actorDetails(actorID);
        const moviesData = await actorDetailsFilm(actorID);

        setActor(actorData);
        setMovies(moviesData.cast);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [actorID]);

  if (error) return <p>{error}</p>;
  if (!actor) return <p>Завантаження...</p>;
  const handleFilms = () => {
    setFilmOpen((prev) => !prev); // перемикає true/false
  };
  return (
    <div>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
          alt={actor.name}
          style={{ width: "30%" }}
        />{" "}
        <h1>{actor.name}</h1>
        <p>Дата народження: {actor.birthday}</p>
        <button onClick={handleFilms}>
          {filmOpen ? "Hide films list" : "Show films list"}
        </button>
        {filmOpen && (
          <ul>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <li key={movie.id}>
                  <p>
                    {" "}
                    {movie.original_title} ({movie.release_date?.slice(0, 4)})
                  </p>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    style={{ width: "10%" }}
                  />{" "}
                </li>
              ))
            ) : (
              <li>Немає фільмів для цього актора.</li>
            )}
          </ul>
        )}
        <p>Біографія: {actor.biography}</p>
      </div>
    </div>
  );
};

export default ActorDetails;
