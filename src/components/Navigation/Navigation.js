import { NavLink, Link } from 'react-router-dom';
import './Navigation.css';

function Navigation ({ menuOpened, onClose }) {

  const setClass = (navLinkData) => navLinkData.isActive
    ? "navigation__link navigation__link_active"
    : "navigation__link";

  function handleClickCloseByOverlay (e) {
    if (e.target.classList.contains("navigation_visible")) {
      onClose();
    }
  };

  return (
    <div className={`navigation ${menuOpened ? "navigation_visible" : ''}`} onClick={handleClickCloseByOverlay} >
      <nav className={`navigation__inner ${menuOpened ? "navigation__inner_visible" : ''}`}>
        <ul className="navigation__links">
          <li className="navigation__links-item navigation__links-item_type_mobile">
            <NavLink className={setClass} to="/" onClick={onClose}>
              Главная
            </NavLink>
          </li>
          <li className="navigation__links-item">
            <NavLink className={setClass} to="/movies" onClick={onClose}>
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__links-item">
            <NavLink className={setClass} to="/saved-movies" onClick={onClose}>
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <Link className="navigation__link navigation__link_type_icon" to="/profile" onClick={onClose}>
          Аккаунт
          <div className="navigation__link-icon" />
        </Link>
      </nav>
    </div>
  )
};

export default Navigation;