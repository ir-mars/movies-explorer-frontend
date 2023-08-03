import { useState } from 'react';
import './Form.css';

function Form ({
    name,
    buttonText,
    onSubmit,
    onChange,
    children
}) {

  const [isFormValid, setIsFormValid] = useState(true);
    
  function handleChange (e) {
    setIsFormValid(e.target.validity.valid)
    onChange(e)
  }  

  function handleSubmit (e) {
      e.preventDefault();
      onSubmit(e)
  }

  return (
    <form
      action="#"
      name={name}
      id={name}
      className={`form form_type_${name}`}
      noValidate
      onSubmit={handleSubmit}
      onChange={handleChange}
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
    )
}

export default Form;