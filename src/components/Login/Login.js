import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logo.svg';
import AuthForm from '../Form/Form';
import Input from '../Input/Input';

function Login () {
  
  const [values, setValues] = useState({})
  
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
        <h2 className="auth__title">Рады видеть!</h2>
        <AuthForm
          name="login"
          onSubmit={onSubmit}
          onChange={handleChange}
          buttonText="Войти"
        >
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
            autoComplete="current-password"
          />
        </AuthForm>
        <p className="auth__text">
          Ещё не зарегистрированы?{" "}
          <Link to="/sign-up" className="auth__link">
            Регистрация
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Login;