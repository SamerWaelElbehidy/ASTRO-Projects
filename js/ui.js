/* Shared UI helpers: project dialog + tiny DOM utils */
(function () {
  const { categories, cat } = window.PORTFOLIO;

  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  let overlay, box, lastFocus, onCloseCb;

  function ensure() {
    if (overlay) return;
    overlay = el('div', 'pm-overlay');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = '<div class="pm" tabindex="-1"></div>';
    document.body.appendChild(overlay);
    box = overlay.firstElementChild;
    overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('open')) { e.stopPropagation(); close(); } }, true);
  }

  /* Toasts: reward messages ------------------------------------------- */
  let toasts;
  function toast(html, color, ms) {
    if (!toasts) { toasts = el('div', 'toasts'); toasts.setAttribute('aria-live', 'polite'); document.body.appendChild(toasts); }
    const t = el('div', 'toast', html); if (color) t.style.setProperty('--c', color);
    toasts.appendChild(t);
    requestAnimationFrame(() => t.classList.add('in'));
    setTimeout(() => { t.classList.remove('in'); setTimeout(() => t.remove(), 500); }, ms || 3800);
  }
  const coin = '<i class="coin"></i>';
  function rewardToast(r) {
    const P = window.Progress;
    toast(`${coin}<div><b>+${P.fmt(r.reward)}</b><span>${esc(r.project.name)} discovered · ${r.count} / ${r.total}</span></div>`, cat(r.project.cats[0]).color);
    r.bonuses.forEach((b, i) => setTimeout(() => toast(`${coin}<div><b>+${P.fmt(b.amount)} bonus</b><span>${esc(b.label)}</span></div>`, b.color, 4600), 500 + i * 700));
  }

  function open(p, opts) {
    ensure();
    if (window.Progress) { const r = window.Progress.discover(p); if (r) { rewardToast(r); if (opts && opts.onDiscover) opts.onDiscover(r); } }
    lastFocus = document.activeElement;
    onCloseCb = opts && opts.onClose;
    const main = cat(p.cats[0]);
    box.style.setProperty('--c', main.color);
    const links = [];
    if (p.links.github) links.push(`<a class="btn primary" href="${esc(p.links.github)}" target="_blank" rel="noopener">View on GitHub ↗</a>`);
    if (p.links.demo) links.push(`<a class="btn" href="${esc(p.links.demo)}" target="_blank" rel="noopener">Live demo ↗</a>`);
    box.innerHTML = `
      <button class="pm-close" aria-label="Close">${Icons.svg('x', 18)}</button>
      <div class="pm-head">
        <div class="pm-cats">${p.cats.map((id) => { const c = cat(id); return `<span class="chip" style="--c:${c.color}"><i class="dot"></i>${esc(c.name)}</span>`; }).join('')}</div>
        <h2 class="pm-title">${esc(p.name)}</h2>
        <p class="pm-tag">${esc(p.tagline)}</p>
      </div>
      <div class="pm-body">
        ${p.status && p.status !== 'Built' ? `<div class="pm-status">${esc(p.status)}</div>` : ''}
        <p class="pm-desc">${esc(p.desc)}</p>
        ${p.points && p.points.length ? `<h3>What it does</h3><ul>${p.points.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
        <h3>Tech stack</h3>
        <div class="pm-stack">${p.stack.map((t) => `<span class="tech">${esc(t)}</span>`).join('')}</div>
        ${links.length ? `<div class="pm-links">${links.join('')}</div>` : ''}
      </div>`;
    box.querySelector('.pm-close').addEventListener('click', close);
    overlay.classList.add('open');
    box.querySelector('.pm-body').scrollTop = 0;
    setTimeout(() => box.focus(), 30);
  }

  function close() {
    if (!overlay || !overlay.classList.contains('open')) return;
    overlay.classList.remove('open');
    if (lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch (e) {}
    if (onCloseCb) { const f = onCloseCb; onCloseCb = null; f(); }
  }

  window.PortfolioUI = { open, close, el, esc, toast, isOpen: () => !!overlay && overlay.classList.contains('open') };
})();
