import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState } from 'react';

function SearchForm (props) {
  const {
    setIsChecked,
    setSearch,
    isLoading,
    localStorageEnabled
  } = props;
  const [isValid, setIsValid] = useState(false);

  function handleChange (event) {
    setIsValid(event.target.validity.valid);
  }

  function handleSubmit (event) {
    console.log('ss');
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
          defaultValue={localStorageEnabled ? localStorage.getItem("search") || "" : ""}
        />
        <button
          className="search-form__submit"
          type="submit"
          disabled={isLoading ? true : !isValid}
        ></button>
        <FilterCheckbox
          setIsChecked={setIsChecked}
          localStorageEnabled={localStorageEnabled}
        />
      </form>
    </section>
  )
}

export default SearchForm;
