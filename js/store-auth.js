/* ==========================================================================
   Store account client — signs in/up against the ASTRO Store backend (the
   same backend and Firestore the store at astro-store-zeta.vercel.app uses),
   so one account, one wallet and one discount code work on both sites.
   ========================================================================== */
(function () {
  const BASE = window.ASTRO_CONFIG.storeApi;
  const TOKEN_KEY = 'astro_store_token';
  let cachedUser = null;
  const listeners = [];

  function getToken() { try { return localStorage.getItem(TOKEN_KEY); } catch (e) { return null; } }
  function setToken(tok) { try { if (tok) localStorage.setItem(TOKEN_KEY, tok); else localStorage.removeItem(TOKEN_KEY); } catch (e) {} }

  async function api(path, opts) {
    opts = opts || {};
    const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
    const token = getToken();
    if (token) headers.Authorization = 'Bearer ' + token;
    let res;
    try {
      res = await fetch(BASE + path, {
        method: opts.method || 'GET',
        headers,
        body: opts.body ? JSON.stringify(opts.body) : undefined,
      });
    } catch (e) {
      throw new Error('offline');
    }
    let json = null;
    try { json = await res.json(); } catch (e) {}
    if (!res.ok) {
      const err = new Error((json && (json.message || json.error)) || ('HTTP ' + res.status));
      err.status = res.status;
      err.body = json;
      throw err;
    }
    return json || {};
  }

  function emitChange() { listeners.forEach((f) => { try { f(cachedUser); } catch (e) {} }); }

  // signup/signin responses carry a minimal user object (no referralCode/walletBalance,
  // which only GET /me computes/backfills) — always follow up with a real /me fetch so
  // the cached user is complete from the first render, not just after a reload.
  async function signUp({ firstName, lastName, email, password }) {
    const r = await api('/users/signup', { method: 'POST', body: { firstName, lastName, email, password } });
    setToken(r.token);
    cachedUser = r.user;
    await me(true);
    return cachedUser;
  }

  async function signIn({ email, password }) {
    const r = await api('/users/signin', { method: 'POST', body: { email, password } });
    setToken(r.token);
    cachedUser = r.user;
    await me(true);
    return cachedUser;
  }

  function signOut() {
    setToken(null);
    cachedUser = null;
    emitChange();
  }

  // Fetches the full profile (referralCode, walletBalance, …). Returns null when signed out
  // or the token is no longer valid (and clears it in that case).
  async function me(force) {
    if (!getToken()) { cachedUser = null; return null; }
    if (cachedUser && !force) return cachedUser;
    try {
      const r = await api('/users/me');
      cachedUser = r.user;
      emitChange();
      return cachedUser;
    } catch (e) {
      if (e.status === 401) { setToken(null); cachedUser = null; emitChange(); }
      return null;
    }
  }

  function isSignedIn() { return !!getToken(); }

  const Account = {
    isSignedIn,
    signUp,
    signIn,
    signOut,
    me,
    get cached() { return cachedUser; },
    onChange: (f) => listeners.push(f),

    /* -------- referral / discount code -------- */
    checkReferralCode: (code) => api('/users/referral/' + encodeURIComponent(code)),
    myWallet: () => api('/users/me/wallet'),

    /* -------- project bookings -------- */
    createBooking: (payload) => api('/project-bookings', { method: 'POST', body: payload }),
    myBookings: () => api('/project-bookings/mine'),
    getBooking: (id) => api('/project-bookings/' + encodeURIComponent(id)),
    inviteToBooking: (id, email) => api('/project-bookings/' + encodeURIComponent(id) + '/invite', { method: 'POST', body: { email } }),
    myInvites: () => api('/project-bookings/invites/mine'),
    respondToInvite: (id, accept) => api('/project-bookings/invites/' + encodeURIComponent(id) + '/respond', { method: 'POST', body: { accept } }),
    setMemberRole: (id, userId, title) => api('/project-bookings/' + encodeURIComponent(id) + '/members/' + encodeURIComponent(userId) + '/role', { method: 'PATCH', body: { title } }),
    transferLeader: (id, userId) => api('/project-bookings/' + encodeURIComponent(id) + '/transfer-leader', { method: 'POST', body: { userId } }),
  };

  /* -------- shared sign-in / sign-up widget, reused by the booking form and
     the account page -------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

  function renderGate(container, opts) {
    opts = opts || {};
    const t = window.I18N ? window.I18N.t : (k, d) => d || k;
    let mode = 'in'; // 'in' | 'up'
    let prefill = opts.prefill || {};

    function draw() {
      const isUp = mode === 'up';
      container.innerHTML = `
        <div class="gate">
          <h3>${esc(t(opts.titleKey || 'gate.title', 'Sign in to continue'))}</h3>
          <p class="gate-desc">${t(opts.descKey || 'gate.desc', '')}</p>
          <div class="tabs2 gate-tabs">
            <button type="button" class="tab2 ${!isUp ? 'on' : ''}" data-mode="in">${esc(t('gate.tab.in', 'Sign in'))}</button>
            <button type="button" class="tab2 ${isUp ? 'on' : ''}" data-mode="up">${esc(t('gate.tab.up', 'Create account'))}</button>
          </div>
          <div class="msg err-msg" id="gate-err" hidden></div>
          <form id="gate-form">
            ${isUp ? `<div class="row2">
              <div class="fld"><label for="g-first">${esc(t('gate.firstName', 'First name'))}</label><input class="inp" id="g-first" required value="${esc(prefill.firstName || '')}"></div>
              <div class="fld"><label for="g-last">${esc(t('gate.lastName', 'Last name'))}</label><input class="inp" id="g-last" required value="${esc(prefill.lastName || '')}"></div>
            </div>` : ''}
            <div class="fld"><label for="g-email">${esc(t('gate.email', 'Email'))}</label><input class="inp" id="g-email" type="email" required value="${esc(prefill.email || '')}"></div>
            <div class="fld"><label for="g-pass">${esc(t('gate.password', 'Password'))}</label><input class="inp" id="g-pass" type="password" minlength="6" required autocomplete="${isUp ? 'new-password' : 'current-password'}"></div>
            ${isUp ? `<label class="gate-consent"><input type="checkbox" id="g-consent"> ${esc(t('gate.consent', ''))}</label>` : ''}
            <button class="btn primary lg" type="submit" id="g-submit">${esc(isUp ? t('gate.signUp', 'Create account') : t('gate.signIn', 'Sign in'))}</button>
          </form>
          <button type="button" class="gate-switch" id="g-switch">${esc(isUp ? t('gate.switchToIn', '') : t('gate.switchToUp', ''))}</button>
        </div>`;

      container.querySelectorAll('.gate-tabs [data-mode]').forEach((b) => b.addEventListener('click', () => { mode = b.dataset.mode; draw(); }));
      container.querySelector('#g-switch').addEventListener('click', () => { mode = isUp ? 'in' : 'up'; draw(); });
      container.querySelector('#gate-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const errBox = container.querySelector('#gate-err');
        errBox.hidden = true;
        const email = container.querySelector('#g-email').value.trim();
        const password = container.querySelector('#g-pass').value;
        const btn = container.querySelector('#g-submit');
        if (isUp && !container.querySelector('#g-consent').checked) {
          errBox.textContent = t('gate.err.consent', '');
          errBox.hidden = false;
          return;
        }
        btn.disabled = true;
        try {
          if (isUp) {
            await signUp({
              firstName: container.querySelector('#g-first').value.trim(),
              lastName: container.querySelector('#g-last').value.trim(),
              email,
              password,
            });
          } else {
            await signIn({ email, password });
          }
          if (opts.onSignedIn) opts.onSignedIn(cachedUser);
        } catch (err) {
          errBox.textContent = err.message && err.message !== 'offline' ? err.message : t('gate.err.generic', '');
          errBox.hidden = false;
          btn.disabled = false;
        }
      });
    }
    draw();
  }

  window.AstroAccount = Account;
  Account.renderGate = renderGate;

  /* -------- shared nav widget: fills a #nav-account element on any page -------- */
  function renderNavAccount() {
    const el = document.getElementById('nav-account');
    if (!el) return;
    const t = window.I18N ? window.I18N.t : (k, d) => d || k;
    const u = cachedUser;
    if (u) {
      const first = (u.firstName || u.name || u.email || '').split(' ')[0];
      el.innerHTML = `<a class="btn nav-account on" href="account.html"><span data-icon="user" data-size="15"></span> ${first}</a>`;
    } else {
      el.innerHTML = `<a class="btn nav-account" href="account.html">${t('nav.account', 'Sign in')}</a>`;
    }
    if (window.Icons && window.Icons.hydrate) window.Icons.hydrate(el);
  }
  listeners.push(renderNavAccount);
  document.addEventListener('DOMContentLoaded', () => {
    me().then(renderNavAccount);
    if (window.I18N) window.I18N.onChange(renderNavAccount);
  });
})();
