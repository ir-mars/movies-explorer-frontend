import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import Footer from '../Footer/Footer';
import arrayFilms from '../../utils/constants.js';

function Movies () {
  
  return (
    <>
      <MoviesCardList />
      <Footer />
    </>  
  )  
}

export default Movies;