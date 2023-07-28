import Section from '../Section/Section';
import './AboutMe.css';
import { Link } from 'react-router-dom';
import myfoto from '../../images/myfoto.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe () {
  function ageDate() {
    const myBirthDate = new Date(1980, 01, 11);
    const todayDate = new Date();
    const date1 = todayDate.getMonth() - myBirthDate.getMonth() >= 0 && todayDate.getDate() - myBirthDate.getDate() >= 0;
    const date2 = todayDate.getFullYear() - myBirthDate.getFullYear();
    
    return date2 - 1 + (date1 ? 1 : 0);   
  }

  return (
    <Section className="about-me" title="Студент">
      <div className="about-me__biografy">
        <h3 className="about-me__name">Ирина</h3>
        <p className="about-me__profession">Фронтенд-разработчик, { ageDate() } лет</p>  
        <p className="about-me__text">Я живу в г.Пермь, люблю верстать сайты, учусь на веб-разработчика.</p>  
        <Link className="about-me__link" to="#">Github</Link>
        <img
          className="about-me__img"  
          src={ myfoto }
          alt="Фото студента"
        />      
      </div>
      <Portfolio />
    </Section>  
  )  
} 

export default AboutMe;