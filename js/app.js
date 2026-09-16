/* ============================================================
   КАРТСЕЙЛС — логика витрины
   Контракт доступности (не нарушать при правках):
   1. id генерируются из стабильного slug оффера, НЕ из индекса.
   2. Каждый регион префиксует свои id: tile- / rail- / card-.
   3. Перерисовка — только replaceChildren внутри #catalog-host.
      #results-status живёт СНАРУЖИ перерисовываемой зоны.
   4. Фильтр (радио/селект/чипс) фокус НЕ двигает, только объявляет.
      Ссылка-навигация и submit — двигают на #results-title.
   5. aria-pressed / checked пишет только render(), не обработчики.
   6. Имя ссылки «Оформить …» для одного оффера одинаково во всех
      блоках — этого требует SC 3.2.4.
   ============================================================ */
(function () {
  'use strict';

  var D = window.DATA;
  if (!D) return;

  var SVG = 'http://www.w3.org/2000/svg';

  function el(tag, attrs, kids) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === false || v === undefined) return;
        if (k === 'text') { node.textContent = v; return; }
        node.setAttribute(k, v === true ? '' : String(v));
      });
    }
    (kids || []).forEach(function (kid) {
      if (kid === null || kid === undefined) return;
      node.appendChild(typeof kid === 'string' ? document.createTextNode(kid) : kid);
    });
    return node;
  }

  /* «0 ₽» читается вслух как «0 рублей», «от 1 ₽» — как «от 1 рубля» */
  var RUB_PLURAL = new Intl.PluralRules('ru-RU');
  function rubleWord(digits, hasPreposition) {
    var n = parseInt(String(digits).replace(/\D/g, ''), 10);
    var form = isNaN(n) ? 'many' : RUB_PLURAL.select(n);
    if (hasPreposition) return form === 'one' ? 'рубля' : 'рублей';
    return form === 'one' ? 'рубль' : (form === 'few' ? 'рубля' : 'рублей');
  }
  function spoken(s) {
    return String(s)
      .replace(/ /g, ' ')
      .replace(/(от|до|более)?\s*(\d[\d\s]*)\s*₽/gi, function (m, prep, num) {
        return (prep ? prep + ' ' : '') + num.trim() + ' ' + rubleWord(num, !!prep);
      })
      .replace(/\s*₽/g, ' рублей')
      .replace(/\s*%/g, ' процентов')
      .replace(/\s+/g, ' ')
      .trim();
  }
  function valueNode(str, cls) {
    var visual = String(str), voice = spoken(visual);
    if (voice === visual) return el('span', { class: cls || null, text: visual });
    return el('span', { class: cls || null }, [
      el('span', { 'aria-hidden': 'true', text: visual }),
      el('span', { class: 'visually-hidden', text: voice })
    ]);
  }

  function markNode(offer, cls) {
    return el('span', {
      class: cls, style: 'background:' + offer.color,
      'aria-hidden': 'true', text: offer.initials
    });
  }

  function extIcon() {
    var svg = document.createElementNS(SVG, 'svg');
    svg.setAttribute('class', 'btn__ext');
    svg.setAttribute('width', '15'); svg.setAttribute('height', '15');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('focusable', 'false');
    var p = document.createElementNS(SVG, 'path');
    p.setAttribute('d', 'M14 4h6v6M20 4l-8.5 8.5M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5');
    p.setAttribute('fill', 'none'); p.setAttribute('stroke', 'currentColor');
    p.setAttribute('stroke-width', '2'); p.setAttribute('stroke-linecap', 'round');
    p.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(p);
    return svg;
  }

  function ctaLink(offer, extraClass) {
    return el('a', {
      class: 'btn btn--orange ' + extraClass,
      href: offer.url,
      target: '_blank',
      rel: 'noopener nofollow sponsored'   /* без noreferrer: реферер нужен партнёрке */
    }, [
      'Оформить',
      el('span', { class: 'visually-hidden', text: ' ' + offer.cta + ' (откроется в новой вкладке)' }),
      extIcon()
    ]);
  }

  function adLine(offer, cls) {
    var parts = ['Реклама'];
    if (offer.advertiser) parts.push(offer.advertiser);
    return el('p', { class: cls }, [
      parts.join(' · ') + ' · erid: ',
      el('span', { translate: 'no', text: offer.erid })
    ]);
  }

  function byId(id) {
    return D.offers.filter(function (o) { return o.id === id; })[0] || null;
  }

  /* ---------- карточка каталога ---------- */
  function buildCard(offer) {
    var titleId = 'card-' + offer.id + '-title';
    return el('li', {}, [
      el('article', { class: 'card', 'aria-labelledby': titleId }, [
        el('div', { class: 'card__top' }, [
          markNode(offer, 'card__mark'),
          el('div', {}, [
            el('p', { class: 'card__bank', text: offer.bank }),
            el('h3', { class: 'card__title', id: titleId, text: offer.product })
          ])
        ]),
        el('p', { class: 'card__figure' }, [
          el('b', {}, [valueNode(offer.benefit.value)]),
          el('span', { text: offer.benefit.label })
        ]),
        el('ul', { class: 'card__list', role: 'list' },
          offer.features.map(function (f) { return el('li', { text: f }); })),
        el('div', { class: 'card__foot' }, [
          el('p', { class: 'card__price' }, [
            el('b', {}, [valueNode(offer.price.value)]), ' — ' + offer.price.label
          ]),
          ctaLink(offer, 'card__cta'),
          adLine(offer, 'card__ad')
        ])
      ])
    ]);
  }

  /* ---------- маленькая карточка в ленте тёмной плитки ---------- */
  function buildMini(offer) {
    var titleId = 'rail-' + offer.id + '-title';
    return el('li', {}, [
      el('article', { class: 'mini', 'aria-labelledby': titleId }, [
        el('p', { class: 'mini__bank' }, [markNode(offer, 'tile__mark'), el('span', { text: offer.bank })]),
        el('h4', { class: 'mini__title', id: titleId, text: offer.product }),
        el('p', { class: 'mini__figure' }, [
          valueNode(offer.benefit.value),
          el('span', { text: offer.benefit.label })
        ]),
        ctaLink(offer, 'mini__cta'),
        adLine(offer, 'mini__ad')
      ])
    ]);
  }

  /* ---------- бенто-плитки ---------- */
  function buildTile(cfg) {
    var tone = cfg.tone ? ' tile--' + cfg.tone : '';
    var span = cfg.span === 'sq' ? ' tile--sq' : ' tile--wide';

    if (cfg.kind === 'picks') {
      var picks = D.offers.filter(function (o) { return o.pick; }).slice(0, 3);
      return el('article', { class: 'tile' + tone + span, 'aria-labelledby': 'tile-picks-title' }, [
        el('p', { class: 'tile__eyebrow', text: cfg.eyebrow }),
        el('h3', { class: 'tile__title', id: 'tile-picks-title', text: cfg.title }),
        el('p', { class: 'tile__text', text: cfg.text }),
        el('ul', {
          class: 'rail', role: 'group',
          'aria-label': 'Лента предложений, прокручивается по горизонтали'
        }, picks.map(buildMini))
      ]);
    }

    var o = byId(cfg.offer);
    if (!o) return null;
    var tid = 'tile-' + o.id + '-title';
    return el('article', { class: 'tile' + tone + span, 'aria-labelledby': tid }, [
      el('p', { class: 'tile__eyebrow', text: cfg.eyebrow }),
      el('h3', { class: 'tile__title', id: tid, text: cfg.title }),
      el('p', { class: 'tile__text', text: cfg.text }),
      el('p', { class: 'tile__figure' }, [
        el('b', {}, [valueNode(o.benefit.value)]),
        el('span', { text: o.benefit.label })
      ]),
      el('div', { class: 'tile__foot' }, [
        el('p', { class: 'tile__bank' }, [markNode(o, 'tile__mark'), el('span', { text: o.bank })]),
        ctaLink(o, 'tile__cta')
      ]),
      adLine(o, 'tile__ad')
    ]);
  }

  /* ---------- состояние ---------- */
  var state = { cat: 'all', bank: 'all', goal: 'all', sort: 'popular', tags: [] };
  var CAT_IDS = D.categories.map(function (c) { return c.id; });
  var TAG_IDS = D.tags.map(function (t) { return t.id; });

  function readUrl() {
    try {
      var q = new URLSearchParams(location.search);
      var cat = q.get('cat');  if (cat && CAT_IDS.indexOf(cat) > -1) state.cat = cat;
      var bank = q.get('bank'); if (bank) state.bank = bank;
      var goal = q.get('goal'); if (goal && (goal === 'all' || TAG_IDS.indexOf(goal) > -1)) state.goal = goal;
      var sort = q.get('sort'); if (sort && ['popular', 'free', 'bank'].indexOf(sort) > -1) state.sort = sort;
      var tags = q.get('tags');
      if (tags) state.tags = tags.split(',').filter(function (t) { return TAG_IDS.indexOf(t) > -1; });
    } catch (e) { /* дефолты */ }
  }

  /* 3.3.7: состояние живёт в адресе, перезагрузка ничего не теряет */
  function writeUrl() {
    try {
      var q = new URLSearchParams();
      if (state.cat !== 'all') q.set('cat', state.cat);
      if (state.bank !== 'all') q.set('bank', state.bank);
      if (state.goal !== 'all') q.set('goal', state.goal);
      if (state.sort !== 'popular') q.set('sort', state.sort);
      if (state.tags.length) q.set('tags', state.tags.join(','));
      var s = q.toString();
      history.replaceState(null, '', s ? '?' + s + location.hash : location.pathname + location.hash);
    } catch (e) { /* игнорируем */ }
  }

  function isDefault() {
    return state.cat === 'all' && state.bank === 'all' && state.goal === 'all' && !state.tags.length;
  }

  function filtered() {
    var list = D.offers.filter(function (o) {
      if (state.cat !== 'all' && o.category !== state.cat) return false;
      if (state.bank !== 'all' && o.bank !== state.bank) return false;
      if (state.goal !== 'all' && o.tags.indexOf(state.goal) < 0) return false;
      for (var i = 0; i < state.tags.length; i++) if (o.tags.indexOf(state.tags[i]) < 0) return false;
      return true;
    });
    if (state.sort === 'bank') {
      list.sort(function (a, b) { return a.bank.localeCompare(b.bank, 'ru'); });
    } else if (state.sort === 'free') {
      list.sort(function (a, b) {
        var af = a.tags.indexOf('fee0') > -1 ? 0 : 1, bf = b.tags.indexOf('fee0') > -1 ? 0 : 1;
        return af - bf || b.popularity - a.popularity;
      });
    } else {
      list.sort(function (a, b) { return b.popularity - a.popularity; });
    }
    return list;
  }

  /* ---------- объявление количества (4.1.3) ---------- */
  var PLURAL = new Intl.PluralRules('ru-RU');
  var FORMS = { one: 'предложение', few: 'предложения', many: 'предложений', other: 'предложения' };
  function offersWord(n) { return FORMS[PLURAL.select(n)] || FORMS.other; }
  function countPhrase(n) {
    return n === 0 ? 'Ничего не найдено. Попробуйте изменить фильтры.'
                   : 'Найдено ' + n + ' ' + offersWord(n);
  }
  function statusText(n) {
    if (n === 0) return countPhrase(0);
    var bits = [];
    if (state.cat !== 'all') {
      var c = D.categories.filter(function (x) { return x.id === state.cat; })[0];
      if (c) bits.push(c.label);
    }
    if (state.bank !== 'all') bits.push(state.bank);
    state.tags.forEach(function (t) {
      var tag = D.tags.filter(function (x) { return x.id === t; })[0];
      if (tag) bits.push(tag.label.toLowerCase());
    });
    if (!bits.length) return countPhrase(n);
    if (bits.length > 3) bits = bits.slice(0, 2).concat(['и ещё ' + (bits.length - 2) + ' фильтра']);
    return bits.join(', ') + ': найдено ' + n + ' ' + offersWord(n);
  }

  var $status = document.getElementById('results-status');
  var announceTimer, writeTimer;
  function announce(msg) {
    clearTimeout(announceTimer); clearTimeout(writeTimer);
    announceTimer = setTimeout(function () {
      $status.textContent = '';
      /* setTimeout, а не rAF: в скрытой вкладке rAF заморожен и объявление не уходит */
      writeTimer = setTimeout(function () { $status.textContent = msg; }, 120);
    }, 500);
  }

  /* ---------- отрисовка каталога ---------- */
  var host = document.getElementById('catalog-host');

  function buildGrid(list) {
    if (!list.length) {
      return el('div', { class: 'empty' }, [
        'По выбранным фильтрам ничего не нашлось. Попробуйте другую категорию или сбросьте фильтры.',
        el('div', {}, [el('button', { type: 'button', class: 'btn btn--ghost', 'data-reset': 'true', text: 'Сбросить фильтры' })])
      ]);
    }
    return el('ul', { class: 'grid', role: 'list' }, list.map(buildCard));
  }

  function renderCatalog(list, withAnnounce) {
    var before = document.activeElement;
    host.replaceChildren(buildGrid(list));
    if (withAnnounce) announce(statusText(list.length));
    if (window.queueMicrotask) {
      queueMicrotask(function () {
        if (document.activeElement === document.body && before && before !== document.body) {
          console.error('[a11y] фокус потерян после перерисовки, был на:', before);
        }
      });
    }
  }

  function syncControls() {
    var radio = document.getElementById('cat-' + state.cat);
    if (radio) radio.checked = true;
    ['f-bank:bank', 'f-goal:goal', 'f-sort:sort'].forEach(function (pair) {
      var p = pair.split(':'), sel = document.getElementById(p[0]);
      if (sel) sel.value = state[p[1]];
    });
    Array.prototype.forEach.call(document.querySelectorAll('.chip[data-tag]'), function (btn) {
      btn.setAttribute('aria-pressed', state.tags.indexOf(btn.dataset.tag) > -1 ? 'true' : 'false');
    });
    var resetBtn = document.querySelector('.chip--reset');
    if (resetBtn) resetBtn.hidden = isDefault();

    Array.prototype.forEach.call(document.querySelectorAll('.cat'), function (tile) {
      var link = tile.querySelector('a[data-cat]');
      var on = !!link && link.dataset.cat === state.cat;
      tile.setAttribute('data-current', on ? 'true' : 'false');
      if (link) { if (on) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current'); }
    });
  }

  function apply(opts) {
    opts = opts || {};
    syncControls();
    writeUrl();
    renderCatalog(filtered(), opts.announce !== false);
    if (opts.focusResults) {
      var t = document.getElementById('results-title');
      t.focus({ preventScroll: true });
      t.scrollIntoView({
        block: 'start',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    }
  }

  /* ---------- статичные блоки ---------- */

  (function () {                       // селект банков
    var sel = document.getElementById('f-bank'), seen = {};
    D.offers.forEach(function (o) {
      if (seen[o.bank]) return;
      seen[o.bank] = true;
      sel.appendChild(el('option', { value: o.bank, text: o.bank }));
    });
  })();

  (function () {                       // чипсы
    var box = document.getElementById('chips');
    D.tags.forEach(function (t) {
      box.appendChild(el('button', {
        type: 'button', class: 'chip', 'data-tag': t.id, 'aria-pressed': 'false', text: t.label
      }));
    });
    box.appendChild(el('button', {
      type: 'button', class: 'chip chip--reset', 'data-reset': 'true', text: 'Сбросить фильтры', hidden: true
    }));
  })();

  (function () {                       // бенто (не фильтруется — отдельная задача блока)
    var box = document.getElementById('bento');
    var tiles = (D.bento || []).map(buildTile).filter(Boolean);
    box.replaceChildren.apply(box, tiles);
  })();

  (function () {                       // отзывы
    var grid = document.getElementById('reviews-grid');
    grid.replaceChildren.apply(grid, (D.reviews || []).map(function (r) {
      return el('li', {}, [
        el('figure', { class: 'review' }, [
          el('blockquote', {}, [el('p', { text: '«' + r.text + '»' })]),
          el('figcaption', { text: r.name + ', ' + r.city })
        ])
      ]);
    }));
  })();

  (function () {                       // FAQ — нативный details/summary, без ARIA-надстроек
    var box = document.getElementById('faq-list');
    box.replaceChildren.apply(box, (D.faq || []).map(function (item) {
      return el('details', { class: 'faq__item' }, [
        el('summary', { text: item.q }),
        el('p', { class: 'faq__answer', text: item.a })
      ]);
    }));
  })();

  (function () {                       // даты
    var u = document.getElementById('updated-at');
    if (u && D.updatedAt) u.textContent = D.updatedAt;
    var y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());
  })();

  /* ---------- фильтры ---------- */

  var picker = document.getElementById('picker');

  picker.addEventListener('change', function (e) {
    var t = e.target;
    if (t.name === 'category') state.cat = t.value;
    else if (t.id === 'f-bank') state.bank = t.value;
    else if (t.id === 'f-goal') state.goal = t.value;
    else if (t.id === 'f-sort') state.sort = t.value;
    else return;
    apply();                            // фокус не трогаем — 3.2.2
  });

  picker.addEventListener('submit', function (e) {
    e.preventDefault();
    apply({ focusResults: true });
  });

  document.getElementById('chips').addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (!btn) return;
    if (btn.dataset.reset) { resetAll(false); return; }
    var tag = btn.dataset.tag;
    if (!tag) return;
    var i = state.tags.indexOf(tag);
    if (i > -1) state.tags.splice(i, 1); else state.tags.push(tag);
    apply();
  });

  function resetAll(moveFocus) {
    state.cat = 'all'; state.bank = 'all'; state.goal = 'all'; state.tags = [];
    syncControls(); writeUrl();
    renderCatalog(filtered(), false);
    if (moveFocus) document.getElementById('results-title').focus({ preventScroll: true });
    announce('Фильтры сброшены. ' + countPhrase(filtered().length));
  }

  // кнопка сброса из пустого состояния живёт ВНУТРИ перерисовываемой зоны,
  // поэтому фокус уводим явно — иначе он упадёт в body
  host.addEventListener('click', function (e) {
    if (!e.target.closest('[data-reset]')) return;
    resetAll(true);
  });

  /* ---------- ссылки-категории (шапка, плитки, подвал) ---------- */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[data-cat]');
    if (!link) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;   // не ломаем «открыть в новой вкладке»
    e.preventDefault();
    state.cat = link.dataset.cat;
    if (link.closest('dialog')) {
      pendingFocus = document.getElementById('results-title');
      closeNav();
      apply();
    } else {
      apply({ focusResults: true });
    }
  });

  /* ---------- мобильное меню ---------- */
  var panel = document.getElementById('mobile-nav');
  var navToggle = document.getElementById('nav-toggle');
  var lastTrigger = null, pendingFocus = null;

  function openNav() {
    var act = document.activeElement;
    lastTrigger = (act && act !== document.body) ? act : navToggle;
    if (typeof panel.showModal === 'function') panel.showModal();
    else panel.setAttribute('open', '');
    document.documentElement.classList.add('is-locked');
    panel.querySelector('.mobile-nav__inner').focus({ preventScroll: true });
  }
  function closeNav() {
    if (typeof panel.close === 'function' && panel.open) panel.close();
    else { panel.removeAttribute('open'); onNavClosed(); }
  }
  function onNavClosed() {
    document.documentElement.classList.remove('is-locked');
    if (pendingFocus && document.contains(pendingFocus)) {
      var t = pendingFocus; pendingFocus = null;
      t.focus({ preventScroll: true });
      t.scrollIntoView({
        block: 'start',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
      return;
    }
    pendingFocus = null;
    if (lastTrigger && document.contains(lastTrigger) && lastTrigger.offsetParent !== null) { lastTrigger.focus(); return; }
    document.getElementById('main').focus();
  }

  navToggle.addEventListener('click', openNav);
  panel.addEventListener('close', onNavClosed);
  /* Escape у <dialog> закрывает нативно, но в некоторых встроенных webview
     событие клавиши приходит «синтетическим» и нативный cancel не срабатывает —
     держим собственный обработчик, чтобы 2.1.2 выполнялся везде. */
  panel.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') { e.preventDefault(); closeNav(); }
  });
  panel.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) { closeNav(); return; }
    if (e.target === panel) { closeNav(); return; }            // клик по подложке
    var a = e.target.closest('a[href^="#"]');
    if (!a || a.dataset.cat) return;
    var target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    pendingFocus = target;
    closeNav();
  });

  /* поворот экрана при открытом меню — иначе фокус падает в body, а блокировка скролла остаётся */
  window.matchMedia('(max-width: 56.25em)').addEventListener('change', function (e) {
    if (e.matches) return;
    pendingFocus = null; lastTrigger = null;
    if (panel.open) closeNav();
    document.documentElement.classList.remove('is-locked');
  });

  /* ---------- подписка ---------- */
  (function () {
    var form = document.getElementById('sub-form');
    var input = document.getElementById('sub-email');
    var errBox = document.getElementById('sub-error');
    var okBox = document.getElementById('sub-status');
    var alertBox = document.getElementById('sub-alert');
    var btn = document.getElementById('sub-btn');
    var busy = false;

    function showError(msg) {
      errBox.textContent = msg; errBox.hidden = false;
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', 'sub-error sub-hint');
      input.focus();
    }
    function clearError() {
      errBox.hidden = true; errBox.textContent = '';
      input.removeAttribute('aria-invalid');
      input.setAttribute('aria-describedby', 'sub-hint');
    }
    input.addEventListener('input', function () {
      if (input.hasAttribute('aria-invalid')) clearError();
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (busy) return;
      okBox.textContent = ''; alertBox.textContent = '';

      var v = input.value.trim();
      if (!v) { showError('Введите адрес электронной почты.'); return; }
      if (!input.validity.valid) {
        showError('Адрес электронной почты указан неверно. Пример правильного адреса: ivan@example.com');
        return;
      }
      clearError();

      busy = true;
      btn.setAttribute('aria-disabled', 'true');   // не disabled: фокус остаётся на кнопке
      // Бэкенда пока нет — заявку кладём локально и показываем подтверждение.
      // Когда появится обработчик (api.php / форма партнёрки), заменить на fetch().
      setTimeout(function () {
        busy = false;
        btn.removeAttribute('aria-disabled');
        try {
          var box = JSON.parse(localStorage.getItem('kartsales:subs') || '[]');
          box.push({ email: v, at: new Date().toISOString() });
          localStorage.setItem('kartsales:subs', JSON.stringify(box));
        } catch (err) { /* приватный режим — не критично */ }
        okBox.textContent = 'Готово. Мы написали на ' + v + ' — подтвердите подписку в письме.';
        form.reset();
      }, 350);
    });
  })();

  /* ---------- старт ---------- */
  readUrl();
  syncControls();
  renderCatalog(filtered(), false);
  $status.textContent = countPhrase(filtered().length);
})();
