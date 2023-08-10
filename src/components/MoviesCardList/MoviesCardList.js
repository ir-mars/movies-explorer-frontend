import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';

function MoviesCardList (props) {
  const {
    movies,
    isLoading,
    invisibleFilms,
    handleClickButtonMore,
    savedMovies,
    onLike,
    onDislike } = props;

  // вытащим ID сохраненных карточек, чтобы потом показывать лайки только для них
  const [savedMovieIds, setSavedMovieIds] = useState([]);
  useEffect(() => {
    setSavedMovieIds(savedMovies.map((movie) => movie.movieId))
  }, [savedMovies])

  return (
    <section className="movies-list" aria-label="Секция с карточками фильмов">
      {movies.length ? (
        <ul className="movies-card__list">
          {movies.map((movie) => {
            return (
              <MoviesCard
                movie={movie}
                onLike={onLike}
                onDislike={onDislike}
                key={movie.id
                  ? movie.id
                  : movie._id}
                liked={savedMovieIds.includes(movie.id)}
              />)
          })} 
        </ul>
      ) : !isLoading ? <h3 className="movies-card-list__title">Список фильмов пуст</h3> : ""}
      {isLoading ? <Preloader /> : ""}

      {invisibleFilms?.length ?
        <button type="button" className="movies-card__button" onClick={handleClickButtonMore}>
          Ещё
        </button> : ""}
    </section>  
  )  
}

export default MoviesCardList;