import WorkCard from './WorkCard';

function AICreative({ works }) {
  return (
    <section className="section section--ai" id="ai-creative">
      <div className="container">
        <p className="eyebrow">Supporting Practice</p>
        <h2 className="section-heading">AI Creative</h2>
        <p className="section-intro">AIを企画・表現・制作の幅を広げるツールとして活用しています。</p>
        <div className="works-grid works-grid--ai">
          {works.map((work) => (
            <WorkCard work={work} variant="work-card--ai" key={work.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AICreative;
