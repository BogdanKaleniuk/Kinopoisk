"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { actorDetails, actorDetailsFilm } from "@/utils/api";
import Loader from "@/components/Loader";
import Image from "next/image";
export default function ActorPage() {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const actorData = await actorDetails(id);
      const actorMovies = await actorDetailsFilm(id);
      console.log("actorData.profile_path:", actorData.profile_path);

      setActor(actorData);
      setMovies(actorMovies.cast || []);
    }
    fetchData();
  }, [id]);

  if (!actor) return <Loader />;
  return (
    <main className="p-6">
      <div></div>

      <h1 className="text-3xl font-bold mb-2">{actor.name}</h1>
      <p>Birthday: {actor.birthday}</p>
      <p>Known for: {actor.known_for_department}</p>
      <p>Акьтора</p>

      <h2 className="text-2xl mt-6 mb-2">Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} ({movie.release_date})
          </li>
        ))}
      </ul>
    </main>
  );
}
