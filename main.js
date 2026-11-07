(function () {
  'use strict';

  /* Año del footer */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Menú móvil */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu-principal');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menú');
      });
    });
  }

  /* Estrellas del hero */
  var stars = document.querySelector('.stars');
  if (stars) {
    for (var i = 0; i < 60; i++) {
      var s = document.createElement('span');
      s.className = 'star';
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * 100 + '%';
      s.style.animationDelay = (Math.random() * 3).toFixed(2) + 's';
      stars.appendChild(s);
    }
  }

  /* Aparición al hacer scroll */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* FAQ: abrir solo una pregunta a la vez */
  var faqs = document.querySelectorAll('details.faq');
  faqs.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) faqs.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* Sombra del header al hacer scroll */
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,.35)' : 'none';
    }, { passive: true });
  }

  /* Formulario del pre-footer */
  var form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('email');
      var consent = document.getElementById('consent');
      var msg = document.getElementById('form-msg');
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
      if (!ok) {
        msg.textContent = 'Escribe un correo válido, por favor.';
        input.setAttribute('aria-invalid', 'true');
        input.focus();
        return;
      }
      input.removeAttribute('aria-invalid');
      if (!consent.checked) {
        msg.textContent = 'Debes aceptar para poder suscribirte.';
        consent.focus();
        return;
      }
      msg.textContent = '¡Listo! Tu lechuza va en camino. (Conecta este formulario a tu servicio de correo.)';
      form.reset();
    });
  }
})();
