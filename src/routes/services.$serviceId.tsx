import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { 
  Smartphone, 
  Layers, 
  Cpu, 
  Code2, 
  Megaphone,
  Palette,
  ArrowLeft,
  Calendar,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  ShoppingBag,
  Building,
  Target,
  Settings,
  Link as LinkIcon,
  Share2,
  Monitor,
  CreditCard,
  MapPin,
  GitMerge,
  Brain,
  Database,
  TrendingUp,
  PenTool,
  BookOpen,
  Heart,
  FileText,
  Package,
  Search,
  LifeBuoy,
  Users,
  PieChart
} from "lucide-react";

export const Route = createFileRoute("/services/$serviceId")({
  head: ({ params }) => {
    const serviceTitles: Record<string, string> = {
      s1: "Custom Mobile App Development (iOS & Android) | Tmooh Solutions.",
      s2: "Professional UI/UX Design Services | Tmooh Solutions",
      s3: "AI Solutions & Workflow Automation Services | Tmooh Solutions",
      s4: "Custom Web Development Services | Tmooh Solutions",
      s5: "Data-Driven Digital Marketing & SEO Services | Tmooh",
      s6: "Premium Graphic & Brand Identity Design | Tmooh Solutions",
    };
    const serviceDescriptions: Record<string, string> = {
      s1: "Build high-performance iOS, Android, and Flutter mobile apps with Tmooh. From intuitive UI/UX to clean code, we engineer secure, scalable app solutions.",
      s2: "Design intuitive, high-retention interfaces. Tmooh delivers data-backed UX research, structural wireframes, and professional UI design systems in Figma.",
      s3: "Eliminate repetitive tasks and optimize operational efficiency. Tmooh engineers custom AI integrations and autonomous workflows using Make.com architecture.",
      s4: "Transform your vision into high-performance, secure, and responsive websites. Partner with Tmooh for custom web development & modern e-commerce engines.",
      s5: "Drive measurable business growth with Tmooh. We build data-driven marketing strategies, high-ROI paid ads campaigns, and advanced SEO optimization setups.",
      s6: "Create cohesive, luxury visual assets with Tmooh. We design custom brand identities, guidelines, high-converting ad creatives, and premium marketing materials.",
    };
    const title = serviceTitles[params.serviceId] || "Service Details | Tmooh";
    const desc = serviceDescriptions[params.serviceId] || "Learn more about our premium digital solutions and services tailored to scale your business.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc }
      ]
    };
  },
  component: ServiceDetailsPage,
});

interface Offering {
  title: { en: string; ar: string };
  desc: { en: string; ar: string };
  Icon: any;
}

interface WhyUsItem {
  title: { en: string; ar: string };
  desc: { en: string; ar: string };
}

interface ServiceData {
  title: { en: string; ar: string };
  desc: { en: string; ar: string };
  Icon: any;
  offerings: Offering[];
  whyUs: WhyUsItem[];
}

const SERVICE_DATA: Record<string, ServiceData> = {
  s4: {
    title: {
      en: "Custom Web Development Services",
      ar: "خدمة برمجة المواقع الإلكترونية",
    },
    desc: {
      en: "At Tmooh we Transform your vision into a high-performance digital reality that empowers your business and delights your customers. We build fast, secure, and fully responsive websites optimized for search engines to ensure peak performance, seamless navigation, and a premium user experience.",
      ar: "في طموح، نقوم بتحويل رؤيتك إلى واقع رقمي عالي الأداء يمكن أعمالك ويسعد عملائك. نحن نبني مواقع ويب سريعة وآمنة ومتجاوبة بالكامل ومحسنة لمحركات البحث لضمان ذروة الأداء، والتصفح السلس، وتجربة مستخدم متميزة.",
    },
    Icon: Code2,
    offerings: [
      {
        Icon: Code2,
        title: { en: "Custom Web Development", ar: "تطوير مواقع مخصصة" },
        desc: { en: "High-speed, professional, and fully responsive websites tailored to your unique brand identity.", ar: "مواقع ويب سريعة للغاية واحترافية ومتجاوبة بالكامل مصممة خصيصاً لتناسب هوية علامتك التجارية الفريدة." },
      },
      {
        Icon: ShoppingBag,
        title: { en: "Modern E-commerce Engines", ar: "محركات تجارة إلكترونية حديثة" },
        desc: { en: "Secure, high-performance digital storefronts engineered to maximize sales and conversions.", ar: "متاجر رقمية آمنة وعالية الأداء مصممة خصيصاً لزيادة المبيعات وتحقيق أقصى معدلات التحويل." },
      },
      {
        Icon: Building,
        title: { en: "Corporate & Business Portals", ar: "بوابات الشركات والأعمال" },
        desc: { en: "Premium websites built strategically to reflect enterprise authority and marketplace trust.", ar: "مواقع ويب متميزة مصممة بشكل استراتيجي لتعكس قوة مؤسستك وتبني الثقة في السوق." },
      },
      {
        Icon: Target,
        title: { en: "High-Converting Landing Pages", ar: "صفحات هبوط عالية التحويل" },
        desc: { en: "Optimized single-page sites structured meticulously to drive user actions and capture leads.", ar: "صفحات ويب أحادية محسنة بدقة لتوجيه سلوك المستخدم وجمع بيانات العملاء المحتملين بشكل فعال." },
      },
      {
        Icon: Settings,
        title: { en: "Admin Panels & Internal Systems", ar: "لوحات تحكم وأنظمة داخلية" },
        desc: { en: "Streamlined, secure management dashboards designed for complete operational and data control.", ar: "لوحات إدارة مبسطة وآمنة مصممة للتحكم الكامل في العمليات والبيانات الخاصة بالشركة." },
      },
      {
        Icon: LinkIcon,
        title: { en: "Advanced API Integration", ar: "تكامل متقدم للواجهات البرمجية (API)" },
        desc: { en: "Seamless connectivity with external tools, payment systems, and clean, scalable code architecture.", ar: "ربط سلس مع الأدوات الخارجية وأنظمة الدفع مع بنية برمجية نظيفة وقابلة للتوسع." },
      },
    ],
    whyUs: [
      {
        title: { en: "Specialized Expertise", ar: "خبرة متخصصة" },
        desc: { en: "A dedicated team of expert developers and professional UI/UX designers.", ar: "فريق متكامل ومخصص من نخبة المطورين ومصممي تجربة وواجهة المستخدم المحترفين." },
      },
      {
        title: { en: "User-Centric Design", ar: "تصميم متمحور حول المستخدم" },
        desc: { en: "Uncompromising focus on high performance, optimal speed, and intuitive user navigation.", ar: "تركيز لا يلين على الأداء العالي، السرعة الفائقة، وتسهيل تصفح المستخدم بشكل طبيعي." },
      },
      {
        title: { en: "Tech Stack Excellence", ar: "تميز البنية التقنية" },
        desc: { en: "Utilizing the latest development frameworks and modern coding standards.", ar: "استخدام أحدث أطر العمل البرمجية وأعلى معايير كتابة الأكواد الحديثة." },
      },
      {
        title: { en: "Rigorous Quality Assurance", ar: "ضمان جودة صارم" },
        desc: { en: "Continuous follow-up, strict security measures, and reliable long-term support.", ar: "متابعة وتحديث مستمر، تدابير أمنية صارمة، ودعم فني موثوق طويل الأمد." },
      },
    ],
  },
  s1: {
    title: {
      en: "Custom Mobile App Development Services",
      ar: "تطوير تطبيقات الجوال المخصصة",
    },
    desc: {
      en: "Have a startup idea and want to transform it into a high-performance mobile application? Our expert technical team engineers secure, custom mobile apps with intuitive user experiences (UI/UX) that drive measurable business growth across both iOS and Android platforms.",
      ar: "هل لديك فكرة مشروع ناشئ وتريد تحويلها إلى تطبيق جوال عالي الأداء؟ يقوم فريقنا الفني الخبير بإنشاء تطبيقات جوال مخصصة وآمنة مع تجارب مستخدم بديهية (UI/UX) تحفز نمو الأعمال الملموس عبر منصات iOS و Android.",
    },
    Icon: Smartphone,
    offerings: [
      {
        Icon: Smartphone,
        title: { en: "Native App Development", ar: "تطوير التطبيقات الأصيلة" },
        desc: { en: "Elite-performance iOS and Android mobile applications built using Swift, SwiftUI, and Kotlin.", ar: "تطبيقات هواتف لنظامي iOS و Android فائقة الأداء مبنية باستخدام Swift و SwiftUI و Kotlin." },
      },
      {
        Icon: Share2,
        title: { en: "Cross-Platform Apps (Flutter)", ar: "تطبيقات متعددة المنصات (Flutter)" },
        desc: { en: "Rapid-deployment, highly optimized mobile apps engineered using Flutter and React Native.", ar: "تطبيقات هواتف سريعة النشر ومحسنة للغاية تم تطويرها باستخدام Flutter و React Native." },
      },
      {
        Icon: Monitor,
        title: { en: "Fully Responsive UI/UX", ar: "واجهة وتجربة مستخدم متجاوبة بالكامل" },
        desc: { en: "Adaptive, fluid, and intuitive user interfaces flawlessly tailored for all mobile and tablet screen sizes.", ar: "واجهات مستخدم متكيفة وسلسة وبديهية مصممة خصيصاً لتناسب جميع شاشات الهواتف والأجهزة اللوحية." },
      },
      {
        Icon: CreditCard,
        title: { en: "Secure Payment Gateways", ar: "بوابات دفع آمنة" },
        desc: { en: "Seamless integration with leading global payment networks including Stripe, PayPal, and more.", ar: "تكامل سلس مع شبكات الدفع العالمية الرائدة بما في ذلك Stripe و PayPal والمزيد." },
      },
      {
        Icon: MapPin,
        title: { en: "Advanced Maps Integration", ar: "تكامل الخرائط المتقدم" },
        desc: { en: "Precise location services and geofencing powered by Google Maps and Mapbox platforms.", ar: "خدمات تحديد الموقع الجغرافي الدقيقة وتحديد النطاقات الجغرافية المدعومة بخرائط Google و Mapbox." },
      },
      {
        Icon: ShieldCheck,
        title: { en: "Clean Code & Store Publishing", ar: "كود نظيف ونشر على المتاجر" },
        desc: { en: "Strict adherence to clean architecture with a 100% approval guarantee on the App Store and Google Play.", ar: "التزام صارم بالبنية النظيفة مع ضمان قبول التطبيق بنسبة 100٪ على App Store و Google Play." },
      },
    ],
    whyUs: [
      {
        title: { en: "Specialized Technical Expertise", ar: "خبرة تقنية متخصصة" },
        desc: { en: "We bring together a dedicated, multi-disciplinary team of elite software engineers and professional UI/UX designers who collaborate seamlessly to transform your business vision into a high-end, custom web solution.", ar: "نجمع بين فريق مخصص متعدد التخصصات من نخبة مهندسي البرمجيات ومصممي تجربة المستخدم المحترفين الذين يعملون معاً لتحويل رؤية عملك لمنتج تقني فاخر." },
      },
      {
        title: { en: "Secure Third-Party & API Integrations", ar: "تكامل آمن للأنظمة الخارجية والواجهات البرمجية" },
        desc: { en: "Seamless implementation of complex features, including secure payment gateways (Stripe, PayPal), custom REST/GraphQL APIs, and precise Google Maps location tracking.", ar: "تنفيذ سلس وموثوق للميزات المعقدة بما في ذلك بوابات الدفع (Stripe, PayPal) وتكامل خرائط Google والأنظمة البرمجية المخصصة." },
      },
      {
        title: { en: "Clean Source Code & Rigorous QA Testing", ar: "كود برمي نظيف واختبارات جودة صارمة" },
        desc: { en: "Delivering clean, maintainable, and elite international standard source code backed by rigorous Unit and UI testing to guarantee a completely bug-free product launch.", ar: "تقديم كود برمي نظيف وقابل للصيانة يدعم المعايير العالمية مدعوماً باختبارات جودة مكثفة تضمن إطلاق منتج خالٍ تماماً من الأخطاء والعيوب." },
      },
      {
        title: { en: "Guaranteed App Store Publishing & Support", ar: "نشر مضمون على متاجر التطبيقات ودعم مستمر" },
        desc: { en: "Full end-to-end launch support with a 100% compliance guarantee for successful app publishing on both the Apple App Store and Google Play Store, followed by reliable long-term maintenance.", ar: "دعم كامل لإطلاق ونشر التطبيق على متجري Apple و Google مع تقديم صيانة وتحديثات مستمرة وتوافق كامل بنسبة 100٪ مع شروط المتاجر." },
      },
    ],
  },
  s3: {
    title: {
      en: "AI Solutions & Workflow Automation Services",
      ar: "حلول الذكاء الاصطناعي وأتمتة الأعمال",
    },
    desc: {
      en: "In the modern business ecosystem, efficiency is your ultimate competitive edge. We engineer intelligent AI automation solutions and automated pipelines designed to eliminate repetitive administrative tasks, streamline operational workflows, and scale your startup's core infrastructure.",
      ar: "في بيئة الأعمال الحديثة، الكفاءة هي ميزتك التنافسية القصوى. نحن نهندس حلول أتمتة الذكاء الاصطناعي الذكية ومسارات العمل المصممة للقضاء على المهام الإدارية المتكررة، وتبسيط سير العمليات، وتوسيع البنية التحتية لشركتك الناشئة.",
    },
    Icon: Cpu,
    offerings: [
      {
        Icon: GitMerge,
        title: { en: "Workflow Automation Architecture", ar: "هندسة أتمتة العمليات" },
        desc: { en: "End-to-end automated pipelines that eliminate repetitive administrative tasks and human error.", ar: "مسارات عمل مؤتمتة بالكامل من البداية إلى النهاية تقضي على المهام الإدارية المتكررة والأخطاء البشرية." },
      },
      {
        Icon: Settings,
        title: { en: "Make.com Custom Workflows", ar: "أتمتة مخصصة عبر Make.com" },
        desc: { en: "Seamlessly connecting your entire technical ecosystem for fully autonomous day-to-day operations.", ar: "ربط سلس لمنظومتك التقنية بالكامل لضمان تشغيل يومي مستقل وتكامل ذكي بين جميع تطبيقاتك." },
      },
      {
        Icon: Brain,
        title: { en: "Custom AI Integrations", ar: "تكاملات ذكاء اصطناعي مخصصة" },
        desc: { en: "Embedding intelligent artificial intelligence models directly into your internal databases and software tools.", ar: "تضمين نماذج الذكاء الاصطناعي الذكية والمخصصة مباشرة في قواعد البيانات وأدوات العمل الخاصة بك." },
      },
      {
        Icon: Database,
        title: { en: "Data Pipeline Automation", ar: "أتمتة مسارات البيانات" },
        desc: { en: "Instant routing, structured analysis, and synchronization of data across cloud platforms without manual effort.", ar: "توجيه فوري، تحليل منظم، ومزامنة للبيانات عبر المنصات السحابية المختلفة دون الحاجة لتدخل يدوي." },
      },
      {
        Icon: Sparkles,
        title: { en: "Startup AI Prototyping", ar: "نماذج أولية للذكاء الاصطناعي" },
        desc: { en: "Building functional, next-generation AI-powered prototypes custom-tailored to solve specific industry problems.", ar: "بناء نماذج عمل أولية مبتكرة مدعومة بالذكاء الاصطناعي ومصممة خصيصاً لحل مشكلات قطاع عملك." },
      },
      {
        Icon: TrendingUp,
        title: { en: "Operational Efficiency Solutions", ar: "حلول الكفاءة التشغيلية" },
        desc: { en: "Drastically reducing manual team workloads to optimize output and accelerate time-to-market.", ar: "تقليل أعباء العمل اليدوية على فريقك بشكل كبير لتحسين المخرجات وتسريع عملية الوصول إلى السوق." },
      },
    ],
    whyUs: [
      {
        title: { en: "Technical Fusion", ar: "الاندماج التقني العالي" },
        desc: { en: "We uniquely bridge the gap between robust software engineering, data analysis, and modern artificial intelligence architectures.", ar: "نسد الفجوة بشكل فريد بين هندسة البرمجيات القوية وتحليل البيانات وهياكل الذكاء الاصطناعي الحديثة." },
      },
      {
        title: { en: "Operational Optimization", ar: "تحسين العمليات والتشغيل" },
        desc: { en: "Focused on drastically lowering your team's manual workload, reducing human error, and accelerating time-to-market.", ar: "نركز على خفض أعباء العمل اليدوية لفريقك بشكل كبير، وتقليل الأخطاء وتوفير الوقت وزيادة الإنتاجية." },
      },
      {
        title: { en: "Innovative Execution", ar: "التنفيذ المبتكر" },
        desc: { en: "Backed by award-winning expertise in developing functional, real-world AI applications and strategic automation frameworks.", ar: "مدعومين بخبرة حائزة على جوائز في تطوير تطبيقات الذكاء الاصطناعي العملية وأطر الأتمتة الاستراتيجية." },
      },
      {
        title: { en: "Autonomous Ecosystems", ar: "أنظمة بيئية مستقلة" },
        desc: { en: "Building fully tailored, self-sustaining workflow integrations using advanced tools like Make.com to connect your platforms seamlessly.", ar: "بناء تكاملات سير عمل مخصصة ذاتية التشغيل باستخدام أدوات متقدمة مثل Make.com لربط منصاتك بسلاسة." },
      },
    ],
  },
  s6: {
    title: {
      en: "Premium Graphic & Brand Identity Design",
      ar: "تصميم الهوية البصرية والجرافيك",
    },
    desc: {
      en: "In the age of visual speed, your design is your first identity. We construct cohesive, luxury visual assets that capture consumer attention, build long-term trust, and transform passive viewers into loyal brand advocates.",
      ar: "في عصر السرعة البصرية، تصميمك هو هويتك الأولى. نحن نصمم أصولاً بصرية متماسكة وفاخرة تجذب انتباه المستهلك، وتبني ثقة طويلة الأجل، وتحول المشاهدين العاديين إلى داعمين مخلصين لعلامتك التجارية.",
    },
    Icon: Palette,
    offerings: [
      {
        Icon: PenTool,
        title: { en: "Visual Identity Design", ar: "تصميم الهوية البصرية" },
        desc: { en: "Engineering complete brand ecosystems including customized logos, cohesive color palettes, and distinct typography.", ar: "تطوير منظومة كاملة للعلامة التجارية تشمل شعارات مبتكرة، ألوان متناسقة، وخطوط مميزة ومخصصة." },
      },
      {
        Icon: BookOpen,
        title: { en: "Brand Guidelines", ar: "أدلة العلامة التجارية" },
        desc: { en: "Detailed visual rulebooks ensuring seamless consistency across all corporate touchpoints.", ar: "كتيب إرشادي تفصيلي يضمن تطبيق الهوية بشكل متسق عبر جميع قنوات الشركة ونقاط التواصل البصرية." },
      },
      {
        Icon: Heart,
        title: { en: "Social Media Layouts", ar: "تصاميم شبكات التواصل" },
        desc: { en: "High-engagement visual content featuring bespoke post graphics, story templates, and promotional banners.", ar: "محتوى بصري عالي التفاعل يضم قوالب منشورات، قصص، وبنرات ترويجية مخصصة لحساباتك." },
      },
      {
        Icon: Sparkles,
        title: { en: "High-Converting Ad Creatives", ar: "تصاميم إعلانية عالية التحويل" },
        desc: { en: "Intelligent graphic designs optimized specifically for paid social media campaigns to maximize return on spend.", ar: "تصاميم جرافيكية ذكية تم تحسينها خصيصاً للحملات المدفوعة لزيادة التفاعل وتحقيق أفضل عائد للميزانية." },
      },
      {
        Icon: FileText,
        title: { en: "Premium Marketing & Print Materials", ar: "مطبوعات تسويقية متميزة" },
        desc: { en: "Sophisticated physical assets including corporate brochures, flyers, posters, and luxury business cards.", ar: "تصاميم للمواد المطبوعة تشمل بروشورات الشركات، فلايرات، بوسترات، وبطاقات أعمال فاخرة." },
      },
      {
        Icon: Package,
        title: { en: "Product Packaging & Labels", ar: "تصميم العبوات والتغليف" },
        desc: { en: "High-end box designs, product packaging layouts, customized labels, and branded shopping bags.", ar: "تصاميم عبوات فاخرة، أغلفة منتجات، ملصقات مخصصة، وحقائب تسوق تحمل شعار هويتك." },
      },
    ],
    whyUs: [
      {
        title: { en: "Strategic Visual Approach", ar: "نهج بصري استراتيجي" },
        desc: { en: "Designs rooted deeply in a thorough comprehension of your specific target audience and market position.", ar: "تصاميم قائمة على فهم عميق للجمهور المستهدف وتحديد الموقع الصحيح لشركتك في السوق." },
      },
      {
        title: { en: "Absolute Brand Unity", ar: "وحدة العلامة التجارية المطلقة" },
        desc: { en: "Ensuring your brand looks flawlessly professional and identical across both digital and physical platforms.", ar: "نضمن أن تبدو هويتك متناسقة واحترافية ومطابقة تماماً على جميع المنصات الرقمية والمطبوعة." },
      },
      {
        title: { en: "Uncompromising Detail", ar: "تفاصيل لا تقبل المساومة" },
        desc: { en: "Rigorous technical execution prioritizing pixel-perfect output for both scaling startups and global brands.", ar: "تنفيذ تقني دقيق وصارم يركز على المخرجات المثالية المناسبة للشركات الناشئة والعلامات التجارية العالمية." },
      },
      {
        title: { en: "Conversion-Driven Impact", ar: "تأثير يحفز التحويل" },
        desc: { en: "Crafting visually striking, data-backed marketing creatives engineered to amplify user engagement and drive measurable business results.", ar: "صياغة تصاميم تسويقية جذابة وبصرية مدعومة بالبيانات لزيادة التفاعل وتحقيق نتائج ملموسة." },
      },
    ],
  },
  s2: {
    title: {
      en: "Professional UI/UX Design Services",
      ar: "تصميم تجربة المستخدم وواجهات الاستخدام الاحترافية",
    },
    desc: {
      en: "More than 88% of users leave a website or mobile application after just one poor experience. At Tmooh, we design user experiences and interfaces that balance elite performance, aesthetics, and usability to achieve superior engagement, higher retention, and maximum conversion rates.",
      ar: "يغادر أكثر من 88٪ من المستخدمين موقع الويب أو تطبيق الجوال بعد تجربة واحدة سيئة. في طموح، نحن نصمم تجارب وواجهات مستخدم توازن بين الأداء المتميز والجمال وسهولة الاستخدام لتحقيق تفاعل متفوق واحتفاظ أعلى بالعملاء وأقصى معدلات تحويل.",
    },
    Icon: Layers,
    offerings: [
      {
        Icon: Search,
        title: { en: "UX Research & Analysis", ar: "أبحاث وتحليلات تجربة المستخدم" },
        desc: { en: "Comprehensive study of user journeys and behavior patterns to optimize navigation and build seamless user flows.", ar: "دراسة شاملة لرحلات المستخدمين وأنماط سلوكهم لتحسين التصفح وبناء تدفقات مستخدم سلسة." },
      },
      {
        Icon: FileText,
        title: { en: "Structural Wireframes", ar: "مخططات هيكلية" },
        desc: { en: "Clear architectural blueprints of your product interface designed before entering the visual production phase.", ar: "مخططات معمارية واضحة لواجهة منتجك الرقمي يتم تصميمها ودراستها بعناية قبل الدخول في مرحلة الإنتاج البصري." },
      },
      {
        Icon: Monitor,
        title: { en: "Professional UI Design", ar: "تصميم واجهات احترافي" },
        desc: { en: "Modern, clean, and interactive visual screens custom-optimized for all digital platforms.", ar: "شاشات بصرية تفاعلية وحديثة ونظيفة ومخصصة ومحسنة للعمل على جميع المنصات والأجهزة الرقمية." },
      },
      {
        Icon: Sparkles,
        title: { en: "Interactive Prototyping", ar: "نماذج أولية تفاعلية" },
        desc: { en: "Realistic simulations of the final product experience to validate usability and flow prior to development.", ar: "محاكاة واقعية لتجربة المنتج النهائي للتحقق من سهولة الاستخدام وتدفقات العمل قبل بدء مرحلة التطوير." },
      },
      {
        Icon: Layers,
        title: { en: "Well-Structured Figma Files", ar: "ملفات Figma منظمة" },
        desc: { en: "Highly organized source files utilizing a meticulous layers system for flawless developer handoff.", ar: "ملفات مصدر مرتبة ومجهزة بدقة تسهم في تسليم سلس وخالٍ من التعقيدات لفريق المطورين." },
      },
      {
        Icon: LifeBuoy,
        title: { en: "Post-Delivery Developer Support", ar: "دعم المطورين بعد التسليم" },
        desc: { en: "Continued technical consultation during implementation to ensure 100% design accuracy.", ar: "استشارات فنية مستمرة ومتابعة أثناء مرحلة التطوير لضمان دقة التطبيق ومطابقته للتصميم بنسبة 100٪." },
      },
    ],
    whyUs: [
      {
        title: { en: "Scalable Design Systems", ar: "أنظمة تصميم قابلة للتوسع" },
        desc: { en: "Meticulously documented, consistent design systems built to adapt and grow alongside your evolving product.", ar: "أنظمة تصميم متسقة وموثقة بدقة مبنية لتتكيف وتنمو جنبًا إلى جنب مع تطور منتجك الرقمي وتوسعه." },
      },
      {
        title: { en: "Developer-Friendly Handoff", ar: "تسليم صديق للمطورين" },
        desc: { en: "Clean Figma files categorized for effortless engineering translation and accelerated production.", ar: "ملفات Figma نظيفة ومنظمة تسهم في تسريع الإنتاج البرمجي وتسهل على المهندسين قراءة تفاصيل التصميم بدقة." },
      },
      {
        title: { en: "Data-Backed Decisions", ar: "قرارات مدعومة بالبيانات" },
        desc: { en: "All interface layouts are rooted in deep user behavior analysis and journey research.", ar: "جميع تصاميم الواجهات مبنية على دراسة عميقة لسلوك المستخدمين الفعلي وأبحاث الرحلات الرقمية وسيكولوجية الاستخدام." },
      },
      {
        title: { en: "Interactive Validation", ar: "التحقق التفاعلي" },
        desc: { en: "High-fidelity, clickable prototypes engineered to simulate and validate live product flows before entering the development phase.", ar: "نماذج أولية تفاعلية وقابلة للنقر مصممة لمحاكاة واختبار تدفقات المنتج قبل البدء في كتابة الكود البرمجي." },
      },
    ],
  },
  s5: {
    title: {
      en: "Data-Driven Digital Marketing & SEO Services",
      ar: "التسويق الرقمي وتحسين محركات البحث",
    },
    desc: {
      en: "Every successful brand starts as an idea, but smart marketing is what truly makes the difference. We build data-driven marketing strategies based on thorough market analysis, meticulous audience targeting, and performance optimization to maximize your reach, engagement, and conversion rates.",
      ar: "تبدأ كل علامة تجارية ناجحة كفكرة، ولكن التسويق الذكي هو ما يصنع الفارق الحقيقي. نحن نبني استراتيجيات تسويق مدفوعة بالبيانات بناءً على تحليل شامل للسوق، واستهداف دقيق للجمهور، وتحسين الأداء لزيادة الوصول والتفاعل ومعدلات التحويل.",
    },
    Icon: Megaphone,
    offerings: [
      {
        Icon: Users,
        title: { en: "Social Media Management", ar: "إدارة وسائل التواصل الاجتماعي" },
        desc: { en: "Professional and strategic administration of social media profiles to amplify audience engagement.", ar: "إدارة احترافية واستراتيجية للحسابات الاجتماعية لزيادة التفاعل وبناء الجمهور المستهدف لعلامتك." },
      },
      {
        Icon: Target,
        title: { en: "Paid Advertising Campaigns", ar: "حملات إعلانية مدفوعة" },
        desc: { en: "High-ROI targeted campaign execution across Meta Ads, Google Ads, and TikTok Ads.", ar: "تنفيذ وإدارة حملات إعلانية مستهدفة ذات عائد استثماري مرتفع على منصات Meta و Google و TikTok." },
      },
      {
        Icon: Search,
        title: { en: "Search Engine Optimization (SEO)", ar: "تحسين محركات البحث (SEO)" },
        desc: { en: "Advanced optimization setups engineered to elevate organic search engine visibility and keyword rankings.", ar: "إعدادات تحسين متقدمة مصممة لرفع ظهور موقعك في نتائج البحث وجذب زيارات مجانية مستهدفة." },
      },
      {
        Icon: FileText,
        title: { en: "Content Marketing & Copywriting", ar: "التسويق بالمحتوى والكتابة الإعلانية" },
        desc: { en: "High-impact, persuasive ad copy and marketing texts focused on consumer psychology.", ar: "نصوص تسويقية وإعلانية مقنعة وجذابة ذات أثر قوي تعتمد على سيكولوجية المستهلك والجمهور." },
      },
      {
        Icon: Share2,
        title: { en: "Advanced Retargeting Campaigns", ar: "حملات إعادة استهداف متقدمة" },
        desc: { en: "Strategic audience remarketing funnels engineered to recapture traffic and accelerate sales.", ar: "قنوات تسويقية ذكية ومخصصة لإعادة استهداف زوار موقعك لزيادة التحويلات والمبيعات المتكررة." },
      },
      {
        Icon: PieChart,
        title: { en: "Analytics & Conversion Optimization", ar: "التحليلات وتحسين معدل التحويل" },
        desc: { en: "Full integration of Google Analytics and Meta Pixel for detailed performance tracking and CRO.", ar: "دمج كامل لأدوات التتبع مثل Google Analytics و Meta Pixel لتحليل دقيق وتطوير الأداء الرقمي للتحويل." },
      },
    ],
    whyUs: [
      {
        title: { en: "Measurable Results", ar: "نتائج قابلة للقياس" },
        desc: { en: "Marketing frameworks built entirely on empirical data and concrete business analytics.", ar: "خطط وأطر تسويقية مبنية بالكامل على البيانات الواقعية والتحليلات الدقيقة للأعمال لتتبع الأثر المالي." },
      },
      {
        title: { en: "Continuous ROI Optimization", ar: "تحسين مستمر للعائد على الاستثمار" },
        desc: { en: "Constant tracking and live campaign adjustments to ensure maximum profitability and reach.", ar: "متابعة وتعديل مستمر للحملات لضمان تحقيق أقصى وصول وأكبر ربحية ممكنة بأفضل ميزانية." },
      },
      {
        title: { en: "Audience Precision", ar: "استهداف فائق الدقة" },
        desc: { en: "Highly targeted strategies engineered to place your value proposition directly in front of the ideal demographic.", ar: "استراتيجيات محددة ومدروسة لوضع خدماتك ومنتجاتك أمام جمهورك المستهدف الفعلي بدقة تامة." },
      },
      {
        title: { en: "Omnichannel Funnel Scaling", ar: "توسيع القنوات المتعددة المتكاملة" },
        desc: { en: "Engineering cohesive multi-platform campaigns across Meta, Google, and TikTok to systematically turn traffic into loyal customers.", ar: "تطوير حملات متماسكة عبر مختلف المنصات لتحويل الزوار إلى عملاء دائمين مخلصين للعلامة التجارية." },
      },
    ],
  },
};

function ServiceDetailsPage() {
  const { serviceId } = useParams({ from: "/services/$serviceId" });
  const { lang } = useI18n();

  const service = SERVICE_DATA[serviceId];
  const isArabic = lang === "ar";

  if (!service) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
        <Header />
        <main className="pt-32 pb-24 text-center">
          <h1 className="text-3xl font-bold">Service Not Found</h1>
          <p className="mt-4 text-muted-foreground">The service you are looking for does not exist.</p>
          <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Services
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const ServiceIcon = service.Icon;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Header />
      
      <main className="pt-32 pb-24 space-y-24">
        {/* Back Link */}
        <div className="container mx-auto max-w-6xl px-6">
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
            {isArabic ? "العودة للخدمات" : "Back to Services"}
          </Link>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto max-w-6xl px-6 text-center relative">
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-[250px] w-[250px] rounded-full bg-primary/10 blur-[100px]" />
          </div>
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
            <ServiceIcon className="h-8 w-8" />
          </div>
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl md:text-6xl text-gradient">
            {isArabic ? service.title.ar : service.title.en}
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed" dir="auto">
            {isArabic ? service.desc.ar : service.desc.en}
          </p>
        </section>

        {/* Offerings Grid */}
        <section className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow">
              {isArabic ? "ما نقدمه في هذه الخدمة" : "Key Offerings"}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl text-gradient">
              {isArabic ? "مزايا وتفاصيل الخدمة" : "Service Capabilities"}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.offerings.map((offering, i) => {
              const OffIcon = offering.Icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/5 bg-card/40 p-6 shadow-card hover:border-primary/20 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-card border border-white/10 text-primary-glow shadow-sm group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300">
                    <OffIcon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2" dir="auto">
                    {isArabic ? offering.title.ar : offering.title.en}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground" dir="auto">
                    {isArabic ? offering.desc.ar : offering.desc.en}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="container mx-auto max-w-6xl px-6 relative">
          <div className="absolute inset-x-0 bottom-0 -z-10 flex items-center justify-center">
            <div className="h-[250px] w-[250px] rounded-full bg-primary/10 blur-[100px]" />
          </div>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow">
              {isArabic ? "لماذا طموح؟" : "Why Choose Us"}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl text-gradient">
              {isArabic ? "لماذا تختار طموح لهذه الخدمة؟" : "Why Choose Tmooh?"}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {service.whyUs.map((why, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex gap-5 rounded-3xl border border-white/5 bg-card/20 p-6 hover:border-white/10 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground shadow-glow">
                    {i + 1}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground" dir="auto">
                    {isArabic ? why.title.ar : why.title.en}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground" dir="auto">
                    {isArabic ? why.desc.ar : why.desc.en}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA section for consultation */}
        <section className="container mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-card/40 to-card/10 p-8 sm:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              {isArabic ? "هل أنت مستعد لبدء مشروعك؟" : "Ready to Build Your Next Digital Solution"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground">
              {isArabic 
                ? "دعنا نناقش فكرتك ونعطيك خارطة طريق فنية مجانية لحلول برمجية قابلة للتوسع." 
                : "Let’s discuss your project and get a free technical roadmap for scalable, high-performance solutions."}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-[1.02] active:scale-[0.98] transition duration-200"
              >
                <Calendar className="h-4 w-4" />
                {isArabic ? "احجز استشارتك المجانية" : "Book Free Consultation"}
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-foreground hover:bg-white/10 hover:border-white/20 active:scale-[0.98] transition duration-200"
              >
                <MessageSquare className="h-4 w-4" />
                {isArabic ? "تواصل معنا" : "Contact Us"}
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
