/* Loads finished client projects published from the unified ASTRO Store admin
   dashboard (astro-store-backend's GET /api/public-projects) and merges them
   into PORTFOLIO.projects.
   Pages await PORTFOLIO.ready before they build their UI (with a time limit, so a slow network never blocks the site). */
(function () {
  const P = window.PORTFOLIO;
  const CFG = window.ASTRO_CONFIG;
  const validCats = new Set(P.categories.map((c) => c.id));
  const arr = (x) => (Array.isArray(x) ? x.filter(Boolean).map(String) : []);

  function normalize(p) {
    const cats = arr(p.cats).filter((c) => validCats.has(c));
    return {
      id: 'c-' + String(p.id).replace(/[^a-z0-9-]/gi, '').toLowerCase(),
      name: String(p.name || 'Untitled project').slice(0, 120),
      cats: cats.length ? cats : ['embedded'],
      featured: false,
      status: 'Built',
      tagline: String(p.tagline || '').slice(0, 220),
      desc: String(p.desc || '').slice(0, 2000),
      points: arr(p.points).slice(0, 8),
      stack: arr(p.stack).slice(0, 16),
      links: p.links && typeof p.links === 'object' ? p.links : {},
      community: true,
      team: p.team ? String(p.team).slice(0, 80) : '',
      publishedAt: p.publishedAt || ''
    };
  }

  async function load() {
    try {
      const res = await fetch(CFG.storeApi + '/public-projects');
      const data = await res.json();
      const list = Array.isArray(data.projects) ? data.projects : [];
      list.filter((p) => p && p.id && p.published !== false)
        .sort((a, b) => String(a.publishedAt || '').localeCompare(String(b.publishedAt || '')))
        .forEach((p) => { const n = normalize(p); if (!P.projects.some((x) => x.id === n.id)) P.projects.push(n); });
    } catch (e) { /* offline or backend unreachable: the built-in projects are enough */ }
  }

  P.ready = Promise.race([load(), new Promise((r) => setTimeout(r, 3500))]);
})();
