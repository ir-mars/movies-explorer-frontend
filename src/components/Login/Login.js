import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Logo from '../Logo/Logo';
import AuthForm from '../AuthForm/AuthForm';
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
        <Logo />
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
            placeholder="E-mail"
          />
          <Input
            type="password"
            name="password"
            required={true}
            minLength={6}
            maxLength={30}
            label="Пароль"
            autoComplete="current-password"
            placeholder="Пароль"
          />
        </AuthForm>
        <p className="auth__text">
          Ещё не зарегистрированы?
          <Link to="/sign-up" className="auth__link">
            Регистрация
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Login;