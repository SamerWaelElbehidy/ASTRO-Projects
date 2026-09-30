/* English / Arabic strings for the booking pages. */
(function () {
  const D = {
    /* nav */
    'nav.home': ['Home', 'الرئيسية'],
    'nav.projects': ['Projects', 'المشاريع'],
    'nav.world': ['3D world', 'العالم ثلاثي الأبعاد'],
    'nav.book': ['Book a project', 'احجز مشروعك'],
    'nav.admin': ['Admin', 'الإدارة'],
    'tab.new': ['New order', 'طلب جديد'],
    'tab.track': ['Track order', 'تتبع الطلب'],

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
    's4.membersHint': ['Add the contact details of every team member and choose the leader — we will contact the leader.', 'أضف بيانات التواصل لكل أعضاء الفريق واختر القائد — سنتواصل مع القائد.'],
    's4.leader': ['Team leader — we will contact this person', 'قائد الفريق — سنتواصل مع هذا الشخص'],
    's4.leaderBadge': ['Leader', 'القائد'], 's4.member': ['Member {n}', 'العضو {n}'],
    's4.add': ['Add member', 'إضافة عضو'], 's4.remove': ['Remove', 'حذف'], 's4.setLeader': ['Make leader', 'اجعله القائد'],
    's4.emailOpt': ['Email (optional)', 'البريد الإلكتروني (اختياري)'],
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
    document.querySelectorAll('[data-i18n]').forEach((n) => { n.textContent = t(n.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-ph]').forEach((n) => { n.setAttribute('placeholder', t(n.getAttribute('data-i18n-ph'))); });
    const b = document.getElementById('lang-toggle'); if (b) b.textContent = lang === 'ar' ? 'English' : 'عربي';
  }
  function setLang(l) { lang = l === 'ar' ? 'ar' : 'en'; try { localStorage.setItem('astro-lang', lang); } catch (e) {} apply(); listeners.forEach((f) => f(lang)); }
  window.I18N = { t, en: (k) => (D[k] ? D[k][0] : k), setLang, apply, get lang() { return lang; }, onChange: (f) => listeners.push(f) };
})();
