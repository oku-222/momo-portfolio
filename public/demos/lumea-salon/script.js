/* =========================================================
   LUMÉA｜小顔美容サロン script.js
   機能：ハンバーガーメニュー／スムーズスクロール／
   　　　現在位置ナビゲーション／スクロールフェードイン／
   　　　FAQ（details/summaryを使用のためJS不要で開閉可）／
   　　　メニュー選択の予約フォームへの反映／
   　　　予約フォームのデモ送信処理
   ========================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     ハンバーガーメニュー
  --------------------------------------------------------- */
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobile-nav');

  function closeMobileNav() {
    if (!mobileNav) return;
    mobileNav.hidden = true;
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'メニューを開く');
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMobileNav();
      } else {
        mobileNav.hidden = false;
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.setAttribute('aria-label', 'メニューを閉じる');
      }
    });

    // メニュー内のリンクをクリックしたら自動的に閉じる
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });
  }

  /* ---------------------------------------------------------
     スムーズスクロール（ヘッダーの高さぶんオフセット）
  --------------------------------------------------------- */
  var header = document.getElementById('site-header');

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (targetId.length <= 1) return; // href="#" のみのリンク（デモ用）は無視
      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var headerHeight = header ? header.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8;

      window.scrollTo({
        top: top,
        behavior: reduceMotion ? 'auto' : 'smooth'
      });

      // URLに反映（履歴を汚さないようreplaceState）
      history.replaceState(null, '', targetId);
    });
  });

  /* ---------------------------------------------------------
     現在位置を意識したナビゲーション（アクティブ表示）
  --------------------------------------------------------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      var isMatch = link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-active', isMatch);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach(function (section) { navObserver.observe(section); });
  }

  /* ---------------------------------------------------------
     スクロールフェードイン
  --------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------------------------------------------------
     メニューカードの「このメニューで予約する」→ 予約フォームに反映
  --------------------------------------------------------- */
  var menuSelect = document.getElementById('menu-select');

  document.querySelectorAll('.menu-select-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var menuName = btn.getAttribute('data-menu');
      if (menuSelect) {
        // 完全一致する選択肢があれば選択する
        var matched = Array.prototype.find.call(menuSelect.options, function (opt) {
          return opt.value.indexOf(menuName) !== -1 || menuName.indexOf(opt.value) !== -1;
        });
        if (matched) {
          menuSelect.value = matched.value;
        }
      }
    });
  });

  /* ---------------------------------------------------------
     予約フォームのデモ送信（実際の送信処理は行わない）
  --------------------------------------------------------- */
  var contactForm = document.getElementById('contact-form');
  var formThanks = document.getElementById('form-thanks');

  if (contactForm && formThanks) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      contactForm.hidden = true;
      formThanks.hidden = false;
      formThanks.focus();
      formThanks.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    });
  }

  /* ---------------------------------------------------------
     LINE予約ボタン（デモ）：実際の連携がないことを伝える
  --------------------------------------------------------- */
  var lineBtn = document.getElementById('line-btn');
  if (lineBtn) {
    lineBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.alert('これはポートフォリオ用のデモです。実際のサイトではLINE公式アカウントの予約画面へ遷移します。');
    });
  }
})();
