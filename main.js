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

  /* Animación al hacer scroll */
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

  /* Quiz */
  var questions = [
    { q: '¿Qué criatura mítica es mitad águila y mitad caballo?', o: ['Grifo', 'Hipogrifo', 'Pegaso', 'Quimera'], a: 1 },
    { q: '¿Qué metal se asocia tradicionalmente con la transmutación en la alquimia?', o: ['Plomo a oro', 'Hierro a plata', 'Cobre a diamante', 'Estaño a platino'], a: 0 },
    { q: 'En el folclore, ¿qué se dice que anuncia una lechuza?', o: ['Lluvia', 'Mensajes o presagios', 'Hambre', 'Un cumpleaños'], a: 1 },
    { q: '¿Qué instrumento se usa clásicamente para adivinar el futuro con hojas de té?', o: ['Taza', 'Espejo', 'Péndulo', 'Cuenco de agua'], a: 0 },
    { q: '¿Cuál es el nombre de la ciencia que estudia los astros y su supuesta influencia?', o: ['Astronomía', 'Cartomancia', 'Astrología', 'Numerología'], a: 2 }
  ];
  var idx = 0, score = 0;
  var elQ = document.getElementById('quiz-question');
  var elO = document.getElementById('quiz-options');
  var elP = document.getElementById('quiz-progress');
  var elF = document.getElementById('quiz-feedback');
  var elN = document.getElementById('quiz-next');

  function showQuestion() {
    var item = questions[idx];
    elP.textContent = 'Pregunta ' + (idx + 1) + ' de ' + questions.length;
    elQ.textContent = item.q;
    elF.textContent = '';
    elN.hidden = true;
    elO.innerHTML = '';
    item.o.forEach(function (text, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = text;
      b.addEventListener('click', function () { answer(i); });
      elO.appendChild(b);
    });
  }

  function answer(i) {
    var item = questions[idx];
    var btns = elO.querySelectorAll('button');
    btns.forEach(function (b, k) {
      b.disabled = true;
      if (k === item.a) b.classList.add('correct');
      else if (k === i) b.classList.add('wrong');
    });
    if (i === item.a) { score++; elF.textContent = '¡Correcto!'; }
    else { elF.textContent = 'Casi. La respuesta correcta está marcada en verde.'; }
    elN.textContent = idx === questions.length - 1 ? 'Ver resultado' : 'Siguiente';
    elN.hidden = false;
    elN.focus();
  }

  function showResult() {
    elP.textContent = 'Resultado final';
    elQ.textContent = 'Has acertado ' + score + ' de ' + questions.length;
    elO.innerHTML = '';
    var msg = score >= 4 ? 'Tu Ojo Interior está afinadísimo.' : score >= 2 ? 'Buen intento, sigue practicando la Adivinación.' : 'Quizá necesites más hojas de té.';
    elF.textContent = msg;
    elN.textContent = 'Jugar de nuevo';
    elN.hidden = false;
    elN.dataset.restart = '1';
  }

  if (elN) {
    elN.addEventListener('click', function () {
      if (elN.dataset.restart) {
        delete elN.dataset.restart;
        idx = 0; score = 0; showQuestion();
        return;
      }
      idx++;
      if (idx >= questions.length) showResult(); else showQuestion();
    });
    showQuestion();
  }

  /* Creador de retratos */
  var form = document.getElementById('maker-form');
  var svg = document.getElementById('avatar');
  if (form && svg) {
    var ns = 'http://www.w3.org/2000/svg';
    var bg = document.getElementById('av-bg');
    var hat = document.getElementById('av-hat');
    var pom = document.getElementById('av-pom');
    var scarf = document.getElementById('av-scarf');
    var extra = document.getElementById('av-extra');
    var snow = document.getElementById('av-snow');

    function el(name, attrs) {
      var n = document.createElementNS(ns, name);
      Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
      return n;
    }

    function drawSnow(on) {
      snow.innerHTML = '';
      if (!on) return;
      for (var i = 0; i < 24; i++) {
        snow.appendChild(el('circle', {
          cx: (i * 53 % 190) + 5, cy: (i * 37 % 210) + 5, r: 1.5 + (i % 3) * .6, fill: '#ffffff', opacity: .8
        }));
      }
    }

    function drawExtra(type) {
      extra.innerHTML = '';
      if (type === 'stars') {
        [[30, 40], [165, 60], [40, 180], [160, 175]].forEach(function (p) {
          extra.appendChild(el('path', { d: 'M0-8l2.400 5.500 6 .5-4.500 4 1.400 6-5.300-3.200-5.300 3.200 1.400-6-4.500-4 6-.5z', transform: 'translate(' + p[0] + ',' + p[1] + ')', fill: '#f0cf7a' }));
        });
      } else if (type === 'glasses') {
        extra.appendChild(el('circle', { cx: 86, cy: 110, r: 11, fill: 'none', stroke: '#2a1a10', 'stroke-width': 3 }));
        extra.appendChild(el('circle', { cx: 114, cy: 110, r: 11, fill: 'none', stroke: '#2a1a10', 'stroke-width': 3 }));
        extra.appendChild(el('path', { d: 'M97 110h6', stroke: '#2a1a10', 'stroke-width': 3 }));
      } else if (type === 'candy') {
        extra.appendChild(el('path', { d: 'M165 200v-50q0-18-16-18', stroke: '#ffffff', 'stroke-width': 8, fill: 'none', 'stroke-linecap': 'round' }));
        extra.appendChild(el('path', { d: 'M165 200v-50q0-18-16-18', stroke: '#c0293b', 'stroke-width': 8, fill: 'none', 'stroke-linecap': 'round', 'stroke-dasharray': '6 10' }));
      }
    }

    function update() {
      var d = new FormData(form);
      bg.setAttribute('fill', d.get('bg'));
      hat.setAttribute('fill', d.get('hat'));
      scarf.setAttribute('fill', d.get('scarf'));
      drawExtra(d.get('extra'));
      drawSnow(form.elements.snow.checked);
    }
    form.addEventListener('change', update);
    update();

    document.getElementById('download-avatar').addEventListener('click', function () {
      var data = new XMLSerializer().serializeToString(svg);
      if (data.indexOf('xmlns=') === -1) data = data.replace('<svg', '<svg xmlns="' + ns + '"');
      var blob = new Blob([data], { type: 'image/svg+xml' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = 'mi-retrato-magico.svg';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 500);
    });
  }

  /* Newsletter (validación en cliente) */
  var nl = document.getElementById('newsletter-form');
  if (nl) {
    nl.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('email');
      var msg = document.getElementById('form-msg');
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
      if (!ok) {
        msg.textContent = 'Escribe un correo válido, por favor.';
        input.setAttribute('aria-invalid', 'true');
        input.focus();
        return;
      }
      input.removeAttribute('aria-invalid');
      msg.textContent = '¡Listo! Tu lechuza va en camino. (Conecta este formulario a tu servicio de correo.)';
      nl.reset();
    });
  }
})();
