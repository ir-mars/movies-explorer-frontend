import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';

function MoviesCardList (props) {
  const {
    movies,
    isLoading,
    unwatchedFilms,
    remainingFilmsToView,
    savedMoviesList,
    onLike,
    onDislike } = props;  
  const location = useLocation();

  const [arrayIdSavedMovies, setArrayIdSavedMovies] = useState([])
  useEffect(() => {
    const newArray = savedMoviesList.map((movie) => movie.movieId);
    setArrayIdSavedMovies(newArray)
  }, [savedMoviesList])

  useEffect(() => {
    remainingFilmsToView && remainingFilmsToView()
  }, [])
  
  return (
    <section className="movies-list" aria-label="Секция с карточками фильмов">
      {movies.length ? (
        <ul className="movies-card__list">
          {movies.map((movie) => {

            return (<MoviesCard
              movie={movie}
              key={movie.id ?
                movie.id : movie._id}
              onDislike={onDislike}
              onLike={onLike}
              liked={arrayIdSavedMovies.includes(movie.id)}
            />)
          })} 
        </ul>
      ) : !isLoading ? <h3 className="movies-card-list__title">Список фильмов пуст</h3> : ""}
      {isLoading ? <Preloader /> : ""}

      {unwatchedFilms?.length ?
        <button type="button" className="movies-card__button" onClick={remainingFilmsToView}>
          Ещё
        </button> : ""}
    </section>  
  )  
}

export default MoviesCardList;