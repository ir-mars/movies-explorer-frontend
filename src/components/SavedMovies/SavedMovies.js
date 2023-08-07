import './SavedMovies.css';
import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const SavedMovies = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Header />
      <main className="saved-movies">
        <SearchForm />
        {/* <Preloader /> */}
        <MoviesCardList button={""} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;