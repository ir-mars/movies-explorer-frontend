import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Preloader from '../Preloader/Preloader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import auth from '../../utils/auth';
import { mainApi } from '../../utils/MainApi';
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { moviesApi, urlServer } from '../../utils/MoviesApi';
import { DURATION_SHORTS } from '../../utils/constants';

function App () {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isNotifyPopupOpen, setIsNotifyPopupOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ data: {} });

  // для фильмов
  const [moviesList, setMoviesList] = useState([]); // список всех фильмов
  const [savedMoviesList, setSavedMoviesList] = useState([]); // массив сохраненных фильмов
  const [filteredSavedMoviesList, setFilteredSavedMoviesList] = useState([]); // массив сохранненых отфильтрованных фильмов
  const [isCheckedFilterBoxMovies, setIsCheckedFilterBoxMovies] = useState(localStorage.getItem("filterCheckbox") ? localStorage.getItem("filterCheckbox") === "true" : false); // статус кнопки "короткометражки" для всех фильмов
  const [searchTextMovies, setSearchTextMovies] = useState(localStorage.getItem("search") ? localStorage.getItem("search") : ""); // текст запроса формы поиска среди всех фильмов
  const [isCheckedFilterBoxSavedMovies, setIsCheckedFilterBoxSavedMovies] = useState(null); // статус кнопки "короткометражки" для сохраненных фильмов
  const [searchTextSavedMovies, setSearchTextSavedMovies] = useState(null); // текст запроса формы поиска среди сохраненных фильмов

  //управление формой регистрации
  const handleRegister = async ({ name, email, password }) => {
    try {
      const data = await auth.signUp({ name, email, password });
      if (data) {
        localStorage.setItem("token", data.token)
        setIsLoggedIn(true);
        navigate("/movies");
        setStatusMessage(`Вы успешно зарегистрированы!`)
        handleLogin({ email, password })
      }
    } catch (err) {
      console.log(err);
      setIsNotifyPopupOpen(true)
      setStatusMessage(`Произошла ошибка регистрации:${err}`)
    } finally {
      setIsNotifyPopupOpen(true)
    }
  }

  //управление формой авторизации
  const handleLogin = async ({ email, password }) => {
    try {
      const data = await auth.signIn({ email, password })
      if (data) {
        localStorage.setItem("token", data.token)
        setIsLoggedIn(true);
        navigate("/movies");
        checkToken()
      }
    } catch (err) {
      console.log(err);
      setIsNotifyPopupOpen(true)
      setStatusMessage(`Произошла ошибка авторизации:${err}`)
    }
  }

  //проверка
  const checkToken = () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    auth.getAuthentication(token)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setCurrentUser(res)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    checkToken();
  }, []);

  //выход пользователя со страницы getUserInfo
  const handleSignOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setStatusMessage(`Вы успешно вышли!`);
    setCurrentUser({ data: {} });
    setIsNotifyPopupOpen(true);
    navigate("/");
  }

  //редактирование информации о пользователе
  const handleUpdateUserData = async (newUser) => {
    try {
      const token = localStorage.getItem("token");
      const updatedUserData = await mainApi.editUser(newUser, token);
      setCurrentUser(updatedUserData);
      setStatusMessage(`Новое имя "${newUser.name}" и электронная почта "${newUser.email}" успешно сохранены`)
    } catch (err) {
      console.log(err)
      setStatusMessage(`Ошибка обновления данных.`)
    } finally {
      setIsNotifyPopupOpen(true)
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      console.log(currentPath);
      navigate(currentPath, { replace: true });
    }
  }, [isLoggedIn])

  // фильтрация массива фильмов
  const filterMoviesList = (moviesData, userRequest, isCheckedFilterBox) => {
    const foundMovies = moviesData.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(userRequest ? userRequest.toLowerCase() : "") ||
        movie.nameEN.toLowerCase().includes(userRequest ? userRequest.toLowerCase() : ""),
    );
    return isCheckedFilterBox
      ? foundMovies.filter((movie) => movie.duration <= DURATION_SHORTS)
      : foundMovies;
  }

  // загрузка основного массива фильмов (из хранилища если есть)
  const getMoviesData = async () => {
    if (!searchTextMovies) {
      setMoviesList([]);
      return;
    }
    try {
      setIsLoading(true);
      const moviesInLS = localStorage.getItem("movies");
      const moviesData = moviesInLS ? JSON.parse(moviesInLS) : await
        moviesApi.getFilms();
      localStorage.setItem("movies", JSON.stringify(moviesData));

      const newMoviesList = filterMoviesList(moviesData, searchTextMovies, isCheckedFilterBoxMovies);
      setMoviesList(newMoviesList);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // загрузка списка сохраненных фильмов
  const getSavedMoviesData = async () => {
    try {
      const token = localStorage.getItem("token");
      const savedMoviesInLS = localStorage.getItem("savedMovies");
      const savedMoviesData = savedMoviesInLS === JSON.stringify(savedMoviesList) ? JSON.parse(savedMoviesInLS) : await
        mainApi.getSavedCards(token)
      localStorage.setItem("savedMovies", JSON.stringify(savedMoviesData));
      setSavedMoviesList(savedMoviesData);
      const filteredSavedMoviesList = filterMoviesList(savedMoviesData, searchTextSavedMovies, isCheckedFilterBoxSavedMovies);
      setFilteredSavedMoviesList(filteredSavedMoviesList);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  // при изменении запроса запускаем функцию по обновлению списка фильмов
  useEffect(() => {
    if (isLoggedIn) {
      getMoviesData();
      searchTextMovies && localStorage.setItem("search", searchTextMovies);
      localStorage.setItem("filterCheckbox", isCheckedFilterBoxMovies);
      console.log(isCheckedFilterBoxMovies, searchTextMovies);
    }
  }, [isCheckedFilterBoxMovies, searchTextMovies]);

  useEffect(() => {
    if (isLoggedIn) {
      getSavedMoviesData();
    }
  }, [isCheckedFilterBoxSavedMovies, searchTextSavedMovies]);

  // при первом запуске запускаем загрузку
  useEffect(() => {
    if (isLoggedIn) {
      getMoviesData();
      getSavedMoviesData();
    }
  }, [isLoggedIn]);

  // ставим лайк
  async function handleLike (movie) {
    const {
      country,
      description,
      director,
      duration,
      nameEN,
      nameRU,
      trailerLink,
      year,
      thumbnail
    } = movie;
    const movieId = movie.id;
    const image = urlServer + movie.image.url;
    console.log(movieId);
    const newMovie = {
      country,
      description,
      director,
      duration,
      nameEN,
      nameRU,
      trailerLink,
      year,
      movieId,
      image,
      thumbnail
    }
    console.log(newMovie);
    try {
      const token = localStorage.getItem("token");
      const response = await mainApi.saveCard(newMovie, token);
      const newArraySavedMoviesList = [...savedMoviesList, response];
      setSavedMoviesList(newArraySavedMoviesList)
      localStorage.setItem("savedMovies", JSON.stringify(newArraySavedMoviesList));
    } catch (err) {
      console.log(err);
    } finally {
    }
  }

  // удаляем лайк
  async function handleDislike (movieId) {
    const findedMovie = savedMoviesList.find(movie => movie.movieId === movieId);
    try {
      const token = localStorage.getItem("token");
      const response = await mainApi.deleteCard(findedMovie._id, token);
      const newArraySavedMoviesList = savedMoviesList.filter((movie) => movie._id !== response._id);
      setSavedMoviesList(newArraySavedMoviesList)
      localStorage.setItem("savedMovies", JSON.stringify(newArraySavedMoviesList));

    } catch (err) {
      console.log(err);
    } finally {
    }
  }
  useEffect(() => {
    const filteredSavedMoviesList = filterMoviesList(savedMoviesList, searchTextSavedMovies, isCheckedFilterBoxSavedMovies);
    setFilteredSavedMoviesList(filteredSavedMoviesList);
  }, [savedMoviesList]);

  if (isLoading) {
    return <Preloader />
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={
            <ProtectedRoute
              element={Movies}
              loggedIn={isLoggedIn}
              setIsChecked={setIsCheckedFilterBoxMovies}
              setSearch={setSearchTextMovies}
              moviesList={moviesList}
              savedMoviesList={savedMoviesList}
              isLoading={isLoading}
              onLike={handleLike}
              onDislike={handleDislike}
            />
          } />

          <Route path="/saved-movies" element={
            <ProtectedRoute
              element={SavedMovies}
              loggedIn={isLoggedIn}
              moviesList={filteredSavedMoviesList}
              setSearch={setSearchTextSavedMovies}
              setIsChecked={setIsCheckedFilterBoxSavedMovies}
              savedMoviesList={savedMoviesList}
              isLoading={isLoading}
              onDislike={handleDislike}
            />
          } />

          <Route path="/profile" element={
            <ProtectedRoute element={Profile} loggedIn={isLoggedIn} onSignOut={handleSignOut} onUpdateUserData={handleUpdateUserData} />
          } />

          <Route path="/signup" element={isLoggedIn
            ? <Navigate to="/" />
            :
            <Register
              onRegister={handleRegister}
            />}
          />
          
          <Route path="/signin" element={isLoggedIn
            ? <Navigate to="/" />
            :
            <Login
              onLogin={handleLogin}
            />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
        <InfoTooltip
          name="notify"
          isOpen={isNotifyPopupOpen}
          setPopupOpened={setIsNotifyPopupOpen}
          statusMessage={statusMessage}
        />
      </div>
    </CurrentUserContext.Provider>    
  )  
}

export default App;