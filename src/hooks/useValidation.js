import { useState, useCallback } from 'react';

export function useValidation (initialValue = {}) {
  const [values, setValues] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    console.log({ [name]: target.validationMessage });
    setValues({ ...values, [name]: value });
    setIsValid(target.closest("form").checkValidity());
    setErrors({ ...errors, [name]: target.validationMessage });
  };

  const resetForm = useCallback(
    (newValues = {}, newIsValid = false) => {
      setValues(newValues);
      setIsValid(newIsValid);
    },
    [setValues, setIsValid]
  );

  return { values, handleChange, isValid, resetForm, errors };
}