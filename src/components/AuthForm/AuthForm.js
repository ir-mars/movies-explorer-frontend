import { useState } from 'react';
import './AuthForm.css';

function AuthForm ({
  name,
  buttonText,
  onSubmit,
  autoComplete,
  children,
  isFormValid
 }) {
  
  function handleSubmit (e) {
    e.preventDefault();
    onSubmit(e)
  }

  return (
    <div className={`authform authform_type_${name}`}>
      <form 
        action="#"
        name={name}
        id={name}
        className={`form form_type_${name}`}
        onSubmit={handleSubmit}
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
  )
}

export default AuthForm;