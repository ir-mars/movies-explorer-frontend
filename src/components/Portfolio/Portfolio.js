import './Portfolio.css';
import { Link } from 'react-router-dom';

function Portfolio () {
  return (
    <div className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>  
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <Link className="portfolio__link" to="https://github.com/ir-mars/how-to-learn" target="_blank" rel="noreferrer">
            <p className="portfolio__text">Статичный сайт</p>
            <p className="portfolio__symbol">&#x2197;</p>  
          </Link>
        </li>
        <li className="portfolio__list-item">
          <Link className="portfolio__link" to="https://github.com/ir-mars/russian-travel" target="_blank" rel="noreferrer">
            <p className="portfolio__text">Адаптивный сайт</p>
            <p className="portfolio__symbol">&#x2197;</p>  
          </Link>
        </li>
        <li className="portfolio__list-item">
          <Link className="portfolio__link" to="https://github.com/ir-mars/react-mesto-api-full-gha" target="_blank" rel="noreferrer">
            <p className="portfolio__text">Одностраничное приложение</p>
            <p className="portfolio__symbol">&#x2197;</p>
          </Link>
        </li>  
      </ul>  
    </div>  
  )  
}

export default Portfolio;