import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logo.svg';
import Form from '../Form/Form';
import Input from '../Input/Input';

function Login () {
  const [values, setValues] = useState({})
  
  function onSubmit () {
  }
  
  function handleChange (e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <section className="auth">
      <div className="auth_wrapper">
        <img className="logo__image" src={logo} alt="логотип" />
        <h2 className="auth__title">Рады видеть!</h2>
        <Form
          name="login"
          buttonText="Войти"
          onSubmit={onSubmit}
          onChange={handleChange}
        >
          <Input
            type="email"
            name="email"
            required={true}
            minLength={6}
            maxLength={30}
            label="E-mail"
            defaultValue="email@yandex.ru"
          />
          <Input
            type="password"
            name="password"
            required={true}
            minLength={6}
            maxLength={30}
            label="Пароль"
          />
        </Form>
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