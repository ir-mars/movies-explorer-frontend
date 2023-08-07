import './FilterCheckbox.css';
import { useEffect, useState } from 'react';

function FilterCheckbox (props) {
  const { setIsChecked, isSaveValuesInLocalStorage } = props;
  const [isToggleOn, setIsToggleOn] = useState(true);
  const isCheckedInLS = localStorage.getItem("filterCheckbox");
  function handleChange (event) {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);
    setIsToggleOn(isChecked)
  }
  useEffect(() => {
    if (isSaveValuesInLocalStorage) {
      setIsChecked(isCheckedInLS === "true");
      setIsToggleOn(isCheckedInLS === "true");
    }
  }, [])
  
  return (
    <div className="checkbox">
      <div className="checkbox__toggle-container">
        <label className="checkbox__toggle">
          <input
            className="checkbox__toggle_checkbox-off"
            type="checkbox"
            name="toggle"            
            checked={isToggleOn}
            defaultChecked={isSaveValuesInLocalStorage ? isCheckedInLS === 'true' : false}
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