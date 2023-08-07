import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState } from 'react';

function SearchForm (props) {
  const {
    setIsChecked,
    setSearch,
    isLoading,
    isSaveValuesInLocalStorage
  } = props;
  const [isValid, setIsValid] = useState(false);
  
  function handleChange (event) {
    setIsValid(event.target.validity.valid);
  }

  function handleSubmit (event) {
    event.preventDefault();
    const searchText = event.target.elements['search'].value;
    setSearch(searchText);
  }
    
  return (
    <section className="search" aria-label="Секция поиск фильмов">
      <form
        onChange={handleChange}
        onSubmit={handleSubmit}
        className="search-form">  
        <input
          className="search-form__input"
          type="text"
          id="search"
          name="search"
          placeholder="Фильм"
          required={true}
          defaultValue={isSaveValuesInLocalStorage ? localStorage.getItem("search") || "" : ""}          
        />
        <button
          className="search-form__submit"
          type="submit"
          disabled={isLoading ? true : !isValid}
        ></button>
        <FilterCheckbox
          setIsChecked={setIsChecked}
          isSaveValuesInLocalStorage={isSaveValuesInLocalStorage}
        />        
      </form>
    </section>
  )
}

export default SearchForm;