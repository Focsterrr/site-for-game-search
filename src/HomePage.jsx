import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

function HomePage() {
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const apiKey = import.meta.env.VITE_RAWG_API_KEY;

  const fetchGames = async (query = "") => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${apiKey}&search=${query}`
      );
      setGames(response.data.results);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  const toggleFavorite = (game) => {
    const isFavorite = favorites.some((fav) => fav.id === game.id);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== game.id);
    } else {
      updatedFavorites = [...favorites, game];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    fetchGames(searchQuery);
  }, [searchQuery]);

  return (
    <div className="container">
      {/* Навигационное меню */}
      <nav className="nav-menu">
        <Link to="/" className="nav-button">
          🏠 Главная
        </Link>
        <Link to="/favorites" className="nav-button">
          ⭐ Избранное
        </Link>
      </nav>

      <h1>Список игр</h1>

      {/* Поле поиска */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Поиск игр..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Список игр */}
      <ul className="games-list">
        {games.map((game) => (
          <li key={game.id} className="game-item">
            <Link to={`/details/${game.id}`}>
              <img src={game.background_image} alt={game.name} width="200" />
              <h2>{game.name}</h2>
            </Link>
            <button
              onClick={() => toggleFavorite(game)}
              className={`favorite-button ${
                favorites.some((fav) => fav.id === game.id) ? "active" : ""
              }`}
            >
              {favorites.some((fav) => fav.id === game.id)
                ? "Удалить из избранного"
                : "В избранное"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;