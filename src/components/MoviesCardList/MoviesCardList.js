import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import film1 from '../../images/film1.png';
import film2 from '../../images/film2.png';
import film3 from '../../images/film3.png';

function MoviesCardList ({ films }) {
  const location = useLocation();
  
  return (
    <section className="movies-list" aria-label="Секция с карточками фильмов">
      <ul className="movies-card__list"> 
        <MoviesCard
          nameRU="«Роллинг Стоунз» в изгнании"
          image={film1}
          duration="120"
          films={films}
        />
        <MoviesCard
          nameRU="All Tomorrow's Parties"
          image={film3}
          duration="120"
        /> 
        <MoviesCard
          nameRU="All Tomorrow's Parties"
          image={film2}
          duration="59"
        />
        <MoviesCard
          nameRU="Без обратного пути"
          image={film1}
          duration="120"
        />        
        <MoviesCard
          nameRU="«Роллинг Стоунз» в изгнании"
          image={film2}
          duration="48"
        />
        <MoviesCard
          nameRU="«Роллинг Стоунз» в изгнании"
          image={film1}
          duration="120"
          films={films}
        />
        <MoviesCard
          nameRU="All Tomorrow's Parties"
          image={film3}
          duration="120"
        /> 
        <MoviesCard
          nameRU="All Tomorrow's Parties"
          image={film2}
          duration="59"
        />                       
      </ul>
      {location.pathname=== "/movies" ? (
        <button className="movies-card__button">Ещё</button>
      ) : ("")
      }
    </section>  
  )  
}

export default MoviesCardList;