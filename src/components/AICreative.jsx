import { useEffect, useRef, useState } from 'react';

import { assetPath } from '../utils/assetPath';

function AICreative({ works, embedded = false }) {
  const [selectedWork, setSelectedWork] = useState(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!selectedWork) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const previousActiveElement = document.activeElement;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedWork(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previousActiveElement?.focus?.();
    };
  }, [selectedWork]);

  const closeModal = () => setSelectedWork(null);
  const Wrapper = embedded ? 'div' : 'section';
  const wrapperClassName = embedded ? 'graphic-ai-visuals' : 'section section--ai';
  const headingClassName = embedded ? 'subsection-heading' : 'section-heading';
  const heading = embedded ? 'AI Visual / Pet Creative' : 'AI Creative';
  const eyebrow = embedded ? 'AI Visual' : 'Supporting Practice';
  const galleryLabel = embedded ? 'AI Visual / Pet Creative作品一覧' : 'AI Creative作品一覧';

  return (
    <Wrapper className={wrapperClassName} id={embedded ? 'ai-visual-pet-creative' : 'ai-creative'}>
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className={headingClassName}>{heading}</h2>
        <p className="section-intro">AIを企画・表現・制作の幅を広げるツールとして活用しています。</p>
        <div className="ai-gallery" role="list" aria-label={galleryLabel}>
          {works.map((work) => (
            <button
              className="ai-gallery__item"
              type="button"
              role="listitem"
              key={work.id}
              aria-label={`${work.title}を拡大表示`}
              onClick={() => setSelectedWork(work)}
            >
              <img src={assetPath(work.image)} alt={`${work.title}の作品画像`} loading="lazy" />
              <span className="ai-gallery__overlay" aria-hidden="true">
                <span className="ai-gallery__name">{work.title}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      {selectedWork ? (
        <div
          className="ai-modal"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className="ai-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`ai-modal-title-${selectedWork.id}`}
          >
            <button
              ref={closeButtonRef}
              className="ai-modal__close"
              type="button"
              aria-label="AI作品の拡大表示を閉じる"
              onClick={closeModal}
            >
              ×
            </button>
            <figure className="ai-modal__figure">
              <img src={assetPath(selectedWork.image)} alt={`${selectedWork.title}の拡大画像`} />
              <figcaption id={`ai-modal-title-${selectedWork.id}`}>
                <span className="ai-modal__category">{selectedWork.type}</span>
                <span className="ai-modal__title">{selectedWork.title}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      ) : null}
    </Wrapper>
  );
}

export default AICreative;
