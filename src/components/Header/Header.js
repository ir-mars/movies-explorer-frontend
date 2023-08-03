import { Link, Routes, Route } from 'react-router-dom';
import './Header.css';

import headerlogo from '../../images/headerlogo.svg';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header ({ menuOpened, handleMenuOpened }) {
  
  return (
    <header className='header'>
      <Routes>
        
        <Route path="/" element={
          <>
          <div className="header__container">
            <img className="header__logo" src={headerlogo} alt="логотип" />
            <nav className="header__nav-links">
              <Link to="/sign-up" className="header__link header__link_auth">Регистрация</Link>
              <Link to="/sign-in" className="header__link header__link_auth header__link_type_btn">Войти</Link>
            </nav>
          </div>  
          </>
        } />
        
        <Route path="*" element={
          <>
            <img className="header__logo" src={logo} alt="логотип" />
            <nav className="header__nav-links header__nav-links_hidden_tablet-mobile">            
              <Link to="/movies" className='header__link'>
                Фильмы
              </Link>
              <Link to="/saved-movies" className='header__link header__link_medium'>
                Сохранённые фильмы
              </Link>
            </nav>
            <nav className='header__nav-links header__nav-links_hidden_tablet-mobile'>
              <Link to="/profile" className='header__link header__link_profile'>
                Аккаунт
                <div className='header__nav-link-icon'></div>
              </Link>
            </nav>  

            <nav className='header__nav-links header__nav-links_hidden_pc'>
              <img className="header__logo" src={logo} alt="логотип" />
              <button className={`header__btn-menu ${menuOpened ? 'header__btn-menu_close' : ''}`} onClick={() => handleMenuOpened(!menuOpened)}>
              </button>
            </nav>
            <Navigation menuOpened={menuOpened} onClose={() => handleMenuOpened(false)} />
          </>
        } />
      </Routes>
    </header>
  )
}

export default Header;