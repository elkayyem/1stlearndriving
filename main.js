/* ============================================================
   1st Learn Driving School — site interactivity (vanilla JS)
   Reveal-on-scroll · animated counters · sticky nav · mobile menu
   · scroll-spy nav · smooth anchor scroll · star rendering · form
   ============================================================ */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Star icons in testimonials ---------- */
  var STAR_SVG =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="var(--warning-soft)" ' +
    'stroke="var(--warning-soft)" stroke-width="2">' +
    '<polygon points="12 2 15 9 22 9 17 14 19 22 12 17 5 22 7 14 2 9 9 9 12 2"/></svg>';
  document.querySelectorAll("[data-stars]").forEach(function (el) {
    var n = parseInt(el.getAttribute("data-stars"), 10) || 5;
    el.innerHTML = new Array(n + 1).join(STAR_SVG);
  });

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var delay = parseInt(el.getAttribute("data-delay"), 10) || 0;
        el.style.transitionDelay = delay + "ms";
        el.classList.add("is-in");
        revealIO.unobserve(el);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { revealIO.observe(el); });
  }

  /* ---------- Animated counters ---------- */
  function animateCounter(el) {
    var value = parseFloat(el.getAttribute("data-counter"));
    var decimals = parseInt(el.getAttribute("data-decimals"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.getAttribute("data-prefix") || "";
    if (prefersReduced) {
      el.textContent = prefix + value.toFixed(decimals) + suffix;
      return;
    }
    var duration = 1400, start = null;
    function tick(now) {
      if (start === null) start = now;
      var t = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + (value * eased).toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + value.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(tick);
  }
  var counters = document.querySelectorAll("[data-counter]");
  if (!("IntersectionObserver" in window)) {
    counters.forEach(animateCounter);
  } else {
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        animateCounter(e.target);
        countIO.unobserve(e.target);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { countIO.observe(el); });
  }

  /* ---------- Sticky nav scroll state ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu toggle ---------- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");
  var iconMenu = toggle && toggle.querySelector(".nav__icon-menu");
  var iconClose = toggle && toggle.querySelector(".nav__icon-close");
  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (iconMenu) iconMenu.style.display = open ? "none" : "";
    if (iconClose) iconClose.style.display = open ? "" : "none";
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      setMenu(!menu.classList.contains("is-open"));
    });
  }

  /* ---------- Smooth anchor scroll + close mobile menu ---------- */
  var navHeight = 64;
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      setMenu(false);
      var top = target.getBoundingClientRect().top + window.scrollY -
        (id === "#top" ? 0 : navHeight - 1);
      window.scrollTo({ top: top, behavior: prefersReduced ? "auto" : "smooth" });
      history.replaceState(null, "", id === "#top" ? location.pathname : id);
    });
  });

  /* ---------- Scroll-spy: highlight active nav link ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link[data-nav]"));
  var sections = navLinks
    .map(function (l) {
      var href = l.getAttribute("href");
      return { link: l, el: href === "#top" ? null : document.querySelector(href) };
    });
  function onSpy() {
    var pos = window.scrollY + navHeight + 40;
    var current = navLinks[0];
    sections.forEach(function (s) {
      if (s.el && s.el.offsetTop <= pos) current = s.link;
    });
    if (window.scrollY < 80) current = navLinks[0];
    navLinks.forEach(function (l) { l.classList.toggle("is-active", l === current); });
  }
  onSpy();
  window.addEventListener("scroll", onSpy, { passive: true });

  /* ---------- Contact form (demo submit) ---------- */
  var form = document.getElementById("contactForm");
  var submit = document.getElementById("contactSubmit");
  if (form && submit) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      submit.textContent = "Message sent — Jason will be in touch ✓";
      submit.disabled = true;
      setTimeout(function () {
        form.reset();
        submit.textContent = "Send Message";
        submit.disabled = false;
      }, 3800);
    });
  }
})();
