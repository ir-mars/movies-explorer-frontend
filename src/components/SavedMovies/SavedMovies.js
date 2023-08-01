import './SavedMovies.css';
import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

const SavedMovies = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="saved-movies">
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList button={""} />
      <Footer />
    </main>
  )
}

export default SavedMovies;