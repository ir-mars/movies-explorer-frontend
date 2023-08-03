import { useState } from 'react';
import './Input.css';

function Input ({
  type,
  name,
  required,
  minLength,
  maxLength,
  label,
  value,
  errorDefault = false,
  autoFocus = false,
}) {
    
  const [error, setError] = useState(false);
    
  function handleChange (e) {
    !e.target.validity.valid
      ? setError(e.target.validationMessage)
      : setError('')
  }
  
  return (
    <label className="label">
      {label}
      <input
        className={`input ${autoFocus ? "input_focus" : ""} ${errorDefault ? " input_style_error " : ""}`}
          type={type}
          name={name}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={label}
          id={name}
          value={value || ""}
          autoFocus={autoFocus}
          onChange={handleChange}
      />
      <span
        className={`label__error ${error || errorDefault ? "label__error_active" : ""}`}
          >{error ? error : "Что-то пошло не так..."}
      </span>
    </label>
  )
}

export default Input;