import WorkCard from './WorkCard';

function GraphicWorks({ works }) {
  return (
    <section className="section" id="graphic">
      <div className="container">
        <p className="eyebrow">Graphic / Banner</p>
        <h2 className="section-heading">Graphic / Banner Design</h2>
        <div className="works-grid works-grid--two">
          {works.map((work) => (
            <WorkCard work={work} variant="work-card--banner" key={work.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default GraphicWorks;
