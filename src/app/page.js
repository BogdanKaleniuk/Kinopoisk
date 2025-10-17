"use client";

import { useState, useEffect } from "react";

import SearchBar from "@/components/SearchBar";
import MovieList from "@/components/MovieList";

import Loader from "@/components/Loader";
import { fetchNowPlayingMovies, searchMovies } from "@/utils/api";
import { useSearchParams } from "next/navigation";
export default function Home() {
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👉 Спочатку показуємо новинки
  useEffect(() => {
    async function getNowPlaying() {
      const data = await fetchNowPlayingMovies();
      setMovies(data);
      setLoading(false);
    }
    getNowPlaying();
  }, []);

  // 👉 Функція пошуку (викликається з SearchBar)
  const handleSearch = async (query) => {
    if (!query) {
      const data = await fetchNowPlayingMovies();
      setMovies(data);
      setLoading(false);
      return;
    }
    const data = await searchMovies(query);
    setMovies(data);
    setLoading(false);
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Kinopoisk</h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? <Loader /> : <MovieList movies={movies} />}
    </main>
  );
}
