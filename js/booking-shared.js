/* Shared booking definitions (order form + admin). */
window.BOOKING = {
  /* project types → default districts of the 3D world when a finished project is published */
  types: [
    { key: 'pt.medical', icon: '🩺', cats: ['healthcare'] },
    { key: 'pt.arch', icon: '🏗️', cats: ['interactive'] },
    { key: 'pt.iot', icon: '📡', cats: ['iot'] },
    { key: 'pt.ai', icon: '🤖', cats: ['ai', 'vision'] },
    { key: 'pt.robotics', icon: '🦾', cats: ['robotics'] },
    { key: 'pt.grad', icon: '🎓', cats: ['embedded'] },
    { key: 'pt.isef', icon: '🔬', cats: ['ai'] },
    { key: 'pt.embedded', icon: '💾', cats: ['embedded'] },
    { key: 'pt.mobile', icon: '📱', cats: ['web'] },
    { key: 'pt.web', icon: '🌐', cats: ['web'] }
  ],
  levels: ['lvl.grad', 'lvl.subject', 'lvl.master', 'lvl.private'],
  budgets: ['budget.1', 'budget.2', 'budget.3', 'budget.4', 'budget.5', 'budget.6'],
  statuses: ['pending', 'accepted', 'in_progress', 'done', 'rejected'],
  typeByKey(k) { return this.types.find((x) => x.key === k); }
};
