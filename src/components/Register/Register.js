import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './Register.css';
import logo from '../../images/logo.svg';
import AuthForm from '../Form/Form';
import Input from '../Input/Input';

function Register () {
  
  const [values, setValues] = useState({});
  
  function onSubmit () {
  }
  
  function handleChange (e) {
    setValues({
       ...values,
       [e.target.name]: e.target.value
      })
  }

  return (
    <section className="auth">
      <div className="auth__wrapper">
        <img className="logo__image" src={logo} alt="логотип" />      
        <h2 className="auth__title">Добро пожаловать!</h2>   
        <AuthForm
          name="reg"
          onSubmit={onSubmit}
          onChange={handleChange}
          buttonText="Зарегистрироваться"
        >
          <Input
            type="text"
            name="name"
            required={true}
            minLength={6}
            maxLength={30}
            label="Имя"
            defaultValue="Виталий"
            autoComplete="user-name"
          />
          <Input
            type="email"
            name="email"
            required={true}
            minLength={6}
            maxLength={30}
            label="E-mail"
            defaultValue="email@yandex.ru"
            autoComplete="user-email"
          />
          <Input
            type="password"
            name="password"
            required={true}
            minLength={6}
            maxLength={30}
            label="Пароль"
            defaultValue="password777"
            defaultError={true}
            autoComplete="user-password"
          />
        </AuthForm>
        <p className="auth__text">
          Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="auth__link">
            Войти
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Register;