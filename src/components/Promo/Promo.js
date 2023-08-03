import { Link } from 'react-router-dom';
import './Promo.css';
import landinglogo from '../../images/landinglogo.svg';

function Promo () {
  return (
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <img className="promo__img" src={landinglogo} alt="логотип заставки"/>
      <nav className="promo__links">
        <Link className="promo__link" to="#project">О проекте</Link>
        <Link className="promo__link" to="#about-tech">Технологии</Link>
        <Link className="promo__link" to="#part3">Студент</Link>  
      </nav>
    </section>  
  )
}

export default Promo;