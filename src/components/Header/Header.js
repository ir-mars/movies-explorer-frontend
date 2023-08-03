import { Link, Routes, Route } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header ({ menuOpened, handleMenuOpened }) {
  
  return (
    <header className="header">
      <Routes>
        <Route path="/" element={
          <>
          <div className="header__wrapper">
            <img className="header__logo" src={logo} alt="логотип в виде черного круга с белой иконкой" />
            <nav className="header__nav-links">
              <Link to="/sign-up" className="header__link header__link_reg">Регистрация</Link>
              <Link to="/sign-in" className="header__link header__link_reg header__link_btn">Войти</Link>
            </nav>
          </div>  
          </>
        } />
        
        <Route path="*" element={
          <div className="header__wrapper">
            <nav className="header__nav-links header__nav-links_hidden_tab-mobile">            
              <img className="header__logo" src={logo} alt="логотип в виде черного круга с белой иконкой" />              
            </nav>
            <nav className="header__nav-links header__nav-links_hidden_tab-mobile">
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

            <nav className="header__nav-links header__nav-links_hidden_pc">
              <img className="header__logo" src={logo} alt="логотип" />
              <button className={`header__burger-btn ${menuOpened ? "header__burger-btn_close" : ''}`} onClick={() => handleMenuOpened(!menuOpened)}>
              </button>
            </nav>
            <Navigation menuOpened={menuOpened} onClose={() => handleMenuOpened(false)} />
          </div>
        } />
      </Routes>
    </header>
  )
}

export default Header;