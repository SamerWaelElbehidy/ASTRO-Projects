/* Admin panel: bookings, referral codes, publishing finished projects */
(function () {
  const B = window.BOOKING, CFG = window.ASTRO_CONFIG, PCT = CFG.referral, PORTFOLIO = window.PORTFOLIO;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const en = (k) => window.I18N.en(k);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const egp = (n) => Number(n || 0).toLocaleString('en-US') + ' EGP';
  const date = (iso) => { try { return new Date(iso).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch (e) { return iso || ''; } };
  const STATUS_LABEL = { pending: 'Pending', accepted: 'Accepted', in_progress: 'In progress', done: 'Completed', rejected: 'Rejected' };
  let orders = [], refs = [], pubs = [], tab = 'orders';
  const cloud = () => window.Cloud;

  document.documentElement.lang = 'en'; document.documentElement.dir = 'ltr';
  $$('.pct').forEach((n) => { n.textContent = PCT.discountPct; });

  /* ------------------------------------------------------------- auth */
  const isLocal = () => !!cloud() && cloud().mode === 'local';
  function showLogin(err) {
    $('#login').hidden = false; $('#app').hidden = true;
    const local = isLocal(); $('#local-note').hidden = !local;
    $('#l-email').required = !local; $('#l-pass').required = !local; $('#l-email').closest('label').hidden = local; $('#l-pass').closest('label').hidden = local;
    if (err) { const e = $('#login-err'); e.textContent = err; e.hidden = false; }
  }
  $('#login-form').addEventListener('submit', async (e) => {
    e.preventDefault(); $('#login-err').hidden = true; const btn = e.target.querySelector('button'); btn.disabled = true;
    try { await cloud().signIn($('#l-email').value.trim(), $('#l-pass').value); }
    catch (err) { showLogin('Sign-in failed: ' + (err && err.code ? err.code.replace('auth/', '').replace(/-/g, ' ') : 'check your details')); }
    btn.disabled = false;
  });
  $('#signout').addEventListener('click', () => cloud().signOut());
  let started = false;
  function onUser(u) {
    if (!u) { started = false; showLogin(); return; }
    $('#login').hidden = true; $('#app').hidden = false; $('#who').textContent = u.email || ''; $('#mode-banner').hidden = !isLocal();
    if (!started) { started = true; load(); }
  }

  /* ------------------------------------------------------------- data */
  async function load() {
    try {
      [orders, refs, pubs] = await Promise.all([cloud().listOrders(), cloud().listReferrals(), cloud().listPublicProjects()]);
    } catch (e) {
      console.error(e);
      $('#v-orders').insertAdjacentHTML('afterbegin', '<div class="note bad">Could not read the data. Make sure you are signed in with an admin account and that the Firestore rules from docs/BOOKING-SETUP.md are published.</div>');
      orders = []; refs = []; pubs = [];
    }
    renderAll();
  }
  const orderById = (id) => orders.find((o) => o.id === id);
  const referredBy = (code) => orders.filter((o) => o.referralCode === code && o.referral && !o.referral.unverified);

  function renderAll() { renderStats(); renderOrders(); renderRefs(); renderPubs(); $('#n-orders').textContent = orders.length; $('#n-refs').textContent = refs.length; $('#n-projects').textContent = pubs.length; }

  /* ------------------------------------------------------------- orders */
  function renderStats() {
    const c = (s) => orders.filter((o) => o.status === s).length;
    const revenue = orders.filter((o) => o.status === 'done' && o.pricing).reduce((a, o) => a + (o.pricing.final || 0), 0);
    $('#stats').innerHTML = [['Total', orders.length], ['Pending', c('pending')], ['In progress', c('in_progress') + c('accepted')], ['Completed', c('done')], ['Revenue (completed)', egp(revenue)]].map(([l, v]) => `<div class="stat"><small>${l}</small><b>${v}</b></div>`).join('');
  }
  const sel = $('#f-status'); B.statuses.forEach((s) => sel.insertAdjacentHTML('beforeend', `<option value="${s}">${STATUS_LABEL[s]}</option>`));
  ['#q', '#f-status'].forEach((s) => $(s).addEventListener('input', renderOrders));
  $('#reload').addEventListener('click', load);

  function renderOrders() {
    const q = $('#q').value.trim().toLowerCase(), st = $('#f-status').value;
    const list = orders.filter((o) => (!st || o.status === st) && (!q || [o.id, o.clientName, o.clientPhone, o.clientEmail, o.university, o.projectType, o.teamName, o.referralCode].concat((o.members || []).map((m) => m.name + ' ' + m.phone)).join(' ').toLowerCase().includes(q)));
    $('#orders-table tbody').innerHTML = list.map((o) => `<tr data-id="${esc(o.id)}"><td class="mono">${esc(o.id)}</td><td>${esc(date(o.createdAt))}</td><td><b>${esc(o.clientName)}</b><small>${esc(o.clientPhone)}</small></td><td>${esc(o.projectType)}<small>${esc(o.projectLevel)}</small></td><td>${esc(o.budget || '—')}</td><td>${o.referralCode ? `<span class="pill ref">${esc(o.referralCode)}</span>` : '—'}</td><td><span class="pill st-${esc(o.status)}">${esc(STATUS_LABEL[o.status] || o.status)}</span></td></tr>`).join('');
    $('#orders-empty').hidden = list.length > 0;
    $$('#orders-table tbody tr').forEach((r) => r.addEventListener('click', () => openDrawer(r.dataset.id)));
  }

  $('#export').addEventListener('click', () => {
    const cols = ['id', 'createdAt', 'clientName', 'clientEmail', 'clientPhone', 'projectType', 'projectLevel', 'budget', 'status', 'referralCode', 'university', 'faculty', 'description'];
    const csv = [cols.join(',')].concat(orders.map((o) => cols.map((c) => '"' + String(o[c] == null ? '' : o[c]).replace(/"/g, '""').replace(/\r?\n/g, ' ') + '"').join(','))).join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' })); a.download = 'astro-orders.csv'; a.click();
  });

  /* ------------------------------------------------------------- drawer */
  function kv(label, v) { return v ? `<div class="kv"><span>${esc(label)}</span><b>${esc(v)}</b></div>` : ''; }

  function openDrawer(id) {
    const o = orderById(id); if (!o) return;
    const phoneWa = String(o.clientPhone || '').replace(/[^\d]/g, '').replace(/^0/, '20');
    const refInfo = o.referralCode ? (o.referral && !o.referral.unverified ? `<div class="note ok">Referral <b>${esc(o.referralCode)}</b> — team <b>${esc(o.referral.teamName || '')}</b>. Client gets ${PCT.discountPct}% off, team earns ${PCT.commissionPct}%.</div>` : `<div class="note warn">Referral <b>${esc(o.referralCode)}</b> could not be verified when the order was placed. <button class="btn sm" id="verify-ref" type="button">Verify now</button></div>`) : '';
    const done = o.status === 'done';
    $('#drawer-body').innerHTML = `
      <div class="dh"><div><small>Order</small><h2 class="mono">${esc(o.id)}</h2></div><button class="x" id="d-x" type="button" aria-label="Close">${Icons.svg('x', 16)}</button></div>
      <div class="dsec"><h3>Contact person (team leader)</h3>${kv('Name', o.clientName)}${kv('Team', o.teamName)}<div class="kv"><span>Email</span><b><a href="mailto:${esc(o.clientEmail)}">${esc(o.clientEmail)}</a></b></div><div class="kv"><span>Phone</span><b><a href="tel:${esc(o.clientPhone)}">${esc(o.clientPhone)}</a> · <a target="_blank" rel="noopener" href="https://wa.me/${esc(phoneWa)}">WhatsApp</a></b></div>${kv('Submitted', date(o.createdAt))}${kv('Language', o.lang === 'ar' ? 'Arabic' : 'English')}</div>
      ${(o.members || []).length > 1 ? `<div class="dsec"><h3>Team members (${o.members.length})</h3>${o.members.map((m) => `<div class="kv member ${m.isLeader ? 'is-lead' : ''}"><span>${esc(m.name)}${m.isLeader ? ' <i class="badge">Leader</i>' : ''}</span><b>${m.phone ? `<a href="tel:${esc(m.phone)}">${esc(m.phone)}</a>` : ''}${m.email ? ` · <a href="mailto:${esc(m.email)}">${esc(m.email)}</a>` : ''}</b></div>`).join('')}</div>` : ''}
      <div class="dsec"><h3>Project</h3>${kv('Type', o.projectType)}${kv('Level', o.projectLevel)}${kv('University', o.university)}${kv('Master field', o.masterField)}${kv('Faculty', o.faculty)}${kv('Subject', o.subject)}${kv('Supervisor', o.supervisorName)}${kv('Team members', o.teamMembersCount)}${kv('Competition', o.isCompetition === 'Yes' ? o.competitionName || 'Yes' : o.isCompetition)}${kv('Budget', o.budget)}${kv('Deadline', o.deadline)}<div class="desc">${esc(o.description)}</div></div>
      ${refInfo}
      <div class="dsec"><h3>Handling</h3>
        <label>Status<select id="d-status">${B.statuses.map((s) => `<option value="${s}" ${o.status === s ? 'selected' : ''} ${s === 'done' && !done ? 'disabled' : ''}>${STATUS_LABEL[s]}${s === 'done' && !done ? ' (use “Mark finished” below)' : ''}</option>`).join('')}</select></label>
        <label>Agreed price (EGP, before any discount)<input id="d-price" type="number" min="0" step="50" value="${o.pricing ? o.pricing.base : ''}" placeholder="e.g. 12000"></label>
        <div id="d-preview" class="preview"></div>
        ${o.referralCode && o.referral && !o.referral.unverified ? `<label class="chk"><input type="checkbox" id="d-paid" ${o.commissionPaid ? 'checked' : ''}> Commission paid to the referring team</label>` : ''}
        <label>Internal notes<textarea id="d-notes" rows="3" placeholder="Only visible to you">${esc(o.adminNotes || '')}</textarea></label>
      </div>
      ${done ? `<div class="note ok">Completed. Referral code issued: <b class="mono">${esc(o.referralIssued || '—')}</b>${o.publishedProjectId ? ' · published to the site and 3D world.' : ''}</div>` : ''}
      <div class="dfoot"><button class="btn primary" id="d-save" type="button">Save changes</button>${done ? (o.publishedProjectId ? '<button class="btn" id="d-edit" type="button">Edit published project</button>' : '') : '<button class="btn gold" id="d-finish" type="button">Mark finished &amp; publish…</button>'}<button class="btn danger" id="d-del" type="button">Delete</button></div>`;
    $('#drawer-ov').hidden = false; document.body.style.overflow = 'hidden';
    const hasRef = !!(o.referralCode && o.referral && !o.referral.unverified);
    const updatePreview = () => { const base = Number($('#d-price').value) || 0; const p = cloud().price(base, hasRef); $('#d-preview').innerHTML = base ? `<div><span>Client pays</span><b>${egp(p.final)}</b></div>${hasRef ? `<div><span>Referral discount (${p.discountPct}%)</span><b>− ${egp(p.discount)}</b></div><div><span>Commission to referring team (${p.commissionPct}%)</span><b>${egp(p.commission)}</b></div>` : ''}` : ''; };
    $('#d-price').addEventListener('input', updatePreview); updatePreview();
    $('#d-x').addEventListener('click', closeDrawer);
    $('#d-save').addEventListener('click', async () => {
      const patch = { status: $('#d-status').value, adminNotes: $('#d-notes').value.trim(), updatedAt: new Date().toISOString() };
      const base = Number($('#d-price').value) || 0; if (base > 0) patch.pricing = cloud().price(base, hasRef);
      if ($('#d-paid')) patch.commissionPaid = $('#d-paid').checked;
      await guarded($('#d-save'), async () => { await cloud().updateOrder(o.id, patch); Object.assign(o, patch); renderAll(); closeDrawer(); });
    });
    const vr = $('#verify-ref'); if (vr) vr.addEventListener('click', async () => {
      const r = await cloud().getReferral(o.referralCode);
      const patch = r ? { referral: { code: o.referralCode, teamName: r.teamName, referrerOrderId: r.orderId } } : r === null ? { referral: null, referralCode: '', adminNotes: ((o.adminNotes || '') + '\nReferral code ' + o.referralCode + ' was not valid.').trim() } : null;
      if (!patch) { alert('Still cannot verify (network or permissions).'); return; }
      await cloud().updateOrder(o.id, patch); Object.assign(o, patch); renderAll(); openDrawer(o.id);
    });
    const fin = $('#d-finish'); if (fin) fin.addEventListener('click', () => openPublish(o));
    const ed = $('#d-edit'); if (ed) ed.addEventListener('click', () => openPublish(o, pubs.find((p) => p.id === o.publishedProjectId)));
    $('#d-del').addEventListener('click', async () => { if (!confirm('Delete this order permanently?')) return; await guarded($('#d-del'), async () => { await cloud().deleteOrder(o.id); orders = orders.filter((x) => x.id !== o.id); renderAll(); closeDrawer(); }); });
  }
  function closeDrawer() { $('#drawer-ov').hidden = true; document.body.style.overflow = ''; }
  $('#drawer-ov').addEventListener('mousedown', (e) => { if (e.target.id === 'drawer-ov') closeDrawer(); });
  async function guarded(btn, fn) { const t = btn.textContent; btn.disabled = true; btn.textContent = 'Working…'; try { await fn(); } catch (e) { console.error(e); alert('Failed: ' + (e && e.message ? e.message : e)); } btn.disabled = false; btn.textContent = t; }

  /* ------------------------------------------------------------- publish */
  function openPublish(o, existing) {
    const t = B.typeByKey(o.projectTypeKey); const defCats = existing ? existing.cats : (t ? t.cats : ['embedded']);
    const catBoxes = PORTFOLIO.categories.map((c) => `<label class="chk"><input type="checkbox" name="pc" value="${c.id}" ${defCats.includes(c.id) ? 'checked' : ''}> ${esc(c.name)}</label>`).join('');
    const has = !!existing;
    $('#pub-body').innerHTML = `
      <h2>${has ? 'Edit published project' : 'Mark finished &amp; publish'}</h2>
      <p class="sub">${has ? 'Update how this project appears on the site and in the 3D world.' : 'This completes the order, adds the project to the site and the 3D world automatically, and gives the team its referral code.'}</p>
      <label>Project name<input id="p-name" value="${esc(existing ? existing.name : (o.teamName ? o.teamName + ' — ' : '') + (o.projectType || ''))}"></label>
      <label>One-line tagline<input id="p-tag" value="${esc(existing ? existing.tagline : '')}" placeholder="What it does in one sentence"></label>
      <label>Description<textarea id="p-desc" rows="5">${esc(existing ? existing.desc : o.description)}</textarea></label>
      <label>Tech stack (comma separated)<input id="p-stack" value="${esc(existing ? (existing.stack || []).join(', ') : '')}" placeholder="ESP32, Flutter, Firebase"></label>
      <label>Team name shown with the project<input id="p-team" value="${esc(existing ? existing.team : o.teamName || o.clientName)}"></label>
      <div class="cats"><span>Districts in the 3D world</span>${catBoxes}</div>
      ${has ? '' : `<div class="note ok">A referral code will be created for this team. New clients who use it get ${PCT.discountPct}% off and the team earns ${PCT.commissionPct}%.</div>`}
      <div class="dfoot"><button class="btn primary" id="p-ok" type="button">${has ? 'Save' : 'Finish &amp; publish'}</button><button class="btn" id="p-cancel" type="button">Cancel</button></div>`;
    $('#pub-ov').hidden = false;
    $('#p-cancel').addEventListener('click', () => { $('#pub-ov').hidden = true; });
    $('#p-ok').addEventListener('click', () => guarded($('#p-ok'), async () => {
      const name = $('#p-name').value.trim(); if (!name) { alert('Give the project a name.'); return; }
      const cats = $$('input[name=pc]:checked', $('#pub-body')).map((i) => i.value); if (!cats.length) { alert('Pick at least one district.'); return; }
      const stack = $('#p-stack').value.split(',').map((s) => s.trim()).filter(Boolean);
      const now = new Date().toISOString();
      const pid = existing ? existing.id : o.id.toLowerCase();
      const pub = { id: pid, name, tagline: $('#p-tag').value.trim(), desc: $('#p-desc').value.trim(), stack, cats, team: $('#p-team').value.trim(), published: true, publishedAt: existing ? existing.publishedAt : now, orderId: o.id };
      await cloud().savePublicProject(pub);
      if (existing) { pubs = pubs.map((p) => (p.id === pid ? pub : p)); }
      else {
        let code = cloud().newReferralCode(); for (let i = 0; i < 5 && (await cloud().getReferral(code)); i++) code = cloud().newReferralCode();
        await cloud().saveReferral({ code, teamName: pub.team || o.clientName, orderId: o.id, createdAt: now });
        const patch = { status: 'done', completedAt: now, updatedAt: now, referralIssued: code, publishedProjectId: pid };
        await cloud().updateOrder(o.id, patch); Object.assign(o, patch);
        refs.push({ code, teamName: pub.team || o.clientName, orderId: o.id, createdAt: now }); pubs.push(pub);
      }
      $('#pub-ov').hidden = true; renderAll(); openDrawer(o.id);
    }));
  }
  $('#pub-ov').addEventListener('mousedown', (e) => { if (e.target.id === 'pub-ov') $('#pub-ov').hidden = true; });

  /* ------------------------------------------------------------- referrals */
  function renderRefs() {
    const rows = refs.slice().sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')).map((r) => {
      const used = referredBy(r.code), doneUsed = used.filter((o) => o.status === 'done' && o.pricing);
      const earned = doneUsed.reduce((s, o) => s + (o.pricing.commission || 0), 0), paid = doneUsed.filter((o) => o.commissionPaid).reduce((s, o) => s + (o.pricing.commission || 0), 0);
      return `<tr data-code="${esc(r.code)}"><td class="mono"><span class="pill ref">${esc(r.code)}</span> <button class="btn sm cp" data-code="${esc(r.code)}" type="button">Copy</button></td><td><b>${esc(r.teamName)}</b></td><td class="mono"><a href="#" class="lnk" data-o="${esc(r.orderId)}">${esc(r.orderId)}</a></td><td>${used.length}</td><td>${egp(earned)}</td><td>${egp(paid)}</td><td><b class="${earned - paid > 0 ? 'due' : ''}">${egp(earned - paid)}</b></td></tr>`;
    });
    $('#refs-table tbody').innerHTML = rows.join(''); $('#refs-empty').hidden = refs.length > 0;
    $$('.cp').forEach((b) => b.addEventListener('click', () => { try { navigator.clipboard.writeText(b.dataset.code); b.textContent = 'Copied'; setTimeout(() => { b.textContent = 'Copy'; }, 1200); } catch (e) {} }));
    $$('.lnk').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); if (orderById(a.dataset.o)) openDrawer(a.dataset.o); }));
  }

  /* ------------------------------------------------------------- published */
  function renderPubs() {
    $('#pub-grid').innerHTML = pubs.slice().sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || '')).map((p) => `<article class="pub"><h3>${esc(p.name)}</h3><p>${esc(p.tagline || p.desc.slice(0, 110))}</p><div class="tags">${(p.cats || []).map((c) => `<span class="pill">${esc((PORTFOLIO.cat(c) || {}).short || c)}</span>`).join('')}</div><small>${esc(p.team || '')} · ${esc(date(p.publishedAt))}</small><div class="acts"><a class="btn sm" href="world.html">View in 3D world</a>${p.orderId ? `<button class="btn sm" data-o="${esc(p.orderId)}" data-a="edit" type="button">Edit</button>` : ''}<button class="btn sm danger" data-id="${esc(p.id)}" data-a="unpub" type="button">Unpublish</button></div></article>`).join('');
    $('#pub-empty').hidden = pubs.length > 0;
    $$('#pub-grid [data-a=edit]').forEach((b) => b.addEventListener('click', () => { const o = orderById(b.dataset.o); if (o) openPublish(o, pubs.find((p) => p.orderId === o.id)); }));
    $$('#pub-grid [data-a=unpub]').forEach((b) => b.addEventListener('click', async () => {
      if (!confirm('Remove this project from the site and the 3D world?')) return;
      await guarded(b, async () => { await cloud().deletePublicProject(b.dataset.id); pubs = pubs.filter((p) => p.id !== b.dataset.id); const o = orders.find((x) => x.publishedProjectId === b.dataset.id); if (o) { await cloud().updateOrder(o.id, { publishedProjectId: '' }); o.publishedProjectId = ''; } renderAll(); });
    }));
  }

  /* ------------------------------------------------------------- tabs + boot */
  $$('.tabs .tab').forEach((b) => b.addEventListener('click', () => { tab = b.dataset.tab; $$('.tabs .tab').forEach((x) => x.classList.toggle('on', x === b)); ['orders', 'referrals', 'projects'].forEach((n) => { $('#v-' + n).hidden = n !== tab; }); }));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { if (!$('#pub-ov').hidden) $('#pub-ov').hidden = true; else if (!$('#drawer-ov').hidden) closeDrawer(); } });
  document.addEventListener('DOMContentLoaded', () => { cloud().onAuth(onUser); setTimeout(() => { if ($('#app').hidden && $('#login').hidden) showLogin(); }, 1200); });
  // Show the sign-in card immediately (the cloud module decides local vs Firebase a moment later)
  showLogin();
})();
