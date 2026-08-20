import { assetPath } from '../utils/assetPath';

function WorkCard({ work, variant = '', onOpen }) {
  const isInteractive = Boolean(onOpen);

  const handleKeyDown = (event) => {
    if (!isInteractive || (event.key !== 'Enter' && event.key !== ' ')) {
      return;
    }

    event.preventDefault();
    onOpen();
  };

  return (
    <article
      className={`work-card ${variant} ${isInteractive ? 'work-card--interactive' : ''}`}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={isInteractive ? onOpen : undefined}
      onKeyDown={handleKeyDown}
    >
      <div className="work-card__image-wrap">
        <img src={assetPath(work.image)} alt={`${work.title}の作品画像`} loading="lazy" />
      </div>
      <div className="work-card__body">
        <p className="work-card__meta">
          {work.category} / {work.type}
        </p>
        <h3 className="work-card__title">{work.title}</h3>
        <ul className="tag-list" aria-label="作品タグ">
          {work.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default WorkCard;
