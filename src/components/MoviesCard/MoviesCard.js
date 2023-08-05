import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { timeConvertor } from '../../utils/utils';

function MoviesCard ({ image, nameRU, duration, liked }) {
  const location = useLocation();
  const [isLiked, setIsLiked] = useState(false);
    
  function handleLikeClick () {
    setIsLiked(!isLiked);  
  };

  return (
    <li className="movies-card__item">
      <img
        className="movies-card__img"
        src={image}
        alt={nameRU}
      />
      <div className="movies-card__container">
        <h3 className="movies-card__title">{nameRU}</h3>
        {location.pathname=== "/movies" ? (
          <button
            type="button"
            className={`card__like-button${isLiked ? "card__like-button_active" : ""}`}
            onClick={handleLikeClick} />
        ) : (
          <button 
            type="button"
            className="card__delete-button" />
        )
        }
      </div>
      <p className="movies-card__duration">{timeConvertor(duration)}</p>
    </li>
  )
}

export default MoviesCard; 
  