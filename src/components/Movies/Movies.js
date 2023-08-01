import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import Footer from '../Footer/Footer';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import SearchForm from '../SearchForm/SearchForm';

function Movies () {
  
  return (
    <>
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </>  
  )  
}

export default Movies;