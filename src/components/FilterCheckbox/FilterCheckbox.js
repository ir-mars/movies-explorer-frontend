import './FilterCheckbox.css';
import { useEffect, useState } from 'react';

function FilterCheckbox (props) {
  const { setIsChecked, localStorageEnabled } = props;
  const isCheckedLocalStorage = localStorage.getItem("filterCheckbox");
  const [isToggleOn, setIsToggleOn] = useState(
    localStorageEnabled
      ? isCheckedLocalStorage === "true"
      : false);

  function handleChange (e) {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    setIsToggleOn(isChecked)
  }

  return (
    <div className="checkbox">
      <div className="checkbox__toggle-container">
        <label className="checkbox__toggle">
          <input
            className="checkbox__toggle_checkbox-off"
            type="checkbox"
            name="toggle"
            checked={isToggleOn}
            onChange={handleChange}
          />
          <span className={`checkbox__toggle_checkbox-on ${isToggleOn && "checkbox__toggle_checkbox-on_checked"}`} />
          Короткометражки
        </label>
      </div>
    </div>
  )
}

export default FilterCheckbox;
