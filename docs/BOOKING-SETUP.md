# Booking system — setup & how it works

## How it works (الفكرة)

1. **Client books** at `order.html` (5-step wizard, English / Arabic): type → level → details → contact → review.
   They get a tracking code like `AST-2026-K7Q2X`. An optional **referral code** field is in the contact step.
2. **You manage orders** at `admin.html` (Firebase sign-in): set status, agreed price, notes; the price preview shows the referral discount and commission.
3. **When a project is finished** press **Mark finished & publish** on the order:
   - the order becomes *Completed*,
   - the project is **added automatically to the site and to the 3D world** (in the districts you choose),
   - the client's team gets a **referral code** (`ASTRO-XXXXX`) — shown to them in *Track order*.
4. **Referral rule** (configured in `js/config.js`): when a new client uses a team's code, the **new client gets 5 % off** and the **team earns 5 %** (both calculated on the agreed price).
   The *Referrals* tab shows, per team: uses, commission earned, paid and still due.

## One-time Firebase setup (خطوات لازم تعملها مرة واحدة)

The site uses the existing Firebase project (`projects-website-a8c96`) with new collections that all start with `astro_`.

1. **Authentication → Sign-in method →** enable **Email/Password**, then **Users → Add user** (this is your admin login).
2. **Authentication → Settings → Authorized domains →** add `samerwaelelbehidy.github.io`.
3. **Firestore Database → Rules →** merge the blocks from [`firestore.rules`](../firestore.rules) into your rules
   (change `ADMIN_EMAIL@example.com` to your admin e-mail) and **Publish**. Keep the rules other sites in the project already use.
4. Open `https://<your-site>/admin.html`, sign in, done.

Until step 3 is published, visitors can still browse the site; the booking form shows a **"send on WhatsApp"** fallback if the order cannot be saved.

## Try it without touching the cloud

Add `?cloud=local` to any page (for example `order.html?cloud=local`, then `admin.html?cloud=local`).
Everything is then stored only in that browser: place an order, open it in the admin, finish it, and watch the project appear on the site and in the 3D world.
Use `?cloud=firebase` to switch back.

## Data model

| Collection | Document id | Who can read | Who can write |
|---|---|---|---|
| `astro_orders` | order code | one order by code (tracking); list = admin | anyone can create (pending only); admin edits |
| `astro_referrals` | referral code | one code by code; list = admin | admin |
| `astro_projects` | project id | everyone | admin |

Orders contain the client's contact details, so keep tracking codes private. Never put the admin password in the code — sign-in is handled by Firebase Authentication.
