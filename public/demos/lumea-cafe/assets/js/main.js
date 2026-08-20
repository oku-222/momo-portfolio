/* ============================================================
   LUMÉA CAFÉ — main.js
   構成：
   1. ヘッダーのスクロール変化
   2. ハンバーガーメニュー（モバイル）
   3. ナビクリック後にメニューを閉じる／スムーススクロール補正
   4. スクロール連動フェードイン（IntersectionObserver）
   5. ヒーローの初回ロードアニメーション
   6. お問い合わせフォーム（ダミー送信）
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------------------------------------
     1. ヘッダーのスクロール変化
     スクロール量に応じてヘッダーに背景をつける
  ------------------------------------------------------------ */
  const header = document.querySelector(".site-header");
  const scrollThreshold = 40;

  const updateHeaderState = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  /* ------------------------------------------------------------
     2. ハンバーガーメニュー（モバイル）
  ------------------------------------------------------------ */
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  const closeNav = () => {
    navToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  const openNav = () => {
    navToggle.setAttribute("aria-expanded", "true");
    mainNav.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeNav() : openNav();
  });

  /* ------------------------------------------------------------
     3. ナビリンクをクリックしたらメニューを閉じる
  ------------------------------------------------------------ */
  document.querySelectorAll(".main-nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      closeNav();
    });
  });

  // Escキーでメニューを閉じる（アクセシビリティ配慮）
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeNav();
    }
  });

  /* ------------------------------------------------------------
     4. スクロール連動フェードイン
     .reveal / .reveal-eyebrow / .reveal-img がついた要素を
     画面内に入ったタイミングで表示する
  ------------------------------------------------------------ */
  const revealTargets = document.querySelectorAll(
    ".reveal, .reveal-eyebrow, .reveal-img"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
  } else {
    // IntersectionObserver 非対応ブラウザ向けフォールバック
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }

  /* ------------------------------------------------------------
     5. ヒーローの初回ロードアニメーション
     文字間が「ほどける」ように定位置へ収束する演出
  ------------------------------------------------------------ */
  document
    .querySelectorAll(".hero__eyebrow, .hero__title-en, .hero__title-jp")
    .forEach((el) => el.classList.add("is-loaded"));

  /* ------------------------------------------------------------
     6. お問い合わせフォーム（ダミー送信）
     バックエンドが無いため、送信をキャンセルして
     完了メッセージのみ表示する
  ------------------------------------------------------------ */
  const contactForm = document.querySelector(".contact__form");
  const contactStatus = document.querySelector(".contact__status");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      contactStatus.textContent =
        "お問い合わせありがとうございます。担当より折り返しご連絡いたします。";
      contactForm.reset();
    });
  }
});
