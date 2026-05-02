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
  "hero.title1": "We don't just build.",
  "hero.title2": "We launch brands.",
  "hero.sub": "From concept to launch — fast, smart, and built to scale.",
  "hero.cta": "Start Your Project",
  "hero.cta2": "See Our Work",

  "services.eyebrow": "What we offer",
  "services.title": "What we build",
  "services.sub": "A comprehensive package of smart technical services, designed to accelerate your digital journey and support your business growth with confidence.",
  "services.s1.title": "Data Analysis & AI",
  "services.s1.desc": "Intelligent analytical solutions that provide strategic insights to support data-driven decisions.",
  "services.s1.f1": "Advanced predictive analytics",
  "services.s1.f2": "Custom AI models",
  "services.s1.f3": "Interactive dashboards",
  "services.s2.title": "Digital Marketing",
  "services.s2.desc": "Distinguished marketing campaigns that achieve widespread reach and real engagement.",
  "services.s2.f1": "Well-planned ad campaigns",
  "services.s2.f2": "SEO optimization",
  "services.s2.f3": "Social media management",
  "services.s3.title": "Website Development",
  "services.s3.desc": "Modern, fast and responsive platforms that enhance brand presence.",
  "services.s3.f1": "Responsive websites",
  "services.s3.f2": "UX improvements",
  "services.s3.f3": "SEO optimization",
  "services.s4.title": "Graphic Design",
  "services.s4.desc": "Creative visual content that supports marketing messages and enhances identity.",
  "services.s4.f1": "Visual identity design",
  "services.s4.f2": "Innovative marketing materials",
  "services.s4.f3": "Multimedia designs",
  "services.s5.title": "UI/UX Design",
  "services.s5.desc": "Smooth interfaces and experiences that highlight the digital identity.",
  "services.s5.f1": "User experience (UX) design",
  "services.s5.f2": "Smooth user interfaces (UI)",
  "services.s5.f3": "Interactive prototyping",
  "services.s6.title": "Mobile App Development",
  "services.s6.desc": "Smart applications for iOS and Android with superior features.",
  "services.s6.f1": "Native iOS apps",
  "services.s6.f2": "Native Android apps",
  "services.s6.f3": "Responsive Hybrid apps",

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

  "testi.title": "What our clients say",
  "testi.role": "Marketing Manager",
  "testi.body": "From day one, the process was smooth and professional. The team understood our vision and turned it into a powerful digital product.",

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

  "footer.rights": "All rights reserved.",
};

const ar: Dict = {
  "nav.home": "الرئيسية",
  "nav.services": "خدماتنا",
  "nav.portfolio": "أعمالنا",
  "nav.about": "من نحن",
  "nav.contact": "تواصل معنا",
  "nav.cta": "ابدأ مشروعك",

  "hero.tag": "حلول رقمية ذكية",
  "hero.title1": "لا نبني فقط.",
  "hero.title2": "نُطلق العلامات التجارية.",
  "hero.sub": "من الفكرة إلى الإطلاق — بسرعة وذكاء وقابلية للنمو.",
  "hero.cta": "ابدأ مشروعك",
  "hero.cta2": "شاهد أعمالنا",

  "services.eyebrow": "ما نقدّمه",
  "services.title": "ما الذي نبنيه",
  "services.sub": "باقة متكاملة من الخدمات التقنية الذكية، مصمّمة لتسريع رحلتك الرقمية ودعم نموّ أعمالك بخطى واثقة نحو المستقبل.",
  "services.s1.title": "تحليل البيانات والذكاء الاصطناعي",
  "services.s1.desc": "حلول تحليلية ذكية تقدّم رؤى استراتيجية لدعم القرارات المبنية على البيانات.",
  "services.s1.f1": "تحليلات تنبؤية متقدمة",
  "services.s1.f2": "نماذج ذكاء اصطناعي مخصصة",
  "services.s1.f3": "لوحات تحكم تفاعلية",
  "services.s2.title": "التسويق الرقمي",
  "services.s2.desc": "حملات تسويقية مميزة تحقق وصولًا واسعًا وتفاعلًا حقيقيًا.",
  "services.s2.f1": "حملات إعلانية مدروسة",
  "services.s2.f2": "تحسين محركات البحث",
  "services.s2.f3": "إدارة وسائل التواصل الاجتماعي",
  "services.s3.title": "تطوير المواقع",
  "services.s3.desc": "منصات حديثة وسريعة ومتجاوبة تعزّز حضور علامتك التجارية.",
  "services.s3.f1": "مواقع متجاوبة بالكامل",
  "services.s3.f2": "تحسين تجربة المستخدم",
  "services.s3.f3": "تحسين محركات البحث",
  "services.s4.title": "التصميم الجرافيكي",
  "services.s4.desc": "محتوى بصري إبداعي يدعم الرسائل التسويقية ويعزّز الهوية.",
  "services.s4.f1": "تصميم الهوية البصرية",
  "services.s4.f2": "مواد تسويقية مبتكرة",
  "services.s4.f3": "تصاميم وسائط متعددة",
  "services.s5.title": "تصميم واجهات المستخدم",
  "services.s5.desc": "واجهات سلسة وتجارب استخدام تُبرز الهوية الرقمية.",
  "services.s5.f1": "تصميم تجربة المستخدم",
  "services.s5.f2": "واجهات استخدام انسيابية",
  "services.s5.f3": "نماذج تفاعلية أولية",
  "services.s6.title": "تطوير تطبيقات الجوال",
  "services.s6.desc": "تطبيقات ذكية لأنظمة iOS و Android بميزات متفوقة.",
  "services.s6.f1": "تطبيقات iOS أصلية",
  "services.s6.f2": "تطبيقات Android أصلية",
  "services.s6.f3": "تطبيقات هجينة متجاوبة",

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

  "testi.title": "ماذا يقول عملاؤنا",
  "testi.role": "مدير تسويق",
  "testi.body": "من اليوم الأول، كانت العملية سلسة واحترافية. فهم الفريق رؤيتنا وحوّلها إلى منتج رقمي قوي.",

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

  "footer.rights": "جميع الحقوق محفوظة.",
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
