/* ============================================================
   LOVABLE PRESENTATION – Language Toggle (lang.js)
   ============================================================
   Show / hide elements with class="lang-en" or "lang-fr"
   by toggling  data-lang="en|fr"  on <html>.
   Persists choice in localStorage.
   ============================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'lovable-lang';
  var root = document.documentElement;            // <html>

  /* --- Read saved preference or default to EN --- */
  var saved = localStorage.getItem(STORAGE_KEY);
  var lang  = (saved === 'fr') ? 'fr' : 'en';
  root.setAttribute('data-lang', lang);

  /* --- Build the toggle button --- */
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.createElement('button');
    btn.className = 'lang-toggle';
    btn.setAttribute('aria-label', 'Switch language');
    btn.innerHTML = '<span class="lang-opt" data-l="en">EN</span><span class="lang-opt" data-l="fr">FR</span>';
    document.body.appendChild(btn);

    setActive(btn, lang);

    btn.addEventListener('click', function () {
      lang = (lang === 'en') ? 'fr' : 'en';
      root.setAttribute('data-lang', lang);
      localStorage.setItem(STORAGE_KEY, lang);
      setActive(btn, lang);
    });
  });

  function setActive(btn, l) {
    var opts = btn.querySelectorAll('.lang-opt');
    opts.forEach(function (o) {
      o.classList.toggle('active', o.getAttribute('data-l') === l);
    });
  }
})();
