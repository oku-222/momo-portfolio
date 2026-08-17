const skills = [
  'Web Design',
  'Web Direction',
  'Web Operation',
  'HTML / CSS',
  'WordPress',
  'Figma',
  'Graphic / Banner Design',
  'SNS Creative',
  'Generative AI',
];

function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container skills-section">
        <p className="eyebrow">Capabilities</p>
        <h2 className="section-heading">Skills</h2>
        <ul className="skills-list">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Skills;
