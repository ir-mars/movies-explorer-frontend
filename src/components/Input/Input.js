import { useState } from 'react';
import './Input.css';

function Input ({
  type,
  name,
  required,
  minLength,
  maxLength,
  label,
  defaultValue,
  defaultError = false,
  autoFocus = false,
  autoComplete
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
        className={`input ${autoFocus ? "input_focus" : ""} ${defaultError ? " input_style_error " : ""}`}
        type={type}
        name={name}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        id={name}
        defaultValue={defaultValue || ""}
        autoFocus={autoFocus}
        onChange={handleChange}
        autoComplete={autoComplete}
      />
      <span
        className={`label__error ${error || defaultError ? "label__error_active" : ""}`}
          >{error ? error : "Что-то пошло не так..."}
      </span>
    </label>
  )
}

export default Input;