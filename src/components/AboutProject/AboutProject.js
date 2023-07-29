import SectionTitle from '../SectionTitle/SectionTitle';
import './AboutProject.css';

function AboutProject () {
  return (
    <section className="project">
      <SectionTitle title="О проекте" />  
      <div className="about-project">
        <div className="about-project__container">
          <div className="about-project__description">
            <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>  
          </div>
          <div className="about-project__description">
            <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>  
          </div>  
        </div>
        <div className="about-project__table-container">
          <div className="about-project__table">
            <p className="about-project__table-subtitle">1 неделя</p>
            <p className="about-project__table-text">Back-end</p>  
          </div>
          <div className="about-project__table">
            <p className="about-project__table-subtitle">4 недели</p>
            <p className="about-project__table-text">Front-end</p>  
          </div>  
        </div>
      </div>
    </section>  
  )  
} 

export default AboutProject;