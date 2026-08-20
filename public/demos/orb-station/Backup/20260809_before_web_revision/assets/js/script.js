/**
 * ORB STATION 共通スクリプト
 * 初心者向け解説付き
 */

document.addEventListener("DOMContentLoaded", () => {
  
  // --- 1. ハンバーガーメニュー（スマホ用） ---
  const menuBtn = document.querySelector(".js-menu-button");
  const drawer = document.querySelector(".js-drawer");
  const drawerLinks = document.querySelectorAll(".drawer a");

  // ボタンをクリックした時にメニューを出したり消したりする
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("is-open");
    drawer.classList.toggle("is-open");
  });

  // メニュー内のリンクをクリックしたら、メニューを閉じる
  drawerLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("is-open");
      drawer.classList.remove("is-open");
    });
  });

  // --- 2. スムーズスクロール ---
  // 固定ヘッダーの高さ分、止まる位置を調整します
  const header = document.querySelector(".header");
  const headerHeight = header ? header.offsetHeight : 80;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      
      // 他のページからのアンカーリンク（../index.html#id）への対応
      if (href !== "#" && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });

// --- 3. メインビジュアルのスライダー (Swiper) ---
  const swiperEl = document.querySelector("#js-first-view-swiper");
  if (swiperEl) {
    new Swiper("#js-first-view-swiper", {
      loop: true,
      effect: "fade",           
      fadeEffect: {
        crossFade: true         // 画像が重なりながら消える（必須）
      },
      speed: 3000,              // ★切り替え（フェード）時間を3秒に（さらにゆっくり）
      autoplay: {
        delay: 4000,            // 5秒ごとに次の写真へ
        disableOnInteraction: false,
      },
      // ▼ ここから追加 ▼
    pagination: {
      el: '.swiper-pagination',
      clickable: true,       // クリックで画像を切り替えられるようにする
    },
    // ▲ ここまで追加 ▲
    });
  }


  // // --- 3. メインビジュアルのスライダー (Swiper) ---
  // // トップページにIDが存在する場合のみ実行します
  // const swiperEl = document.querySelector("#js-first-view-swiper");
  // if (swiperEl) {
  //   new Swiper("#js-first-view-swiper", {
  //     loop: true,               // 無限ループ
  //     effect: "fade",           // ふわっと切り替わる（癒やし効果）
  //     speed: 2500,              // 切り替えにかかる時間（ゆっくり）
  //     autoplay: {
  //       delay: 5000,            // 5秒ごとにスライド
  //       disableOnInteraction: false,
  //     },
  //   });
  // }

  // --- 4. トップへ戻るボタン ---
  const pageTop = document.querySelector(".js-page-top");
  window.addEventListener("scroll", () => {
    // 300px以上スクロールしたらボタンを表示
    if (window.scrollY > 300) {
      pageTop.classList.add("is-show");
    } else {
      pageTop.classList.remove("is-show");
    }
  });

  // --- 5. スクロールに合わせてふわっと表示させる ---
  const fadeItems = document.querySelectorAll(".js-fade"); // 監視対象をすべて取得

  // 監視のオプション（画面に何%入ったら発動するか）
  const options = {
    root: null, // ブラウザの画面を基準にする
    rootMargin: "0px",
    threshold: 0.2, // 20% 画面に入ったら実行
  };

  // 見張り番（Observer）の作成
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 画面に入ったら .is-show クラスを付ける
        entry.target.classList.add("is-show");
        // 一度表示されたら監視をやめる（何度もふわふわさせない場合）
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // すべての対象要素を監視開始
  fadeItems.forEach((item) => {
    observer.observe(item);
  });




});