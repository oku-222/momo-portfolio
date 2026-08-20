/**
 * script.js
 * うちの子アート制作スタジオ
 * テーマ: ハイドランジアブルー × パールホワイト
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- ハンバーガーメニューの制御 ---
  const drawerButton = document.getElementById('js-button-drawer');
  const drawerMenu   = document.getElementById('js-drawer');
  const headerLinks  = document.querySelectorAll('.header__link');

  if (drawerButton && drawerMenu) {

    drawerButton.addEventListener('click', () => {
      const isExpanded = drawerButton.getAttribute('aria-expanded') === 'true';

      drawerButton.setAttribute('aria-expanded', String(!isExpanded));
      drawerButton.classList.toggle('is-checked'); // CSS ハンバーガーアニメーション用
      drawerMenu.classList.toggle('is-open');
      document.body.classList.toggle('u-noscroll');
    });

    // ナビリンクをクリックしたらメニューを閉じる
    headerLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawerButton.setAttribute('aria-expanded', 'false');
        drawerButton.classList.remove('is-checked');
        drawerMenu.classList.remove('is-open');
        document.body.classList.remove('u-noscroll');
      });
    });
  }

  // --- スムーズスクロール ---
  // ヘッダー高さ分のオフセット補正を JS で制御する
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href !== '#' && href !== '') {
        e.preventDefault();
        const targetElement = document.querySelector(href);

        if (targetElement) {
          const header       = document.querySelector('.header');
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

          window.scrollTo({
            top:      targetPosition,
            behavior: 'smooth',
          });
        }
      }
    });
  });

  // --- スクロール連動フェードインアニメーション ---
  const observerOptions = {
    root:       null,
    rootMargin: '0px',
    threshold:  0.1, // 10% 表示されたら発火
  };

  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // 一度表示したら監視解除
      }
    });
  }, observerOptions);

  // 監視対象: セクション全体・ワークスカード・サービスカード
  // ※ id / class 名は HTML と完全一致
  const targetElements = document.querySelectorAll(
    '.section, .works-item, .service-item'
  );

  targetElements.forEach(el => {
    el.classList.add('js-fade-in');
    fadeInObserver.observe(el);
  });

// --- モーダルの制御 ---
const modal = document.getElementById('js-modal');
const modalCloseBtns = document.querySelectorAll('.js-modal-close');
const worksImages = document.querySelectorAll('.works-item__image');

// 1. 画像クリックで開く
worksImages.forEach(imgWrap => {
  imgWrap.addEventListener('click', () => {
    const item = imgWrap.closest('.works-item');
    const imgSrc = imgWrap.querySelector('img').src;
    const title = item.querySelector('.works-item__name').textContent;

    document.getElementById('js-modal-img').src = imgSrc;
    document.getElementById('js-modal-text').textContent = title + " の詳細です。";

    modal.classList.add('is-open');
    document.body.classList.add('u-noscroll');
  });
});

// 2. 閉じる処理（ボタン または 背景クリック）
modalCloseBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.classList.remove('is-open');
    document.body.classList.remove('u-noscroll');
  });
});

// --- メイン画像のスライドショー ---
const heroImages = document.querySelectorAll('.hero__img');
let currentIndex = 0;

function rotateImages() {
  // 現在の画像を非表示に
  heroImages[currentIndex].classList.remove('is-active');
  
  // 次のインデックスへ（3枚目なら0に戻る）
  currentIndex = (currentIndex + 1) % heroImages.length;
  
  // 次の画像を表示
  heroImages[currentIndex].classList.add('is-active');
}

// 5秒ごとに画像を切り替え
setInterval(rotateImages, 3000);

// 閉じる処理はそのまま（既存コードをご利用ください）

});