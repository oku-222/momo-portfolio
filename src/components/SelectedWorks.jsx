import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import WorkCard from './WorkCard';
import { assetPath } from '../utils/assetPath';

function SelectedWorks({ works, filters, activeFilter, onFilterChange }) {
  const [selectedWork, setSelectedWork] = useState(null);
  const showWebWorks = activeFilter === 'ALL' || activeFilter === 'WEB';

  useEffect(() => {
    if (!selectedWork) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedWork(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedWork]);

  const closeModal = () => setSelectedWork(null);
  const selectedDetails = selectedWork?.details ?? {};
  const siteUrl = selectedDetails.siteUrl || selectedWork?.demoUrl;
  const detailItems = [
    ['概要', selectedDetails.overview],
    ['制作目的', selectedDetails.purpose],
    ['制作ポイント', selectedDetails.points],
    ['担当範囲', selectedDetails.role],
    ['使用ツール', selectedDetails.tools],
    ['案件区分', selectedDetails.projectType],
  ].map(([label, value]) => [label, value || '未設定']);

  return (
    <section className="section" id="works">
      <div className="container">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Portfolio</p>
            <h2 className="section-heading">Selected Works</h2>
          </div>
          <p className="filter-status" aria-live="polite">
            {activeFilter === 'ALL' ? 'All works' : `${activeFilter} works`}
          </p>
        </div>
        <div className="filter-list" role="group" aria-label="作品カテゴリを絞り込む">
          {filters.map((filter) => (
            <button
              className={`filter-button ${activeFilter === filter ? 'is-active' : ''}`}
              type="button"
              key={filter}
              aria-pressed={activeFilter === filter}
              onClick={() => onFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        {showWebWorks ? (
          <>
            <div className="works-subsection-heading">
              <p className="eyebrow">Web</p>
              <h3 className="subsection-heading">Web Design</h3>
            </div>
            <div className="works-grid works-grid--web">
              {works.map((work) => (
                <WorkCard
                  work={work}
                  key={work.id}
                  onOpen={work.category === 'Web' ? () => setSelectedWork(work) : undefined}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="filter-note">下のカテゴリセクションに選択中の作品を表示しています。</p>
        )}
      </div>
      {selectedWork
        ? createPortal(
            <div
              className="work-modal"
              role="presentation"
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  closeModal();
                }
              }}
            >
              <div className="work-modal__panel" role="dialog" aria-modal="true" aria-labelledby="work-modal-title">
                <button className="work-modal__close" type="button" aria-label="詳細を閉じる" onClick={closeModal}>
                  ×
                </button>
                <div className="work-modal__layout">
                  <figure className="work-modal__media">
                    <img src={assetPath(selectedWork.image)} alt={`${selectedWork.title}のメイン画像`} />
                  </figure>
                  <div className="work-modal__content">
                    <p className="work-modal__category">
                      {selectedWork.category} / {selectedWork.type}
                    </p>
                    <h2 className="work-modal__title" id="work-modal-title">
                      {selectedWork.title}
                    </h2>
                    {detailItems.length > 0 ? (
                      <div className="work-modal__details">
                        {detailItems.map(([label, value]) => (
                          <div className="work-modal__detail" key={label}>
                            <p className="label">{label}</p>
                            <p>{value}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {siteUrl ? (
                      <a className="button work-modal__site-link" href={siteUrl} target="_blank" rel="noopener noreferrer">
                        サイトを見る ↗
                      </a>
                    ) : (
                      <button className="button work-modal__site-link" type="button" disabled>
                        サイトを見る ↗（準備中）
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}

export default SelectedWorks;
