import WorkCard from './WorkCard';

function SNSCreative({ works }) {
  return (
    <section className="section" id="sns">
      <div className="container">
        <p className="eyebrow">Social Communication</p>
        <h2 className="section-heading">SNS Creative</h2>
        <div className="works-grid works-grid--two">
          {works.map((work) => (
            <WorkCard work={work} variant="work-card--sns" key={work.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SNSCreative;
