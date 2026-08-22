import WorkCard from './WorkCard';
import AICreative from './AICreative';

function GraphicWorks({ works, aiWorks }) {
  return (
    <section className="section" id="graphic">
      <div className="container">
        <p className="eyebrow">Graphic / Banner</p>
        <h2 className="section-heading">Graphic / Banner Design</h2>
        <div className="works-grid works-grid--two works-grid--graphic">
          {works.map((work) => (
            <WorkCard work={work} variant="work-card--banner" key={work.id} />
          ))}
        </div>
      </div>
      <AICreative works={aiWorks} embedded />
    </section>
  );
}

export default GraphicWorks;
