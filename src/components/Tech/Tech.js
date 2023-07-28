import Section from '../Section/Section';
import './Tech.css';

function Tech () {
  return (
    <Section className="tech" title="Технологии">
      <div className="tech">
        <h3 className="tech__title">7 технологий</h3>
        <p className="tech__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="tech__list">
          <li className="tech__list-item">
            <p className="tech__list-text">HTML</p>
          </li>
          <li className="tech__list-item">
            <p className="tech__list-text">CSS</p>
          </li>
          <li className="tech__list-item">
            <p className="tech__list-text">JS</p>
          </li>
          <li className="tech__list-item">
            <p className="tech__list-text">React</p>
          </li>
          <li className="tech__list-item">
            <p className="tech__list-text">Git</p>
          </li>
          <li className="tech__list-item">
            <p className="tech__list-text">Express.js</p>
          </li>
          <li className="tech__list-item">
            <p className="tech__list-text">MongoDB</p>
          </li>
        </ul>
      </div>  
    </Section>  
  )
}
 export default Tech;    