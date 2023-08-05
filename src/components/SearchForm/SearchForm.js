import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  return (
    <section className="search" aria-label="Секция поиск фильмов">
      <form className="search-form">  
        <input
          className="search-form__input"
          type="text"
          id="movie-search"
          name="movie-search"
          placeholder="Фильм"
          required={true}          
        />
        <button className="search-form__submit" type="submit"></button>
        <FilterCheckbox />        
      </form>
    </section>
  )
}

export default SearchForm;