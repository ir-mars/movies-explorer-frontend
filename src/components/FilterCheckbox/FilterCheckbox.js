import './FilterCheckbox.css';
import { useState } from 'react';

function FilterCheckbox () {
  
  const [isToggleOn, setIsToggleOn] = useState(true);

  return (
    <div className="checkbox">
      <div className="checkbox__toggle-container">
        <label className="checkbox__toggle">
          <input
            className="checkbox__toggle_checkbox-off"
            type="checkbox"
            name="toggle"            
            checked={isToggleOn}
            onChange={() => setIsToggleOn(!isToggleOn)}
          />
          <span className={`checkbox__toggle_checkbox-on ${isToggleOn && "checkbox__toggle_checkbox-on_checked"}`} />
          Короткометражки
        </label>
      </div>
    </div>
  )
}
export default FilterCheckbox;
