import { useState } from 'react';
import './Input.css';

function Input ({
  type,
  name,
  required,
  minLength,
  maxLength,
  label,
  placeholder,
  autoFocus = false,
  autoComplete,
  errors,
  onChange,
  pattern  
}) {
    
  const [error, setError] = useState(false);
    
  function handleChange (e) {
    !e.target.validity.valid
      ? setError(e.target.validationMessage)
      : setError("")
  }
  
  return (
    <label className="label">
      {label}
      <input
        className={`input ${errors ? " input_style_error " : ""}`}
        type={type}
        name={name}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        id={name}
        autoFocus={autoFocus}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        pattern={pattern}
      />
      <span
        className={`label__error ${errors ? "label__error_active" : ""}`}
      >
        {errors ? errors : "Что-то пошло не так..."}
      </span>
    </label>
  )
}

export default Input;