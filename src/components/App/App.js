import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
/*import NotFound from '../NotFound/NotFound';*/
import Register from '../Register/Register';
import Login from '../Login/Login';

import Preloader from "../Preloader/Preloader";

{/*
import Profile from '../Profile/Profile';
*/}

function App () {
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const location = useLocation();
  const showHeaderPaths = ['/', '/movies', '/saved-movies', '/profile']; // пути, на которых нужно отобразить Header
  const showHeader = showHeaderPaths.includes(location.pathname); // проверяем, соответствует ли текущий путь одному из путей для отображения Header

  const handleMenuOpened = (value) => {
    setMenuOpened(value)
  }
  
  function handleRegister () {
  }

  function handleLogin () {
  }
  
  return (
    <div className="page">
      {showHeader && <Header menuOpened={menuOpened} handleMenuOpened={handleMenuOpened} />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/sign-up" element={<Register onRegister={handleRegister} isLoading={isLoading} />} />
        <Route path="/sign-in" element={<Login onLogin={handleLogin} isLoading={isLoading} />} />
        
        {/*
         
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-out" element={<SignOut onLoggedIn={setLoggedIn} />} />
        <Route path="*" element={<NotFound />} />
         */} 
      </Routes>
    </div>  
  )  
}

export default App;