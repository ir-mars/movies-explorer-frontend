import './Footer.css';
import { Link } from 'react-router-dom';

function Footer () {
  return (
    <footer className="footer">
      <p className="footer__subtitle">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__links">
          <li className="footer__nav-link">
            <Link className="footer__link" to="#">Яндекс.Практикум</Link>  
          </li>
          <li className="footer__nav-link">
          <Link className="footer__link" to="#">Github</Link>  
          </li>
        </ul>  
      </div>
    </footer>  
  )  
}

export default Footer;