/* ===================================================================
   猫カフェ Mofuu — main.js
   -------------------------------------------------------------------
   実装内容:
   1. ハンバーガーメニュー
   2. スムーススクロール
   3. スクロールフェードイン（IntersectionObserver）
   4. ギャラリーモーダル（前後送り・キーボード操作対応）
   5. 現在位置ナビ（スクロール連動でアクティブリンクを切り替え）
   6. ヘッダー背景変更（スクロール量に応じて）
   7. 画像Lazy Load（loading="lazy" 属性を基本とし、非対応ブラウザのみJSで補完）
   8. ヒーローの控えめなパララックス
   軽量に保つため、余計なライブラリは使わずVanilla JSのみで実装。
=================================================================== */

(() => {
  'use strict';

  /* ---------------------------------------------------------------
     フッターの年号を自動更新
  --------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------
     1. ハンバーガーメニュー
  --------------------------------------------------------------- */
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  function closeNav() {
    nav.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    header.classList.remove('nav-open');
    document.body.style.overflow = '';
  }

  function toggleNav() {
    const willOpen = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', willOpen);
    hamburger.classList.toggle('is-active', willOpen);
    hamburger.setAttribute('aria-expanded', String(willOpen));
    header.classList.toggle('nav-open', willOpen);
    document.body.style.overflow = willOpen ? 'hidden' : '';
  }

  if (hamburger && nav) {
    hamburger.addEventListener('click', toggleNav);

    // ナビ内のリンクをクリックしたら閉じる
    nav.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', closeNav);
    });

    // Escキーで閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---------------------------------------------------------------
     2. スムーススクロール
     （html { scroll-behavior: smooth } を基本としつつ、
       固定ヘッダー分のオフセットをJSで補正）
  --------------------------------------------------------------- */
  const headerHeight = () => header.offsetHeight;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight() + 1;
      window.scrollTo({ top, behavior: 'smooth' });

      // フォーカスをターゲットへ移動（アクセシビリティ対応）
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  /* ---------------------------------------------------------------
     3. スクロールフェードイン
  --------------------------------------------------------------- */
  const animatedEls = document.querySelectorAll('[data-anim], [data-heading]');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    animatedEls.forEach((el) => io.observe(el));
  } else {
    // 非対応ブラウザ向けフォールバック：即時表示
    animatedEls.forEach((el) => el.classList.add('is-inview'));
  }

  /* ---------------------------------------------------------------
     4. ギャラリーモーダル
  --------------------------------------------------------------- */
  const galleryGrid = document.getElementById('galleryGrid');
  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');

  let galleryItems = [];
  let currentIndex = 0;
  let lastFocusedEl = null;

  if (galleryGrid && modal) {
    galleryItems = Array.from(galleryGrid.querySelectorAll('.gallery__item'));

    function openModal(index) {
      currentIndex = index;
      const item = galleryItems[currentIndex];
      const fullSrc = item.getAttribute('data-full');
      const altText = item.querySelector('img').getAttribute('alt');

      modalImg.src = fullSrc;
      modalImg.alt = altText;

      lastFocusedEl = document.activeElement;
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      modalClose.focus();
    }

    function closeModal() {
      modal.hidden = true;
      document.body.style.overflow = '';
      if (lastFocusedEl) lastFocusedEl.focus();
    }

    function showRelative(step) {
      currentIndex = (currentIndex + step + galleryItems.length) % galleryItems.length;
      openModal(currentIndex);
    }

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => openModal(index));
    });

    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', () => showRelative(-1));
    modalNext.addEventListener('click', () => showRelative(1));

    // 背景クリックで閉じる
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // キーボード操作対応（Esc / 矢印キー）
    document.addEventListener('keydown', (e) => {
      if (modal.hidden) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') showRelative(-1);
      if (e.key === 'ArrowRight') showRelative(1);
    });
  }

  /* ---------------------------------------------------------------
     5. 現在位置ナビ（スクロール連動アクティブ表示）
  --------------------------------------------------------------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

  function setActiveLink(id) {
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((section) => navObserver.observe(section));
  }

  /* ---------------------------------------------------------------
     6. ヘッダー背景変更 + 7-b. ヒーローの控えめなパララックス
     （scroll イベントは1つにまとめ、rAFで間引いて軽量に保つ）
  --------------------------------------------------------------- */
  const heroImg = document.getElementById('heroImg');
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;

    header.classList.toggle('is-scrolled', y > 40);

    if (heroImg) {
      // 控えめなパララックス（動きすぎない範囲に制限）
      const shift = Math.min(y * 0.18, 120);
      heroImg.style.transform = `translateY(${shift}px) scale(var(--hero-scale, 1.06))`;
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  onScroll(); // 初期状態を反映

  /* ---------------------------------------------------------------
     7. 画像 Lazy Load フォールバック
     （loading="lazy" 未対応の古いブラウザ向けにIntersectionObserverで補完）
  --------------------------------------------------------------- */
  if (!('loading' in HTMLImageElement.prototype)) {
    const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      const lazyObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src; // 明示的な再アサインで読み込みをトリガー
            obs.unobserve(img);
          }
        });
      });
      lazyImgs.forEach((img) => lazyObserver.observe(img));
    }
  }

  /* ---------------------------------------------------------------
     お問い合わせフォーム：ダミー送信（実際の送信先は別途API/サービスに接続）
  --------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('お問い合わせありがとうございます。担当より折り返しご連絡いたします。\n（本フォームはデモ用のため、実際には送信されません）');
      contactForm.reset();
    });
  }

})();
