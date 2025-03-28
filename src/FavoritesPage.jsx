import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Favorite.css";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  // Загружаем избранные игры из localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Удаление игры из избранного
  const removeFavorite = (gameId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== gameId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

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

      <h1>Избранные игры</h1>

      {favorites.length > 0 ? (
        <ul className="games-list">
          {favorites.map((game) => (
            <li key={game.id} className="game-item">
              <Link to={`/details/${game.id}`}>
                <img src={game.background_image} alt={game.name} width="200" />
                <h2>{game.name}</h2>
              </Link>
              <button
                onClick={() => removeFavorite(game.id)}
                className="remove-button"
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет избранных игр</p>
      )}
    </div>
  );
}

export default FavoritesPage;