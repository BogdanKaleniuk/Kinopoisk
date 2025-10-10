// src/api.js
import axios from "axios";

const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODgwZjEwMjA4MTI5ZGY0MDVmMGYzZDUyNjQxNDFlZSIsIm5iZiI6MTY2NjM0MjEwNy4xMzMsInN1YiI6IjYzNTI1Y2RiOTU5MGUzMDA5MTVhZjA5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vKfXAl-0fdHQ-PP0LkuqkdAPs9Ooz8DxPdxqCEDg9Ss";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: API_KEY,
  },
});
export const fetchNowPlayingMovies = async () => {
  const response = await axiosInstance.get(
    "/movie/now_playing?language=en-US&page=1"
  );
  return response.data.results;
};
export const searchMovies = async (query) => {
  const response = await axiosInstance.get(`/search/movie`, {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });
  return response.data.results;
};
export const fetchMovieDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/movie/${id}?language=en-US`);
    console.log("API response:", response.data); // Перевірка відповіді API
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error; // Викидаємо помилку для обробки в компоненті
  }
};
export const fetchMovieCredits = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/movie/${id}/credits?language=en-US`
    );
    return response.data.cast;
  } catch (error) {
    console.error("Error fetching actors:", error);
    throw error;
  }
};
export const fetchMovieReviews = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/movie/${id}/reviews?language=en-US`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};
export const fetchNextPlayingMovies = async (page = 1) => {
  try {
    const response = await axiosInstance.get(
      `/movie/now_playing?language=en-US&page=${page}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error page", error);
    throw error;
  }
};
export const actorDetails = async (actorID) => {
  const response = await axiosInstance.get(`/person/${actorID}?language=uk-UA`);
  console.log("Актор", response.data);
  return response.data;
};
export const actorDetailsFilm = async (actorID) => {
  const response = await axiosInstance.get(
    `/person/${actorID}/movie_credits?language=uk-UA`
  );
  console.log("Fils actor", response.data);
  return response.data;
};
