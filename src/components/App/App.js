import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

/*import Header from '../Header/Header';*/
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
import ContentForPopup from '../ContentForPopup/ContentForPopup';
import { moviesApi, mainServerUrl } from '../../utils/MoviesApi';
import { DURATION_SHORTS } from '../../utils/constants';

function App () {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [statusMessageInPopup, setStatusMessage] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ data: {} });
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [isCheckedFilterBoxAllMovies, setIsCheckedFilterBoxAllMovies] = useState(
    localStorage.getItem("filterCheckbox")
      ? localStorage.getItem("filterCheckbox") === "true"
      : false);
  const [searchTextAllMovies, setSearchTextAllMovies] = useState(
    localStorage.getItem("search")
      ? localStorage.getItem("search")
      : "");
  const [isCheckedFilterBoxSavedMovies, setIsCheckedFilterBoxSavedMovies] = useState(null);
  const [searchTextSavedMovies, setSearchTextSavedMovies] = useState(null);

  //колбэк регистрации
  const handleRegister = async ({ name, email, password }) => {
    try {
      const data = await auth.signUp({ name, email, password });
      if (data) {
        setIsLoggedIn(true);
        localStorage.setItem("token", data.token)
        navigate("/movies");
        setStatusMessage(`Вы успешно зарегистрированы!`)
        // если регистрация прошла успешно, сразу войдем и получим токен
        handleLogin({ email, password })
      }
    } catch (err) {
      console.log(err);
      setIsPopupOpen(true)
      setStatusMessage(`Произошла ошибка регистрации:${err}`)
    } finally {
      setIsPopupOpen(true)
    }
  }

  //колбэк входа
  const handleLogin = async ({ email, password }) => {
    try {
      const data = await auth.signIn({ email, password })
      if (data) {
        localStorage.setItem("token", data.token)
        setIsLoggedIn(true);
        navigate("/movies");
        checkToken(data.token);
      }
    } catch (err) {
      console.log(err);
      setIsPopupOpen(true)
      setStatusMessage(`Произошла ошибка авторизации:${err}`)
    }
  }

  //проверка токена
  const checkToken = (token = localStorage.getItem("token")) => {
    setIsLoading(true);
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

  // при первом запуске проверим пользователя
  useEffect(() => {
    checkToken();
  }, []);

  //выход
  const handleSignOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setStatusMessage(`Вы вышли!`);
    setCurrentUser({ data: {} });
    setIsPopupOpen(true);
    setAllMovies([]);
    setSavedMovies([]);
    setFilteredSavedMovies([]);
    setSearchTextAllMovies("");
    setSearchTextSavedMovies("");
    setIsCheckedFilterBoxAllMovies(false);
    setIsCheckedFilterBoxSavedMovies(false);
    navigate("/");
  }

  //изменение профиля
  const handleUpdateUser = async (newUser) => {
    try {
      const token = localStorage.getItem('token');
      const updatedUserData = await mainApi.editUser(newUser, token);
      setCurrentUser(updatedUserData);
      setStatusMessage(`Новое имя "${newUser.name}" и электронная почта "${newUser.email}" успешно сохранены`)
    } catch (err) {
      console.log(err)
      setStatusMessage(`Ошибка обновления данных.`)
    } finally {
      setIsPopupOpen(true)
    }
  }

  // если обновить страницу, чтобы был переход там же, где был(а) раньше
  useEffect(() => {
    if (isLoggedIn) {
      navigate(currentPath, { replace: true });
    }
  }, [isLoggedIn])

  
  // фильтрация по ключу и чекбоксу
  const filterMoviesOnQueryAndCheckBox = (moviesList, query, filterBox) => {
    const foundArray = moviesList.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(query ? query.toLowerCase() : "") ||
        movie.nameEN.toLowerCase().includes(query ? query.toLowerCase() : ""),
    );
    return filterBox
      ? foundArray.filter((movie) => movie.duration <= DURATION_SHORTS)
      : foundArray;
  }

  // загрузка основного массива фильмов (проверяем локалстораж)
  const getAllMovies = async () => {
    // если запроса нет, то не надо ничего загружать
    if (!searchTextAllMovies) {
      setAllMovies([]);
      return;
    }
    try {
      setIsLoading(true);
      const moviesInLS = localStorage.getItem("movies");
      //если в локалстораж есть список фильмов, возьмем оттуда, если нет, то скачаем
      const movies = moviesInLS ? JSON.parse(moviesInLS) : await
        moviesApi.getFilms();
      // сохраним фильмы
      localStorage.setItem("movies", JSON.stringify(movies));

      const filteredMovies = filterMoviesOnQueryAndCheckBox(movies, searchTextAllMovies, isCheckedFilterBoxAllMovies);
      setAllMovies(filteredMovies);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // получение сохраненных фильмов
  const getSavedMoviesData = async () => {
    try {
      const token = localStorage.getItem("token");
      const savedMoviesInLS = localStorage.getItem("savedMovies");
      //если в локалстораж есть список фильмов, возьмем оттуда, если нет, то скачаем
      const savedMoviesData = savedMoviesInLS === JSON.stringify(savedMovies) ? JSON.parse(savedMoviesInLS) : await
        mainApi.getSavedCards(token)
      // сохраним фильмы в локалстораж и стейт
      localStorage.setItem("savedMovies", JSON.stringify(savedMoviesData));
      setSavedMovies(savedMoviesData);
      const filteredSavedMovies = filterMoviesOnQueryAndCheckBox(savedMoviesData, searchTextSavedMovies, isCheckedFilterBoxSavedMovies);
      setFilteredSavedMovies(filteredSavedMovies);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  // следим за изменениями запроса и чекбокса
  useEffect(() => {
    // если не авторизован, то и загружать не надо
    if (isLoggedIn) {
      getAllMovies();
      searchTextAllMovies && localStorage.setItem("search", searchTextAllMovies);
      localStorage.setItem("filterCheckbox", isCheckedFilterBoxAllMovies);
    }
  }, [isCheckedFilterBoxAllMovies, searchTextAllMovies]);

  useEffect(() => {
    if (isLoggedIn) {
      getSavedMoviesData();
    }
  }, [isCheckedFilterBoxSavedMovies, searchTextSavedMovies]);

  // при первом запуске запускаем загрузку всех фильмов и сохраненных фильмов
  useEffect(() => {
    if (isLoggedIn) {
      getAllMovies();
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
      thumbnail,
      year,
    } = movie;
    const movieId = movie.id;
    const image = mainServerUrl + movie.image.url;
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
    try {
      const token = localStorage.getItem("token");
      const response = await mainApi.saveCard(newMovie, token);
      const newArraySavedMoviesList = [...savedMovies, response];
      setSavedMovies(newArraySavedMoviesList)
      localStorage.setItem("savedMovies", JSON.stringify(newArraySavedMoviesList));
    } catch (err) {
      console.log(err);
    } finally {
    }
  }

  // удаляем лайк
  async function handleDislike (movieId) {
    // сначала найдем удаляемый фильм по его id
    const findedMovie = savedMovies.find(movie => movie.movieId === movieId);
    try {
      const token = localStorage.getItem("token");
      const response = await mainApi.deleteCard(findedMovie._id, token);
      // фильтруем , так чтобы показать все фильмы, кроме удаляемого
      const newArraySavedMoviesList = savedMovies.filter((movie) => movie._id !== response._id);
      // обновим массив сохраненных фильмов
      setSavedMovies(newArraySavedMoviesList)
      localStorage.setItem("savedMovies", JSON.stringify(newArraySavedMoviesList));

    } catch (err) {
      console.log(err);
    } finally {
    }
  }

  // если изменился список сохраняемых фильмов и при этом был включен фильтр, обновим его
  useEffect(() => {
    const filteredSavedMovies = filterMoviesOnQueryAndCheckBox(savedMovies, searchTextSavedMovies, isCheckedFilterBoxSavedMovies);
    setFilteredSavedMovies(filteredSavedMovies);
  }, [savedMovies]);

  // если идет загрузка покажем индикатор
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
              setIsChecked={setIsCheckedFilterBoxAllMovies}
              setSearch={setSearchTextAllMovies}
              allMovies={allMovies}
              savedMovies={savedMovies}
              isLoading={isLoading}
              onLike={handleLike}
              onDislike={handleDislike}
            />
          } />

          <Route path="/saved-movies" element={
            <ProtectedRoute
              element={SavedMovies}
              loggedIn={isLoggedIn}
              allMovies={filteredSavedMovies}
              setSearch={setSearchTextSavedMovies}
              setIsChecked={setIsCheckedFilterBoxSavedMovies}
              savedMovies={savedMovies}
              isLoading={isLoading}
              onDislike={handleDislike}
            />
          } />

          <Route path="/profile" element={
            <ProtectedRoute element={Profile} loggedIn={isLoggedIn} onSignOut={handleSignOut} onUpdateUserData={handleUpdateUser} />
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
        <ContentForPopup
          name="notify"
          isOpen={isPopupOpen}
          setPopupOpened={setIsPopupOpen}
          statusMessageInPopup={statusMessageInPopup}
        />
      </div>
    </CurrentUserContext.Provider>    
  )  
}

export default App;