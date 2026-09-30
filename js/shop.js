/* Garage catalogue. Slots are exclusive (one equipped per slot); upgrades stack by level. */
window.SHOP = (function () {
  const slot = (id, name, icon, items) => ({ id, name, icon, items });
  const paints = [
    ['astro', 'ASTRO Blue', '#0a72ff', 0], ['orange', 'Sunset Orange', '#ff7a2e', 0], ['crimson', 'Crimson', '#d81f3a', 150], ['blue', 'Electric Blue', '#2f6bff', 150],
    ['emerald', 'Emerald', '#12b886', 200], ['violet', 'Violet', '#8b5cf6', 200], ['pink', 'Hot Pink', '#ff5fb0', 250],
    ['pearl', 'Pearl White', '#f0f0f6', 250], ['black', 'Matte Black', '#1b1c25', 300, { rough: 0.85, metal: 0.1 }],
    ['gold', 'Liquid Gold', '#f5c542', 700, { rough: 0.15, metal: 1 }], ['chrome', 'Chrome', '#cfd4e6', 900, { rough: 0.05, metal: 1 }]
  ].map(([id, name, color, price, x]) => Object.assign({ id, name, color, price }, x || {}));
  const rims = [
    ['silver', 'Silver', '#c9ceea', 0], ['black', 'Gunmetal', '#2b2e3b', 120], ['gold', 'Gold', '#f5c542', 220], ['cyan', 'Neon Cyan', '#33d6ff', 260], ['red', 'Racing Red', '#ff3b4f', 160]
  ].map(([id, name, color, price]) => ({ id, name, color, price }));
  const bodies = [
    ['classic', 'Classic Hatch', 0, 'The one you started with.'], ['sport', 'Sport Coupe', 450, 'Low, wide, with a big wing.'], ['pickup', 'Pickup Truck', 650, 'Tall stance and a cargo bed.']
  ].map(([id, name, price, note]) => ({ id, name, price, note }));
  const neon = [
    ['off', 'Off', null, 0], ['pink', 'Pink', '#ff4fd8', 300], ['cyan', 'Cyan', '#33d6ff', 300], ['green', 'Green', '#3dff9a', 300], ['gold', 'Amber', '#ffb020', 350], ['rainbow', 'Rainbow', 'rainbow', 800]
  ].map(([id, name, color, price]) => ({ id, name, color, price }));
  const lights = [
    ['warm', 'Warm White', '#fff3c2', 0], ['xenon', 'Xenon', '#dbe9ff', 100], ['blue', 'Ice Blue', '#5fb0ff', 150], ['red', 'Hellfire', '#ff4a3a', 150]
  ].map(([id, name, color, price]) => ({ id, name, color, price }));
  const smoke = [
    ['white', 'Classic White', '#e5e8ff', 0], ['pink', 'Bubblegum', '#ff7fd0', 150], ['cyan', 'Ice', '#6fe3ff', 150], ['orange', 'Fire', '#ff9a4a', 150], ['violet', 'Violet', '#a98aff', 150]
  ].map(([id, name, color, price]) => ({ id, name, color, price }));
  const horns = [
    ['classic', 'Classic', 0, 'Two-tone beep.'], ['air', 'Air Horn', 100, 'Deep truck blast.'], ['siren', 'Siren', 200, 'Wailing emergency siren.'], ['melody', 'Melody', 250, 'A short tune.']
  ].map(([id, name, price, note]) => ({ id, name, price, note }));

  return {
    slots: [
      slot('paint', 'Paint', '●', paints),
      slot('body', 'Body', '◭', bodies),
      slot('rims', 'Wheels', '◎', rims),
      slot('neon', 'Underglow', '✦', neon),
      slot('lights', 'Headlights', '☀', lights),
      slot('horn', 'Horn', '♪', horns),
      slot('smoke', 'Tyre smoke', '☁', smoke)
    ],
    // one-off / levelled upgrades (each level must be bought in order)
    upgrades: [
      { id: 'drift', name: 'Drift Kit', icon: '↯', desc: 'Unlocks real drifting (hold Space). Long drifts pay coins.', levels: [{ price: 500 }] },
      { id: 'nitro', name: 'Nitrous', icon: '⚡', desc: 'Hold Shift for a huge speed boost. Higher levels = bigger tank.', levels: [{ price: 300, tank: 100 }, { price: 700, tank: 170 }, { price: 1200, tank: 260 }] },
      { id: 'engine', name: 'Engine', icon: '⚙', desc: 'More acceleration and a higher top speed.', levels: [{ price: 300, speed: 1.1, acc: 1.08 }, { price: 650, speed: 1.2, acc: 1.16 }, { price: 1100, speed: 1.32, acc: 1.26 }] },
      { id: 'flames', name: 'Exhaust Flames', icon: '♨', desc: 'Backfire pops when you lift off the throttle.', levels: [{ price: 350 }] },
      { id: 'magnet', name: 'Coin Magnet', icon: '⌖', desc: 'Pulls nearby coins toward the car.', levels: [{ price: 400 }] }
    ]
  };
})();
