import { Link } from 'react-router-dom';
import './Promo.css';

function Promo () {
  return (
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <img className="promo__img"></img>
      <nav className="promo__links">
        <Link className="promo__link" to="">О проекте</Link>
        <Link className="promo__link" to="">Технологии</Link>
        <Link className="promo__link" to="">Студент</Link>  
      </nav>
    </section>  
  )
}

export default Promo;