import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.home": "Home",
  "nav.services": "Services",
  "nav.portfolio": "Portfolio",
  "nav.about": "About",
  "nav.contact": "Contact us",
  "nav.cta": "Start Your Project",

  "hero.tag": "Smart Digital Solutions",
  "hero.title1": "Professional Software Solutions",
  "hero.title2": "That Transform Your Digital Experience",
  "hero.sub": "Complete digital services: web development, mobile apps, professional UI/UX design, and effective digital marketing. With 10+ years of expertise, we turn your ideas into integrated solutions that deliver real results.",
  "hero.cta": "Start Your Project",
  "hero.cta2": "See Our Work",

  "services.eyebrow": "What we offer",
  "services.title": "What we build",
  "services.sub": "A comprehensive package of smart technical services, designed to accelerate your digital journey and support your business growth with confidence.",
  "services.page.eyebrow": "OUR SERVICES",
  "services.page.title": "Our Services",
  "services.page.desc": "We provide website development, mobile app development, AI solutions, and digital marketing services to help businesses achieve real results.",
  "services.cta.title": "Ready to Build Your Next Digital Solution",
  "services.cta.sub": "Let’s discuss your project and create scalable solutions tailored to your business needs.",
  "services.cta.btn.consult": "Book Free Consultation",
  "services.cta.btn.contact": "Contact Us",
  "services.s1.title": "Custom Mobile App Development Services",
  "services.s1.desc": "Build high-performance iOS & Android (Flutter) apps that engage users and drive growth. From concept to launch, we deliver scalable mobile solutions tailored to your business.",
  "services.s2.title": "Professional UI/UX Design Services",
  "services.s2.desc": "Design user-centered, intuitive interfaces that convert. We create pixel-perfect experiences that enhance your brand and delight your users.",
  "services.s3.title": "AI Solutions & Business Automation Services",
  "services.s3.desc": "Transform your operations with intelligent automation and custom AI tools. Reduce costs, eliminate manual processes, and boost productivity with smart business solutions.",
  "services.s4.title": "Custom Web Development Services",
  "services.s4.desc": "Create fast, secure, and fully responsive websites built for growth. Our custom web solutions deliver seamless user experiences and support your business at scale.",
  "services.s5.title": "Digital Marketing & SEO Services",
  "services.s5.desc": "Drive measurable growth with strategic SEO, targeted campaigns, and data-driven marketing. Get found by your ideal customers and convert them into loyal clients.",

  "portfolio.title": "Portfolio",
  "portfolio.cardTitle": "Project Website",
  "portfolio.cardDesc": "A modern, responsive web experience built for performance and conversion.",
  "portfolio.more": "+ 30 professional projects",

  "about.title": "About Us",
  "about.body": "We are a passionate team focused on growth and excellence. We deliver high-quality services that create real value and build lasting trust.",
  "about.tag1": "Software developer",
  "about.tag2": "Creative & Design",
  "about.tag3": "Marketing",
  "about.years": "+7",
  "about.yearsLabel": "Years of experience",
  "about.vision": "Vision",
  "about.visionDesc": "To empower businesses through innovative and reliable technology.",
  "about.mission": "Mission",
  "about.missionDesc": "Deliver high-quality software solutions that solve real problems and create lasting value.",
  "about.teams": "Teams",
  "about.teamsDesc": "Together we deliver solutions that are not only functional but also meaningful and user-focused.",

  "testi.title": "What our clients say about Tmooh",
  "testi.1.name": "Omar Al-Rashid",
  "testi.1.role": "StyleHub",
  "testi.1.body": "Working with Tmooh completely transformed our online presence. Within 6 months, our sales doubled and customer satisfaction jumped to 96%.",
  "testi.2.name": "Mohammed Khalil",
  "testi.2.role": "Al-Noor Logistics",
  "testi.2.body": "We needed a mobile app built in 4 months for our Series A pitch. Tmooh delivered ahead of schedule with zero bugs. The app has 25K+ active users.",
  "testi.3.name": "Yasmine Al-Fahad",
  "testi.3.role": "Bloom Media",
  "testi.3.body": "Tmooh's digital marketing strategy increased our client's online leads by 3x in just 3 months. Their data-driven approach and transparent reporting made all the difference.",

  "contact.title": "Contact Us",
  "contact.send": "Send Message",
  "contact.fullName": "Full Name",
  "contact.email": "Email Address",
  "contact.phone": "Phone Number",
  "contact.company": "Company Name",
  "contact.companyPh": "Your company name (optional)",
  "contact.details": "Project Details",
  "contact.detailsPh": "Tell us more about your project and requirements...",
  "contact.agree": "I agree to the Privacy Policy and Terms",
  "contact.submit": "Send Message",
  "contact.submitting": "Sending...",
  "contact.success": "Message sent — we'll get back to you soon!",
  "contact.error": "Something went wrong. Please try again.",

  "footer.tagline": "We don't just build websites — we craft digital experiences that inspire growth.",
  "footer.rights": "All rights reserved.",

  "why.eyebrow": "Why Choose Tmooh",
  "why.title": "WHY LEADING COMPANIES CHOOSE US",
  "why.1.title": "PROVEN TRACK RECORD",
  "why.1.desc": "100+ successful projects, 99% client satisfaction rate.Our portfolio speaks for itself with measurable ROI and real business impact.",
  "why.2.title": "AGILE & EFFICIENT DELIVERY",
  "why.2.desc": "Fast turnaround without compromising quality. We deliver on time, every time, using modern agile methodologies.",
  "why.3.title": "TRANSPARENT PARTNERSHIPS",
  "why.3.desc": "No hidden costs, no surprises. Clear communication, detailed reporting, and full visibility into your project at every stage.",
  "why.4.title": "ONGOING OPTIMIZATION",
  "why.4.desc": "We don't just launch and disappear. We continuously optimize performance, analyze metrics, and ensure your solution drives results.",
  "why.stat.1.val": "+10",
  "why.stat.1.lbl": "Years Experience",
  "why.stat.2.val": "24/7",
  "why.stat.2.lbl": "Support Available",
  "why.stat.3.val": "+100",
  "why.stat.3.lbl": "Projects Completed",
  "why.stat.4.val": "+60",
  "why.stat.4.lbl": "Happy Clients",

  "process.eyebrow": "OUR PROCESS",
  "process.title": "From idea to launch",
  "process.1.label": "Understand",
  "process.1.title": "UNDERSTAND YOUR VISION",
  "process.1.desc": "We start by truly understanding your business, goals, and target audience. Deep discovery ensures we build the right solution for your unique needs — from day one.",
  "process.2.label": "Shape",
  "process.2.title": "SHAPE A CLEAR ROADMAP",
  "process.2.desc": "We transform your vision into a detailed strategy and technical roadmap. Clear requirements, user flows, and success metrics guide every decision we make.",
  "process.3.label": "Design",
  "process.3.title": "DESIGN EXPERIENCES THAT CONVERT",
  "process.3.desc": "We create intuitive, user-focused interfaces designed to drive engagement and results. Every pixel serves a purpose — beautiful design that actually performs.",
  "process.4.label": "Build",
  "process.4.title": "BUILD WITH EXCELLENCE & SPEED",
  "process.4.desc": "We develop scalable, secure, and high-performance solutions using modern technologies. Rigorous testing and code quality ensure your solution is production-ready from day one.",
  "process.5.label": "Launch",
  "process.5.title": "LAUNCH & SUPPORT FOR SUCCESS",
  "process.5.desc": "We ensure a smooth launch with full deployment support and monitoring. Your success doesn't end at launch — we provide ongoing optimization and 24/7 support.",

  "more.title": "Our Latest Work & Digital Solutions",
  "more.subtitle": "Explore our portfolio of recently delivered projects and innovative tech solutions.",
  "more.name": "Project Name",
  "more.text": "A modern digital experience built for impact.",
  "more.tag1": "Brand Identity",
  "more.tag2": "Web Design",

  "reach.title": "Let's talk",
  "reach.sub": "Reach out directly — we reply fast.",
  "reach.email": "Email",
  "reach.whatsapp": "WhatsApp",

  "cta.title": "READY TO TRANSFORM YOUR DIGITAL PRESENCE?",
  "cta.desc": "Let's discuss how our proven process can turn your vision into reality.",
  "cta.btn.services": "Explore Our Services",
  "cta.btn.contact": "Contact Us",
  "cta.note": "No obligation. Just genuine conversation about your goals.",
};

const ar: Dict = {
  "nav.home": "الرئيسية",
  "nav.services": "خدماتنا",
  "nav.portfolio": "أعمالنا",
  "nav.about": "من نحن",
  "nav.contact": "تواصل معنا",
  "nav.cta": "ابدأ مشروعك",

  "hero.tag": "حلول رقمية ذكية",
  "hero.title1": "حلول برمجية احترافية",
  "hero.title2": "تغير تجربتك الرقمية بالكامل",
  "hero.sub": "خدمات رقمية متكاملة تشمل: تطوير المواقع، تطبيقات الهواتف، تصميم تجربة وواجهة المستخدم الاحترافية، والتسويق الرقمي الفعال. بخبرة تفوق 10 سنوات، نحول أفكارك إلى حلول متكاملة تحقق نتائج حقيقية.",
  "hero.cta": "ابدأ مشروعك",
  "hero.cta2": "شاهد أعمالنا",

  "services.eyebrow": "ما نقدّمه",
  "services.title": "ما الذي نبنيه",
  "services.sub": "باقة متكاملة من الخدمات التقنية الذكية، مصمّمة لتسريع رحلتك الرقمية ودعم نموّ أعمالك بخطى واثقة نحو المستقبل.",
  "services.page.eyebrow": "خدماتنا",
  "services.page.title": "خدماتنا",
  "services.page.desc": "نقدم خدمات تطوير المواقع الإلكترونية، وتطبيقات الهواتف المحمولة، وحلول الذكاء الاصطناعي، والتسويق الرقمي لمساعدة الشركات على تحقيق نتائج حقيقية.",
  "services.cta.title": "مستعد لبناء حلك الرقمي القادم؟",
  "services.cta.sub": "دعنا نناقش مشروعك وننشئ حلولاً قابلة للتوسع ومخصصة لاحتياجات عملك.",
  "services.cta.btn.consult": "احجز استشارتك المجانية",
  "services.cta.btn.contact": "تواصل معنا",
  "services.s1.title": "تطوير تطبيقات الجوال المخصصة",
  "services.s1.desc": "ابنِ تطبيقات iOS وAndroid (Flutter) عالية الأداء تجذب المستخدمين وتدفع النمو. من الفكرة حتى الإطلاق، نقدم حلولاً متوسّعة مخصصة لأعمالك.",
  "services.s2.title": "تصميم تجربة المستخدم وواجهات الاستخدام الاحترافية",
  "services.s2.desc": "صمّم واجهات بديهية تُركّز على المستخدم وتحقق التحويل. نُنشئ تجارب دقيقة البكسل تعزّز علامتك التجارية وتُسعد مستخدميك.",
  "services.s3.title": "حلول الذكاء الاصطناعي وأتمتة الأعمال",
  "services.s3.desc": "حوّل عملياتك بالأتمتة الذكية والأدوات المبنية على الذكاء الاصطناعي. قلّل التكاليف، واستبدل العمليات اليدوية، وعزّز الإنتاجية بحلول أعمال ذكية.",
  "services.s4.title": "تطوير مواقع ويب مخصصة",
  "services.s4.desc": "أنشئ مواقع ويب سريعة وآمنة ومتجاوبة بالكامل مصمّمة للنمو. حلولنا المخصصة تُقدّم تجارب مستخدم سلسة وتدعم أعمالك على أي نطاق.",
  "services.s5.title": "التسويق الرقمي وتحسين محركات البحث",
  "services.s5.desc": "حقّق نمواً ملموساً بتحسين محركات البحث الاستراتيجي والحملات المستهدفة والتسويق المبني على البيانات. اجعل عملاءك المثاليين يجدونك ويتحولون إلى عملاء دائمين.",

  "portfolio.title": "أعمالنا",
  "portfolio.cardTitle": "موقع إلكتروني",
  "portfolio.cardDesc": "تجربة ويب حديثة ومتجاوبة مبنية للأداء وتحقيق التحويل.",
  "portfolio.more": "+ 30 مشروعاً احترافياً",

  "about.title": "من نحن",
  "about.body": "نحن فريق شغوف يركّز على النموّ والتميّز. نقدّم خدمات عالية الجودة تخلق قيمة حقيقية وتبني ثقة دائمة.",
  "about.tag1": "تطوير البرمجيات",
  "about.tag2": "الإبداع والتصميم",
  "about.tag3": "التسويق",
  "about.years": "+7",
  "about.yearsLabel": "سنوات من الخبرة",
  "about.vision": "رؤيتنا",
  "about.visionDesc": "تمكين الشركات عبر التقنية المبتكرة والموثوقة.",
  "about.mission": "مهمتنا",
  "about.missionDesc": "تقديم حلول برمجية عالية الجودة تحلّ مشاكل حقيقية وتصنع قيمة دائمة.",
  "about.teams": "فريقنا",
  "about.teamsDesc": "نعمل معًا لتقديم حلول ليست وظيفية فحسب، بل ذات معنى ومتمحورة حول المستخدم.",

  "testi.title": "ماذا يقول العملاء عن طموح",
  "testi.1.name": "عمر الرشيد",
  "testi.1.role": "StyleHub",
  "testi.1.body": "العمل مع طموح غيّر حضورنا الرقمي بالكامل. في غضون 6 أشهر، تضاعفت مبيعاتنا وقفز رضا العملاء إلى 96%.",
  "testi.2.name": "محمد خليل",
  "testi.2.role": "النور للخدمات اللوجستية",
  "testi.2.body": "كنا بحاجة لبناء تطبيق جوال في غضون 4 أشهر لعرض التمويل (Series A). قامت طموح بالتسليم قبل الموعد المحدد وبدون أي أخطاء. التطبيق لديه الآن أكثر من 25 ألف مستخدم نشط.",
  "testi.3.name": "ياسمين الفهد",
  "testi.3.role": "Bloom Media",
  "testi.3.body": "زادت استراتيجية التسويق الرقمي من طموح العملاء المحتملين لعملائنا عبر الإنترنت بمقدار 3 أضعاف في 3 أشهر فقط. نهجهم القائم على البيانات وتقاريرهم الشفافة صنع الفارق بالكامل.",

  "contact.title": "تواصل معنا",
  "contact.send": "أرسل رسالة",
  "contact.fullName": "الاسم الكامل",
  "contact.email": "البريد الإلكتروني",
  "contact.phone": "رقم الهاتف",
  "contact.company": "اسم الشركة",
  "contact.companyPh": "اسم شركتك (اختياري)",
  "contact.details": "تفاصيل المشروع",
  "contact.detailsPh": "أخبرنا المزيد عن مشروعك ومتطلباتك...",
  "contact.agree": "أوافق على سياسة الخصوصية والشروط",
  "contact.submit": "إرسال الرسالة",
  "contact.submitting": "جارٍ الإرسال...",
  "contact.success": "تم إرسال الرسالة — سنعود إليك قريبًا!",
  "contact.error": "حدث خطأ. حاول مرة أخرى.",

  "footer.tagline": "نحن لا نبني مواقع فحسب — بل نصنع تجارب رقمية تُلهم النمو وتصنع الأثر.",
  "footer.rights": "جميع الحقوق محفوظة.",

  "why.eyebrow": "لماذا تختار طموح",
  "why.title": "لماذا تختارنا الشركات الرائدة",
  "why.1.title": "سجل نجاح مثبت",
  "why.1.desc": "أكثر من 100 مشروع ناجح، ومعدل رضا عملاء يبلغ 99٪. سابقة أعمالنا تتحدث عن نفسها بتأثير حقيقي وعائد استثمار ملموس.",
  "why.2.title": "تسليم مرن وفعال",
  "why.2.desc": "إنجاز سريع دون المساومة على الجودة. نلتزم بالتسليم في الوقت المحدد دائماً باستخدام منهجيات العمل المرنة الحديثة.",
  "why.3.title": "شراكات شفافة",
  "why.3.desc": "لا توجد تكاليف خفية أو مفاجآت. تواصل واضح، وتقارير مفصلة، ورؤية كاملة لمشروعك في كل مرحلة.",
  "why.4.title": "تحسين وتطوير مستمر",
  "why.4.desc": "لا نكتفي بالإطلاق ثم الاختفاء. بل نقوم بتحسين الأداء باستمرار وتحليل المقاييس للتأكد من أن حلولك تحقق نتائج مستدامة.",
  "why.stat.1.val": "+10",
  "why.stat.1.lbl": "سنوات خبرة",
  "why.stat.2.val": "24/7",
  "why.stat.2.lbl": "دعم متواصل",
  "why.stat.3.val": "+100",
  "why.stat.3.lbl": "مشروع مكتمل",
  "why.stat.4.val": "+60",
  "why.stat.4.lbl": "عميل سعيد",

  "process.eyebrow": "مراحل العمل",
  "process.title": "من الفكرة إلى الإطلاق",
  "process.1.label": "فهم",
  "process.1.title": "فهم رؤيتك وشغفك",
  "process.1.desc": "نبدأ بفهم عملك، وأهدافك، وجمهورك المستهدف بدقة. يضمن الاكتشاف العميق بناء الحل المناسب لاحتياجاتك الفريدة — منذ اليوم الأول.",
  "process.2.label": "تخطيط",
  "process.2.title": "رسم خارطة طريق واضحة",
  "process.2.desc": "نحول رؤيتك إلى استراتيجية مفصلة وخارطة طريق تقنية. متطلبات واضحة، وتدفقات مستخدم، ومقاييس نجاح توجه كل قرار نتخذه.",
  "process.3.label": "تصميم",
  "process.3.title": "تصميم تجارب تحقق التحويل",
  "process.3.desc": "نصنع واجهات سهلة الاستخدام ومتمحورة حول المستخدم لزيادة التفاعل وتحقيق النتائج. كل بكسل له وظيفة — تصميم جميل يقدم أداءً حقيقياً.",
  "process.4.label": "تطوير",
  "process.4.title": "بناء بتميز وسرعة فائقة",
  "process.4.desc": "نطور حلولاً قابلة للتوسع وآمنة وعالية الأداء باستخدام أحدث التقنيات. الاختبارات الدقيقة وجودة الكود تضمن جاهزية منتجك للعمل الفعلي من اليوم الأول.",
  "process.5.label": "إطلاق",
  "process.5.title": "الإطلاق والدعم لتحقيق النجاح",
  "process.5.desc": "نضمن إطلاقاً سلساً مع دعم كامل للنشر والمراقبة. نجاحك لا ينتهي عند الإطلاق — بل نقدم تحسيناً مستمراً ودعماً على مدار الساعة 24/7.",

  "more.title": "أحدث أعمالنا وحلولنا الرقمية",
  "more.subtitle": "استكشف معرض مشاريعنا التي تم تسليمها مؤخراً والحلول التقنية المبتكرة.",
  "more.name": "اسم المشروع",
  "more.text": "تجربة رقمية حديثة مصممة لإحداث الأثر.",
  "more.tag1": "هوية بصرية",
  "more.tag2": "تصميم ويب",

  "reach.title": "تواصل معنا",
  "reach.sub": "تواصل معنا مباشرة — نرد بسرعة.",
  "reach.email": "البريد الإلكتروني",
  "reach.whatsapp": "واتساب",

  "cta.title": "هل أنت جاهز لتغيير حضورك الرقمي بالكامل؟",
  "cta.desc": "دعنا نناقش كيف يمكن لعمليتنا المجربة والمثبتة أن تحول رؤيتك إلى واقع ملموس.",
  "cta.btn.services": "استكشف خدماتنا",
  "cta.btn.contact": "تواصل معنا",
  "cta.note": "لا توجد أي التزامات. مجرد محادثة صادقة وحقيقية حول أهدافك.",
};

const dicts: Record<Lang, Dict> = { en, ar };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: string) => string;
  dir: "ltr" | "rtl";
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem("lang") as Lang)) || null;
    if (saved === "ar" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (k: string) => dicts[lang][k] ?? k;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return <I18nContext.Provider value={{ lang, setLang, t, dir }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
