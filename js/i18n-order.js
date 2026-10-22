/* English / Arabic strings — shared across the whole site (portfolio, 3D
   world, booking and account pages). */
(function () {
  const D = {
    /* nav */
    'nav.home': ['Home', 'الرئيسية'],
    'nav.projects': ['Projects', 'المشاريع'],
    'nav.world': ['3D world', 'العالم ثلاثي الأبعاد'],
    'nav.book': ['Book a project', 'احجز مشروعك'],
    'nav.admin': ['Admin', 'الإدارة'],
    'nav.account': ['Sign in', 'تسجيل الدخول'],
    'tab.new': ['New order', 'طلب جديد'],
    'tab.track': ['Track order', 'تتبع الطلب'],

    /* index.html — top nav + menu */
    'top.featured': ['Featured', 'الأبرز'],
    'top.domains': ['Domains', 'المجالات'],
    'top.all': ['All projects', 'كل المشاريع'],
    'top.about': ['About', 'من نحن'],
    'top.contact': ['Contact', 'تواصل معنا'],
    'top.walletTitle': ['Discover projects to earn coins, then spend them in the garage', 'اكتشف المشاريع عشان تكسب عملات، واصرفها في الجراج'],
    'top.drive': ['Drive the 3D world →', 'تجوّل في العالم ثلاثي الأبعاد ←'],
    'menu.featured': ['Featured projects', 'المشاريع المميزة'], 'menu.featuredD': ['Our flagship work', 'أقوى شغلنا'],
    'menu.domains': ['Domains', 'المجالات'], 'menu.domainsD': ['Nine areas we work in', 'تسعة مجالات بنشتغل فيها'],
    'menu.all': ['All projects', 'كل المشاريع'], 'menu.allD': ['Search and filter everything', 'ابحث وفلتر في كل حاجة'],
    'menu.about': ['About ASTRO', 'عن ASTRO'], 'menu.aboutD': ['Who we are', 'مين إحنا'],
    'menu.book': ['Book a project', 'احجز مشروعك'], 'menu.bookD': ['Get a proposal within 24 hours', 'هتاخد عرض خلال 24 ساعة'],
    'menu.drive': ['Drive the 3D world', 'تجوّل في العالم ثلاثي الأبعاد'], 'menu.driveD': ['Explore projects by car', 'استكشف المشاريع بعربية'],
    'menu.account': ['My account', 'حسابي'], 'menu.accountD': ['Your projects, invitations & discount code', 'مشاريعك ودعواتك وكود الخصم بتاعك'],
    'menu.contact': ['Contact', 'تواصل معنا'], 'menu.contactD': ['WhatsApp and Facebook', 'واتساب وفيسبوك'],

    /* index.html — hero */
    'hero.pill': ['ASTRO · Training & Technical Development · New Damietta, Egypt', 'ASTRO · تدريب وتطوير تقني · دمياط الجديدة'],
    'hero.drive': ['Drive through our projects →', 'تجوّل في مشاريعنا ←'],
    'hero.browse': ['Browse all projects', 'تصفّح كل المشاريع'],
    'hero.book': ['Book a project', 'احجز مشروعك'],
    'hero.scroll': ['scroll', 'انزل لتحت'],
    'hero.stat.projects': ['Projects', 'مشروع'], 'hero.stat.domains': ['Domains', 'مجال'], 'hero.stat.since': ['Since', 'منذ'],

    /* index.html — "drive" interactive section */
    'drive.eyebrow': ['Interactive', 'تفاعلي'],
    'drive.title': ['Our projects, as a world you can drive through.', 'مشاريعنا، في عالم تقدر تتجول فيه بعربيتك.'],
    'drive.desc': ['Take the car for a spin. Every domain is its own district, every project a landmark — park next to one and press <b>Enter</b> to read its story. Works on phones with a joystick.', 'خد العربية جولة. كل مجال حي لوحده، وكل مشروع معلم فيه — اركن جنبه ودوس <b>Enter</b> تقرا قصته. شغالة على الموبايل بعصا تحكم.'],
    'drive.start': ['Start driving', 'ابدأ السواقة'],

    /* index.html — featured / domains / work / about / book / contact sections */
    'sec.featured.eyebrow': ['Selected work', 'شغل مختار'],
    'sec.featured.title': ['Flagship projects', 'المشاريع الرئيسية'],
    'sec.featured.lead': ['Systems that combine models, sensors, firmware and software into something that works in the physical world.', 'أنظمة بتجمع نماذج وحساسات وبرمجيات ثابتة وسوفتوير في حاجة شغالة فعليًا في العالم الحقيقي.'],
    'sec.domains.eyebrow': ['Domains', 'المجالات'],
    'sec.domains.title': ['Nine areas, one thread.', 'تسعة مجالات، وخيط واحد يربطهم.'],
    'sec.domains.lead': ['Most projects live in more than one domain — an eye-controlled wheelchair is healthcare, robotics, vision and IoT at once — so they show up in each.', 'أغلب المشاريع بتنتمي لأكتر من مجال — كرسي متحرك بيتحكم فيه بالعين ده رعاية صحية وروبوتات ورؤية وإنترنت أشياء في نفس الوقت — فبتظهر في كل مجال يخصها.'],
    'sec.work.eyebrow': ['Everything', 'كل حاجة'],
    'sec.work.title': ['All projects', 'كل المشاريع'],
    'sec.work.searchPh': ['Search projects, sensors, frameworks…', 'ابحث عن مشاريع، حساسات، فريمووركات…'],
    'sec.work.empty': ['No project matches that search.', 'مفيش مشروع مطابق للبحث ده.'],
    'sec.work.filterAll': ['All', 'الكل'],
    'sec.work.count': ['{n} of {total}', '{n} من {total}'],
    'sec.about.eyebrow': ['About ASTRO', 'عن ASTRO'],
    'sec.about.title': ['We teach it. We build it.', 'بنعلّمها. وبنبنيها.'],
    'sec.about.lead': ['ASTRO is a training and technical-development studio in New Damietta, Egypt. We teach robotics, electronics and embedded systems by building real projects — and we build them ourselves, from the first sketch to the last line of firmware.', 'ASTRO استوديو تدريب وتطوير تقني في دمياط الجديدة. بنعلّم الروبوتات والإلكترونيات والأنظمة المدمجة من خلال بناء مشاريع حقيقية — وبننفذها بنفسنا، من أول رسمة لحد آخر سطر في الفيرموير.'],
    'about.whatWeDo': ['What we do', 'بنعمل إيه'],
    'sec.book.eyebrow': ['Book a project', 'احجز مشروعك'],
    'sec.book.title': ['Have a project in mind?', 'عندك فكرة مشروع؟'],
    'sec.book.lead': ['Graduation, research, IoT, AI, robotics, embedded, mobile or web — tell us about it and get a tailored proposal within 24 hours. Finished projects join our 3D world, and your team gets a referral code: a friend who uses it gets 5% off and your team earns 5%.', 'تخرج، بحث، إنترنت أشياء، ذكاء اصطناعي، روبوتات، أنظمة مدمجة، موبايل أو ويب — احكيلنا عنه وهتاخد عرض مناسب خلال 24 ساعة. المشاريع المكتملة بتنضم لعالمنا ثلاثي الأبعاد، وفريقك بياخد كود إحالة: أي صاحب يستخدمه ياخد خصم 5% وفريقك ياخد 5%.'],
    'sec.book.cta': ['Book your project →', 'احجز مشروعك ←'],
    'sec.book.track': ['My projects', 'مشاريعي'],
    'sec.contact.eyebrow': ['Contact', 'تواصل معنا'],
    'sec.contact.title': ['Let’s build something that moves.', 'يلا نبني حاجة بتتحرك.'],
    'sec.contact.lead': ['Courses, custom projects and components — reach out to the ASTRO team.', 'كورسات، مشاريع مخصوصة، ومكونات — تواصل مع فريق ASTRO.'],

    /* footer */
    'footer.loc': ['New Damietta, Egypt', 'دمياط الجديدة، مصر'],
    'card.flagship': ['Flagship', 'مميز'],
    'quest.progress': ['{n} of {total} projects discovered — open one to earn coins, spend them in the garage', 'اتكتشف {n} من {total} مشروع — افتح واحد عشان تكسب عملات وتصرفها في الجراج'],

    /* world.html — 3D world HUD */
    'w.building': ['Building the world…', 'بنجهز العالم…'],
    'w.back': ['ASTRO Projects', 'ASTRO Projects'],
    'w.nowEntering': ['Now entering', 'بتدخل دلوقتي'],
    'w.centralPlaza': ['Central plaza', 'الميدان المركزي'],
    'w.book': ['Book', 'احجز'],
    'w.account': ['Account', 'حسابي'],
    'w.garage': ['Garage', 'الجراج'],
    'w.districts': ['Districts', 'الأحياء'],
    'w.districtsTitle': ['Districts & search (Tab)', 'الأحياء والبحث (Tab)'],
    'w.camera': ['Camera (C)', 'الكاميرا (C)'],
    'w.sound': ['Sound (M)', 'الصوت (M)'],
    'w.nitro': ['Nitro · Shift', 'نيترو · Shift'],
    'w.speedUnit': ['km/h', 'كم/س'],
    'w.openPrompt': ['Enter', 'Enter'],
    'w.keys.drive': ['/ arrows drive', '/ أسهم القيادة'],
    'w.keys.drift': ['drift (garage)', 'انزلاق (من الجراج)'],
    'w.keys.nitro': ['nitro (garage)', 'نيترو (من الجراج)'],
    'w.keys.horn': ['horn', 'كلاكس'],
    'w.keys.open': ['open project', 'افتح المشروع'],
    'w.keys.reset': ['reset car', 'رجّع العربية'],
    'w.touch.open': ['Open', 'افتح'],
    'w.touch.nitro': ['Nitro', 'نيترو'],
    'w.touch.drift': ['Drift', 'انزلاق'],
    'w.touch.horn': ['Horn', 'كلاكس'],
    'w.panelTitle': ['Districts & projects', 'الأحياء والمشاريع'],
    'w.panelSearchPh': ['Find a project and drive there…', 'دوّر على مشروع واسوق ليه…'],
    'w.driveThere': ['Drive there →', 'اسوق لهناك ←'],
    'w.panelClose': ['Close', 'إغلاق'],
    'w.noscript': ['This interactive world needs JavaScript.', 'العالم التفاعلي ده محتاج JavaScript.'],
    'w.backToPortfolio': ['Back to the portfolio', 'العودة للبورتفوليو'],
    'w.garagePrompt': ['Garage — customize your car', 'الجراج — خصّص عربيتك'],
    'w.resetConfirm': ['Reset all discovered projects, coins and purchases?', 'هل تريد إعادة تعيين كل المشاريع المكتشفة والعملات والمشتريات؟'],

    /* project modal (index.html cards + 3D world "Enter" prompt) */
    'modal.discovered': ['discovered', 'اتكتشف'],
    'modal.bonus': ['bonus', 'بونص'],
    'modal.github': ['View on GitHub ↗', 'شوف على GitHub ↗'],
    'modal.demo': ['Live demo ↗', 'تجربة حية ↗'],
    'modal.whatItDoes': ['What it does', 'بيعمل إيه'],
    'modal.techStack': ['Tech stack', 'الأدوات المستخدمة'],
    'modal.close': ['Close', 'إغلاق'],

    /* garage / shop */
    'shop.slot.paint': ['Paint', 'الدهان'],
    'shop.slot.body': ['Body', 'الهيكل'],
    'shop.slot.rims': ['Wheels', 'العجلات'],
    'shop.slot.neon': ['Underglow', 'إضاءة سفلية'],
    'shop.slot.lights': ['Headlights', 'الأنوار الأمامية'],
    'shop.slot.horn': ['Horn', 'الكلاكس'],
    'shop.slot.smoke': ['Tyre smoke', 'دخان العجل'],
    'shop.tab.upgrades': ['Upgrades', 'ترقيات'],
    'shop.equipped': ['Equipped', 'متركّب'],
    'shop.owned': ['Owned', 'عندك'],
    'shop.previewing': ['Previewing on your car', 'بتجرب شكلها على عربيتك'],
    'shop.buy': ['Buy ·', 'اشترِ ·'],
    'shop.cancel': ['Cancel', 'إلغاء'],
    'shop.tip': ['Tap an item to preview it on your car. Earn coins by opening projects and collecting coins in the world.', 'دوس على أي حاجة عشان تجربها على عربيتك. اكسب عملات بفتح المشاريع وجمع العملات في العالم.'],
    'shop.resetProgress': ['Reset progress', 'إعادة تعيين التقدم'],
    'shop.notEnough': ['Not enough coins', 'العملات مش كفاية'],
    'shop.needMore': ['Need {n} more — open projects and collect coins', 'محتاج {n} زيادة — افتح مشاريع واجمع عملات'],
    'shop.needMoreShort': ['Need {n} more', 'محتاج {n} زيادة'],
    'shop.purchased': ['Purchased and equipped', 'اتشترت واتركّبت'],
    'shop.installed': ['Installed', 'اتركّبت'],
    'shop.driftBonus': ['Drift bonus', 'بونص الانزلاق'],
    'shop.level': ['Level', 'مستوى'],
    'shop.upgrade.drift.name': ['Drift Kit', 'عدة الانزلاق'],
    'shop.upgrade.drift.desc': ['Unlocks real drifting (hold Space). Long drifts pay coins.', 'بتفتح انزلاق حقيقي (اضغط مطولًا على Space). الانزلاقات الطويلة بتدي عملات.'],
    'shop.upgrade.nitro.name': ['Nitrous', 'نيتروس'],
    'shop.upgrade.nitro.desc': ['Hold Shift for a huge speed boost. Higher levels = bigger tank.', 'اضغط مطولًا على Shift لدفعة سرعة كبيرة. المستويات الأعلى = خزان أكبر.'],
    'shop.upgrade.engine.name': ['Engine', 'المحرك'],
    'shop.upgrade.engine.desc': ['More acceleration and a higher top speed.', 'تسارع أكتر وسرعة قصوى أعلى.'],
    'shop.upgrade.flames.name': ['Exhaust Flames', 'لهب العادم'],
    'shop.upgrade.flames.desc': ['Backfire pops when you lift off the throttle.', 'صوت فرقعة من العادم لما تسيب البنزين.'],
    'shop.upgrade.magnet.name': ['Coin Magnet', 'مغناطيس العملات'],
    'shop.upgrade.magnet.desc': ['Pulls nearby coins toward the car.', 'بيجذب العملات القريبة ناحية العربية.'],
    'shop.upgradesTip': ['Drift Kit unlocks Space-drifting and pays coins for long drifts. Hold Shift for nitro once you own it.', 'عدة الانزلاق بتفتح الانزلاق بـSpace وبتدي عملات على الانزلاقات الطويلة. اضغط مطولًا على Shift للنيترو لما تمتلكه.'],
    'w.driftMeter': ['DRIFT', 'انزلاق'],
    'w.closeGarage': ['Close garage', 'إغلاق الجراج'],

    /* account gate (shown in the booking form when not signed in) */
    'gate.title': ['Sign in to submit your project', 'سجّل دخولك لإرسال مشروعك'],
    'gate.desc': ['You need an ASTRO account to book a project — it’s the same account as the ASTRO Store, and it’s how you’ll track this project, add teammates and use your discount code.', 'محتاج حساب ASTRO عشان تحجز مشروع — نفس حساب متجر ASTRO، وبيه هتتابع مشروعك وتضيف أعضاء الفريق وتستخدم كود الخصم بتاعك.'],
    'gate.title.account': ['Sign in to your account', 'سجّل دخولك لحسابك'],
    'gate.desc.account': ['One account for ASTRO Projects and the ASTRO Store. Sign in to see your projects, invitations and discount code.', 'حساب واحد لمشاريع ASTRO ومتجر ASTRO. سجّل دخولك عشان تشوف مشاريعك ودعواتك وكود الخصم بتاعك.'],
    'gate.tab.in': ['Sign in', 'تسجيل الدخول'], 'gate.tab.up': ['Create account', 'إنشاء حساب'],
    'gate.firstName': ['First name', 'الاسم الأول'], 'gate.lastName': ['Last name', 'اسم العائلة'],
    'gate.email': ['Email', 'البريد الإلكتروني'], 'gate.password': ['Password', 'كلمة المرور'],
    'gate.consent': ['I agree to create an ASTRO account with these details.', 'أوافق على إنشاء حساب ASTRO بهذه البيانات.'],
    'gate.signIn': ['Sign in', 'تسجيل الدخول'], 'gate.signUp': ['Create account & continue', 'إنشاء الحساب والمتابعة'],
    'gate.switchToUp': ['Don’t have an account? Create one', 'معندكش حساب؟ أنشئ واحد'],
    'gate.switchToIn': ['Already have an account? Sign in', 'عندك حساب بالفعل؟ سجّل دخولك'],
    'gate.signedInAs': ['Signed in as {name}', 'مسجل الدخول باسم {name}'],
    'gate.notYou': ['Not you? Sign out', 'مش إنت؟ سجّل خروج'],
    'gate.err.consent': ['Please check the box to create your account', 'من فضلك فعّل المربع عشان ننشئ حسابك'],
    'gate.err.generic': ['Something went wrong. Please check your details and try again.', 'حصل خطأ. تأكد من بياناتك وحاول مرة أخرى.'],

    /* account page */
    'acc.title': ['My account', 'حسابي'],
    'acc.tab.projects': ['My projects', 'مشاريعي'], 'acc.tab.invites': ['Invitations', 'الدعوات'], 'acc.tab.code': ['Discount code', 'كود الخصم'],
    'acc.signOut': ['Sign out', 'تسجيل الخروج'],
    'acc.noProjects': ['You don’t have any projects yet.', 'لسه معندكش أي مشاريع.'],
    'acc.bookOne': ['Book a project', 'احجز مشروعك'],
    'acc.total': ['Total price', 'الإجمالي'], 'acc.paid': ['Paid', 'المدفوع'], 'acc.remaining': ['Remaining', 'المتبقي'],
    'acc.priceTbd': ['Pending the ASTRO team', 'في انتظار فريق ASTRO'],
    'acc.delivery': ['Delivery', 'التسليم'], 'acc.daysLeft': ['{n} days left', 'باقي {n} يوم'], 'acc.overdue': ['Past due', 'متأخر عن الموعد'], 'acc.today': ['Today', 'النهارده'],
    'acc.nextMeeting': ['Next meeting', 'الموعد الجاي'], 'acc.noMeeting': ['No meeting scheduled', 'مفيش معاد محدد'],
    'acc.team': ['Team', 'الفريق'], 'acc.leader': ['Leader', 'القائد'], 'acc.you': ['you', 'إنت'],
    'acc.invite': ['Invite teammate', 'ادعُ عضو فريق'], 'acc.invitePh': ['Teammate’s ASTRO email', 'إيميل عضو الفريق على ASTRO'],
    'acc.inviteSend': ['Send invite', 'إرسال الدعوة'], 'acc.inviteSent': ['Invite sent', 'تم إرسال الدعوة'],
    'acc.inviteOnlyLeader': ['Only the project leader can invite teammates.', 'قائد الفريق بس هو اللي يقدر يدعو أعضاء.'],
    'acc.noAccountYet': ['They need an ASTRO account first — ask them to sign up, then invite them.', 'لازم يكون عنده حساب ASTRO الأول — اطلب منه يسجل، وبعدين ادعُه.'],
    'acc.teamSettings': ['Team & roles', 'الفريق والأدوار'],
    'acc.rolePh': ['Role (e.g. Programming lead)', 'الرول (مثال: مسؤول البرمجة)'],
    'acc.save': ['Save', 'حفظ'],
    'acc.makeLeader': ['Make leader', 'اجعله القائد'],
    'acc.confirmTransfer': ['Make {name} the team leader? Leadership will move to them.', 'تدّي {name} قيادة الفريق؟ هتروح القيادة له.'],
    'acc.roleSaved': ['Role saved', 'تم حفظ الرول'],
    'acc.leaderTransferred': ['Leadership transferred', 'تم تحويل القيادة'],
    'acc.notes': ['Notes from ASTRO', 'ملاحظات من ASTRO'],
    'acc.noInvites': ['No pending invitations.', 'مفيش دعوات معلقة.'],
    'acc.inviteFrom': ['{name} invited you to join', 'دعاك {name} للانضمام إلى'],
    'acc.accept': ['Accept', 'قبول'], 'acc.reject': ['Reject', 'رفض'], 'acc.accepted': ['Accepted', 'تم القبول'], 'acc.rejected': ['Rejected', 'تم الرفض'],
    'acc.codeTitle': ['Your discount code', 'كود الخصم الخاص بك'],
    'acc.codeDesc': ['Share it with friends who want to book a project with ASTRO, or just buy components from the store. They get {pct}% off, and once their order or project is confirmed, you get {pct}% credited straight to your wallet below — as a team, you both win.', 'شاركه مع أصحابك اللي عايزين يحجزوا مشروع مع ASTRO، أو حتى يشتروا مكونات من المتجر بس. هم هياخدوا خصم {pct}%، وبمجرد تأكيد الطلب أو المشروع، إنت هتاخد {pct}% تتحط في محفظتك تحت. يعني كفريق، الاتنين كسبانين.'],
    'acc.copyCode': ['Copy code', 'نسخ الكود'], 'acc.copied': ['Copied!', 'تم النسخ!'],
    'acc.copyLink': ['Copy store link', 'نسخ لينك المتجر'],
    'acc.wallet': ['Wallet balance', 'رصيد المحفظة'],
    'acc.walletDesc': ['Spend it on your next order or project, or ask us to cash it out via WhatsApp.', 'اصرفه في طلبك أو مشروعك الجاي، أو اطلب تحويله لك كاش عبر واتساب.'],
    'acc.walletHistory': ['History', 'السجل'], 'acc.noWalletHistory': ['No earnings yet — share your code to start.', 'لسه معندكش أي أرباح — شارك كودك عشان تبدأ.'],
    'acc.cashOut': ['Request cash-out on WhatsApp', 'اطلب تحويل الرصيد عبر واتساب'],
    'acc.from': ['from {store}', 'من {store}'], 'store.order': ['store order', 'طلب من المتجر'], 'store.project': ['project', 'مشروع'],
    'status.pill.pending': ['Pending review', 'قيد المراجعة'], 'status.pill.accepted': ['Accepted', 'تم القبول'], 'status.pill.in_progress': ['In progress', 'قيد التنفيذ'], 'status.pill.done': ['Completed', 'مكتمل'], 'status.pill.rejected': ['Not accepted', 'غير مقبول'],

    /* project roadmap (the 9-step build process) */
    'stage.agreement': ['Agreement', 'الاتفاق'], 'stage.design': ['Design', 'التصميم'], 'stage.assembly': ['Assembly', 'التجميع'], 'stage.wiring': ['Wiring', 'التوصيلات'], 'stage.programming': ['Programming', 'البرمجة'], 'stage.test': ['Test & revise', 'الاختبار والتعديل'], 'stage.handover': ['Handover', 'التسليم'], 'stage.presentation': ['Presentation', 'العرض التقديمي'], 'stage.rehearsal': ['Rehearsal', 'البروفة'],
    'acc.roadmap': ['Project roadmap', 'خريطة المشروع'],
    'acc.pendingAdmin': ['Pending the ASTRO team', 'في انتظار فريق ASTRO'],
    'acc.waitingApproval': ['Your project is waiting for ASTRO to review and accept it. Once accepted, we’ll open the roadmap below stage by stage.', 'مشروعك في انتظار مراجعة وموافقة فريق ASTRO. بمجرد الموافقة، هنفتحلكوا خريطة المراحل تحت خطوة بخطوة.'],
    'acc.stageLocked': ['Not reached yet', 'لسه ما وصلناهاش'],
    'acc.stageDone': ['Done', 'خلصت'],
    'acc.yourDetails': ['What you told us', 'اللي بعتوه لينا'],

    /* header */
    'order.eyebrow': ['New project request', 'طلب مشروع جديد'],
    'order.title': ['Book your', 'احجز'],
    'order.titleHL': ['project', 'مشروعك'],
    'order.subtitle': ['Tell us about your project and we will get back to you within 24 hours with a tailored proposal.', 'أخبرنا عن مشروعك وسنعود إليك خلال 24 ساعة بعرض مناسب.'],
    'order.terms': ['By submitting you agree to be contacted about your request. We reply within 24 hours.', 'بإرسال الطلب أنت توافق على أن نتواصل معك بخصوصه. نرد خلال 24 ساعة.'],

    /* steps */
    'step.type': ['Type', 'النوع'], 'step.level': ['Level', 'المستوى'], 'step.details': ['Details', 'التفاصيل'], 'step.contact': ['Contact', 'التواصل'], 'step.review': ['Review', 'المراجعة'],

    /* step 1 */
    's1.heading': ['What type of project?', 'ما نوع المشروع؟'],
    's1.desc': ['Select the category that best describes your project.', 'اختر التصنيف الذي يصف مشروعك بشكل أفضل.'],
    's1.error': ['Please select a project type', 'يرجى اختيار نوع المشروع'],
    'pt.medical': ['Medical Devices', 'أجهزة طبية'], 'pt.medicalD': ['Medical equipment, diagnostics, biomedical devices', 'معدات طبية، تشخيص، أجهزة طبية حيوية'],
    'pt.arch': ['Architecture & 3D Modeling', 'هندسة معمارية ونمذجة ثلاثية الأبعاد'], 'pt.archD': ['Architectural design, 3D rendering, BIM models', 'تصميم معماري، عرض ثلاثي الأبعاد، نماذج BIM'],
    'pt.iot': ['IoT Systems', 'أنظمة إنترنت الأشياء'], 'pt.iotD': ['Connected devices, sensor networks, smart solutions', 'أجهزة متصلة، شبكات استشعار، حلول ذكية'],
    'pt.ai': ['AI-Based Solutions', 'حلول ذكاء اصطناعي'], 'pt.aiD': ['Machine learning, computer vision, NLP systems', 'تعلم آلي، رؤية حاسوبية، أنظمة معالجة اللغة'],
    'pt.robotics': ['Robotics', 'الروبوتات'], 'pt.roboticsD': ['Robotic arms, automation, control systems', 'أذرع روبوتية، أتمتة، أنظمة تحكم'],
    'pt.grad': ['Graduation Projects', 'مشاريع تخرج'], 'pt.gradD': ['University capstone & final year projects', 'مشاريع التخرج والسنة النهائية'],
    'pt.isef': ['ISEF Research', 'أبحاث ISEF'], 'pt.isefD': ['Science fair & research competition projects', 'مشاريع معارض العلوم ومسابقات البحث'],
    'pt.embedded': ['Embedded Systems', 'أنظمة مدمجة'], 'pt.embeddedD': ['Microcontrollers, firmware, PCB design', 'متحكمات دقيقة، برمجيات ثابتة، تصميم PCB'],
    'pt.mobile': ['Mobile Applications', 'تطبيقات الهاتف'], 'pt.mobileD': ['iOS & Android app development', 'تطوير تطبيقات iOS و Android'],
    'pt.web': ['Web Platforms', 'منصات الويب'], 'pt.webD': ['Websites, web apps, dashboards', 'مواقع، تطبيقات ويب، لوحات تحكم'],

    /* step 2 */
    's2.heading': ['Project level', 'مستوى المشروع'], 's2.desc': ['Tell us what kind of project this is.', 'أخبرنا عن نوع هذا المشروع.'], 's2.error': ['Please select a project level', 'يرجى اختيار مستوى المشروع'],
    'lvl.grad': ['Graduation Project (Bachelor)', 'مشروع تخرج (بكالوريوس)'], 'lvl.subject': ['Subject Project (Bachelor)', 'مشروع مادة (بكالوريوس)'],
    'lvl.master': ['Master Degree Project', 'مشروع ماجستير'], 'lvl.private': ['Private Project', 'مشروع خاص'],
    'field.university': ['University Name', 'اسم الجامعة'], 'field.masterField': ['Master Field', 'تخصص الماجستير'], 'field.faculty': ['Faculty', 'الكلية'],
    'field.subject': ['Subject', 'المادة'], 'field.teamCount': ['Number of Team Members', 'عدد أعضاء الفريق'], 'field.supervisor': ['Doctor / Supervisor Name', 'اسم الدكتور / المشرف'],
    'field.competition': ['Is it for a competition?', 'هل هو لمسابقة؟'], 'field.compName': ['Competition Name', 'اسم المسابقة'],
    'field.selectOpt': ['Select option', 'اختر'], 'field.yes': ['Yes', 'نعم'], 'field.no': ['No', 'لا'], 'field.required': ['This field is required', 'هذا الحقل مطلوب'],

    /* step 3 */
    's3.heading': ['Project details', 'تفاصيل المشروع'], 's3.desc': ['Describe your requirements so we can understand your vision.', 'صف متطلباتك حتى نتمكن من فهم رؤيتك.'],
    's3.descLabel': ['Project description', 'وصف المشروع'],
    's3.descPh': ['Describe your project in detail: what it should do, any specific requirements, technologies you prefer, goals…', 'صف مشروعك بالتفصيل: ماذا يجب أن يفعل، أي متطلبات محددة، التقنيات المفضلة، الأهداف…'],
    's3.descErr': ['Description must be at least 20 characters', 'الوصف يجب أن يكون 20 حرفًا على الأقل'], 's3.charCount': ['characters (min. 20)', 'حرف (الحد الأدنى 20)'],
    's3.budget': ['Budget range', 'نطاق الميزانية'], 's3.budgetPh': ['Select budget range', 'اختر نطاق الميزانية'], 's3.deadline': ['Deadline (optional)', 'الموعد النهائي (اختياري)'],
    'budget.1': ['Under 5,000 EGP', 'أقل من 5,000 جنيه'], 'budget.2': ['5,000 - 10,000 EGP', '5,000 - 10,000 جنيه'], 'budget.3': ['10,000 - 20,000 EGP', '10,000 - 20,000 جنيه'],
    'budget.4': ['20,000 - 30,000 EGP', '20,000 - 30,000 جنيه'], 'budget.5': ['Over 30,000 EGP', 'أكثر من 30,000 جنيه'], 'budget.6': ['Flexible / Open to Discussion', 'مرن / قابل للنقاش'],

    /* step 4 */
    's4.heading': ['Your contact info', 'معلومات التواصل'], 's4.desc': ['We use this to contact you about your request and your project code.', 'سنستخدم هذه المعلومات للتواصل معك بخصوص طلبك وكود المشروع.'],
    's4.name': ['Full Name', 'الاسم الكامل'], 's4.namePh': ['e.g. Ahmed Al-Rashid', 'مثال: أحمد الراشد'],
    's4.email': ['Email Address', 'البريد الإلكتروني'], 's4.emailPh': ['you@email.com', 'you@email.com'],
    's4.phone': ['Phone / WhatsApp', 'الهاتف / واتساب'], 's4.phonePh': ['+20 1XX XXX XXXX', '+20 1XX XXX XXXX'],
    's4.members': ['Team members', 'أعضاء الفريق'],
    's4.membersHint': ['Add your own contact details below — you\'ll be the team leader, and we\'ll contact you about this project.', 'أضف بياناتك أنت بس تحت — هتبقى قائد الفريق، وهنتواصل معاك بخصوص المشروع.'],
    's4.leader': ['Team leader — we will contact this person', 'قائد الفريق — سنتواصل مع هذا الشخص'],
    's4.leaderBadge': ['Leader', 'القائد'], 's4.member': ['Member {n}', 'العضو {n}'],
    's4.add': ['Add member', 'إضافة عضو'], 's4.remove': ['Remove', 'حذف'], 's4.setLeader': ['Make leader', 'اجعله القائد'],
    's4.emailOpt': ['Email (optional)', 'البريد الإلكتروني (اختياري)'],
    's4.inviteTitle': ['Adding teammates', 'إضافة أعضاء الفريق'],
    's4.inviteNote': ['Once your project is submitted and you have an account, go to My Projects and invite the rest of your team by email — they\'ll need an ASTRO account too. From there you can also give each teammate a role (e.g. "Programming lead") or hand leadership to someone else.', 'بعد ما ترسل مشروعك وتعمل حساب، روح "مشاريعي" وادعِ باقي أعضاء الفريق بالإيميل — لازم يكون عندهم حساب ASTRO. من هناك تقدر كمان تحدد رول لكل عضو (زي "مسؤول البرمجة") أو تدّي قيادة الفريق لحد تاني.'],
    's5.leader': ['Contact person (leader)', 'الشخص المسؤول عن التواصل (القائد)'], 's5.members': ['Team members', 'أعضاء الفريق'],
    's4.team': ['Team / project name (optional)', 'اسم الفريق / المشروع (اختياري)'],
    's4.nameErr': ['Name is required', 'الاسم مطلوب'], 's4.emailErr': ['A valid email is required', 'يرجى إدخال بريد إلكتروني صحيح'], 's4.phoneErr': ['Phone number is required', 'رقم الهاتف مطلوب'],
    's4.ref': ['Referral code (optional)', 'كود الإحالة (اختياري)'], 's4.refPh': ['e.g. ASTRO-7K2QX', 'مثال: ASTRO-7K2QX'],
    's4.refHint': ['Got a code from a team that finished a project with us? You get {pct}% off and they earn {pct}%.', 'معك كود من فريق أنهى مشروعًا معنا؟ تحصل على خصم {pct}% ويحصل الفريق على {pct}%.'],
    'ref.checking': ['Checking the code…', 'جاري التحقق من الكود…'], 'ref.valid': ['Valid — {team}. You get {pct}% off your final price.', 'كود صحيح — {team}. تحصل على خصم {pct}% من السعر النهائي.'],
    'ref.invalid': ['This code was not found.', 'لم يتم العثور على هذا الكود.'], 'ref.unverified': ['We could not verify it right now — our team will check it.', 'تعذر التحقق الآن — سيراجعه فريقنا.'],

    /* step 5 */
    's5.heading': ['Review & submit', 'المراجعة والإرسال'], 's5.desc': ['Please confirm all details before submitting your order.', 'يرجى تأكيد جميع التفاصيل قبل إرسال طلبك.'],
    's5.projectType': ['Project type', 'نوع المشروع'], 's5.level': ['Level', 'المستوى'], 's5.budget': ['Budget', 'الميزانية'], 's5.deadline': ['Deadline', 'الموعد النهائي'],
    's5.name': ['Name', 'الاسم'], 's5.email': ['Email', 'البريد'], 's5.phone': ['Phone', 'الهاتف'], 's5.team': ['Team', 'الفريق'], 's5.referral': ['Referral code', 'كود الإحالة'],
    's5.descLabel': ['Description', 'الوصف'], 's5.notSpec': ['Not specified', 'غير محدد'], 's5.flexible': ['Flexible', 'مرن'],
    's5.university': ['University', 'الجامعة'], 's5.faculty': ['Faculty', 'الكلية'], 's5.subject': ['Subject', 'المادة'], 's5.supervisor': ['Supervisor', 'المشرف'], 's5.teamCount': ['Team members', 'أعضاء الفريق'], 's5.competition': ['Competition', 'المسابقة'], 's5.masterField': ['Master field', 'التخصص'],

    /* buttons + success */
    'btn.continue': ['Continue', 'متابعة'], 'btn.back': ['Back', 'رجوع'], 'btn.submit': ['Submit order', 'إرسال الطلب'], 'btn.submitting': ['Submitting…', 'جاري الإرسال…'],
    'success.title': ['Order submitted!', 'تم إرسال الطلب!'],
    'success.msg': ['Thank you, <strong>{name}</strong>. We received your request and will contact you within 24 hours.', 'شكرًا لك، <strong>{name}</strong>. استلمنا طلبك وسنتواصل معك خلال 24 ساعة.'],
    'success.trackLabel': ['Your tracking code', 'كود التتبع الخاص بك'], 'success.save': ['Save this code — you need it to track your order.', 'احتفظ بهذا الكود — ستحتاجه لتتبع طلبك.'],
    'success.track': ['Track this order', 'تتبع هذا الطلب'], 'success.newOrder': ['New order', 'طلب جديد'], 'success.goHome': ['Back to home', 'العودة للرئيسية'], 'success.copy': ['Copy', 'نسخ'], 'success.copied': ['Copied', 'تم النسخ'],
    'err.submit': ['We could not send your order online. You can send the same details on WhatsApp instead.', 'تعذر إرسال طلبك عبر الموقع. يمكنك إرسال نفس التفاصيل عبر واتساب.'],
    'err.wa': ['Send on WhatsApp', 'إرسال عبر واتساب'], 'err.retry': ['Try again', 'حاول مرة أخرى'],

    /* tracking */
    'track.heading': ['Track your order', 'تتبع طلبك'], 'track.desc': ['Enter the code you received when you submitted your project.', 'أدخل الكود الذي حصلت عليه عند إرسال مشروعك.'],
    'track.ph': ['e.g. AST-2026-K7Q2X', 'مثال: AST-2026-K7Q2X'], 'track.btn': ['Track', 'تتبع'], 'track.notfound': ['No order found with this code.', 'لا يوجد طلب بهذا الكود.'], 'track.error': ['Could not reach the server. Please try again.', 'تعذر الاتصال بالخادم. حاول مرة أخرى.'],
    'track.submitted': ['Submitted', 'تاريخ الإرسال'], 'track.type': ['Project', 'المشروع'], 'track.status': ['Status', 'الحالة'],
    'status.pending': ['Pending review', 'قيد المراجعة'], 'status.accepted': ['Accepted', 'تم القبول'], 'status.in_progress': ['In progress', 'قيد التنفيذ'], 'status.done': ['Completed', 'مكتمل'], 'status.rejected': ['Not accepted', 'غير مقبول'],
    'track.price': ['Agreed price', 'السعر المتفق عليه'], 'track.discount': ['Referral discount ({pct}%)', 'خصم الإحالة ({pct}%)'], 'track.final': ['You pay', 'المبلغ المطلوب'], 'track.currency': ['EGP', 'جنيه'],
    'track.done.title': ['Your project is complete!', 'مشروعك اكتمل!'],
    'track.done.msg': ['It is now part of our 3D world. Share your team code: anyone who uses it on their project gets {pct}% off and your team earns {pct}%.', 'أصبح مشروعك جزءًا من عالمنا ثلاثي الأبعاد. شارك كود فريقك: أي شخص يستخدمه في مشروعه يحصل على خصم {pct}% ويحصل فريقك على {pct}%.'],
    'track.done.code': ['Your team referral code', 'كود الإحالة الخاص بفريقك'], 'track.done.view': ['See it in the 3D world', 'شاهده في العالم ثلاثي الأبعاد'],
    'track.recent': ['Your recent orders', 'طلباتك الأخيرة'],

    /* footer */
    'footer.copy': ['© ASTRO Projects', '© ASTRO Projects']
  };
  let lang = 'en';
  try { lang = localStorage.getItem('astro-lang') || 'en'; } catch (e) {}
  if (lang !== 'ar') lang = 'en';
  const listeners = [];
  function t(key, vars) {
    const e = D[key]; let s = e ? e[lang === 'ar' ? 1 : 0] : key;
    if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  }
  function apply() {
    const h = document.documentElement; h.lang = lang; h.dir = lang === 'ar' ? 'rtl' : 'ltr';
    // innerHTML (not textContent): a few dictionary entries carry trusted inline
    // markup (e.g. "<b>Enter</b>") — safe here since every string comes from our
    // own constant D above, never from user input.
    document.querySelectorAll('[data-i18n]').forEach((n) => { n.innerHTML = t(n.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-ph]').forEach((n) => { n.setAttribute('placeholder', t(n.getAttribute('data-i18n-ph'))); });
    document.querySelectorAll('[data-i18n-title]').forEach((n) => { n.setAttribute('title', t(n.getAttribute('data-i18n-title'))); });
    document.querySelectorAll('[data-i18n-aria]').forEach((n) => { n.setAttribute('aria-label', t(n.getAttribute('data-i18n-aria'))); });
    const b = document.getElementById('lang-toggle'); if (b) b.textContent = lang === 'ar' ? 'English' : 'عربي';
  }
  function setLang(l) { lang = l === 'ar' ? 'ar' : 'en'; try { localStorage.setItem('astro-lang', lang); } catch (e) {} apply(); listeners.forEach((f) => f(lang)); }
  window.I18N = { t, en: (k) => (D[k] ? D[k][0] : k), setLang, apply, get lang() { return lang; }, onChange: (f) => listeners.push(f) };
})();
