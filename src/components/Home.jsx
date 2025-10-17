"use client";

import { useState, useEffect } from "react";

import SearchBar from "@/components/SearchBar";
import MovieList from "@/components/MovieList";

import Loader from "@/components/Loader";
import { fetchNowPlayingMovies, searchMovies } from "@/utils/api";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👉 Спочатку показуємо новинки
  useEffect(() => {
    async function getMovies() {
      setLoading(true);
      try {
        if (query.trim() !== "") {
          const data = await searchMovies(query);
          setMovies(data);
        } else {
          const data = await fetchNowPlayingMovies();
          setMovies(data);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }

    getMovies();
  }, [query]);

  return <>{loading ? <Loader /> : <MovieList movies={movies} />}</>;
}
