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

function App () {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isNotifyPopupOpen, setIsNotifyPopupOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ data: {} });

  const navigate = useNavigate();

  //управление формой регистрации
  const handleRegister = async ({ name, email, password }) => {
    try {
      const data = await auth.signUp({ name, email, password });
      if (data) {
        localStorage.setItem("token", data.token)
        setCurrentUser(data);
        setIsLoggedIn(true);
        navigate("/movies");
        setStatusMessage(`Вы успешно зарегистрированы! Сейчас будете перенаправлены на страницу "Фильмы"`)
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

  //получение информации о пользователе с сервера
  const getCurrentUserInfo = async () => {
    try {
      const currentUserInfo = await mainApi.getUserInfo();
      setCurrentUser(currentUserInfo);
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  //редактирование информации о пользователе
  const handleUpdateUserData = async ({ name, email }) => {
    try {
      const updatedUserData = await mainApi.setUserInfo({ name, email });
      setCurrentUser(updatedUserData);
      setStatusMessage(`Данные успешно обновлены!`)
    } catch (err) {
      console.log(err)
      setStatusMessage(`Ошибка обновления данных.`)
    } finally {
      setIsNotifyPopupOpen(true)
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      getCurrentUserInfo();
    }
  }, [isLoggedIn])

  if (isLoading) {
    return <Preloader />
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/movies" element={
            <ProtectedRoute element={Movies} isLoggedIn={isLoggedIn} isLoading={isLoading} setIsLoading={setIsLoading} />
          } />

          <Route path="/saved-movies" element={
            <ProtectedRoute element={SavedMovies} isLoggedIn={isLoggedIn} isLoading={isLoading} setIsLoading={setIsLoading} />
          } />

          <Route path="/profile" element={
            <ProtectedRoute element={Profile} isLoggedIn={isLoggedIn} onSignOut={handleSignOut} onUpdateUserData={handleUpdateUserData} />
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
          {/*
          <Route path="/sign-out" element={<SignOut onLoggedIn={setLoggedIn} />} />
         */}
        </Routes>
      </div>
    </CurrentUserContext.Provider>  
  )  
}

export default App;