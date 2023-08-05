import './Promo.css';

function Promo () {
  return (
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <ul className="promo__links">
        <li className="promo__link-item">
          <a href="#about-project" className="promo__link">О проекте</a>
        </li>
        <li className="promo__link-item">
          <a href="#about-tech" className="promo__link">Технологии</a>
        </li>
        <li className="promo__link-item">
          <a href="#about-me" className="promo__link">Студент</a>
        </li>  
      </ul>
    </section>  
  )
}

export default Promo;