/* My account page: My projects / Invitations / Discount code. */
(function () {
  const $ = (s, r) => (r || document).querySelector(s);
  const t = (k, v) => window.I18N.t(k, v);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const A = window.AstroAccount;
  const CFG = window.ASTRO_CONFIG;
  const money = (n) => Number(n || 0).toLocaleString(window.I18N.lang === 'ar' ? 'ar-EG' : 'en-US') + ' ' + t('track.currency');
  const fmtDate = (iso) => { if (!iso) return ''; try { return new Date(iso).toLocaleDateString(window.I18N.lang === 'ar' ? 'ar-EG' : 'en-GB', { year: 'numeric', month: 'short', day: 'numeric' }); } catch (e) { return iso; } };

  let me = null, bookings = [], invites = [];

  /* ---------------------------------------------------------------- boot */
  async function boot() {
    me = await A.me();
    if (!me) { showGate(); return; }
    $('#gate-wrap').hidden = true;
    $('#acc-wrap').hidden = false;
    renderWho();
    bindTabs();
    await Promise.all([loadProjects(), loadInvites()]);
    renderCodeTab();
  }

  function showGate() {
    $('#acc-wrap').hidden = true;
    const wrap = $('#gate-wrap');
    wrap.hidden = false;
    A.renderGate(wrap, { titleKey: 'gate.title.account', descKey: 'gate.desc.account', onSignedIn: () => boot() });
  }

  function renderWho() {
    $('#acc-who').innerHTML = `<b>${esc(me.name || me.email)}</b> <span class="text-3">· ${esc(me.email)}</span>`;
  }

  $('#b-signout') && $('#b-signout').addEventListener('click', () => { A.signOut(); location.reload(); });

  /* ---------------------------------------------------------------- tabs */
  function bindTabs() {
    const tabs = { projects: $('#tab-projects'), invites: $('#tab-invites'), code: $('#tab-code') };
    const views = { projects: $('#view-projects'), invites: $('#view-invites'), code: $('#view-code') };
    Object.keys(tabs).forEach((k) => {
      tabs[k].addEventListener('click', () => {
        Object.keys(tabs).forEach((x) => { tabs[x].classList.toggle('on', x === k); views[x].hidden = x !== k; });
        history.replaceState(null, '', '#' + k);
      });
    });
    const hash = location.hash.replace('#', '');
    if (tabs[hash]) tabs[hash].click();
  }

  /* ---------------------------------------------------------------- projects */
  async function loadProjects() {
    const body = $('#projects-body');
    body.innerHTML = '<div class="skeleton"></div>';
    try {
      const r = await A.myBookings();
      bookings = r.bookings || [];
    } catch (e) {
      body.innerHTML = `<div class="msg err-msg">${esc(t('track.error'))}</div>`;
      return;
    }
    renderProjects();
  }

  function daysLeft(iso) {
    if (!iso) return null;
    const ms = new Date(iso).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0);
    return Math.round(ms / 86400000);
  }

  const STAGE_KEYS = ['agreement', 'design', 'assembly', 'wiring', 'programming', 'test', 'handover', 'presentation', 'rehearsal'];

  function detailsBlock(b) {
    const rows = [
      [t('s5.university'), b.university], [t('s5.masterField'), b.masterField], [t('s5.faculty'), b.faculty], [t('s5.subject'), b.subject], [t('s5.supervisor'), b.supervisorName],
      [t('s5.competition'), b.isCompetition === 'Yes' ? (b.competitionName || t('field.yes')) : b.isCompetition === 'No' ? t('field.no') : ''],
      [t('s5.budget'), b.budget], [t('s5.deadline'), b.deadline],
    ].filter((r) => r[1]);
    const contacts = (b.contactMembers || []).filter((m) => m.name).map((m) => `<div class="rvm ${m.isLeader ? 'lead' : ''}"><b>${esc(m.name)}</b>${m.isLeader ? `<i class="m-badge">${esc(t('s4.leaderBadge'))}</i>` : ''}<span>${esc(m.phone)}${m.email ? ' · ' + esc(m.email) : ''}</span></div>`).join('');
    if (!rows.length && !contacts) return '';
    return `<details class="proj-details">
      <summary>${esc(t('acc.yourDetails'))}</summary>
      <div class="review">${rows.map((r) => `<div class="rv"><span>${esc(r[0])}</span><b>${esc(r[1])}</b></div>`).join('')}</div>
      ${contacts ? `<div class="rv-members">${contacts}</div>` : ''}
    </details>`;
  }

  function roadmapBlock(b) {
    const stages = Array.isArray(b.timeline) && b.timeline.length ? b.timeline : STAGE_KEYS.map((key) => ({ key, status: 'locked', note: '', date: '', photos: [] }));
    const items = stages.map((s) => {
      const label = esc(t('stage.' + s.key));
      if (s.status === 'locked') {
        return `<div class="stage locked"><div class="stage-head">${window.Icons.svg('check', 14)}<b>${label}</b><span class="stage-tag">${esc(t('acc.stageLocked'))}</span></div></div>`;
      }
      const photos = (s.photos || []).length
        ? `<div class="stage-photos">${s.photos.map((url) => `<a href="${esc(url)}" target="_blank" rel="noopener"><img src="${esc(url)}" alt="${label}" loading="lazy"></a>`).join('')}</div>`
        : '';
      return `<div class="stage ${s.status}">
        <div class="stage-head">${window.Icons.svg(s.status === 'done' ? 'check' : 'star', 14)}<b>${label}</b>${s.status === 'done' ? `<span class="stage-tag done">${esc(t('acc.stageDone'))}</span>` : ''}</div>
        ${s.note ? `<p class="stage-note">${esc(s.note)}</p>` : ''}
        ${s.date ? `<p class="stage-date">${window.Icons.svg('map', 13)} ${esc(fmtDate(s.date))}</p>` : ''}
        ${photos}
      </div>`;
    }).join('');
    return `<details class="proj-roadmap" open><summary>${esc(t('acc.roadmap'))}</summary><div class="stage-list">${items}</div></details>`;
  }

  function projectCard(b) {
    const mine = me.id || me._id;
    const isLeader = (b.members || []).some((m) => m.userId === mine && m.role === 'leader');
    const pricing = b.pricing;
    const paid = Number(b.paidAmount) || 0;
    const remaining = pricing ? Math.max(0, pricing.final - paid) : 0;
    const dLeft = daysLeft(b.deliveryDate);

    const stats = pricing
      ? `<div class="proj-grid">
          <div class="proj-stat"><small>${esc(t('acc.total'))}</small><b>${money(pricing.final)}</b></div>
          <div class="proj-stat good"><small>${esc(t('acc.paid'))}</small><b>${money(paid)}</b></div>
          <div class="proj-stat ${remaining > 0 ? 'warn' : 'good'}"><small>${esc(t('acc.remaining'))}</small><b>${money(remaining)}</b></div>
          <div class="proj-stat"><small>${esc(t('acc.delivery'))}</small><b>${b.deliveryDate ? fmtDate(b.deliveryDate) + (dLeft !== null ? ` · ${dLeft < 0 ? esc(t('acc.overdue')) : dLeft === 0 ? esc(t('acc.today')) : esc(t('acc.daysLeft', { n: dLeft }))}` : '') : '—'}</b></div>
        </div>`
      : `<div class="msg">${esc(t('acc.priceTbd'))}</div>`;

    const meeting = b.nextMeetingDate
      ? `<div class="proj-stat"><small>${esc(t('acc.nextMeeting'))}</small><b>${fmtDate(b.nextMeetingDate)}</b></div>`
      : '';

    const team = (b.members || []).map((m) => `<span class="member-chip ${m.role === 'leader' ? 'lead' : ''}">${m.role === 'leader' ? window.Icons.svg('star', 12) : ''} ${esc(m.name)}${m.userId === mine ? ` (${esc(t('acc.you'))})` : ''}${m.title ? ` <span class="m-role">· ${esc(m.title)}</span>` : ''}</span>`).join('');

    const notes = b.adminNotes ? `<div class="proj-notes"><b>${esc(t('acc.notes'))}</b>${esc(b.adminNotes)}</div>` : '';

    const details = detailsBlock(b);
    const roadmap = ['accepted', 'in_progress', 'done'].includes(b.status)
      ? roadmapBlock(b)
      : (b.status === 'pending' ? `<div class="msg">${esc(t('acc.waitingApproval'))}</div>` : '');

    const inviteBox = isLeader
      ? `<form class="invite-row" data-invite="${esc(b.id)}">
          <input class="inp" type="email" required placeholder="${esc(t('acc.invitePh'))}">
          <button class="btn" type="submit">${window.Icons.svg('user', 15)} ${esc(t('acc.inviteSend'))}</button>
        </form>
        <p class="invite-note" id="invite-note-${esc(b.id)}" hidden></p>`
      : '';
    const teamSettings = teamSettingsBlock(b, isLeader);

    return `<div class="proj-card" data-id="${esc(b.id)}">
      <div class="proj-top">
        <div><h3>${esc(b.title)}</h3><span class="pcode">${esc(b.bookingCode)}</span></div>
        <span class="pill-st ${esc(b.status)}">${esc(t('status.pill.' + b.status))}</span>
      </div>
      ${stats}
      ${meeting ? `<div class="proj-grid">${meeting}</div>` : ''}
      <div class="proj-team">${team}</div>
      ${notes}
      ${roadmap}
      ${details}
      ${teamSettings}
      ${inviteBox}
    </div>`;
  }

  function teamSettingsBlock(b, isLeader) {
    if (!isLeader || !(b.members || []).length) return '';
    const rows = (b.members || []).map((m) => {
      const isLead = m.role === 'leader';
      return `<div class="team-row" data-member="${esc(m.userId)}" data-name="${esc(m.name)}">
        <div class="team-row-head"><b>${esc(m.name)}</b>${isLead ? `<i class="m-badge">${window.Icons.svg('star', 12)} ${esc(t('s4.leaderBadge'))}</i>` : ''}</div>
        <div class="team-row-acts">
          <input class="inp" type="text" maxlength="60" placeholder="${esc(t('acc.rolePh'))}" value="${esc(m.title || '')}" data-role-input>
          <button class="btn" type="button" data-save-role>${esc(t('acc.save'))}</button>
          ${!isLead ? `<button class="btn" type="button" data-make-leader>${esc(t('acc.makeLeader'))}</button>` : ''}
        </div>
      </div>`;
    }).join('');
    return `<details class="proj-team-settings"><summary>${esc(t('acc.teamSettings'))}</summary><div class="team-rows">${rows}</div></details>`;
  }

  function renderProjects() {
    const body = $('#projects-body');
    if (!bookings.length) {
      body.innerHTML = `<div class="empty-state">${window.Icons.svg('file', 40)}<p>${esc(t('acc.noProjects'))}</p><a class="btn primary" href="order.html">${esc(t('acc.bookOne'))}</a></div>`;
      return;
    }
    body.innerHTML = `<div class="proj-list">${bookings.map(projectCard).join('')}</div>`;
    body.querySelectorAll('[data-invite]').forEach((form) => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = form.dataset.invite;
        const input = form.querySelector('input');
        const note = $('#invite-note-' + id);
        const btn = form.querySelector('button');
        btn.disabled = true;
        try {
          await A.inviteToBooking(id, input.value.trim());
          note.hidden = false; note.textContent = t('acc.inviteSent'); note.style.color = '#7ff0bd';
          input.value = '';
        } catch (err) {
          note.hidden = false;
          note.textContent = err.status === 404 ? t('acc.noAccountYet') : (err.message || t('gate.err.generic'));
          note.style.color = '#ff9fb0';
        }
        btn.disabled = false;
      });
    });
    body.querySelectorAll('[data-save-role]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const row = btn.closest('.team-row'), card = btn.closest('.proj-card');
        const bookingId = card.dataset.id, userId = row.dataset.member;
        const input = row.querySelector('[data-role-input]');
        btn.disabled = true;
        try { await A.setMemberRole(bookingId, userId, input.value.trim()); await loadProjects(); }
        catch (e) { /* input keeps its value; the row just won't reflect the change */ }
        finally { btn.disabled = false; }
      });
    });
    body.querySelectorAll('[data-make-leader]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const row = btn.closest('.team-row'), card = btn.closest('.proj-card');
        const bookingId = card.dataset.id, userId = row.dataset.member;
        if (!confirm(t('acc.confirmTransfer', { name: row.dataset.name }))) return;
        btn.disabled = true;
        try { await A.transferLeader(bookingId, userId); await loadProjects(); }
        catch (e) {}
        finally { btn.disabled = false; }
      });
    });
  }

  /* ---------------------------------------------------------------- invitations */
  async function loadInvites() {
    const body = $('#invites-body');
    body.innerHTML = '<div class="skeleton"></div>';
    try {
      const r = await A.myInvites();
      invites = r.invites || [];
    } catch (e) {
      body.innerHTML = `<div class="msg err-msg">${esc(t('track.error'))}</div>`;
      return;
    }
    const pending = invites.filter((i) => i.status === 'pending').length;
    const badge = $('#invite-badge');
    if (pending > 0) { badge.hidden = false; badge.textContent = pending; } else badge.hidden = true;
    renderInvites();
  }

  function renderInvites() {
    const body = $('#invites-body');
    if (!invites.length) {
      body.innerHTML = `<div class="empty-state">${window.Icons.svg('user', 40)}<p>${esc(t('acc.noInvites'))}</p></div>`;
      return;
    }
    body.innerHTML = `<div class="invite-list">${invites.map((inv) => `
      <div class="invite-card" data-id="${esc(inv.id)}">
        <div class="txt">${esc(t('acc.inviteFrom', { name: inv.inviterName }))} <b>${esc(inv.bookingTitle)}</b></div>
        ${inv.status === 'pending'
          ? `<div class="acts"><button class="btn primary sm" data-accept="${esc(inv.id)}">${esc(t('acc.accept'))}</button><button class="btn reject sm" data-reject="${esc(inv.id)}">${esc(t('acc.reject'))}</button></div>`
          : `<span class="status-done">${esc(t(inv.status === 'accepted' ? 'acc.accepted' : 'acc.rejected'))}</span>`}
      </div>`).join('')}</div>`;

    body.querySelectorAll('[data-accept]').forEach((b) => b.addEventListener('click', () => respond(b.dataset.accept, true)));
    body.querySelectorAll('[data-reject]').forEach((b) => b.addEventListener('click', () => respond(b.dataset.reject, false)));
  }

  async function respond(id, accept) {
    try {
      await A.respondToInvite(id, accept);
      await Promise.all([loadInvites(), loadProjects()]);
    } catch (e) { /* surfaced implicitly by the list not changing; good enough for v1 */ }
  }

  /* ---------------------------------------------------------------- discount code */
  async function renderCodeTab() {
    const body = $('#code-body');
    body.innerHTML = '<div class="skeleton"></div>';
    let wallet = { balance: 0, ledger: [] };
    try { wallet = await A.myWallet(); } catch (e) {}

    const storeLink = 'https://astro-store-zeta.vercel.app/?ref=' + encodeURIComponent(me.referralCode || '');
    const ledgerHtml = wallet.ledger && wallet.ledger.length
      ? `<div class="ledger">${wallet.ledger.map((l) => `<div class="ledger-row"><span>${esc(l.sourceLabel || (l.sourceType === 'store_order' ? t('store.order') : t('store.project')))}</span><span class="amt">+${money(l.amount)}</span></div>`).join('')}</div>`
      : `<p class="invite-note" style="color:var(--text-3)">${esc(t('acc.noWalletHistory'))}</p>`;

    body.innerHTML = `
      <div class="code-card">
        <small>${esc(t('acc.codeTitle'))}</small>
        <div class="code-box"><div class="code">${esc(me.referralCode || '—')}</div></div>
        <div class="code-actions">
          <button class="btn primary" id="b-copy-code">${window.Icons.svg('copy', 15)} ${esc(t('acc.copyCode'))}</button>
          <button class="btn" id="b-copy-link">${window.Icons.svg('link', 15)} ${esc(t('acc.copyLink'))}</button>
        </div>
        <p class="code-desc">${t('acc.codeDesc', { pct: CFG.referral.discountPct })}</p>
      </div>
      <div class="wallet-card">
        <div><small>${esc(t('acc.wallet'))}</small><div class="amount">${money(wallet.balance)}</div></div>
        <a class="btn primary" target="_blank" rel="noopener" href="https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent('Hi ASTRO, I would like to cash out my wallet balance (' + wallet.balance + ' EGP). My account email: ' + me.email)}">${esc(t('acc.cashOut'))}</a>
      </div>
      <p class="invite-note" style="margin-bottom:0.6rem">${esc(t('acc.walletDesc'))}</p>
      <h3 class="step-h" style="font-size:1rem">${esc(t('acc.walletHistory'))}</h3>
      ${ledgerHtml}
    `;

    $('#b-copy-code').addEventListener('click', () => copyText(me.referralCode, '#b-copy-code', t('acc.copyCode')));
    $('#b-copy-link').addEventListener('click', () => copyText(storeLink, '#b-copy-link', t('acc.copyLink')));
  }

  function copyText(text, btnSel, resetLabel) {
    try { navigator.clipboard.writeText(text); } catch (e) {}
    const btn = $(btnSel);
    const prev = btn.innerHTML;
    btn.innerHTML = window.Icons.svg('check', 15) + ' ' + esc(t('acc.copied'));
    setTimeout(() => { btn.innerHTML = prev; }, 1600);
  }

  /* ---------------------------------------------------------------- init */
  document.addEventListener('DOMContentLoaded', () => {
    $('#yr').textContent = new Date().getFullYear();
    window.I18N.apply();
    $('#lang-toggle').addEventListener('click', () => window.I18N.setLang(window.I18N.lang === 'ar' ? 'en' : 'ar'));
    window.I18N.onChange(() => { if (me) { renderProjects(); renderInvites(); renderCodeTab(); } });
    boot();
  });
})();
