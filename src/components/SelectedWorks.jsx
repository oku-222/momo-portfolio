import WorkCard from './WorkCard';

function SelectedWorks({ works, filters, activeFilter, onFilterChange }) {
  const showWebWorks = activeFilter === 'All' || activeFilter === 'Web';

  return (
    <section className="section" id="works">
      <div className="container">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Portfolio</p>
            <h2 className="section-heading">Selected Works</h2>
          </div>
          <p className="filter-status" aria-live="polite">
            {activeFilter === 'All' ? 'All works' : `${activeFilter} works`}
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
          <div className="works-grid">
            {works.map((work) => (
              <WorkCard work={work} key={work.id} />
            ))}
          </div>
        ) : (
          <p className="filter-note">下のカテゴリセクションに選択中の作品を表示しています。</p>
        )}
      </div>
    </section>
  );
}

export default SelectedWorks;
