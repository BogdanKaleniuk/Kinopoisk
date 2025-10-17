"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  actorDetails,
  actorDetailsFilm,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovieReviews,
} from "@/utils/api";
import Loader from "@/components/Loader";
export default function MoviePage() {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // overview | actors | reviews | actorDetail
  const [actors, setActors] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);

  useEffect(() => {
    async function getMovie() {
      const data = await fetchMovieDetails(id);
      setMovie(data);
      const credits = await fetchMovieCredits(id);
      setActors(credits);

      const revs = await fetchMovieReviews(id);
      setReviews(revs);
    }

    getMovie();
  }, [id]);

  if (!movie) return <Loader />;

  const handleActorClick = async (actorId) => {
    const data = await actorDetails(actorId);
    const filmsData = await actorDetailsFilm(actorId);
    setSelectedActor({ ...data, movies: filmsData.cast });
    setActiveTab("actorDetail");
  };

  return (
    <main className="p-6">
      <button
        onClick={() => router.back()}
        state={{ query: location.state?.searchQuery }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")} // Тінь при наведенні
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")} // Відновлення кольору
      >
        Назад до пошуку
      </button>

      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/placeholder-movie.jpg"
        }
        alt={movie.title}
        width={300}
        height={350}
        className="rounded-lg shadow-md mb-4 max-w-sm"
      />

      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Rating: {movie.vote_average}</p>
      <p>Release: {movie.release_date}</p>
      {activeTab !== "actorDetail" && (
        <div className="flex gap-2 mt-6 mb-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded ${
              activeTab === "overview"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("actors")}
            className={`px-4 py-2 rounded ${
              activeTab === "actors" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Actors
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-2 rounded ${
              activeTab === "reviews" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Reviews
          </button>
        </div>
      )}
      {activeTab === "overview" && <p className="mt-2">{movie.overview}</p>}

      {activeTab === "actors" && (
        <ul className="mt-2">
          {actors.map((actor) => (
            <li
              key={actor.id}
              className="cursor-pointer hover:underline"
              onClick={() => handleActorClick(actor.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                width={100}
                height={150}
              />
              <p>
                {actor.name} as {actor.character}
              </p>
            </li>
          ))}
        </ul>
      )}

      {activeTab === "reviews" && (
        <ul className="mt-2">
          {reviews.length === 0 && <p>No reviews yet.</p>}
          {reviews.map((rev) => (
            <li key={rev.id} className="mb-2">
              <p className="font-semibold">{rev.author}</p>
              <p>{rev.content}</p>
            </li>
          ))}
        </ul>
      )}
      {activeTab === "actorDetail" && selectedActor && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <button
            onClick={() => setActiveTab("actors")}
            className="mb-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Back to Actors
          </button>
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedActor.profile_path}`}
            alt={selectedActor.name}
            width={300}
            height={450}
          />
          <h2 className="text-2xl font-bold">{selectedActor.name}</h2>
          <p>Birthday: {selectedActor.birthday}</p>

          <p>Known for: {selectedActor.known_for_department}</p>
          <p>
            Biography: {selectedActor.biography || "No biography available."}
          </p>
          <h3>Movies:</h3>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {selectedActor.movies?.map((movie) => (
              <li
                key={movie.id}
                className="text-center cursor-pointer hover:scale-105 transition-transform"
                onClick={() => {
                  setActiveTab("overview");
                  setSelectedActor(null);
                  router.push(`/movie/${movie.id}`);
                }}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : "/placeholder-movie.jpg"
                  }
                  alt={movie.title}
                  className="w-full h-auto rounded"
                />
                <p className="mt-1">{movie.title}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
