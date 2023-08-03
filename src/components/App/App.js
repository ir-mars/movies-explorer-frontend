import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Preloader from "../Preloader/Preloader";

{/*

*/}

function App () {
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const location = useLocation();
  const showHeaderPaths = ['/', '/movies', '/saved-movies', '/profile']; 
  const showHeader = showHeaderPaths.includes(location.pathname); 

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
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
        {/*
        <Route path="/sign-out" element={<SignOut onLoggedIn={setLoggedIn} />} />
        
         */} 
      </Routes>
    </div>  
  )  
}

export default App;