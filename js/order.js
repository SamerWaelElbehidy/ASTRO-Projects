/* Booking wizard — submits to the ASTRO Store account backend (js/store-auth.js) */
(function () {
  const B = window.BOOKING, CFG = window.ASTRO_CONFIG, PCT = CFG.referral;
  const $ = (s, r) => (r || document).querySelector(s);
  const t = (k, v) => window.I18N.t(k, v);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const blank = () => ({
    typeKey: '', levelKey: '', university: '', masterField: '', teamMembersCount: '', faculty: '', subject: '', supervisorName: '',
    isCompetition: '', competitionName: '', description: '', budgetKey: '', deadline: '',
    leader: { name: '', email: '', phone: '' }, teamName: '', referralCode: ''
  });
  let data = blank(), step = 1, dir = 1, busy = false, refState = null; // refState: {code, ok:true|false|null, team}
  const STEPS = [['step.type', 'clipboard'], ['step.level', 'graduation-cap'], ['step.details', 'file'], ['step.contact', 'user'], ['step.review', 'check-circle']];

  /* ---------------------------------------------------------------- render */
  function renderStepper() {
    $('#stepper').innerHTML = STEPS.map(([k, ic], i) => {
      const n = i + 1, cls = n === step ? 'on' : n < step ? 'done' : '';
      return `<div class="st ${cls}"><span class="dot">${window.Icons.svg(n < step ? 'check' : ic, 18)}</span><span class="lb">${esc(t(k))}</span></div>${i < STEPS.length - 1 ? `<span class="ln ${n < step ? 'done' : ''}"></span>` : ''}`;
    }).join('');
    $('#bar-fill').style.width = (step / 5 * 100) + '%';
  }

  function field(id, label, opts) {
    opts = opts || {};
    const req = opts.req === false ? '' : ' <b class="req">*</b>';
    const input = opts.select
      ? `<select class="inp" id="${id}">${opts.select}</select>`
      : `<input class="inp${opts.mono ? ' mono' : ''}" id="${id}" type="${opts.type || 'text'}" ${opts.min ? 'min="' + opts.min + '"' : ''} value="${esc(opts.value)}" ${opts.ph ? 'placeholder="' + esc(opts.ph) + '"' : ''} autocomplete="${opts.ac || 'off'}">`;
    return `<div class="fld${opts.full ? ' full' : ''}"><label for="${id}">${esc(label)}${req}</label>${input}<div class="err" id="e-${id}" hidden></div></div>`;
  }

  function leaderCard(m) {
    return `<div class="mcard lead"><div class="mhead"><b>${esc(t('s4.leader'))}</b><i class="m-badge">${window.Icons.svg('star', 12)} ${esc(t('s4.leaderBadge'))}</i></div>` +
      field('lead-name', t('s4.name'), { value: m.name, ph: t('s4.namePh'), ac: 'name', full: true }) +
      '<div class="row2">' + field('lead-email', t('s4.email'), { type: 'email', value: m.email, ph: t('s4.emailPh'), ac: 'email' }) + field('lead-phone', t('s4.phone'), { type: 'tel', value: m.phone, ph: t('s4.phonePh'), ac: 'tel' }) + '</div></div>';
  }

  function renderStep() {
    const body = $('#form-body');
    let h = '';
    if (step === 1) {
      h = `<h2 class="step-h">${esc(t('s1.heading'))}</h2><p class="step-d">${esc(t('s1.desc'))}</p><div class="msg err-msg" id="step-err" hidden></div>` +
        `<div class="pick-wrap"><select class="pick-select" id="f-type-select" aria-label="${esc(t('s1.heading'))}"><option value="">${esc(t('field.selectOpt'))}</option>${B.types.map((x) => `<option value="${x.key}" ${data.typeKey === x.key ? 'selected' : ''}>${esc(t(x.key))}</option>`).join('')}</select></div>` +
        `<div id="type-preview">${typePreviewHtml(data.typeKey)}</div>` +
        `<div class="type-grid">` +
        B.types.map((x) => `<button type="button" class="type ${data.typeKey === x.key ? 'sel' : ''}" data-type="${x.key}"><span class="ic">${window.Icons.svg(x.icon, 22)}</span><span class="tx"><b>${esc(t(x.key))}</b><small>${esc(t(x.key + 'D'))}</small></span><i class="ck">${window.Icons.svg('check', 12)}</i></button>`).join('') + '</div>';
    } else if (step === 2) {
      h = `<h2 class="step-h">${esc(t('s2.heading'))}</h2><p class="step-d">${esc(t('s2.desc'))}</p><div class="msg err-msg" id="step-err" hidden></div>` +
        `<div class="pick-wrap"><select class="pick-select" id="f-level-select" aria-label="${esc(t('s2.heading'))}"><option value="">${esc(t('field.selectOpt'))}</option>${B.levels.map((k) => `<option value="${k}" ${data.levelKey === k ? 'selected' : ''}>${esc(t(k))}</option>`).join('')}</select></div>` +
        `<div id="level-preview">${levelPreviewHtml(data.levelKey)}</div>` +
        `<div class="lvl-grid">` +
        B.levels.map((k) => `<button type="button" class="lvl ${data.levelKey === k ? 'sel' : ''}" data-level="${k}">${esc(t(k))}<i class="ck">${window.Icons.svg('check', 12)}</i></button>`).join('') + '</div>' + levelFields();
    } else if (step === 3) {
      h = `<h2 class="step-h">${esc(t('s3.heading'))}</h2><p class="step-d">${esc(t('s3.desc'))}</p>` +
        `<div class="fld full"><label for="f-description">${esc(t('s3.descLabel'))} <b class="req">*</b></label><textarea class="inp" id="f-description" rows="6" placeholder="${esc(t('s3.descPh'))}">${esc(data.description)}</textarea><div class="count"><span id="cc">${data.description.length}</span> ${esc(t('s3.charCount'))}</div><div class="err" id="e-f-description" hidden></div></div>` +
        '<div class="row2">' +
        `<div class="fld"><label for="f-budget">${esc(t('s3.budget'))}</label><select class="inp" id="f-budget"><option value="">${esc(t('s3.budgetPh'))}</option>${B.budgets.map((k) => `<option value="${k}" ${data.budgetKey === k ? 'selected' : ''}>${esc(t(k))}</option>`).join('')}</select></div>` +
        `<div class="fld"><label for="f-deadline">${esc(t('s3.deadline'))}</label><input class="inp" id="f-deadline" type="date" value="${esc(data.deadline)}"></div></div>`;
    } else if (step === 4) {
      h = `<h2 class="step-h">${esc(t('s4.heading'))}</h2><p class="step-d">${esc(t('s4.membersHint'))}</p>` +
        '<div class="members">' + leaderCard(data.leader) + '</div>' +
        `<div class="ref-box invite-note-box"><label>${window.Icons.svg('user', 18)} ${esc(t('s4.inviteTitle'))}</label><p class="hint">${esc(t('s4.inviteNote'))}</p></div>` +
        field('f-team', t('s4.team'), { value: data.teamName, req: false, full: true }) +
        `<div class="ref-box"><label for="f-ref">${window.Icons.svg('gift', 18)} ${esc(t('s4.ref'))}</label><input class="inp mono" id="f-ref" type="text" autocomplete="off" spellcheck="false" placeholder="${esc(t('s4.refPh'))}" value="${esc(data.referralCode)}"><p class="hint">${esc(t('s4.refHint', { pct: PCT.discountPct }))}</p><div class="ref-status" id="ref-status" hidden></div></div>`;
    } else {
      const rows = [
        [t('s5.projectType'), data.typeKey && t(data.typeKey)], [t('s5.level'), data.levelKey && t(data.levelKey)],
        [t('s5.university'), data.university], [t('s5.masterField'), data.masterField], [t('s5.faculty'), data.faculty], [t('s5.subject'), data.subject], [t('s5.supervisor'), data.supervisorName], [t('s5.teamCount'), data.teamMembersCount],
        [t('s5.competition'), data.isCompetition === 'Yes' ? (data.competitionName || t('field.yes')) : data.isCompetition === 'No' ? t('field.no') : ''],
        [t('s5.budget'), data.budgetKey ? t(data.budgetKey) : t('s5.notSpec')], [t('s5.deadline'), data.deadline || t('s5.flexible')],
        [t('s5.team'), data.teamName],
        [t('s5.leader'), `${data.leader.name}${data.leader.phone ? ' — ' + data.leader.phone : ''}${data.leader.email ? ' · ' + data.leader.email : ''}`],
        [t('s5.referral'), refState && refState.ok ? `${refState.code} — ${t('ref.valid', { team: refState.team || '', pct: PCT.discountPct })}` : (data.referralCode && refState && refState.ok === null ? data.referralCode : '')]
      ].filter((r) => r[1]);
      h = `<h2 class="step-h">${esc(t('s5.heading'))}</h2><p class="step-d">${esc(t('s5.desc'))}</p><div class="review">${rows.map((r) => `<div class="rv"><span>${esc(r[0])}</span><b>${esc(r[1])}</b></div>`).join('')}</div><div class="rv-desc"><span>${esc(t('s5.descLabel'))}</span><p>${esc(data.description)}</p></div><div id="acct-gate-area"></div>`;
    }
    body.innerHTML = `<div class="stepwrap ${dir < 0 ? 'rev' : ''}">${h}</div>`;
    renderStepper(); renderFoot(); bind();
    if (step === 5) renderAccountGate();
  }

  /* ---------------------------------------------------------------- selection previews (mobile dropdown mode) */
  function typePreviewHtml(key) {
    if (!key) return '';
    const x = B.types.find((y) => y.key === key);
    if (!x) return '';
    return `<div class="pick-preview-card"><span class="ic">${window.Icons.svg(x.icon, 22)}</span><span class="tx"><b>${esc(t(x.key))}</b><small>${esc(t(x.key + 'D'))}</small></span></div>`;
  }
  function levelPreviewHtml(key) {
    if (!key) return '';
    return `<div class="pick-preview-card sm"><span class="ic">${window.Icons.svg('check', 18)}</span><span class="tx"><b>${esc(t(key))}</b></span></div>`;
  }

  /* ---------------------------------------------------------------- account gate */
  function renderAccountGate() {
    const area = $('#acct-gate-area');
    if (!area) return;
    const u = window.AstroAccount.cached;
    if (u) {
      area.innerHTML = `<div class="gate-signed-in">${esc(t('gate.signedInAs', { name: u.name || u.email }))}<button type="button" id="b-not-you">${esc(t('gate.notYou'))}</button></div>`;
      $('#b-not-you').addEventListener('click', () => { window.AstroAccount.signOut(); renderAccountGate(); });
      return;
    }
    const lead = data.leader;
    window.AstroAccount.renderGate(area, {
      prefill: { email: lead.email, firstName: (lead.name || '').split(' ')[0], lastName: (lead.name || '').split(' ').slice(1).join(' ') },
      onSignedIn: () => renderAccountGate(),
    });
  }

  function levelFields() {
    const k = data.levelKey; if (!k) return '';
    const uni = field('f-university', t('field.university'), { value: data.university }), fac = field('f-faculty', t('field.faculty'), { value: data.faculty });
    const team = field('f-teamCount', t('field.teamCount'), { type: 'number', min: 1, value: data.teamMembersCount }), sup = field('f-supervisor', t('field.supervisor'), { value: data.supervisorName });
    if (k === 'lvl.master') return `<div class="dyn"><div class="row2">${uni}${field('f-masterField', t('field.masterField'), { value: data.masterField })}</div></div>`;
    if (k === 'lvl.grad') return `<div class="dyn"><div class="row2">${uni}${fac}</div><div class="row2">${team}${sup}</div></div>`;
    if (k === 'lvl.subject') return `<div class="dyn"><div class="row2">${uni}${fac}</div><div class="row2">${field('f-subject', t('field.subject'), { value: data.subject })}${team}</div>${sup.replace('class="fld"', 'class="fld full"')}</div>`;
    const yn = `<option value="">${esc(t('field.selectOpt'))}</option><option value="Yes" ${data.isCompetition === 'Yes' ? 'selected' : ''}>${esc(t('field.yes'))}</option><option value="No" ${data.isCompetition === 'No' ? 'selected' : ''}>${esc(t('field.no'))}</option>`;
    return `<div class="dyn"><div class="row2">${field('f-competition', t('field.competition'), { select: yn })}${team}</div><div id="comp-wrap" ${data.isCompetition === 'Yes' ? '' : 'hidden'}>${field('f-compName', t('field.compName'), { value: data.competitionName, full: true })}</div></div>`;
  }

  function renderFoot() {
    const last = step === 5;
    $('#form-foot').innerHTML = `<button class="btn" type="button" id="b-back" ${step === 1 ? 'disabled' : ''}>${esc(t('btn.back'))}</button>` +
      (last ? `<button class="btn primary lg" type="button" id="b-submit">${window.Icons.svg('send', 17)} ${esc(t('btn.submit'))}</button>` : `<button class="btn primary" type="button" id="b-next">${esc(t('btn.continue'))} →</button>`);
    $('#b-back').addEventListener('click', () => { sync(); dir = -1; step = Math.max(1, step - 1); renderStep(); scrollTop(); });
    const n = $('#b-next'); if (n) n.addEventListener('click', () => { if (validate()) { dir = 1; step++; renderStep(); scrollTop(); } });
    const s = $('#b-submit'); if (s) s.addEventListener('click', submit);
  }
  const scrollTop = () => { const el = $('.card-form'); if (el) window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + scrollY - 90), behavior: 'smooth' }); };

  /* ---------------------------------------------------------------- state */
  function val(id) { const el = document.getElementById(id); return el ? el.value : null; }
  function sync() {
    const m = { 'f-university': 'university', 'f-masterField': 'masterField', 'f-faculty': 'faculty', 'f-subject': 'subject', 'f-supervisor': 'supervisorName', 'f-teamCount': 'teamMembersCount', 'f-compName': 'competitionName', 'f-description': 'description', 'f-deadline': 'deadline', 'f-team': 'teamName', 'f-ref': 'referralCode' };
    Object.keys(m).forEach((id) => { const v = val(id); if (v !== null) data[m[id]] = v; });
    const ln = val('lead-name'), le = val('lead-email'), lp = val('lead-phone');
    if (ln !== null) data.leader.name = ln; if (le !== null) data.leader.email = le; if (lp !== null) data.leader.phone = lp;
    const b = val('f-budget'); if (b !== null) data.budgetKey = b;
    const c = val('f-competition'); if (c !== null) data.isCompetition = c;
  }

  function bind() {
    document.querySelectorAll('[data-type]').forEach((b) => b.addEventListener('click', () => { data.typeKey = b.dataset.type; document.querySelectorAll('.type').forEach((x) => x.classList.toggle('sel', x === b)); const sel = $('#f-type-select'); if (sel) sel.value = b.dataset.type; const p = $('#type-preview'); if (p) p.innerHTML = typePreviewHtml(b.dataset.type); const e = $('#step-err'); if (e) e.hidden = true; }));
    const ts = $('#f-type-select'); if (ts) ts.addEventListener('change', () => { data.typeKey = ts.value; const e = $('#step-err'); if (e) e.hidden = true; document.querySelectorAll('.type').forEach((x) => x.classList.toggle('sel', x.dataset.type === ts.value)); const p = $('#type-preview'); if (p) p.innerHTML = typePreviewHtml(ts.value); });
    document.querySelectorAll('[data-level]').forEach((b) => b.addEventListener('click', () => { sync(); data.levelKey = b.dataset.level; renderStep(); }));
    const ls = $('#f-level-select'); if (ls) ls.addEventListener('change', () => { sync(); data.levelKey = ls.value; renderStep(); });
    const c = $('#f-competition'); if (c) c.addEventListener('change', () => { data.isCompetition = c.value; $('#comp-wrap').hidden = c.value !== 'Yes'; });
    const d = $('#f-description'); if (d) d.addEventListener('input', () => { $('#cc').textContent = d.value.length; });
    const r = $('#f-ref'); if (r) { r.addEventListener('input', () => { data.referralCode = r.value; scheduleRef(); }); if (data.referralCode) checkRef(); }
  }

  function fail(id, msg) { const el = document.getElementById(id); if (el) el.classList.add('bad'); const e = document.getElementById('e-' + id); if (e) { e.textContent = msg || t('field.required'); e.hidden = false; } }
  function clearFail() { document.querySelectorAll('.bad').forEach((x) => x.classList.remove('bad')); document.querySelectorAll('.err').forEach((x) => { x.hidden = true; }); }

  function validate() {
    sync(); clearFail(); let ok = true;
    if (step === 1 && !data.typeKey) { const e = $('#step-err'); e.textContent = t('s1.error'); e.hidden = false; ok = false; }
    if (step === 2) {
      if (!data.levelKey) { const e = $('#step-err'); e.textContent = t('s2.error'); e.hidden = false; return false; }
      const need = (id, v) => { if (!String(v).trim()) { fail(id); ok = false; } };
      const k = data.levelKey;
      if (k === 'lvl.master') { need('f-university', data.university); need('f-masterField', data.masterField); }
      else if (k === 'lvl.grad') { need('f-university', data.university); need('f-faculty', data.faculty); need('f-teamCount', data.teamMembersCount); need('f-supervisor', data.supervisorName); }
      else if (k === 'lvl.subject') { need('f-university', data.university); need('f-faculty', data.faculty); need('f-subject', data.subject); need('f-teamCount', data.teamMembersCount); need('f-supervisor', data.supervisorName); }
      else { need('f-competition', data.isCompetition); if (data.isCompetition === 'Yes') need('f-compName', data.competitionName); need('f-teamCount', data.teamMembersCount); }
    }
    if (step === 3 && data.description.trim().length < 20) { fail('f-description', t('s3.descErr')); ok = false; }
    if (step === 4) {
      const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
      const m = data.leader;
      if (m.name.trim().length < 2) { fail('lead-name', t('s4.nameErr')); ok = false; }
      if (m.phone.trim().length < 7) { fail('lead-phone', t('s4.phoneErr')); ok = false; }
      if (!emailOk(m.email)) { fail('lead-email', t('s4.emailErr')); ok = false; }
    }
    return ok;
  }

  /* ---------------------------------------------------------------- referral */
  const normCode = (c) => String(c || '').trim().toUpperCase().replace(/\s+/g, '');
  let refTimer = null;
  function scheduleRef() { clearTimeout(refTimer); const box = $('#ref-status'); if (!data.referralCode.trim()) { refState = null; if (box) box.hidden = true; return; } refTimer = setTimeout(checkRef, 450); }
  async function checkRef() {
    const code = normCode(data.referralCode); const box = $('#ref-status'); if (!code) return;
    if (box) { box.hidden = false; box.className = 'ref-status'; box.textContent = t('ref.checking'); }
    let r;
    try { r = await window.AstroAccount.checkReferralCode(code); } catch (e) { r = null; }
    if (normCode(data.referralCode) !== code) return; // typed something else meanwhile
    if (r && r.valid) refState = { code, ok: true, team: r.ownerName };
    else if (!r) refState = { code, ok: null };
    else refState = { code, ok: false };
    const b = $('#ref-status'); if (!b) return; b.hidden = false;
    b.className = 'ref-status ' + (refState.ok ? 'ok' : refState.ok === false ? 'no' : 'warn');
    b.innerHTML = window.Icons.svg(refState.ok ? 'check' : refState.ok === false ? 'x' : 'alert', 15) + ' ' + esc(refState.ok ? t('ref.valid', { team: refState.team || '', pct: PCT.discountPct }) : refState.ok === false ? t('ref.invalid') : t('ref.unverified'));
  }

  /* ---------------------------------------------------------------- submit */
  function waLink(booking) {
    const lines = [`ASTRO project request`, `Type: ${booking.projectTypeLabel}`, `Level: ${booking.projectLevelLabel}`, `Contact person (leader): ${booking.leaderName} — ${booking.leaderPhone}`, ...(booking.contactMembers || []).slice(1).map((m) => `Member: ${m.name} — ${m.phone}`), booking.referralCode ? `Referral: ${booking.referralCode}` : '', `Details: ${booking.description}`].filter(Boolean);
    return 'https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent(lines.join('\n'));
  }

  async function submit() {
    if (busy) return;
    if (!window.AstroAccount.isSignedIn()) {
      const area = $('#acct-gate-area');
      if (area) area.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    busy = true; sync();
    const btn = $('#b-submit'); btn.disabled = true; btn.textContent = t('btn.submitting');
    const lead = data.leader;
    const code = normCode(data.referralCode);
    const payload = {
      title: data.teamName.trim() || `${t(data.typeKey)} — ${lead.name.trim()}`,
      projectType: data.typeKey, projectLevel: data.levelKey,
      university: data.university.trim(), masterField: data.masterField.trim(), faculty: data.faculty.trim(), subject: data.subject.trim(), supervisorName: data.supervisorName.trim(),
      isCompetition: data.isCompetition, competitionName: data.competitionName.trim(),
      description: data.description.trim(), budget: data.budgetKey ? t(data.budgetKey) : '', deadline: data.deadline,
      teamName: data.teamName.trim(),
      contactMembers: [{ name: lead.name.trim(), email: lead.email.trim(), phone: lead.phone.trim(), isLeader: true }],
      referralCode: (code && refState && refState.code === code && refState.ok) ? code : undefined,
    };
    const waPayload = { projectTypeLabel: t(data.typeKey), projectLevelLabel: t(data.levelKey), leaderName: lead.name.trim(), leaderPhone: lead.phone.trim(), description: payload.description, referralCode: payload.referralCode, contactMembers: payload.contactMembers };
    let result;
    try {
      result = await window.AstroAccount.createBooking(payload);
      showSuccess(result.booking);
    } catch (e) {
      console.error(e); busy = false;
      $('#form-body').insertAdjacentHTML('beforeend', `<div class="msg err-msg fail-box">${esc(e.message && e.message !== 'offline' ? e.message : t('err.submit'))}<div class="acts"><a class="btn primary" target="_blank" rel="noopener" href="${waLink(waPayload)}">${esc(t('err.wa'))}</a><button class="btn" type="button" id="b-retry">${esc(t('err.retry'))}</button></div></div>`);
      $('#b-retry').addEventListener('click', () => { document.querySelector('.fail-box').remove(); btn.disabled = false; btn.innerHTML = window.Icons.svg('send', 17) + ' ' + esc(t('btn.submit')); });
      return;
    }
    busy = false;
  }

  function showSuccess(booking) {
    $('#stepper').innerHTML = ''; $('#bar-fill').style.width = '100%'; $('#form-foot').innerHTML = '';
    $('#form-body').innerHTML = `<div class="success"><div class="tick">${window.Icons.svg('check', 34)}</div><h2>${esc(t('success.title'))}</h2><p>${t('success.msg', { name: esc((window.AstroAccount.cached || {}).name || '') })}</p>` +
      `<div class="code-box"><small>${esc(t('success.trackLabel'))}</small><div class="code" id="the-code">${esc(booking.bookingCode)}</div><button class="btn" type="button" id="b-copy">${esc(t('success.copy'))}</button></div><p class="save">${esc(t('success.save'))}</p>` +
      `<div class="acts"><a class="btn primary" href="account.html#projects">${esc(t('success.track'))}</a><button class="btn" type="button" id="b-new">${esc(t('success.newOrder'))}</button><a class="btn" href="index.html">${esc(t('success.goHome'))}</a></div></div>`;
    $('#b-copy').addEventListener('click', () => { try { navigator.clipboard.writeText(booking.bookingCode); $('#b-copy').textContent = t('success.copied'); } catch (e) {} });
    $('#b-new').addEventListener('click', () => { data = blank(); refState = null; step = 1; dir = 1; renderStep(); });
    confetti();
  }

  /* ---------------------------------------------------------------- confetti */
  function confetti() {
    const cv = $('#confetti'), g = cv.getContext('2d'); cv.width = innerWidth; cv.height = innerHeight; cv.style.display = 'block';
    const cols = ['#0a72ff', '#33d6ff', '#ffd23f', '#3ddc97', '#ff5d7a', '#ffffff'];
    const ps = Array.from({ length: 140 }, () => ({ x: Math.random() * cv.width, y: -20 - Math.random() * cv.height * 0.5, w: 6 + Math.random() * 6, h: 8 + Math.random() * 8, vy: 2 + Math.random() * 4, vx: -2 + Math.random() * 4, r: Math.random() * 6, vr: -0.2 + Math.random() * 0.4, c: cols[(Math.random() * cols.length) | 0] }));
    let f = 0;
    (function draw() {
      g.clearRect(0, 0, cv.width, cv.height);
      ps.forEach((p) => { p.x += p.vx; p.y += p.vy; p.r += p.vr; g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.fillStyle = p.c; g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); g.restore(); });
      if (++f < 220) requestAnimationFrame(draw); else { g.clearRect(0, 0, cv.width, cv.height); cv.style.display = 'none'; }
    })();
  }

  /* ---------------------------------------------------------------- init */
  document.addEventListener('DOMContentLoaded', () => {
    $('#yr').textContent = new Date().getFullYear();
    window.I18N.apply();
    $('#lang-toggle').addEventListener('click', () => { sync(); window.I18N.setLang(window.I18N.lang === 'ar' ? 'en' : 'ar'); });
    window.I18N.onChange(() => { if ($('#form-body .success') === null) renderStep(); });
    window.AstroAccount.onChange(() => { if (step === 5 && $('#acct-gate-area')) renderAccountGate(); });
    // prefill a referral code from ?ref=CODE
    const q = new URLSearchParams(location.search); if (q.get('ref')) data.referralCode = q.get('ref');
    renderStep(); // render immediately — don't block the wizard on the (possibly slow/cold) account check
    window.AstroAccount.me(); // resolves in the background; onChange above updates the gate if we're on step 5
  });
})();
