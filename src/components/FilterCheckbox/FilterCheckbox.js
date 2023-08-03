import './FilterCheckbox.css';
import { useState } from 'react';

const FilterCheckbox = () => {
  const [isToggleOn, setIsToggleOn] = useState(true);

  return (
    <div className='checkbox'>
      <div className='checkbox__toggle'>
        <label className='checkbox__toggle-label' htmlFor='short-films'>
          Короткометражки
          <input
            className='checkbox__toggle-checkbox-invisible'
            type='checkbox'
            name='toggle'
            id='toggle'
            checked={isToggleOn}
            onChange={() => setIsToggle(!isToggle)}
          />
          <span className={`checkbox__toggle-checkbox-visible ${isToggleOn && 'checkbox__toggle-checkbox-visible_checked'}`} />
          
        </label>
      </div>
    </div>
  )
}
export default FilterCheckbox;
