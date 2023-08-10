import './MoviesCard.css';
import { timeConvertor } from '../../utils/utils';
import { mainServerUrl } from '../../utils/MoviesApi';

function MoviesCard (props) {
  const {
    movie,
    liked,
    onLike,
    onDislike
  } = props;
  const {
    image,
    nameRU,
    duration,
    trailerLink
  } = movie;
  const imageUrl = image.length ? image : `${mainServerUrl}${image.url}`;
  const thumbnail = `${mainServerUrl}${image.previewUrl}`
  const id = movie.movieId
    ? movie.movieId
    : movie.id;

    function handleClickLike () {
      onLike({ ...movie, thumbnail })
    }
    
    function handleClickDislike () {
      onDislike(id)
    }

  return (
    <li className="movies-card__item">
      <img
        className="movies-card__img"
        src={imageUrl}
        alt={nameRU}
        onClick={() => window.open(trailerLink, '_blank')}
      />
      <div className="movies-card__container">
        <h3
          className="movies-card__title"
          onClick={() => window.open(trailerLink, '_blank')}
        >{nameRU}</h3>
        {onLike ? (
          <button
            type="button"
            className={`card__like-button ${liked ? "card__like-button_active" : ""}`}
            onClick={liked ? handleClickDislike : handleClickLike} />
        ) : (
          <button 
            type="button"
            className="card__delete-button"
            onClick={handleClickDislike}
          />
        )
        }
      </div>
      <p className="movies-card__duration">{timeConvertor(duration)}</p>
    </li>
  )
}

export default MoviesCard;  