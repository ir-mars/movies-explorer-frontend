import { Link, Routes, Route, useLocation, NavLink } from 'react-router-dom';
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, useState } from 'react';

function Header () {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);
  const { name, email } = currentUser;
  const [menuOpened, setIsMenuOpened] = useState(false);
  
  function handleMenuOpened () {
    setIsMenuOpened(!menuOpened)
  }
  
  return (
    <header className="header">
      {!name || !email
        ?
        (<div className="header__wrapper">
          <Logo />
          <nav className="header__nav-links">
            <Link to="/signup" className="header__link header__link_reg">Регистрация</Link>
            <Link to="/signin" className="header__link header__link_reg header__link_btn">Войти</Link>
          </nav>
        </div>)
        : (
          <div className="header__wrapper">
            <nav className="header__nav-links header__hidden_tab-mobile">
              <NavLink to="/">
                <Logo />
              </NavLink>
            </nav>
            <nav className="header__nav-links header__hidden_tab-mobile">
              <Link to="/movies" className="header__link">
                Фильмы
              </Link>
              <Link to="/saved-movies" className="header__link header__link_savefilms">
                Сохранённые фильмы
              </Link>
              <Link to="/profile" className="header__link header__link_acc">
                Аккаунт
                <div className="header__acc-icon"></div>
              </Link>
            </nav>

            <nav className="header__nav-links header__hidden_pc">
              <NavLink to="/">
                <Logo />
              </NavLink>
              <button className={`header__burger-btn ${menuOpened ? "header__burger-btn_close" : ""}`} onClick={() => handleMenuOpened(!menuOpened)}>
              </button>
            </nav>
            <Navigation menuOpened={menuOpened} onClose={() => handleMenuOpened(false)} />
          </div>
        )
      }  
    </header>
  )
}

export default Header;