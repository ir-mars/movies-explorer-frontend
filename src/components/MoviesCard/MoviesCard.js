import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { timeConvertor } from '../../utils/utils';
import { urlServer } from '../../utils/MoviesApi';

function MoviesCard (props) {
  const {
    movie,
    liked,
    onLike,
    onDislike
  } = props;
  const { image, nameRU, duration, trailerLink } = movie;
  const imageUrl = image.length ? image : `${urlServer}${image.url}`;
  const thumbnail = `${urlServer}${image.previewUrl}`
  const id = movie.movieId
    ? movie.movieId
    : movie.id;
  
  function handleLikeButtonClick () {
    onLike({ ...movie, thumbnail })
  }

  function handleDislikeButtonClick () {
    onDislike(id)
  }
  
  // переход по ссылке на трейлер
  function handleClickMovieCard () {
    window.open(trailerLink, "_blank");
  }

  return (
    <li className="movies-card__item">
      <img
        className="movies-card__img"
        src={imageUrl}
        alt={nameRU}
        onClick={handleClickMovieCard}
      />
      <div className="movies-card__container">
        <h3 className="movies-card__title" onClick={handleClickMovieCard}>{nameRU}</h3>
        {onLike ? (
          <button
            type="button"
            className={`card__like-button${isLiked ? "card__like-button_active" : ""}`}
            onClick={liked ? handleDislikeButtonClick : handleLikeButtonClick} />
        ) : (
          <button 
            type="button"
            className="card__delete-button"
            onClick={handleDislikeButtonClick}
          />
        )
        }
      </div>
      <p className="movies-card__duration">{timeConvertor(duration)}</p>
    </li>
  )
}

export default MoviesCard;  