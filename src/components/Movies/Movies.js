import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

function Movies () {
  
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </main>  
  )  
}

export default Movies;