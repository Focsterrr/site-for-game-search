import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './DetailPage.css'; // Импорт стилей

function DetailPage() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const apiKey = import.meta.env.VITE_RAWG_API_KEY;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${apiKey}`
        );
        setGame(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
    fetchGameDetails();
  }, [id, apiKey]);

  if (!game) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="detail-page">
      <button className="back-button" onClick={() => navigate("/")}>
        Назад
      </button>
      <h1>{game.name}</h1>
      <img src={game.background_image} alt={game.name} width="400" />
      
      {/* Использование dangerouslySetInnerHTML */}
      <div 
        className="description" 
        dangerouslySetInnerHTML={{ __html: game.description }} 
      />
      
      <p className="rating">Рейтинг: {game.rating}</p>
      <p className="release-date">Дата выпуска: {game.released}</p>
    </div>
  );
}


export default DetailPage;
