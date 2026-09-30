/* Booking wizard + order tracking */
(function () {
  const B = window.BOOKING, CFG = window.ASTRO_CONFIG, PCT = CFG.referral;
  const $ = (s, r) => (r || document).querySelector(s);
  const t = (k, v) => window.I18N.t(k, v);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const cloud = () => window.Cloud;

  const blank = () => ({
    typeKey: '', levelKey: '', university: '', masterField: '', teamMembersCount: '', faculty: '', subject: '', supervisorName: '',
    isCompetition: '', competitionName: '', description: '', budgetKey: '', deadline: '',
    members: [{ name: '', email: '', phone: '' }], leader: 0, teamName: '', referralCode: ''
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

  const clampN = (n) => Math.max(1, Math.min(12, n));
  function fitMembers() {
    const want = clampN(parseInt(data.teamMembersCount, 10) || 1);
    const blank1 = (m) => !m.name.trim() && !m.phone.trim() && !m.email.trim();
    while (data.members.length < want) data.members.push({ name: '', email: '', phone: '' });
    while (data.members.length > want && blank1(data.members[data.members.length - 1]) && data.members.length > 1) data.members.pop();
    if (data.leader >= data.members.length) data.leader = 0;
  }
  function memberCard(m, i) {
    const lead = i === data.leader;
    return `<div class="mcard ${lead ? 'lead' : ''}" data-i="${i}"><div class="mhead"><b>${esc(t('s4.member', { n: i + 1 }))}</b>${lead ? `<i class="m-badge">${window.Icons.svg('star', 12)} ${esc(t('s4.leaderBadge'))}</i>` : ''}<span class="sp"></span>` +
      `<label class="pick"><input type="radio" name="leader" value="${i}" ${lead ? 'checked' : ''}> ${esc(lead ? t('s4.leader') : t('s4.setLeader'))}</label>` +
      (data.members.length > 1 ? `<button type="button" class="ic-btn rm" data-rm="${i}" aria-label="${esc(t('s4.remove'))}" title="${esc(t('s4.remove'))}">${window.Icons.svg('x', 16)}</button>` : '') + '</div>' +
      field('m' + i + '-name', t('s4.name'), { value: m.name, ph: t('s4.namePh'), ac: 'name', full: true }) +
      '<div class="row2">' + field('m' + i + '-email', lead ? t('s4.email') : t('s4.emailOpt'), { type: 'email', value: m.email, ph: t('s4.emailPh'), ac: 'email', req: lead }) + field('m' + i + '-phone', t('s4.phone'), { type: 'tel', value: m.phone, ph: t('s4.phonePh'), ac: 'tel' }) + '</div></div>';
  }

  function renderStep() {
    const body = $('#form-body');
    let h = '';
    if (step === 1) {
      h = `<h2 class="step-h">${esc(t('s1.heading'))}</h2><p class="step-d">${esc(t('s1.desc'))}</p><div class="msg err-msg" id="step-err" hidden></div><div class="type-grid">` +
        B.types.map((x) => `<button type="button" class="type ${data.typeKey === x.key ? 'sel' : ''}" data-type="${x.key}"><span class="ic">${window.Icons.svg(x.icon, 22)}</span><span class="tx"><b>${esc(t(x.key))}</b><small>${esc(t(x.key + 'D'))}</small></span><i class="ck">${window.Icons.svg('check', 12)}</i></button>`).join('') + '</div>';
    } else if (step === 2) {
      h = `<h2 class="step-h">${esc(t('s2.heading'))}</h2><p class="step-d">${esc(t('s2.desc'))}</p><div class="msg err-msg" id="step-err" hidden></div><div class="lvl-grid">` +
        B.levels.map((k) => `<button type="button" class="lvl ${data.levelKey === k ? 'sel' : ''}" data-level="${k}">${esc(t(k))}<i class="ck">${window.Icons.svg('check', 12)}</i></button>`).join('') + '</div>' + levelFields();
    } else if (step === 3) {
      h = `<h2 class="step-h">${esc(t('s3.heading'))}</h2><p class="step-d">${esc(t('s3.desc'))}</p>` +
        `<div class="fld full"><label for="f-description">${esc(t('s3.descLabel'))} <b class="req">*</b></label><textarea class="inp" id="f-description" rows="6" placeholder="${esc(t('s3.descPh'))}">${esc(data.description)}</textarea><div class="count"><span id="cc">${data.description.length}</span> ${esc(t('s3.charCount'))}</div><div class="err" id="e-f-description" hidden></div></div>` +
        '<div class="row2">' +
        `<div class="fld"><label for="f-budget">${esc(t('s3.budget'))}</label><select class="inp" id="f-budget"><option value="">${esc(t('s3.budgetPh'))}</option>${B.budgets.map((k) => `<option value="${k}" ${data.budgetKey === k ? 'selected' : ''}>${esc(t(k))}</option>`).join('')}</select></div>` +
        `<div class="fld"><label for="f-deadline">${esc(t('s3.deadline'))}</label><input class="inp" id="f-deadline" type="date" value="${esc(data.deadline)}"></div></div>`;
    } else if (step === 4) {
      fitMembers();
      h = `<h2 class="step-h">${esc(t('s4.heading'))}</h2><p class="step-d">${esc(t('s4.membersHint'))}</p>` +
        '<div class="members">' + data.members.map((m, i) => memberCard(m, i)).join('') + '</div>' +
        (data.members.length < 12 ? `<button type="button" class="btn add-m" id="b-add">${window.Icons.svg('user', 16)} ${esc(t('s4.add'))}</button>` : '') +
        field('f-team', t('s4.team'), { value: data.teamName, req: false, full: true }) +
        `<div class="ref-box"><label for="f-ref">${window.Icons.svg('gift', 18)} ${esc(t('s4.ref'))}</label><input class="inp mono" id="f-ref" type="text" autocomplete="off" spellcheck="false" placeholder="${esc(t('s4.refPh'))}" value="${esc(data.referralCode)}"><p class="hint">${esc(t('s4.refHint', { pct: PCT.discountPct }))}</p><div class="ref-status" id="ref-status" hidden></div></div>`;
    } else {
      const rows = [
        [t('s5.projectType'), data.typeKey && t(data.typeKey)], [t('s5.level'), data.levelKey && t(data.levelKey)],
        [t('s5.university'), data.university], [t('s5.masterField'), data.masterField], [t('s5.faculty'), data.faculty], [t('s5.subject'), data.subject], [t('s5.supervisor'), data.supervisorName], [t('s5.teamCount'), data.teamMembersCount],
        [t('s5.competition'), data.isCompetition === 'Yes' ? (data.competitionName || t('field.yes')) : data.isCompetition === 'No' ? t('field.no') : ''],
        [t('s5.budget'), data.budgetKey ? t(data.budgetKey) : t('s5.notSpec')], [t('s5.deadline'), data.deadline || t('s5.flexible')],
        [t('s5.team'), data.teamName],
        [t('s5.referral'), refState && refState.ok ? `${refState.code} — ${t('ref.valid', { team: refState.team || '', pct: PCT.discountPct })}` : (data.referralCode && refState && refState.ok === null ? data.referralCode : '')]
      ].filter((r) => r[1]);
      h = `<h2 class="step-h">${esc(t('s5.heading'))}</h2><p class="step-d">${esc(t('s5.desc'))}</p><div class="review">${rows.map((r) => `<div class="rv"><span>${esc(r[0])}</span><b>${esc(r[1])}</b></div>`).join('')}</div><div class="rv-desc"><span>${esc(t('s5.members'))}</span><div class="rv-members">${data.members.map((m, i) => `<div class="rvm ${i === data.leader ? 'lead' : ''}"><b>${esc(m.name)}</b>${i === data.leader ? `<i class="m-badge">${esc(t('s4.leaderBadge'))}</i>` : ''}<span>${esc(m.phone)}${m.email ? ' · ' + esc(m.email) : ''}</span></div>`).join('')}</div></div><div class="rv-desc"><span>${esc(t('s5.descLabel'))}</span><p>${esc(data.description)}</p></div>`;
    }
    body.innerHTML = `<div class="stepwrap ${dir < 0 ? 'rev' : ''}">${h}</div>`;
    renderStepper(); renderFoot(); bind();
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
    data.members.forEach((m, i) => { const n = val('m' + i + '-name'), e = val('m' + i + '-email'), p = val('m' + i + '-phone'); if (n !== null) m.name = n; if (e !== null) m.email = e; if (p !== null) m.phone = p; });
    const lr = document.querySelector('input[name=leader]:checked'); if (lr) data.leader = parseInt(lr.value, 10);
    const b = val('f-budget'); if (b !== null) data.budgetKey = b;
    const c = val('f-competition'); if (c !== null) data.isCompetition = c;
  }

  function bind() {
    document.querySelectorAll('[data-type]').forEach((b) => b.addEventListener('click', () => { data.typeKey = b.dataset.type; document.querySelectorAll('.type').forEach((x) => x.classList.toggle('sel', x === b)); const e = $('#step-err'); if (e) e.hidden = true; }));
    document.querySelectorAll('[data-level]').forEach((b) => b.addEventListener('click', () => { sync(); data.levelKey = b.dataset.level; renderStep(); }));
    const c = $('#f-competition'); if (c) c.addEventListener('change', () => { data.isCompetition = c.value; $('#comp-wrap').hidden = c.value !== 'Yes'; });
    const d = $('#f-description'); if (d) d.addEventListener('input', () => { $('#cc').textContent = d.value.length; });
    document.querySelectorAll('input[name=leader]').forEach((x) => x.addEventListener('change', () => { sync(); renderStep(); }));
    document.querySelectorAll('[data-rm]').forEach((b) => b.addEventListener('click', () => { sync(); const i = parseInt(b.dataset.rm, 10); data.members.splice(i, 1); if (data.leader === i) data.leader = 0; else if (data.leader > i) data.leader--; data.teamMembersCount = String(data.members.length); renderStep(); }));
    const ad = $('#b-add'); if (ad) ad.addEventListener('click', () => { sync(); data.members.push({ name: '', email: '', phone: '' }); data.teamMembersCount = String(data.members.length); renderStep(); });
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
      data.members.forEach((m, i) => {
        const lead = i === data.leader;
        if (m.name.trim().length < 2) { fail('m' + i + '-name', t('s4.nameErr')); ok = false; }
        if (m.phone.trim().length < 7) { fail('m' + i + '-phone', t('s4.phoneErr')); ok = false; }
        if (lead ? !emailOk(m.email) : (m.email.trim() && !emailOk(m.email))) { fail('m' + i + '-email', t('s4.emailErr')); ok = false; }
      });
    }
    return ok;
  }

  /* ---------------------------------------------------------------- referral */
  let refTimer = null;
  function scheduleRef() { clearTimeout(refTimer); const box = $('#ref-status'); if (!data.referralCode.trim()) { refState = null; if (box) box.hidden = true; return; } refTimer = setTimeout(checkRef, 450); }
  async function checkRef() {
    const code = cloud().normCode(data.referralCode); const box = $('#ref-status'); if (!code) return;
    if (box) { box.hidden = false; box.className = 'ref-status'; box.textContent = t('ref.checking'); }
    const r = await cloud().getReferral(code);
    if (cloud().normCode(data.referralCode) !== code) return; // typed something else meanwhile
    if (r) refState = { code, ok: true, team: r.teamName, orderId: r.orderId };
    else if (r === undefined) refState = { code, ok: null };
    else refState = { code, ok: false };
    const b = $('#ref-status'); if (!b) return; b.hidden = false;
    b.className = 'ref-status ' + (refState.ok ? 'ok' : refState.ok === false ? 'no' : 'warn');
    b.innerHTML = window.Icons.svg(refState.ok ? 'check' : refState.ok === false ? 'x' : 'alert', 15) + ' ' + esc(refState.ok ? t('ref.valid', { team: refState.team || '', pct: PCT.discountPct }) : refState.ok === false ? t('ref.invalid') : t('ref.unverified'));
  }

  /* ---------------------------------------------------------------- submit */
  function waLink(order) {
    const lines = [`ASTRO project request ${order.id}`, `Type: ${order.projectType}`, `Level: ${order.projectLevel}`, `Contact person (leader): ${order.clientName} — ${order.clientPhone}`, ...(order.members || []).filter((m) => !m.isLeader).map((m) => `Member: ${m.name} — ${m.phone}`), order.referralCode ? `Referral: ${order.referralCode}` : '', `Details: ${order.description}`].filter(Boolean);
    return 'https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent(lines.join('\n'));
  }

  async function submit() {
    if (busy) return; busy = true; sync();
    const btn = $('#b-submit'); btn.disabled = true; btn.textContent = t('btn.submitting');
    const C = cloud();
    const lead = data.members[data.leader] || data.members[0];
    const code = C.normCode(data.referralCode); let referral = null;
    if (code) {
      let r = refState && refState.code === code ? refState : null;
      if (!r) { const x = await C.getReferral(code); r = x ? { ok: true, team: x.teamName, orderId: x.orderId } : x === undefined ? { ok: null } : { ok: false }; }
      if (r.ok) referral = { code, teamName: r.team || '', referrerOrderId: r.orderId || '' };
      else if (r.ok === null) referral = { code, unverified: true };
    }
    const order = {
      id: C.newOrderId(), status: 'pending', createdAt: new Date().toISOString(), lang: window.I18N.lang,
      projectType: t(data.typeKey), projectTypeKey: data.typeKey, projectLevel: t(data.levelKey), projectLevelKey: data.levelKey,
      university: data.university.trim(), masterField: data.masterField.trim(), faculty: data.faculty.trim(), subject: data.subject.trim(), supervisorName: data.supervisorName.trim(),
      teamMembersCount: data.teamMembersCount ? String(data.teamMembersCount) : '', isCompetition: data.isCompetition, competitionName: data.competitionName.trim(),
      description: data.description.trim(), budget: data.budgetKey ? t(data.budgetKey) : '', budgetKey: data.budgetKey, deadline: data.deadline,
      clientName: lead.name.trim(), clientEmail: lead.email.trim(), clientPhone: lead.phone.trim(), teamName: data.teamName.trim(),
      members: data.members.map((m, i) => ({ name: m.name.trim(), email: m.email.trim(), phone: m.phone.trim(), isLeader: i === data.leader })), leaderIndex: data.leader,
      referralCode: referral ? code : '', referral: referral || null
    };
    try {
      await C.saveOrder(order);
      try { const mine = JSON.parse(localStorage.getItem('astro-my-orders') || '[]'); mine.unshift({ id: order.id, at: order.createdAt, type: order.projectType }); localStorage.setItem('astro-my-orders', JSON.stringify(mine.slice(0, 10))); } catch (e) {}
      showSuccess(order);
    } catch (e) {
      console.error(e); busy = false;
      $('#form-body').insertAdjacentHTML('beforeend', `<div class="msg err-msg fail-box">${esc(t('err.submit'))}<div class="acts"><a class="btn primary" target="_blank" rel="noopener" href="${waLink(order)}">${esc(t('err.wa'))}</a><button class="btn" type="button" id="b-retry">${esc(t('err.retry'))}</button></div></div>`);
      $('#b-retry').addEventListener('click', () => { document.querySelector('.fail-box').remove(); btn.disabled = false; btn.innerHTML = window.Icons.svg('send', 17) + ' ' + esc(t('btn.submit')); });
      return;
    }
    busy = false;
  }

  function showSuccess(order) {
    $('#stepper').innerHTML = ''; $('#bar-fill').style.width = '100%'; $('#form-foot').innerHTML = '';
    $('#form-body').innerHTML = `<div class="success"><div class="tick">${window.Icons.svg('check', 34)}</div><h2>${esc(t('success.title'))}</h2><p>${t('success.msg', { name: esc(order.clientName) })}</p>` +
      `<div class="code-box"><small>${esc(t('success.trackLabel'))}</small><div class="code" id="the-code">${esc(order.id)}</div><button class="btn" type="button" id="b-copy">${esc(t('success.copy'))}</button></div><p class="save">${esc(t('success.save'))}</p>` +
      `<div class="acts"><button class="btn primary" type="button" id="b-track">${esc(t('success.track'))}</button><button class="btn" type="button" id="b-new">${esc(t('success.newOrder'))}</button><a class="btn" href="index.html">${esc(t('success.goHome'))}</a></div></div>`;
    $('#b-copy').addEventListener('click', () => { try { navigator.clipboard.writeText(order.id); $('#b-copy').textContent = t('success.copied'); } catch (e) {} });
    $('#b-track').addEventListener('click', () => { switchTab('track'); $('#track-code').value = order.id; doTrack(order.id); });
    $('#b-new').addEventListener('click', () => { data = blank(); refState = null; step = 1; dir = 1; renderStep(); });
    confetti();
  }

  /* ---------------------------------------------------------------- tracking */
  const fmtDate = (iso) => { try { return new Date(iso).toLocaleDateString(window.I18N.lang === 'ar' ? 'ar-EG' : 'en-GB', { year: 'numeric', month: 'short', day: 'numeric' }); } catch (e) { return iso || ''; } };
  const money = (n) => Number(n).toLocaleString(window.I18N.lang === 'ar' ? 'ar-EG' : 'en-US') + ' ' + t('track.currency');

  async function doTrack(id) {
    id = String(id || '').trim().toUpperCase(); if (!id) return;
    const msg = $('#track-msg'), out = $('#track-result'); msg.hidden = true; out.innerHTML = '<div class="skeleton"></div>';
    let o = null;
    try { o = await cloud().getOrder(id); } catch (e) { out.innerHTML = ''; msg.textContent = t('track.error'); msg.hidden = false; return; }
    if (!o) { out.innerHTML = ''; msg.textContent = t('track.notfound'); msg.hidden = false; return; }
    const order = ['pending', 'accepted', 'in_progress', 'done'];
    const idx = o.status === 'rejected' ? -1 : order.indexOf(o.status);
    const line = o.status === 'rejected' ? `<div class="tl-st bad"><i></i>${esc(t('status.rejected'))}</div>` : order.map((s, i) => `<div class="tl-st ${i < idx ? 'done' : i === idx ? 'now' : ''}"><i>${i < idx ? window.Icons.svg('check', 13) : ''}</i><span>${esc(t('status.' + s))}</span></div>`).join('');
    let price = '';
    if (o.pricing && o.pricing.base) {
      const p = o.pricing;
      price = `<div class="price"><div class="rv"><span>${esc(t('track.price'))}</span><b>${money(p.base)}</b></div>${p.discount ? `<div class="rv"><span>${esc(t('track.discount', { pct: p.discountPct }))}</span><b>− ${money(p.discount)}</b></div>` : ''}<div class="rv tot"><span>${esc(t('track.final'))}</span><b>${money(p.final)}</b></div></div>`;
    }
    let done = '';
    if (o.status === 'done' && o.referralIssued) {
      done = `<div class="done-box"><h3>${window.Icons.svg('sparkles', 20)} ${esc(t('track.done.title'))}</h3><p>${esc(t('track.done.msg', { pct: PCT.discountPct }))}</p><div class="code-box"><small>${esc(t('track.done.code'))}</small><div class="code">${esc(o.referralIssued)}</div><button class="btn" type="button" id="b-copy2">${esc(t('success.copy'))}</button></div>${o.publishedProjectId ? `<a class="btn primary" href="world.html">${esc(t('track.done.view'))} →</a>` : ''}</div>`;
    }
    out.innerHTML = `<div class="tr-card"><div class="tr-head"><div><small>${esc(t('track.type'))}</small><b>${esc(o.projectType || '')}</b><span>${esc(o.projectLevel || '')}</span></div><div class="tr-id mono">${esc(o.id)}</div></div><div class="tl">${line}</div><div class="meta"><span>${esc(t('track.submitted'))}: ${esc(fmtDate(o.createdAt))}</span></div>${price}${done}</div>`;
    const c2 = $('#b-copy2'); if (c2) c2.addEventListener('click', () => { try { navigator.clipboard.writeText(o.referralIssued); c2.textContent = t('success.copied'); } catch (e) {} });
  }

  function renderRecent() {
    let mine = []; try { mine = JSON.parse(localStorage.getItem('astro-my-orders') || '[]'); } catch (e) {}
    $('#track-recent').innerHTML = mine.length ? `<h3 class="recent-h">${esc(t('track.recent'))}</h3><div class="recent">${mine.map((m) => `<button class="chip2 mono" type="button" data-id="${esc(m.id)}">${esc(m.id)}</button>`).join('')}</div>` : '';
    document.querySelectorAll('.chip2').forEach((b) => b.addEventListener('click', () => { $('#track-code').value = b.dataset.id; doTrack(b.dataset.id); }));
  }

  function switchTab(which) {
    const isNew = which === 'new';
    $('#view-new').hidden = !isNew; $('#view-track').hidden = isNew;
    $('#tab-new').classList.toggle('on', isNew); $('#tab-track').classList.toggle('on', !isNew);
    if (!isNew) renderRecent();
    history.replaceState(null, '', isNew ? location.pathname : '#track');
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
    window.I18N.onChange(() => { if ($('#view-new') && !$('#view-new').hidden && $('#form-body .success') === null) renderStep(); if (!$('#view-track').hidden) renderRecent(); });
    $('#tab-new').addEventListener('click', () => switchTab('new')); $('#tab-track').addEventListener('click', () => switchTab('track'));
    $('#track-form').addEventListener('submit', (e) => { e.preventDefault(); doTrack($('#track-code').value); });
    // prefill a referral code from ?ref=CODE
    const q = new URLSearchParams(location.search); if (q.get('ref')) data.referralCode = q.get('ref');
    renderStep();
    const hash = location.hash.replace('#', '');
    if (hash === 'track') switchTab('track');
    else if (/^track=/.test(hash)) { switchTab('track'); const id = hash.split('=')[1]; $('#track-code').value = id; doTrack(id); }
  });
})();
