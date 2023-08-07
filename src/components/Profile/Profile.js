import './Profile.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from '../Header/Header';
import { useContext, useEffect, useRef, useState } from 'react';
import { useValidation } from '../../hooks/useValidation';

function Profile ({ onUpdateUserData, onSignOut }) {
  
  const { name, email } = useContext(CurrentUserContext);
  const [isUpdatedUserData, setIsUpdatedUserData] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { values, handleChange, isValid, errors } = useValidation({ name, email });
  const ref = useRef();

  const handleClickBtn = () => {
    if (isUpdatedUserData) {
      onUpdateUserData({
        name: values.name,
        email: values.email
      })
      setIsEdit(false)
    } else {
      setIsEdit(true)
      ref.current.focus()
    }
  }

  useEffect(() => {
    values.name !== name || values.email !== email
      ? setIsUpdatedUserData(true)
      : setIsUpdatedUserData(false)
  }, [values.name, name, values.email, email])
  
  return (
    <>
      <Header />
      <section className="profile">
        <div className="profile__wrapper">  
  <h1 className="profile__title">Привет, {name}</h1>
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
                id="name"
                value={values.name}
                ref={ref}
                onChange={handleChange}
                placeholder={name}
              />
              <span
                className={`profile__error ${errors.name ? "profile__error_active" : ""}`}
              >{errors.name ? errors.name : "Что-то пошло не так..."}
              </span>
            </label>
            <label className="profile__text">
              E-mail
              <input
                className="profile__form-input"
                type="email"
                name="email"
                required
                minLength={2}
                maxLength={30}
                id="email"
                value={values.email}
                onChange={handleChange}
                pattern="^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$"
                placeholder={email}
              />
              <span
                className={`profile__error ${errors.email ? "profile__error_active" : ""}`}
              >{errors.email ? errors.email : "Что-то пошло не так..."}
              </span>
            </label>       
          </form>
          <div className="profile__links">
            <button
              type="button"
              className={`profile__link ${isValid && isUpdatedUserData && 'profile__link_type_success'}`}
              onClick={handleClickBtn}
              disabled={isEdit ? !isValid || !isUpdatedUserData : false}
            >
              Редактировать
            </button>
            <button
              type="button"
              className="profile__link profile__link_type_red"
              onClick={onSignOut}
            >
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </section >
    </>
  )
}

export default Profile;