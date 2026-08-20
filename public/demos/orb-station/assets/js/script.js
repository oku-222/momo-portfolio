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

  // --- 6. サービス詳細モーダル ---
  const serviceModal = document.querySelector("[data-service-modal]");
  if (serviceModal) {
    const serviceTriggers = document.querySelectorAll(".js-service-modal-trigger");
    const serviceTitle = serviceModal.querySelector(".service-modal__title");
    const serviceLead = serviceModal.querySelector("[data-service-modal-lead]");
    const serviceBody = serviceModal.querySelector("[data-service-modal-body]");
    const serviceDetailLink = serviceModal.querySelector("[data-service-modal-detail]");
    const serviceCloseButtons = serviceModal.querySelectorAll("[data-service-modal-close]");
    let lastServiceTrigger = null;

    const serviceDetails = {
      "voice-analysis": {
        title: "音声診断",
        lead: "声の状態を知り、これからの向き合い方を考えるためのメニューです。",
        body: "掲載内容は制作中のサンプルです。音声分析ソフトを使い、声の状態をグラフで確認しながら、現在のお悩みやご希望を整理します。",
        url: "./service/voice-analysis/index.html"
      },
      "sound-therapy": {
        title: "音声療法",
        lead: "音や響きを通して、自分の声と心身の状態を見つめるメニューです。",
        body: "掲載内容は制作中のサンプルです。音叉やシンギングボウルなどの音を用いながら、声に関するお悩みや、リラックスして過ごすための方法をご案内します。",
        url: "./service/sound-therapy/index.html"
      },
      "voice-lesson": {
        title: "ボイスレッスン",
        lead: "日常の話し声や表現を、マンツーマンで見直すためのレッスンです。",
        body: "掲載内容は制作中のサンプルです。表現者としての経験をもとに、心に響く伝わる声の出し方を一人ひとりに合わせてご案内します。",
        url: "./service/voice-lesson/index.html"
      },
      "voice-therapist-course": {
        title: "音声療法士養成講座",
        lead: "音声療法士を目指す方に向けた、理論と実践を学ぶ講座です。",
        body: "掲載内容は制作中のサンプルです。音声療法に関する考え方や実践方法を学び、活動に向けた準備を進めるための教育プログラムをご案内します。",
        url: "./service/voice-therapist-course/index.html"
      }
    };

    const closeServiceModal = () => {
      serviceModal.classList.remove("is-open");
      serviceModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-modal-open");
      if (lastServiceTrigger) lastServiceTrigger.focus();
    };

    serviceTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        const data = serviceDetails[trigger.dataset.service];
        if (!data) return;
        lastServiceTrigger = trigger;
        serviceTitle.textContent = data.title;
        serviceLead.textContent = data.lead;
        serviceBody.innerHTML = `<p>${data.body}</p>`;
        serviceDetailLink.href = data.url;
        serviceModal.classList.add("is-open");
        serviceModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("is-modal-open");
        serviceModal.querySelector(".service-modal__dialog").focus();
      });
    });

    serviceCloseButtons.forEach((button) => {
      button.addEventListener("click", closeServiceModal);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && serviceModal.classList.contains("is-open")) {
        closeServiceModal();
      }
    });
  }




});
