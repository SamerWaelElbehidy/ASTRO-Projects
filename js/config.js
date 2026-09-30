/* Shared site configuration (booking, referrals, cloud). */
window.ASTRO_CONFIG = {
  whatsapp: '201068403242',
  referral: { discountPct: 5, commissionPct: 5 },
  // Firebase web config (public identifiers; access is enforced by Firestore rules — see docs/BOOKING-SETUP.md)
  firebase: {
    apiKey: 'AIzaSyDovh7wrlc5NimiAntQ8xMrl9NCacILnfI',
    authDomain: 'projects-website-a8c96.firebaseapp.com',
    projectId: 'projects-website-a8c96',
    storageBucket: 'projects-website-a8c96.firebasestorage.app',
    messagingSenderId: '460816438915',
    appId: '1:460816438915:web:e7f2b96e6adb1763c16db6'
  },
  collections: { orders: 'astro_orders', referrals: 'astro_referrals', projects: 'astro_projects' }
};
