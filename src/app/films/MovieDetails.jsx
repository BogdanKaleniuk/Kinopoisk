import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchMovieCredits, fetchMovieDetails, fetchMovieReviews } from "./api";
import { Link } from "react-router-dom"; // використовуємо Link для переходу на сторінку фільму

const MovieDetails = () => {
  const { id } = useParams(); // Отримуємо id з URL
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null); // Додано для обробки помилок
  const [actors, setActors] = useState([]); // Актори
  const [reviews, setReviews] = useState([]); // Рев'ю
  const [activeTab, setActiveTab] = useState("overview"); // Для вкладок
  const navigate = useNavigate(); // Для зміни маршруту
  const location = useLocation();
  console.log("Nash location", location);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        console.log("Fetching movie details for id:", id); // Перевірка id
        const data = await fetchMovieDetails(id);
        console.log("Movie details fetched:", data); // Перевірка відповіді API
        setMovieDetails(data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Не вдалося завантажити деталі фільму");
      }
    };
    loadMovieDetails();
  }, [id]);

  useEffect(() => {
    const loadActors = async () => {
      try {
        const data = await fetchMovieCredits(id);
        setActors(data);
      } catch (err) {
        setError("Не вдалося завантажити акторів");
      }
    };
    if (movieDetails) {
      loadActors();
    }
  }, [id, movieDetails]);

  // Завантажуємо рев'ю
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchMovieReviews(id);
        setReviews(data);
      } catch (err) {
        setError("Не вдалося завантажити рев'ю");
      }
    };
    if (movieDetails) {
      loadReviews();
    }
  }, [id, movieDetails]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!movieDetails) {
    return <div>Завантаження...</div>;
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/films/movies/${id}/${tab}`);
  };

  const getActorImage = (profile_path) => {
    return profile_path
      ? `https://image.tmdb.org/t/p/w500${profile_path}`
      : "https://images.kinobaza.com.ua/w2000/656962d76de63.jpg.webp";
  };
  const backLink = location.state?.from?.pathname || "/films/home";
  return (
    <div style={{ display: "flex", padding: "20px" }}>
      {/* Лівий блок */}
      <div style={{ width: "300px", marginRight: "20px" }}>
        <h1>{movieDetails.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          style={{ width: "300px" }}
        />
      </div>
      {/* Правий блок з вкладками */}
      <div style={{ flex: 1, position: "relative" }}>
        <Link
          to={backLink}
          state={{ query: location.state?.searchQuery }}
          style={{
            height: "40px",
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#4CAF50", // Зелений колір для кнопки
            color: "white", // Білий текст
            textDecoration: "none", // Прибираємо підкреслення
            borderRadius: "5px", // Круглі кути
            textAlign: "center", // Вирівнювання тексту по центру
            fontSize: "16px", // Розмір шрифту
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Тінь для кнопки
            transition: "background-color 0.3s, transform 0.2s", // Анімація при наведенні
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")} // Тінь при наведенні
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")} // Відновлення кольору
        >
          Назад до пошуку
        </Link>
        {/* Кнопки вкладок */}
        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => handleTabChange("overview")}>Огляд</button>
          <button onClick={() => handleTabChange("actors")}>Актори</button>
          <button onClick={() => handleTabChange("reviews")}>Рев'ю</button>
        </div>

        {/* Контент для вкладки */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {activeTab === "overview" && (
            <div style={{ maxWidth: "100%" }}>
              <p>{movieDetails.overview}</p>
              <p>Release Date: {movieDetails.release_date}</p>
              <p>Popularity: {movieDetails.popularity}</p>
              <p>
                Budget:{" "}
                {movieDetails.budget.toLocaleString("en-US").replace(/,/g, " ")}{" "}
                $
              </p>
              <p>
                Production Companies:{" "}
                {movieDetails.production_companies
                  .map((company) => company.name)
                  .join(", ")}
              </p>
            </div>
          )}

          {activeTab === "actors" && (
            <div style={{ maxWidth: "100%" }}>
              <h2>Актори</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {actors.map((actor) => (
                  <div key={actor.id} style={{ width: "150px" }}>
                    <img
                      src={getActorImage(actor.profile_path)}
                      alt={actor.name}
                      style={{ width: "100%" }}
                    />
                    <Link to={`/films/movies/${id}/actors/${actor.id}`}>
                      <p
                        style={{
                          cursor: "pointer",
                          color: "blue",
                          textDecoration: "underline",
                        }}
                      >
                        {actor.name}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div style={{ maxWidth: "100%" }}>
              <h2>Рев'ю</h2>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} style={{ marginBottom: "20px" }}>
                    <h3>{review.author}</h3>
                    <p>{review.content}</p>
                  </div>
                ))
              ) : (
                <p>Немає рев'ю для цього фільму.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
