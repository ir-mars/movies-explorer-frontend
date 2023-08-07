import './Profile.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from 'react';
import Header from '../Header/Header';

function Profile () {
  
  const { name, email } = useContext(CurrentUserContext);
  
  return (
    <>
      <Header />
      <section className="profile">
        <div className="profile__wrapper">  
          <h1 className="profile__title">Привет, Виталий!</h1>
          <form
            name="profile__form"
            className="profile__form"
          >
            <label className="profile__text">
              Имя
              <input
                className="profile__form-input"
                type="text"
                name="profile-name"
                required
                minLength={2}
                maxLength={30}
                id="profile-name"
                placeholder={name}
              />
            </label>
            <label className="profile__text">
              E-mail
              <input
                className="profile__form-input"
                type="email"
                name="profile-email"
                required
                minLength={2}
                maxLength={30}
                id="profile-email"
                placeholder={email}
              />
            </label>       
          </form>
          <div className="profile__links">
            <button
              type="button"
              className="profile__link">
                Редактировать
            </button>
            <button
              type="button"
              className="profile__link profile__link_type_red">
                Выйти из аккаунта
            </button>
          </div>
        </div>
      </section >
    </>
  )
}

export default Profile;