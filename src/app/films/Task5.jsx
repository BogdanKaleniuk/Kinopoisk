import React from "react";
import Home from "./Home";
import { Routes, Route, NavLink } from "react-router-dom";
import MoviesSearch from "./MoviesList";
import MovieDetails from "./MovieDetails";
import ActorDetails from "./ActorDetails";
import MoviesLayout from "./MoviesLayout";

const Task5 = () => {
  return (
    <div className="p-4">
      <nav className="mb-4 flex space-x-4 border-b pb-2">
        <NavLink
          to="/films/home"
          style={({ isActive }) => ({
            marginRight: "10px",
            color: isActive ? "blue" : "black",
          })}
          className={({ isActive }) =>
            `text-lg px-2 py-1 rounded transition-colors duration-200 ${
              isActive
                ? "text-white bg-blue-600"
                : "text-gray-800 hover:text-blue-600"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/films/movies"
          style={({ isActive }) => ({
            color: isActive ? "blue" : "black",
          })}
          className={({ isActive }) =>
            `text-lg px-2 py-1 rounded transition-colors duration-200 ${
              isActive
                ? "text-white bg-blue-600"
                : "text-gray-800 hover:text-blue-600"
            }`
          }
        >
          Movies
        </NavLink>
      </nav>

      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="movies" element={<MoviesLayout />}>
          <Route index element={<MoviesSearch />} />
          <Route path=":id" element={<MovieDetails />} />
          <Route path=":id/:tab" element={<MovieDetails />} />
          <Route path=":movieId/actors/:actorID" element={<ActorDetails />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Task5;
