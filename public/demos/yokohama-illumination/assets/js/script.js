document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================================
       1. Header Scroll Effect
       ========================================================================= */
  const header = document.querySelector(".js-header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  });

  /* =========================================================================
       2. Scroll Triggered Fade-In Animations (Intersection Observer)
       ========================================================================= */
  const fadeElements = document.querySelectorAll(".js-fade-in");

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.1,
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-active");
        // Optional: Stop observing once faded in to keep it visible
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach((el) => {
    fadeObserver.observe(el);
  });

  /* =========================================================================
       3. Smooth Scrolling for Anchor Links
       ========================================================================= */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  /* =========================================================================
       4. Sticky CTA Reveal on Scroll (Heroを抜けたタイミングで表示)
       ========================================================================= */
  const stickyCta = document.querySelector(".js-sticky-cta");
  const hero = document.querySelector(".hero");

  if (stickyCta && hero) {
    // Hero下端の絶対位置（ドキュメント先頭からの距離）を都度計算
    const getHeroBottom = () =>
      hero.getBoundingClientRect().bottom + window.scrollY;

    let heroBottom = getHeroBottom();

    window.addEventListener("resize", () => {
      heroBottom = getHeroBottom();
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY > heroBottom) {
        stickyCta.classList.add("is-visible");
      } else {
        stickyCta.classList.remove("is-visible");
      }
    });
  }

  /* =========================================================================
       5. Button Click Effect (Optional - just for interaction feel)
       ========================================================================= */
  const purchaseBtns = document.querySelectorAll(
    ".js-purchase-btn, .btn--sticky",
  );

  purchaseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Real application would redirect to ticketing site here
      // Just preventing default for this static LP demonstration unless it's a hash link
      if (!btn.getAttribute("href").startsWith("#")) {
        // e.preventDefault();
        alert("チケット購入ページへ遷移します。");
      }
    });
  });

  //=========================================================================
  //  パーティクル
  //=========================================================================
  const canvas = document.getElementById("js-bubble-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const particles = [];
  const particleCount = 28; // 泡の数（写真と文字を主役にするため控えめに）

  // リサイズ処理
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  // 泡のクラス
  class Particle {
    constructor() {
      this.init();
    }

    init() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 100; // 画面下から出現
      this.radius = Math.random() * 3 + 1; // サイズ
      this.speed = Math.random() * 1 + 0.5; // 上昇速度
      this.opacity = Math.random() * 0.22 + 0.18;
      this.sway = Math.random() * 2; // 横揺れの幅
      this.swaySpeed = Math.random() * 0.05; // 横揺れの速度
      this.angle = Math.random() * Math.PI * 2;
    }

    update() {
      this.y -= this.speed; // 上に移動
      this.angle += this.swaySpeed;
      this.x += Math.sin(this.angle) * this.sway; // ゆらゆらさせる

      // 画面上部に出たら下から再生成
      if (this.y < -10) {
        this.init();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${this.opacity})`; // ネオンブルー

      // 光っている感じを出す（負荷が高い場合は省略可）
      ctx.shadowBlur = 6;
      ctx.shadowColor = "#00f0ff";

      ctx.fill();
      ctx.closePath();
    }
  }

  // 初期生成
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    // 画面をクリア（少し残像を残す場合は、fillStyleを半透明の黒にする）
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
});
