(function () {
  const { profile, categories, projects, cat, byCat } = window.PORTFOLIO;
  const { el, esc, open } = window.PortfolioUI;
  const $ = (s) => document.querySelector(s);

  /* Hero copy ----------------------------------------------------------- */
  $('#role').textContent = profile.role;
  $('#tagline').textContent = profile.tagline;
  $('#yr').textContent = new Date().getFullYear();
  $('#stats').innerHTML = [
    [projects.length, 'Projects'],
    [categories.length, 'Domains'],
    ['2025', 'Since']
  ].map(([n, l]) => `<div class="stat"><b>${n}</b><span>${l}</span></div>`).join('');

  /* Thumbnail: deterministic generative art from id + category colours --- */
  function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { let s = seed || 1; return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296; }
  function thumb(p, height) {
    const wrap = el('div', 'thumb');
    const c = cat(p.cats[0]);
    wrap.style.setProperty('--c', c.color);
    const cv = document.createElement('canvas');
    const W = 480, H = height || 128;
    cv.width = W; cv.height = H;
    const g = cv.getContext('2d');
    const r = rng(hash(p.id));
    // circuit-like traces in the colours of every domain the project belongs to
    p.cats.forEach((id, k) => {
      const col = cat(id).color;
      g.strokeStyle = col; g.fillStyle = col; g.lineWidth = 1.6;
      for (let n = 0; n < 5; n++) {
        let x = r() * W, y = r() * H;
        g.globalAlpha = 0.5 - k * 0.06;
        g.beginPath(); g.moveTo(x, y);
        for (let s = 0; s < 4; s++) {
          if (r() > 0.5) x += (r() - 0.3) * 120; else y += (r() - 0.5) * 80;
          g.lineTo(x, y);
        }
        g.stroke();
        g.globalAlpha = 0.9; g.beginPath(); g.arc(x, y, 3 + r() * 2, 0, 7); g.fill();
      }
    });
    wrap.appendChild(cv);
    wrap.appendChild(el('span', 'glyph', esc(c.icon)));
    return wrap;
  }

  function card(p, big) {
    const c = cat(p.cats[0]);
    const b = el('button', 'card rv' + (Progress.isFound(p.id) ? ' found' : ''));
    b.style.setProperty('--c', c.color);
    b.type = 'button';
    b.setAttribute('aria-label', 'Open ' + p.name);
    b.appendChild(thumb(p, big ? 200 : 128));
    if (p.featured) b.firstChild.appendChild(el('span', 'badge star', '★ Flagship'));
    else if (p.status !== 'Built') b.firstChild.appendChild(el('span', 'badge', esc(p.status)));
    const body = el('div', 'body');
    body.innerHTML = `
      <div class="cats">${p.cats.map((id) => `<span class="chip" style="--c:${cat(id).color}"><i class="dot"></i>${esc(cat(id).short)}</span>`).join('')}</div>
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.tagline)}</p>
      <div class="foot">${p.stack.slice(0, 4).map((t) => `<span class="tech">${esc(t)}</span>`).join('')}</div>`;
    b.appendChild(body);
    b.addEventListener('click', () => open(p, { onDiscover: () => b.classList.add('found') }));
    return b;
  }

  /* Featured -------------------------------------------------------------- */
  const feat = projects.filter((p) => p.featured);
  const fg = $('#featured-grid');
  feat.forEach((p, i) => fg.appendChild(card(p, i < 2)));

  /* Domains --------------------------------------------------------------- */
  let activeCat = 'all', query = '';
  const dg = $('#domains-grid');
  categories.forEach((c) => {
    const d = el('button', 'domain rv');
    d.type = 'button';
    d.style.setProperty('--c', c.color);
    d.innerHTML = `<div class="ic">${esc(c.icon)}</div><h4>${esc(c.name)}</h4><p>${esc(c.blurb)}</p><span class="n">${byCat(c.id).length} projects →</span>`;
    d.addEventListener('click', () => { setCat(c.id); document.getElementById('work').scrollIntoView({ behavior: 'smooth' }); });
    dg.appendChild(d);
  });

  /* Explorer -------------------------------------------------------------- */
  const fl = $('#filters');
  const mk = (id, label, n, color) => {
    const b = el('button', 'filter', `${esc(label)}<i>${n}</i>`);
    b.type = 'button';
    b.dataset.id = id;
    if (color) b.style.setProperty('--c', color);
    b.addEventListener('click', () => setCat(id));
    return b;
  };
  fl.appendChild(mk('all', 'All', projects.length));
  categories.forEach((c) => fl.appendChild(mk(c.id, c.short, byCat(c.id).length, c.color)));

  function setCat(id) { activeCat = id; render(); }

  const grid = $('#grid');
  function render() {
    fl.querySelectorAll('.filter').forEach((b) => b.classList.toggle('on', b.dataset.id === activeCat));
    const q = query.trim().toLowerCase();
    const list = projects.filter((p) => {
      if (activeCat !== 'all' && !p.cats.includes(activeCat)) return false;
      if (!q) return true;
      return (p.name + ' ' + p.tagline + ' ' + p.desc + ' ' + p.stack.join(' ') + ' ' + p.cats.map((c) => cat(c).name).join(' ')).toLowerCase().includes(q);
    });
    grid.innerHTML = '';
    list.forEach((p) => { const c = card(p); c.classList.add('in'); grid.appendChild(c); });
    $('#empty').hidden = list.length > 0;
    $('#count').textContent = list.length + ' of ' + projects.length;
  }
  $('#q').addEventListener('input', (e) => { query = e.target.value; render(); });
  render();

  /* About ----------------------------------------------------------------- */
  $('#roles').innerHTML = profile.offer.map((r) => `<div class="role-card"><small>What we do</small><h4>${esc(r.title)}</h4><p>${esc(r.text)}</p></div>`).join('');
  $('#skills').innerHTML = Object.entries(profile.skills).map(([k, v]) => `<div class="skill-group"><h4>${esc(k)}</h4><div>${v.map((t) => `<span class="tech">${esc(t)}</span>`).join('')}</div></div>`).join('');
  /* Contact --------------------------------------------------------------- */
  $('#contact-links').innerHTML = `
    <a class="btn primary lg" href="${profile.links.facebook}" target="_blank" rel="noopener">ASTRO on Facebook ↗</a>
    <a class="btn lg" href="${profile.links.github}" target="_blank" rel="noopener">GitHub ↗</a>`;

  /* Nav + reveal ---------------------------------------------------------- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 20);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
  document.querySelectorAll('.rv:not(.in)').forEach((n) => io.observe(n));

  /* Hero background: drifting node network ------------------------------ */
  const cv = $('#net'); const g = cv.getContext('2d');
  let W, H, pts = [];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function size() {
    const d = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight; cv.width = W * d; cv.height = H * d; g.setTransform(d, 0, 0, d, 0, 0);
    const n = Math.round(Math.min(90, W * H / 16000));
    pts = Array.from({ length: n }, (_, i) => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, c: categories[i % categories.length].color }));
  }
  size(); addEventListener('resize', size);
  const mouse = { x: -999, y: -999 };
  addEventListener('pointermove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY + scrollY * 0; });
  function frame() {
    g.clearRect(0, 0, W, H);
    for (const p of pts) {
      if (!reduce) { p.x += p.vx; p.y += p.vy; }
      if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
    }
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d = dx * dx + dy * dy;
        if (d < 140 * 140) { g.strokeStyle = `rgba(160,170,255,${(1 - Math.sqrt(d) / 140) * 0.22})`; g.lineWidth = 1; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); }
      }
      const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (md < 160) { g.strokeStyle = `rgba(51,214,255,${(1 - md / 160) * 0.5})`; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(mouse.x, mouse.y); g.stroke(); }
      g.fillStyle = a.c; g.globalAlpha = 0.85; g.beginPath(); g.arc(a.x, a.y, 2.2, 0, 7); g.fill(); g.globalAlpha = 1;
    }
    if (!reduce) requestAnimationFrame(frame);
  }
  frame();
})();

/* Game layer: wallet in the nav, quest bar above the explorer */
(function () {
  const P = window.Progress, $ = (s) => document.querySelector(s);
  $('#w-total').textContent = P.TOTAL;
  const quest = document.createElement('div'); quest.className = 'quest rv in';
  quest.innerHTML = '<small id="q-txt"></small><div class="q-bar"><i id="q-fill"></i></div><span class="w-coins"><i class="coin"></i><b id="q-coins">0</b></span>';
  const tools = document.querySelector('#work .tools'); tools.parentNode.insertBefore(quest, tools);
  function sync() {
    const n = P.count();
    $('#w-count').textContent = n; $('#w-coins').textContent = P.fmt(P.coins());
    $('#w-fill').style.width = (n / P.TOTAL * 100) + '%';
    $('#q-txt').textContent = n + ' of ' + P.TOTAL + ' projects discovered — open one to earn coins, spend them in the garage';
    $('#q-fill').style.width = (n / P.TOTAL * 100) + '%'; $('#q-coins').textContent = P.fmt(P.coins());
  }
  sync(); P.on(sync);
  P.on(() => document.querySelectorAll('.card').forEach((c) => { /* found state is set on click */ }));
})();
