import { useEffect, useRef, useState } from 'react';

import WorkCard from './WorkCard';
import { assetPath } from '../utils/assetPath';

function SNSCreative({ works }) {
  const [selectedWork, setSelectedWork] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const returnFocusRef = useRef(null);

  const gallery = selectedWork?.gallery ?? [];
  const selectedDetails = selectedWork?.details ?? {};

  useEffect(() => {
    if (!selectedWork) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    returnFocusRef.current = document.activeElement;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setSelectedWork(null);
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActiveIndex((current) => (current - 1 + gallery.length) % gallery.length);
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveIndex((current) => (current + 1) % gallery.length);
        return;
      }

      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        const focusable = Array.from(focusableElements);

        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    const focusTimer = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      returnFocusRef.current?.focus?.();
    };
  }, [gallery.length, selectedWork]);

  const openModal = (work) => {
    setSelectedWork(work);
    setActiveIndex(0);
  };

  const closeModal = () => setSelectedWork(null);

  const moveSlide = (direction) => {
    setActiveIndex((current) => (current + direction + gallery.length) % gallery.length);
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) {
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = endX - touchStartX.current;

    if (Math.abs(distance) > 48) {
      moveSlide(distance < 0 ? 1 : -1);
    }

    touchStartX.current = null;
  };

  const detailItems = [
    ['概要', selectedDetails.overview],
    ['制作目的', selectedDetails.purpose],
    ['制作ポイント', selectedDetails.points],
    ['担当範囲', selectedDetails.role],
    ['使用ツール', selectedDetails.tools],
    ['制作区分', selectedDetails.projectType],
  ].filter(([, value]) => value);

  return (
    <>
      <section className="section" id="sns">
        <div className="container">
          <p className="eyebrow">Social Communication</p>
          <h2 className="section-heading">SNS Creative</h2>
          <div className="works-grid works-grid--two works-grid--sns">
            {works.map((work) => (
              <WorkCard
                work={work}
                variant="work-card--sns"
                key={work.id}
                onOpen={work.gallery?.length ? () => openModal(work) : undefined}
              />
            ))}
          </div>
        </div>
      </section>
      {selectedWork ? (
        <div
          className="sns-modal"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className="sns-modal__panel"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sns-modal-title"
            tabIndex={-1}
          >
            <button className="sns-modal__close" ref={closeButtonRef} type="button" aria-label="詳細を閉じる" onClick={closeModal}>
              ×
            </button>
            <div className="sns-modal__header">
              <p className="sns-modal__category">
                {selectedWork.category} / {selectedWork.type}
              </p>
              <h2 className="sns-modal__title" id="sns-modal-title">
                {selectedWork.title}
              </h2>
            </div>
            <div
              className="sns-carousel"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={() => {
                touchStartX.current = null;
              }}
              aria-label={`${selectedWork.title}の作品カルーセル`}
            >
              <button className="sns-carousel__arrow sns-carousel__arrow--prev" type="button" aria-label="前の画像" onClick={() => moveSlide(-1)}>
                ‹
              </button>
              <figure className="sns-carousel__figure">
                <img
                  src={assetPath(gallery[activeIndex])}
                  alt={`${selectedWork.title} ${activeIndex + 1}枚目`}
                />
              </figure>
              <button className="sns-carousel__arrow sns-carousel__arrow--next" type="button" aria-label="次の画像" onClick={() => moveSlide(1)}>
                ›
              </button>
            </div>
            <div className="sns-carousel__status">
              <p aria-live="polite">
                {activeIndex + 1} / {gallery.length}
              </p>
              <div className="sns-carousel__dots" role="tablist" aria-label="画像を選択">
                {gallery.map((image, index) => (
                  <button
                    className={`sns-carousel__dot ${activeIndex === index ? 'is-active' : ''}`}
                    type="button"
                    role="tab"
                    aria-label={`${index + 1}枚目を表示`}
                    aria-selected={activeIndex === index}
                    key={image}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>
            </div>
            {detailItems.length > 0 ? (
              <div className="sns-modal__details">
                {detailItems.map(([label, value]) => (
                  <div className="sns-modal__detail" key={label}>
                    <p className="label">{label}</p>
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default SNSCreative;
