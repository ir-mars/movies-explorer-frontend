import { useState } from 'react';
import './AuthForm.css';

function AuthForm ({
  name,
  buttonText,
  onSubmit,
  onChange,
  autoComplete,
  children
 }) {
  
  const [isFormValid, setIsFormValid] = useState(true);
  
  function handleSubmit (e) {
    e.preventDefault();
    onSubmit(e)
  }

  function handleChange (e) {
    setIsFormValid(e.target.validity.valid)
    onChange(e)
  }

  return (
    <div className={`auth auth_type_${name}`}>
      <div className="auth__wrapper">
        <form 
          action="#"
          name={name}
          id={name}
          className={`form form_type_${name}`}
          onSubmit={handleSubmit}
          onChange={handleChange}
          autoComplete={autoComplete}
        >
          <div>
            {children}
          </div>
          <button
            type="submit"
            form={name}
            className={`form__submit-btn`}
            disabled={!isFormValid}
          >
            {buttonText}
          </button>  
        </form>
      </div>
    </div>
  )
}

export default AuthForm;