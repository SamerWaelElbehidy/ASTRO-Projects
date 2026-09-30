# ASTRO Projects

Static showcase site (no build step): a landing page plus a 3D world you drive through.

- `index.html` — landing page: flagship projects, nine domains, searchable/filterable explorer.
- `world.html` — Three.js driving world. Each domain is a district; every project is a landmark. Discover projects to earn coins and spend them in the garage.
- `order.html` — project booking wizard (English / Arabic) + order tracking. `admin.html` — admin panel (orders, referral codes, publishing finished projects). See `docs/BOOKING-SETUP.md`.
- `js/data.js` — project data (single source of truth); finished client projects are merged in from the cloud at load.
- `js/vendor/three.min.js` — Three.js r128 (MIT).

Run locally: `python -m http.server 5174` and open http://localhost:5174.

Controls: `WASD` / arrows drive · `Space` drift · `Shift` nitro · `H` horn · `Enter` open · `R` reset · `C` camera · `Tab` districts · `M` sound.
