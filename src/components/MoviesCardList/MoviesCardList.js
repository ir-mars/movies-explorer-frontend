/*import { useEffect, useState } from 'react';*/
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import film1 from '../../images/film1.png';
import film2 from '../../images/film2.png';
import film3 from '../../images/film3.png';

function MoviesCardList () {
      
  return (
    <section className="movies-list" aria-label="Секция с карточками фильмов">
      <ul className="movies-card__list">
        <MoviesCard
          nameRU="«Роллинг Стоунз» в изгнании"
          image={film1}
          duration="120"
        /> {/*
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
          nameRU="All Tomorrow's Parties"
          image={film3}
          duration="120"
        />{}
        <MoviesCard
          nameRU="«Роллинг Стоунз» в изгнании"
          image={film2}
          duration="48"
        />
        <MoviesCard
          nameRU="Без обратного пути"
          image={film1}
          duration="135"
        />
        <MoviesCard
          nameRU="«Роллинг Стоунз» в изгнании"
          image={film3}
          duration="120"
        />
        <MoviesCard
          nameRU="All Tomorrow's Parties"
          image={film2}
          duration="120"
        />
        <MoviesCard
          nameRU="Без обратного пути"
          image={film1}
          duration="140"
        />
        <MoviesCard
          nameRU="All Tomorrow's Parties"
          image={film3}
          duration="65"
        />
        <MoviesCard
          nameRU="«Роллинг Стоунз» в изгнании"
          image={film2}
          duration="48"
        />
        <MoviesCard
          nameRU="Без обратного пути"
          image={film1}
          duration="135"
        />
        <MoviesCard
          nameRU="«Роллинг Стоунз» в изгнании"
          image={film3}
          duration="120"
        /> */}               
      </ul>
      <button className="movies-card__button">Ещё</button>
    </section>  
  )  
}

export default MoviesCardList;