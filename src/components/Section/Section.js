import './Section.css';

function Section ({ title, children }) {
  return (
    <section className={sectionClass}>
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  )
}

export default Section;