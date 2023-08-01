import './MoviesCard.css';
import { useState } from 'react';
import { timeConvertor } from '../../utils/utils';

function MoviesCard ({ image, nameRU, duration, liked }) {
  /*const { image, nameRU, duration, liked } = movie;*/
  const [isLiked, setIsLiked] = useState();

  function handleLikeClick () {
    setIsLiked(!isLiked)  
  };
  
  return (
    <li className="movies-card__item">
      <img
        className="movies-card__img"
        src={image}
        alt={nameRU} />
      <div className="movies-card__container">
        <h3 className="movies-card__title">{nameRU}</h3>
        <button
          type="button"
          className={`card__like-button${isLiked ? "card__like-button_active" : ""}`}
          onClick={handleLikeClick}
          /*title={`${isLiked ? "Удалить из избранного" : "Добавить в избранное"}`}*/
        ></button>
      </div>
      <p className="movies-card__duration">{timeConvertor(duration)}</p>
    </li>
  )
}

export default MoviesCard; 
  