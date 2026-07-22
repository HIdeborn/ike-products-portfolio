(() => {
  'use strict';

  const root = document.documentElement;
  const header = document.getElementById('site-header');
  const themeToggle = document.getElementById('theme-toggle');
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const yearEl = document.getElementById('year');

  /* ---- Footer year ---------------------------------------------------- */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Dark / light theme toggle (persisted to localStorage) --------- */
  const THEME_KEY = 'ike-products-theme';

  // CSS defaults to dark unless the OS explicitly prefers light (see style.css :root).
  const systemDefaultTheme = () =>
    window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

  const applyTheme = (theme) => {
    if (theme === 'dark' || theme === 'light') {
      root.setAttribute('data-theme', theme);
    } else {
      root.removeAttribute('data-theme');
    }
    if (themeToggle) {
      const isDark = (theme || systemDefaultTheme()) === 'dark';
      themeToggle.setAttribute('aria-pressed', String(isDark));
    }
  };

  const storedTheme = localStorage.getItem(THEME_KEY);
  applyTheme(storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || systemDefaultTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }

  /* ---- Mobile nav toggle ----------------------------------------------- */
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'メニューを開く');
      });
    });
  }

  /* ---- Smooth scroll for in-page anchor links -------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---- Header background state on scroll -------------------------------- */
  const onScroll = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Scroll-spy: highlight active nav link ---------------------------- */
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  if (sections.length && navLinks.length) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((section) => spyObserver.observe(section));
  }

  /* ---- Fade-in on scroll -------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const fadeObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    fadeEls.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 60}ms`;
      fadeObserver.observe(el);
    });
  }

  /* ---- Lazy-load images (native + graceful fallback) --------------------- */
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if (!('loading' in HTMLImageElement.prototype) && lazyImages.length) {
    const lazyObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        if (img.dataset.src) img.src = img.dataset.src;
        observer.unobserve(img);
      });
    });
    lazyImages.forEach((img) => lazyObserver.observe(img));
  }
})();
