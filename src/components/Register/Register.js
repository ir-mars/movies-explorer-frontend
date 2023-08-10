import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Register.css';
import Logo from '../Logo/Logo';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import { useValidation } from '../../hooks/useValidation';

function Register ({ onRegister, loggedIn }) {

  const { values, handleChange, isValid, errors } = useValidation();
  const navigate = useNavigate();

  function onSubmit () {
    onRegister(values)
  }

  useEffect(() => {
    document.title = "Регистрация";
  }, [])

  useEffect(() => {
    if (loggedIn) {
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 100)
    }
  }, [loggedIn]);

  return (
    <section className="auth">
      <div className="auth__wrapper">
        <NavLink to="/">
          <Logo />
        </NavLink>
        <h2 className="auth__title">Добро пожаловать!</h2>
        <AuthForm
          name="reg"
          onSubmit={onSubmit}
          buttonText="Зарегистрироваться"
          isFormValid={isValid}
        >
          <Input
            onChange={handleChange}
            errors={errors.name}
            type="text"
            name="name"
            required={true}
            minLength={6}
            maxLength={30}
            label="Имя"
            autoComplete="user-name"
            placeholder="Имя"
          />
          <Input
            onChange={handleChange}
            errors={errors.email}
            type="email"
            name="email"
            required={true}
            minLength={6}
            maxLength={30}
            label="E-mail"
            autoComplete="user-email"
            pattern="^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$"
            placeholder="Email"
          />
          <Input
            onChange={handleChange}
            errors={errors.password}
            type="password"
            name="password"
            required={true}
            minLength={6}
            maxLength={30}
            label="Пароль"
            autoComplete="user-password"
            placeholder="Пароль"
          />
        </AuthForm>
        <p className="auth__text">
          Уже зарегистрированы?
          <Link to="/signin" className="auth__link">
            Войти
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Register;
