/* ==========================================================================
   Cloud layer — orders, referral codes and community (finished) projects.

   Uses Firebase (Firestore + Auth) when it is reachable. If it is not
   (offline, rules not published yet, or ?cloud=local), it falls back to a
   browser-local store so the whole booking flow can be tried end to end.
   ========================================================================== */
const CFG = window.ASTRO_CONFIG;
const C = CFG.collections;
const LOCAL_KEY = 'astro-local-cloud-v1';
const params = new URLSearchParams(location.search);
if (params.get('cloud') === 'local') { try { localStorage.setItem('astro-cloud', 'local'); } catch (e) {} }
if (params.get('cloud') === 'firebase') { try { localStorage.removeItem('astro-cloud'); } catch (e) {} }
let forcedLocal = false; try { forcedLocal = localStorage.getItem('astro-cloud') === 'local'; } catch (e) {}

/* ---------- local fallback store ---------- */
function lread() { try { return JSON.parse(localStorage.getItem(LOCAL_KEY)) || {}; } catch (e) { return {}; } }
function lwrite(db) { try { localStorage.setItem(LOCAL_KEY, JSON.stringify(db)); } catch (e) {} }
const local = {
  async get(col, id) { const db = lread(); return (db[col] && db[col][id]) || null; },
  async set(col, id, data, merge) { const db = lread(); db[col] = db[col] || {}; db[col][id] = merge ? Object.assign({}, db[col][id] || {}, data) : data; lwrite(db); },
  async list(col) { const db = lread(); return Object.values(db[col] || {}); },
  async del(col, id) { const db = lread(); if (db[col]) delete db[col][id]; lwrite(db); }
};

/* ---------- Firebase (lazy) ---------- */
const V = '10.12.2';
let fb = null, mode = forcedLocal ? 'local' : 'firebase', authUser = null;
const authListeners = [];

async function ensureFirebase() {
  if (mode === 'local') return null;
  if (fb) return fb;
  try {
    const [appM, fsM, authM] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`),
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`)
    ]);
    const app = appM.getApps().length ? appM.getApp() : appM.initializeApp(CFG.firebase);
    const db = fsM.getFirestore(app), auth = authM.getAuth(app);
    authM.onAuthStateChanged(auth, (u) => { authUser = u; authListeners.forEach((f) => f(u)); });
    fb = { fs: fsM, auth: authM, db, authInst: auth };
  } catch (e) { console.warn('[cloud] Firebase unavailable, using local mode', e); mode = 'local'; fb = null; }
  return fb;
}

async function get(col, id) {
  const f = await ensureFirebase(); if (!f) return local.get(col, id);
  const snap = await f.fs.getDoc(f.fs.doc(f.db, col, id)); return snap.exists() ? snap.data() : null;
}
async function set(col, id, data, merge) {
  const f = await ensureFirebase(); if (!f) return local.set(col, id, data, merge);
  await f.fs.setDoc(f.fs.doc(f.db, col, id), data, merge ? { merge: true } : undefined);
}
async function list(col) {
  const f = await ensureFirebase(); if (!f) return local.list(col);
  const snap = await f.fs.getDocs(f.fs.collection(f.db, col)); return snap.docs.map((d) => d.data());
}
async function del(col, id) {
  const f = await ensureFirebase(); if (!f) return local.del(col, id);
  await f.fs.deleteDoc(f.fs.doc(f.db, col, id));
}

/* ---------- helpers ---------- */
const ALPHA = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
function rand(n) { let s = ''; const a = new Uint32Array(n); (crypto || window.crypto).getRandomValues(a); for (let i = 0; i < n; i++) s += ALPHA[a[i] % ALPHA.length]; return s; }
const newOrderId = () => 'AST-' + new Date().getFullYear() + '-' + rand(5);
const newReferralCode = () => 'ASTRO-' + rand(5);
const normCode = (c) => String(c || '').trim().toUpperCase().replace(/\s+/g, '');
const pct = CFG.referral;

/* ---------- API ---------- */
const Cloud = {
  get mode() { return mode; },
  config: CFG,
  newOrderId, newReferralCode, normCode,

  /* Orders */
  async saveOrder(order) { await set(C.orders, order.id, order); return order; },
  async getOrder(id) { return get(C.orders, String(id).trim().toUpperCase()); },
  async listOrders() { const l = await list(C.orders); return l.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')); },
  async updateOrder(id, patch) { await set(C.orders, id, patch, true); },
  async deleteOrder(id) { await del(C.orders, id); },

  /* Referrals: one code per finished project team */
  async getReferral(code) { code = normCode(code); if (!code) return null; try { return await get(C.referrals, code); } catch (e) { return undefined; } },
  async saveReferral(ref) { await set(C.referrals, ref.code, ref); return ref; },
  async listReferrals() { return list(C.referrals); },

  /* Community projects (shown on the site and in the 3D world) */
  async listPublicProjects() { try { return await list(C.projects); } catch (e) { return []; } },
  async savePublicProject(p) { await set(C.projects, p.id, p); return p; },
  async deletePublicProject(id) { await del(C.projects, id); },

  /* Pricing rule: new client gets discountPct off, the referring team earns commissionPct (both of the base price) */
  price(base, hasReferral) {
    base = Math.max(0, Number(base) || 0);
    const discount = hasReferral ? Math.round(base * pct.discountPct) / 100 : 0;
    const commission = hasReferral ? Math.round(base * pct.commissionPct) / 100 : 0;
    return { base, discountPct: hasReferral ? pct.discountPct : 0, discount, final: base - discount, commissionPct: hasReferral ? pct.commissionPct : 0, commission };
  },

  /* Admin auth */
  async signIn(email, password) {
    const f = await ensureFirebase();
    if (!f) { authUser = { email: 'local-admin', local: true }; authListeners.forEach((fn) => fn(authUser)); return authUser; }
    const cred = await f.auth.signInWithEmailAndPassword(f.authInst, email, password); return cred.user;
  },
  async signOut() { const f = await ensureFirebase(); if (!f) { authUser = null; authListeners.forEach((fn) => fn(null)); return; } await f.auth.signOut(f.authInst); },
  onAuth(cb) { authListeners.push(cb); ensureFirebase().then(() => { if (mode === 'local') cb(authUser); else if (authUser !== null) cb(authUser); }); },
  get user() { return authUser; }
};

window.Cloud = Cloud;
export default Cloud;
