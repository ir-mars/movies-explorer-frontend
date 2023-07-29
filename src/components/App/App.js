import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

import Main from '../Main/Main';

{/*import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';*/}

function App () {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Main />} />
        {/* 
        <Route path="/profile" element={<Profile />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/signin" element={<Login onLogin={handleLogin} isLoading={isLoading} />} />
        <Route path="/signup" element={<Register onRegister={handleRegister} isLoading={isLoading} />} />
        <Route path="/signout" element={<SignOut onLoggedIn={setLoggedIn} />} />
        <Route path="*" element={<NotFound />} /> */} 
      </Routes>
    </div>  
  )  
}

export default App;