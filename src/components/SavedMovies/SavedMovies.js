import './SavedMovies.css';
import { useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function SavedMovies (props) {
  const {
    allMovies,
    setIsChecked,
    setSearch,
    savedMovies,
    isLoading,
    onDislike } = props;

    useEffect(() => {
      setIsChecked(false);
      setSearch("");
    }, [])
  
    useEffect(() => {
      document.title = "Мои сохраненные фильмы";
    }, [])  

  return (
    <>
      <Header />
      <main className="saved-movies">
        <SearchForm
          isLoading={isLoading}
          setIsChecked={setIsChecked}
          setSearch={setSearch}
          isSavedMoviesCmpnt={true}
        />  
        <MoviesCardList
          movies={allMovies}
          isLoading={isLoading}
          onDislike={onDislike}
          savedMovies={savedMovies}
        />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;