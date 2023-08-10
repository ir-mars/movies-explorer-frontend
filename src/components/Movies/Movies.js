import { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import { calcQtyCards } from '../../utils/utils';
import Preloader from '../Preloader/Preloader';

function Movies (props) {
  const { allMovies,
    savedMovies,
    isLoading,
    setIsChecked,
    setSearch,
    onLike,
    onDislike } = props;
  const [movies, setMovies] = useState([]);
  const invisibleFilms = allMovies.slice(movies.length);
  const [qtyCardsButtonMore, setLoadMoreCount] = useState(null);
  const [qtyInitialCards, setCountCardsPerLoad] = useState(calcQtyCards().qtyInitialCards);

  useEffect(() => {
    setMovies(allMovies.slice(0, qtyInitialCards))
  }, [allMovies])

  useEffect(() => {
    document.title = "Все фильмы";
  }, [])

  useEffect(() => {
    const { qtyInitialCards, qtyCardsButtonMore } = calcQtyCards();
    setCountCardsPerLoad(qtyInitialCards);
    setLoadMoreCount(qtyCardsButtonMore);
    window.addEventListener('resize', handleChangeSizeWindow);

    return () => window.removeEventListener('resize', handleChangeSizeWindow);
  }, []);

  // обработка нажатия на кнопку 'еще'
  function handleClickButtonMore () {
    setMovies([...movies, ...invisibleFilms.slice(0, qtyCardsButtonMore)])
  }

  function handleChangeSizeWindow () {
    setTimeout(() => {
      const { qtyInitialCards, qtyCardsButtonMore } = calcQtyCards();
      setCountCardsPerLoad(qtyInitialCards);
      setLoadMoreCount(qtyCardsButtonMore);
    }, 500);
  }

  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm
          isLoading={isLoading}
          setIsChecked={setIsChecked}
          setSearch={setSearch}
          localStorageEnabled={true}
        />
        {isLoading
          ? (<Preloader />)
          : (<MoviesCardList
            movies={movies}
            isLoading={isLoading}
            invisibleFilms={invisibleFilms}
            handleClickButtonMore={handleClickButtonMore}
            savedMovies={savedMovies}
            onLike={onLike}
            onDislike={onDislike}
          />)}
      </main>
      <Footer />
    </>
  )
}

export default Movies;
