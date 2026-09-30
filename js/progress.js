/* Shared game progress: discovered projects, coins, shop purchases.
   Stored in localStorage so the landing page and the 3D world stay in sync. */
(function () {
  const KEY = 'astro-projects-progress-v1';
  const { projects, categories } = window.PORTFOLIO;
  const TOTAL = projects.length;
  const listeners = [];
  const blank = () => ({ v: 1, found: {}, coins: 0, earned: 0, owned: {}, eq: {}, collected: {}, bonus: {}, stats: { drift: 0, coins: 0 } });
  let mem = null;

  function load() {
    try { const raw = localStorage.getItem(KEY); if (raw) { const s = JSON.parse(raw); return Object.assign(blank(), s); } } catch (e) {}
    return mem || blank();
  }
  let state = load();
  function save() { mem = state; try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} listeners.forEach((f) => { try { f(state); } catch (e) {} }); }

  addEventListener('storage', (e) => { if (e.key === KEY) { state = load(); listeners.forEach((f) => f(state)); } });

  const count = () => Object.keys(state.found).length;
  const reward = (p) => (p.featured ? 200 : 100);

  function add(n) { state.coins += n; state.earned += Math.max(0, n); save(); }

  function discover(p) {
    if (state.found[p.id]) return null;
    state.found[p.id] = Date.now();
    const out = { reward: reward(p), bonuses: [], count: 0, total: TOTAL, project: p };
    state.coins += out.reward; state.earned += out.reward;
    // category completion bonuses
    p.cats.forEach((cid) => {
      if (state.bonus[cid]) return;
      const c = categories.find((x) => x.id === cid);
      const all = projects.filter((q) => q.cats.includes(cid));
      if (all.every((q) => state.found[q.id])) { state.bonus[cid] = true; state.coins += 300; state.earned += 300; out.bonuses.push({ label: c.name + ' complete', amount: 300, color: c.color }); }
    });
    out.count = count();
    if (out.count === TOTAL && !state.bonus.all) { state.bonus.all = true; state.coins += 2000; state.earned += 2000; out.bonuses.push({ label: 'Every project discovered', amount: 2000, color: '#ffd23f' }); }
    save();
    return out;
  }

  window.Progress = {
    TOTAL,
    get state() { return state; },
    count,
    coins: () => state.coins,
    isFound: (id) => !!state.found[id],
    discover,
    add,
    spend(n) { if (state.coins < n) return false; state.coins -= n; save(); return true; },
    owns: (id) => !!state.owned[id],
    own(id) { state.owned[id] = true; save(); },
    equipped: (slot, dflt) => (state.eq[slot] != null ? state.eq[slot] : dflt),
    equip(slot, id) { state.eq[slot] = id; save(); },
    collected: (i) => !!state.collected[i],
    collect(i, v) { state.collected[i] = 1; state.coins += v; state.earned += v; state.stats.coins++; save(); },
    reset() { state = blank(); save(); },
    on(fn) { listeners.push(fn); },
    fmt: (n) => Math.floor(n).toLocaleString('en-US')
  };
})();
