import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';


import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';