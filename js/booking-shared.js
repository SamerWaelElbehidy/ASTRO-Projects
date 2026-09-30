/* Shared booking definitions (order form + admin). */
window.BOOKING = {
  /* project types → default districts of the 3D world when a finished project is published */
  types: [
    { key: 'pt.medical', icon: 'heart-pulse', cats: ['healthcare'] },
    { key: 'pt.arch', icon: 'building', cats: ['interactive'] },
    { key: 'pt.iot', icon: 'wifi', cats: ['iot'] },
    { key: 'pt.ai', icon: 'sparkles', cats: ['ai', 'vision'] },
    { key: 'pt.robotics', icon: 'bot', cats: ['robotics'] },
    { key: 'pt.grad', icon: 'graduation-cap', cats: ['embedded'] },
    { key: 'pt.isef', icon: 'flask', cats: ['ai'] },
    { key: 'pt.embedded', icon: 'cpu', cats: ['embedded'] },
    { key: 'pt.mobile', icon: 'smartphone', cats: ['web'] },
    { key: 'pt.web', icon: 'globe', cats: ['web'] }
  ],
  levels: ['lvl.grad', 'lvl.subject', 'lvl.master', 'lvl.private'],
  budgets: ['budget.1', 'budget.2', 'budget.3', 'budget.4', 'budget.5', 'budget.6'],
  statuses: ['pending', 'accepted', 'in_progress', 'done', 'rejected'],
  typeByKey(k) { return this.types.find((x) => x.key === k); }
};
