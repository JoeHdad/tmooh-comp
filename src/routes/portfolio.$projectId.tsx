import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Tag, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import heroMockup from "@/assets/hero-mockup.png";

export const Route = createFileRoute("/portfolio/$projectId")({
  component: ProjectDetailPage,
});

type SupabaseProject = {
  id: string;
  title: string;
  description: string | null;
  description_ar: string | null;
  image_url: string | null;
  link_url: string | null;
  category: string | null;
  published: boolean;
  industry: string | null;
  industry_ar: string | null;
  services: string | null;
  services_ar: string | null;
  platform: string | null;
  platform_ar: string | null;
  role: string | null;
  role_ar: string | null;
  challenge: string | null;
  challenge_ar: string | null;
  solution: string | null;
  solution_ar: string | null;
  approach?: string | null;
  approach_ar?: string | null;
  highlights_en_json: string | null;
  highlights_ar_json: string | null;
  scope_en_csv?: string | null;
  scope_ar_csv?: string | null;
  scope: string[] | null;
  scope_ar: string[] | null;
  gallery: string[] | null;
};

type ProjectDetails = {
  titleEn: string;
  titleAr: string;
  taglineEn: string;
  taglineAr: string;
  industryEn: string;
  industryAr: string;
  servicesEn: string;
  servicesAr: string;
  platformEn: string;
  platformAr: string;
  roleEn: string;
  roleAr: string;
  challengeEn: string;
  challengeAr: string;
  approachEn: string;
  approachAr: string;
  highlightsEn: { title: string; desc: string }[];
  highlightsAr: { title: string; desc: string }[];
  scopeEn: string[];
  scopeAr: string[];
  linkUrl: string;
};

// Bilingual dictionary containing premium details for each fallback project id
const PROJECTS_DATA: Record<string, ProjectDetails> = {
  f1: {
    titleEn: "ShopVibe E-Commerce",
    titleAr: "شوب فايب للتجارة الإلكترونية",
    taglineEn: "A High-Performance Digital Commerce Experience Designed to Scale Sales.",
    taglineAr: "تجربة تسوق رقمية عالية الأداء مصممة لزيادة المبيعات وتبسيط العمليات.",
    industryEn: "Retail & E-Commerce",
    industryAr: "التجزئة والتجارة الإلكترونية",
    servicesEn: "Custom Web Dev, UI/UX Design, Payment Integrations",
    servicesAr: "تطوير ويب مخصص، تصميم واجهات، ربط بوابات الدفع",
    platformEn: "Web Application",
    platformAr: "تطبيق ويب متكامل",
    roleEn: "Full-Stack Engineering",
    roleAr: "هندسة برمجية متكاملة",
    challengeEn: "The client needed a fast, scalable e-commerce store capable of handling thousands of concurrent users during flash sales, with zero downtime and instant checkout transitions.",
    challengeAr: "احتاج العميل متجراً إلكترونياً سريعاً وقابلاً للتوسع للتعامل مع آلاف الزوار المتزامنين أثناء فترة العروض الضخمة، مع سرعة تصفح فائقة وتجربة دفع فورية.",
    approachEn: "We built a modern web app using React, Next.js, and Supabase, optimizing image loading, server-side caching, and securing transactions with modern checkout flows.",
    approachAr: "قمنا ببناء منصة ويب حديثة باستخدام React و Next.js و Supabase، مع تحسين تحميل الصور والتخزين المؤقت، وتأمين عمليات الدفع باستخدام بوابات دفع متطورة.",
    highlightsEn: [
      { title: "Built for speed", desc: "Server-side rendering guarantees lightning-fast navigation and SEO friendliness." },
      { title: "Seamless checkout", desc: "Optimized multi-step flow that minimizes user friction and abandoned carts." },
      { title: "Visual elegance", desc: "A sleek, premium dark-mode presentation styled to showcase luxury apparel." },
      { title: "Vendor dashboard", desc: "Comprehensive management panel providing real-time tracking of sales and inventory." },
    ],
    highlightsAr: [
      { title: "مصمم للسرعة الفائقة", desc: "يضمن العرض المسبق من جهة الخادم سرعة تحميل لحظية وتحسين الأرشفة (SEO)." },
      { title: "دفع سلس وآمن", desc: "تدفق دفع محسن يقلل من تراجع العملاء وسلال التسوق المهجورة." },
      { title: "أناقة بصرية متميزة", desc: "مظهر داكن فاخر وجذاب صمم خصيصاً لعرض المنتجات الراقية." },
      { title: "لوحة تحكم ذكية", desc: "لوحة تحكم شاملة توفر تتبعاً فورياً للمبيعات والمخزون والعملاء." },
    ],
    scopeEn: ["UX/UI Design", "Next.js", "Supabase", "Stripe Integration", "SEO Optimization"],
    scopeAr: ["تصميم واجهات المستخدم", "Next.js", "Supabase", "ربط بوابة Stripe", "تهيئة محركات البحث"],
    linkUrl: "https://wa.me/970595172603",
  },
  f2: {
    titleEn: "Al-Noor Logistics App",
    titleAr: "تطبيق النور للخدمات اللوجستية",
    taglineEn: "Seamless Cross-Platform Fleet Management and Delivery Tracking.",
    taglineAr: "نظام إدارة الأسطول وتتبع الشحنات بسلاسة عبر الهواتف الذكية.",
    industryEn: "Logistics & Transport",
    industryAr: "الخدمات اللوجستية والنقل",
    servicesEn: "Mobile App Development, Real-Time Maps, Fleet Control",
    servicesAr: "تطوير تطبيقات الجوال، الخرائط الفورية، إدارة الأسطول",
    platformEn: "iOS & Android (Flutter)",
    platformAr: "أندرويد وآيفون (Flutter)",
    roleEn: "Mobile Lead Architect",
    roleAr: "رئيس هندسة تطبيقات الجوال",
    challengeEn: "Managing dynamic driver routing, instant tracking updates, and providing offline queue support for drivers in low-connectivity zones.",
    challengeAr: "إدارة المسارات المتغيرة للسائقين، وتحديثات التتبع الفوري للشحنات، وتوفير الدعم غير المتصل بالإنترنت في مناطق التغطية الضعيفة.",
    approachEn: "Leveraged Flutter to deliver native responsiveness, integrated Google Maps APIs for routing, and WebSockets for real-time localization updates.",
    approachAr: "استخدمنا إطار عمل Flutter لتقديم أداء ممتاز، مع ربط خرائط Google لتوجيه المسارات، و WebSockets لتحديث المواقع بشكل فوري ولحظي.",
    highlightsEn: [
      { title: "Real-time accuracy", desc: "GPS tracking updates routes instantly with less than 1-second latency." },
      { title: "Offline queues", desc: "Saves driver actions locally and syncs automatically when network returns." },
      { title: "Driver routing", desc: "Smart algorithms calculating the fastest paths to reduce fuel consumption." },
      { title: "Instant notifications", desc: "Push warnings for package delivery arrivals and ETA modifications." },
    ],
    highlightsAr: [
      { title: "دقة التتبع اللحظي", desc: "تتبع دقيق عبر نظام تحديد المواقع (GPS) يحدث المسارات في أقل من ثانية." },
      { title: "العمل بدون إنترنت", desc: "حفظ عمليات السائق محلياً ومزامنتها تلقائياً عند عودة الاتصال بالشكل المطلوب." },
      { title: "توجيه ذكي للسائقين", desc: "خوارزميات ذكية تحسب أسرع الطرق لتقليل استهلاك الوقود وزمن الرحلة." },
      { title: "إشعارات فورية", desc: "تنبيهات فورية ومباشرة للعملاء عند وصول الشحنات أو تغيير موعد التسليم." },
    ],
    scopeEn: ["Flutter App Dev", "Google Maps API", "WebSocket Integration", "Offline Sync", "Node.js Backend"],
    scopeAr: ["تطوير تطبيق Flutter", "خرائط Google API", "ربط الـ WebSocket", "المزامنة بدون إنترنت", "لوحة تحكم Node.js"],
    linkUrl: "https://wa.me/970595172603",
  },
  f3: {
    titleEn: "AI Customer Support Bot",
    titleAr: "مساعد خدمة العملاء الذكي",
    taglineEn: "Automated Enterprise Conversational AI Reducing Support Load by 60%.",
    taglineAr: "أتمتة المحادثات بالذكاء الاصطناعي للشركات لتقليل العبء بنسبة 60%.",
    industryEn: "SaaS & Enterprise",
    industryAr: "البرمجيات والمؤسسات",
    servicesEn: "AI Integration, NLP, Database Automation",
    servicesAr: "دمج الذكاء الاصطناعي، معالجة اللغات الطبيعية، أتمتة العمليات",
    platformEn: "Custom Dashboard & API",
    platformAr: "لوحة تحكم مخصصة وواجهة برمجية API",
    roleEn: "AI Specialist",
    roleAr: "أخصائي ذكاء اصطناعي",
    challengeEn: "Parsing complex user inquiries across multiple dialects and languages to automate instant resolutions without requiring human agent handoffs.",
    challengeAr: "تحليل استفسارات المستخدمين المعقدة عبر لهجات ولغات متعددة لتقديم حلول فورية دون الحاجة لتدخل خدمة العملاء البشرية.",
    approachEn: "Implemented LLMs integrated with Vector Databases for RAG, feeding on customer support documentation to solve inquiries with human-like precision.",
    approachAr: "قمنا بدمج النماذج اللغوية الكبيرة (LLMs) مع قواعد البيانات المتجهية لاسترداد المعلومات بدقة وتقديم إجابات موثوقة.",
    highlightsEn: [
      { title: "Multi-dialect NLP", desc: "Interprets conversational tones across English, Modern Standard Arabic, and dialects." },
      { title: "RAG architecture", desc: "Connects directly to your internal knowledge base to deliver accurate answers." },
      { title: "CRM integration", desc: "Logs support histories directly inside your sales pipeline databases." },
      { title: "Analytics suite", desc: "Identifies trending user questions to update documentations dynamically." },
    ],
    highlightsAr: [
      { title: "معالجة اللغات واللهجات", desc: "يفهم النبرة المحادثية للعملاء باللغة العربية الفصحى، اللهجات المحلية، والإنجليزية." },
      { title: "بنية RAG المتطورة", desc: "يرتبط مباشرة بقاعدة معرفتك الداخلية لتقديم إجابات صحيحة وموثوقة." },
      { title: "الربط مع نظام CRM", desc: "يسجل تاريخ المحادثات وتفاصيل العملاء مباشرة في قواعد بيانات المبيعات." },
      { title: "لوحة تحليلات تفصيلية", desc: "يحدد الأسئلة الشائعة لتحديث المستندات وقواعد البيانات ديناميكياً." },
    ],
    scopeEn: ["OpenAI API", "Vector Databases", "LangChain", "Python Backend", "React Dashboard"],
    scopeAr: ["واجهة OpenAI API", "قواعد البيانات المتجهية", "إطار عمل LangChain", "خلفية Python", "لوحة تحكم React"],
    linkUrl: "https://wa.me/970595172603",
  },
  f4: {
    titleEn: "StyleHub Brand & Web",
    titleAr: "ستايل هاب الهوية والموقع",
    taglineEn: "A Premium Digital Identity Rebrand to Accelerate Luxury E-Commerce.",
    taglineAr: "إعادة تصميم الهوية البصرية والموقع بالكامل لتعزيز المبيعات الفاخرة.",
    industryEn: "Fashion & Lifestyle",
    industryAr: "الأزياء وأسلوب الحياة",
    servicesEn: "Brand Strategy, Premium UI/UX, Web Design",
    servicesAr: "استراتيجية العلامة التجارية، تجربة وواجهة مستخدم فاخرة، تصميم ويب",
    platformEn: "Web & Brand Guidelines",
    platformAr: "الموقع الإلكتروني ودليل الهوية",
    roleEn: "Lead Creative Designer",
    roleAr: "رئيس التصميم الإبداعي",
    challengeEn: "Shifting the brand's perception from standard retail to a high-end luxury fashion boutique, requiring absolute visual consistency.",
    challengeAr: "تحويل انطباع العملاء عن العلامة التجارية من متجر تجزئة عادي إلى بوتيك أزياء فاخر، مما يتطلب تناسقاً بصرياً فائقاً.",
    approachEn: "We created a sleek visual layout with premium typography, high-contrast imagery grids, and custom animations that breathe elegance.",
    approachAr: "صممنا دليلاً كاملاً للهوية البصرية واستخدمنا خطوطاً فاخرة، مع شبكات صور متباينة وحركات بصرية ناعمة تبرز الفخامة والأناقة.",
    highlightsEn: [
      { title: "Cohesive brand book", desc: "A comprehensive style guide detailing premium fonts, primary palettes, and tone." },
      { title: "Micro-animations", desc: "Subtle page transitions that mimic the physical luxury boutique experience." },
      { title: "Pixel-perfect grid", desc: "Stunning product catalogs designed for high-resolution retina screens." },
      { title: "Double conversions", desc: "User research-driven layouts that led to a 100% conversion rate increase." },
    ],
    highlightsAr: [
      { title: "كتاب هوية متكامل", desc: "دليل أسلوب شامل يوضح الخطوط الفاخرة، الألوان الأساسية، ونبرة الصوت للعلامة التجارية." },
      { title: "تفاعلات وحركات ناعمة", desc: "حركات انتقالية خفيفة تحاكي تجربة زيارة معرض أزياء حقيقي فاخر." },
      { title: "شبكة عرض مثالية", desc: "كتالوجات منتجات رائعة ومحسنة تماماً للشاشات عالية الدقة (Retina)." },
      { title: "مضاعفة التحويلات", desc: "تخطيطات مبنية على دراسة سلوك المستخدم أدت لمضاعفة نسبة إتمام عمليات الشراء." },
    ],
    scopeEn: ["Brand Identity", "Figma Prototyping", "UI/UX Design", "Tailwind CSS", "Motion Graphics"],
    scopeAr: ["الهوية البصرية", "نماذج Figma التفاعلية", "تصميم واجهات المستخدم", "Tailwind CSS", "المؤثرات الحركية"],
    linkUrl: "https://wa.me/970595172603",
  },
};

// Default fallback detail values to prevent crashes if projectId is not defined above
const DEFAULT_PROJECT_DATA: ProjectDetails = {
  titleEn: "TMOOH Project",
  titleAr: "مشروع طموح الرقمي",
  taglineEn: "A Modern Digital Presence Designed To Reflect Ambition, Clarity, And Creative Execution.",
  taglineAr: "حضور رقمي حديث مصمم ليعكس الطموح، والوضوح، والتميز في التنفيذ الإبداعي.",
  industryEn: "Digital Agency",
  industryAr: "وكالة رقمية",
  servicesEn: "UX/UI Design, Web Design, Branding",
  servicesAr: "تصميم واجهة وتجربة المستخدم، تصميم الويب، الهوية البصرية",
  platformEn: "Website",
  platformAr: "موقع ويب تفاعلي",
  roleEn: "Product Design",
  roleAr: "تصميم وهندسة المنتج",
  challengeEn: "The goal was creating a modern digital presence that reflects TMOOH's identity while keeping the experience clean, bold, and startup-focused.",
  challengeAr: "كان الهدف هو خلق حضور رقمي حديث ومميز يعكس هوية طموح البرمجية مع الحفاظ على تجربة مستخدم نظيفة، جريئة، وموجهة للشركات الناشئة.",
  approachEn: "We focused on creating a minimal and visually impactful experience using strong typography, structured layouts, and a premium dark aesthetic.",
  approachAr: "ركزنا على تقديم تجربة مستخدم ذات أثر بصري مميز باستخدام خطوط قوية، تخطيطات هيكلية منظمة، وتصميمات داكنة فاخرة.",
  highlightsEn: [
    { title: "Built for clarity", desc: "A clean structure designed to keep the experience focused and distraction-free." },
    { title: "Premium visual direction", desc: "Dark aesthetics combined with subtle gradients and modern UI details." },
    { title: "Strong visual hierarchy", desc: "Typography and spacing crafted to improve readability and flow." },
    { title: "Startup-focused experience", desc: "Designed to reflect speed, ambition, and modern digital culture." },
  ],
  highlightsAr: [
    { title: "بناء يعتمد على الوضوح", desc: "بنية وتخطيطات برمجية واضحة تهدف لتركيز انتباه الزائر ومنع تشتته." },
    { title: "توجه بصري فاخر", desc: "تصميمات داكنة ممتازة مدمجة مع تدرجات لونية ناعمة وتفاصيل عصرية." },
    { title: "هيكلية بصرية قوية", desc: "تمت صياغة الخطوط والمسافات بعناية لتحسين سهولة القراءة وتدفق المحتوى." },
    { title: "تجربة موجهة للمشاريع", desc: "مصممة لتعكس السرعة، الطموح، والثقافة الرقمية الحديثة للشركات." },
  ],
  scopeEn: ["UX/UI Design", "Web Design", "Product Strategy", "Design System", "Responsive Experience", "Brand Direction", "User Experience", "Visual Identity"],
  scopeAr: ["تصميم واجهات المستخدم", "تصميم الويب", "استراتيجية المنتج", "أنظمة التصميم", "تجاوب كامل للشاشات", "توجه الهوية البصرية", "تجربة المستخدم", "الهوية الإبداعية"],
  linkUrl: "https://wa.me/970595172603",
};

export function ProjectDetailPage() {
  const { projectId } = useParams({ from: "/portfolio/$projectId" });
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  const [sbProject, setSbProject] = useState<SupabaseProject | null>(null);
  const [loading, setLoading] = useState(true);

  // Scroll to top whenever we navigate to a new project
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [projectId]);

  // Fetch from Supabase for real UUIDs (not static fallback keys like f1-f9)
  useEffect(() => {
    if (PROJECTS_DATA[projectId]) {
      // Static project — no need to fetch
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from("portfolio_projects")
      .select("id, title, description, description_ar, image_url, link_url, category, published, industry, industry_ar, services, services_ar, platform, platform_ar, role, role_ar, challenge, challenge_ar, approach, approach_ar, solution, solution_ar, highlights_en_json, highlights_ar_json, scope_en_csv, scope_ar_csv, scope, scope_ar, gallery")
      .eq("id", projectId)
      .single()
      .then(({ data }) => {
        setSbProject((data as SupabaseProject) ?? null);
        setLoading(false);
      });
  }, [projectId]);

  // ── If it's a real Supabase project, render a clean detail page ──────────
  if (!PROJECTS_DATA[projectId]) {
    if (loading) {
      return (
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main className="flex min-h-[60vh] items-center justify-center">
            <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </main>
          <Footer />
        </div>
      );
    }

    if (!sbProject) {
      return (
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
            <h1 className="text-4xl font-bold text-foreground">404</h1>
            <p className="text-muted-foreground">{isAr ? "المشروع غير موجود." : "Project not found."}</p>
            <Link to="/portfolio" className="text-primary-glow hover:underline text-sm">
              {isAr ? "← العودة للمعرض" : "← Back to Portfolio"}
            </Link>
          </main>
          <Footer />
        </div>
      );
    }

    // Dynamic Supabase content resolution with fallback
    const title = sbProject.title;
    const tagline = isAr ? (sbProject.description_ar || sbProject.description) : (sbProject.description || sbProject.description_ar);
    const industry = isAr ? (sbProject.industry_ar || sbProject.industry || "وكالة رقمية") : (sbProject.industry || sbProject.industry_ar || "Digital Agency");
    const services = isAr ? (sbProject.services_ar || sbProject.services || "تطوير ويب مخصص") : (sbProject.services || sbProject.services_ar || "Custom Web Dev");
    const platform = isAr ? (sbProject.platform_ar || sbProject.platform || "موقع ويب") : (sbProject.platform || sbProject.platform_ar || "Website");
    const role = isAr ? (sbProject.role_ar || sbProject.role || "تصميم المنتج") : (sbProject.role || sbProject.role_ar || "Product Design");
    const challenge = isAr ? (sbProject.challenge_ar || sbProject.challenge || "") : (sbProject.challenge || sbProject.challenge_ar || "");
    const approach = isAr ? (sbProject.solution_ar || sbProject.solution || sbProject.approach_ar || sbProject.approach || "") : (sbProject.solution || sbProject.solution_ar || sbProject.approach || sbProject.approach_ar || "");

    // Highlights parsing
    let highlights: { title: string; desc: string }[] = [];
    try {
      const jsonStr = isAr ? sbProject.highlights_ar_json : sbProject.highlights_en_json;
      if (jsonStr) {
        highlights = JSON.parse(jsonStr);
      }
    } catch (e) {
      console.error("Error parsing highlights:", e);
    }

    if (!highlights || highlights.length === 0) {
      // Default placeholder highlights matching mock
      highlights = isAr ? [
        { title: "بناء يعتمد على الوضوح", desc: "بنية وتخطيطات برمجية واضحة تهدف لتركيز انتباه الزائر ومنع تشتته." },
        { title: "توجه بصري فاخر", desc: "تصميمات داكنة ممتازة مدمجة مع تدرجات لونية ناعمة وتفاصيل عصرية." },
        { title: "هيكلية بصرية قوية", desc: "تمت صياغة الخطوط والمسافات بعناية لتحسين سهولة القراءة وتدفق المحتوى." },
        { title: "تجربة موجهة للمشاريع", desc: "مصممة لتعكس السرعة، الطموح، والثقافة الرقمية الحديثة للشركات." },
      ] : [
        { title: "Built for clarity", desc: "A clean structure designed to keep the experience focused and distraction-free." },
        { title: "Premium visual direction", desc: "Dark aesthetics combined with subtle gradients and modern UI details." },
        { title: "Strong visual hierarchy", desc: "Typography and spacing crafted to improve readability and flow." },
        { title: "Startup-focused experience", desc: "Designed to reflect speed, ambition, and modern digital culture." },
      ];
    }

    // Scope parsing
    let scope: string[] = [];
    const scopeArr = isAr ? sbProject.scope_ar : sbProject.scope;
    if (scopeArr && Array.isArray(scopeArr) && scopeArr.length > 0) {
      scope = scopeArr;
    } else {
      const scopeCsv = isAr ? sbProject.scope_ar_csv : sbProject.scope_en_csv;
      if (scopeCsv) {
        scope = scopeCsv.split(",").map(s => s.trim()).filter(Boolean);
      }
    }
    if (scope.length === 0) {
      scope = isAr 
        ? ["تصميم واجهات المستخدم", "تصميم الويب", "استراتيجية المنتج", "أنظمة التصميم", "تجاوب كامل للشاشات", "توجه الهوية البصرية", "تجربة المستخدم", "الهوية الإبداعية"]
        : ["UX/UI Design", "Web Design", "Product Strategy", "Design System", "Responsive Experience", "Brand Direction", "User Experience", "Visual Identity"];
    }

    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />

        <main className="pt-32 pb-20 overflow-hidden">
          {/* Title & Tagline Section */}
          <section className="container mx-auto max-w-6xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 text-xs font-semibold text-primary-glow hover:underline mb-6"
              >
                {isAr ? <ArrowRight className="h-4.5 w-4.5" /> : <ArrowLeft className="h-4.5 w-4.5" />}
                {isAr ? "العودة للمعرض" : "Back to Portfolio"}
              </Link>

              <h1 className="font-display text-4xl font-extrabold sm:text-6xl tracking-tight text-white" dir="auto">
                {title}
              </h1>
              {tagline && (
                <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg text-neutral-400 font-medium leading-relaxed" dir="auto">
                  {tagline}
                </p>
              )}
            </motion.div>
          </section>

          {/* Dynamic High-Fidelity Mockup Showcase */}
          <section className="container mx-auto max-w-5xl px-6 mt-12 sm:mt-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-3xl border border-white/10 bg-neutral-900/50 p-4 sm:p-6 shadow-glow overflow-hidden"
            >
              <img
                src={sbProject.image_url || heroMockup}
                alt={title}
                className="w-full h-auto object-cover rounded-2xl max-h-[560px]"
              />
            </motion.div>
            
            {/* Gallery Section */}
            {sbProject.gallery && sbProject.gallery.length > 0 && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {sbProject.gallery.map((imgUrl, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                    className="relative rounded-2xl border border-white/10 bg-neutral-900/50 p-2 shadow-glow overflow-hidden"
                  >
                    <img
                      src={imgUrl}
                      alt={`${title} gallery ${idx + 1}`}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Metadata info bar */}
          <section className="container mx-auto max-w-6xl px-6 mt-16 sm:mt-20">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 border-y border-white/10 py-10">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  {isAr ? "المجال" : "INDUSTRY"}
                </span>
                <p className="mt-2 text-base font-bold text-white" dir="auto">{industry}</p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  {isAr ? "الخدمات" : "SERVICES"}
                </span>
                <p className="mt-2 text-base font-bold text-white leading-snug" dir="auto">{services}</p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  {isAr ? "المنصة" : "PLATFORM"}
                </span>
                <p className="mt-2 text-base font-bold text-white" dir="auto">{platform}</p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  {isAr ? "الدور الإبداعي" : "ROLE"}
                </span>
                <p className="mt-2 text-base font-bold text-white" dir="auto">{role}</p>
              </div>
            </div>
          </section>

          {/* Challenge & Approach Sections */}
          {(challenge || approach) && (
            <section className="container mx-auto max-w-6xl px-6 mt-16 sm:mt-24">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                {challenge && (
                  <div>
                    <h2 className="font-display text-2xl font-bold tracking-wider text-white uppercase sm:text-3xl">
                      {isAr ? "التحدي التقني" : "THE CHALLENGE"}
                    </h2>
                    <p className="mt-6 text-sm sm:text-base leading-relaxed text-neutral-400" dir="auto">
                      {challenge}
                    </p>
                  </div>
                )}
                {approach && (
                  <div>
                    <h2 className="font-display text-2xl font-bold tracking-wider text-white uppercase sm:text-3xl">
                      {isAr ? "رؤيتنا ومنهجنا" : "OUR APPROACH"}
                    </h2>
                    <p className="mt-6 text-sm sm:text-base leading-relaxed text-neutral-400" dir="auto">
                      {approach}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Product Highlights */}
          <section className="container mx-auto max-w-6xl px-6 mt-20 sm:mt-32">
            <div className="border-t border-white/5 pt-16">
              <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                {isAr ? "أبرز مميزات المنتج" : "Product Highlights"}
              </h2>
              <p className="mt-2 text-sm text-neutral-400">
                {isAr ? "بنيت بوضوح وتناسق وتفكير برمجى متقدم." : "Built with clarity, consistency, and modern product thinking."}
              </p>

              <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
                {highlights.map((h, i) => (
                  <div key={i} className="space-y-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2" dir="auto">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-glow" />
                      {h.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-400" dir="auto">
                      {h.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Scope of Work */}
          <section className="container mx-auto max-w-6xl px-6 mt-20 sm:mt-32">
            <div className="border-t border-white/5 pt-16">
              <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                {isAr ? "نطاق العمل" : "Scope of Work"}
              </h2>
              <p className="mt-2 text-sm text-neutral-400">
                {isAr ? "تجربة رقمية كاملة مصممة من الاستراتيجية إلى التنفيذ الفعلي." : "A complete digital experience crafted from strategy to execution."}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {scope.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-white/10 bg-neutral-900 px-5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-300 hover:border-primary/45 transition-colors"
                    dir="auto"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Centered Explore Project Button */}
          {sbProject.link_url && (
            <section className="container mx-auto max-w-6xl px-6 mt-20 text-center">
              <a
                href={sbProject.link_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-8 py-3.5 text-sm font-bold text-black shadow-glow hover:bg-neutral-100 hover:scale-105 active:scale-95 transition duration-200"
              >
                {isAr ? "اضغط هنا لاستكشاف المشروع" : "Click here to Explore The Project"}
                <ExternalLink className="h-4 w-4" />
              </a>
            </section>
          )}

          {/* Bottom Call-To-Action Banner */}
          <section className="container mx-auto max-w-5xl px-6 mt-28">
            <div className="relative rounded-3xl border border-primary/20 bg-gradient-to-r from-violet-950/45 to-indigo-950/45 p-10 sm:p-16 text-center shadow-card overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              
              <h2 className="font-display text-2xl font-extrabold sm:text-4xl text-white">
                {isAr ? "منتجك القادم يبدأ هنا" : "Your next product starts here"}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {isAr
                  ? "من الفكرة حتى الإطلاق — نساعد الشركات الناشئة والشركات القائمة على بناء وتصميم منتجات رقمية مبهرة."
                  : "From idea to launch — we help startups build products people actually want to use."}
              </p>

              <div className="mt-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black hover:bg-neutral-100 hover:scale-105 active:scale-95 transition duration-200"
                >
                  {isAr ? "ابنِ معنا" : "Build With Us"}
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  // ── Static demo project (f1–f4) ───────────────────────────────────────────
  const data = PROJECTS_DATA[projectId] || DEFAULT_PROJECT_DATA;

  const title = isAr ? data.titleAr : data.titleEn;
  const tagline = isAr ? data.taglineAr : data.taglineEn;
  const industry = isAr ? data.industryAr : data.industryEn;
  const services = isAr ? data.servicesAr : data.servicesEn;
  const platform = isAr ? data.platformAr : data.platformEn;
  const role = isAr ? data.roleAr : data.roleEn;
  const challenge = isAr ? data.challengeAr : data.challengeEn;
  const approach = isAr ? data.approachAr : data.approachEn;
  const highlights = isAr ? data.highlightsAr : data.highlightsEn;
  const scope = isAr ? data.scopeAr : data.scopeEn;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-32 pb-20 overflow-hidden">
        {/* Title & Tagline Section */}
        <section className="container mx-auto max-w-6xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-xs font-semibold text-primary-glow hover:underline mb-6"
            >
              {isAr ? <ArrowRight className="h-4.5 w-4.5" /> : <ArrowLeft className="h-4.5 w-4.5" />}
              {isAr ? "العودة للمعرض" : "Back to Portfolio"}
            </Link>

            <h1 className="font-display text-4xl font-extrabold sm:text-6xl tracking-tight text-white">
              {title}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg text-neutral-400 font-medium leading-relaxed">
              {tagline}
            </p>
          </motion.div>
        </section>

        {/* Dynamic High-Fidelity Mockup Showcase */}
        <section className="container mx-auto max-w-5xl px-6 mt-12 sm:mt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-3xl border border-white/10 bg-neutral-900/50 p-4 sm:p-6 shadow-glow overflow-hidden"
          >
            <img
              src={heroMockup}
              alt={title}
              className="w-full h-auto object-cover rounded-2xl"
            />
          </motion.div>
        </section>

        {/* Metadata info bar */}
        <section className="container mx-auto max-w-6xl px-6 mt-16 sm:mt-20">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 border-y border-white/10 py-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                {isAr ? "المجال" : "INDUSTRY"}
              </span>
              <p className="mt-2 text-base font-bold text-white">{industry}</p>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                {isAr ? "الخدمات" : "SERVICES"}
              </span>
              <p className="mt-2 text-base font-bold text-white leading-snug">{services}</p>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                {isAr ? "المنصة" : "PLATFORM"}
              </span>
              <p className="mt-2 text-base font-bold text-white">{platform}</p>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                {isAr ? "الدور الإبداعي" : "ROLE"}
              </span>
              <p className="mt-2 text-base font-bold text-white">{role}</p>
            </div>
          </div>
        </section>

        {/* Challenge & Approach Sections */}
        <section className="container mx-auto max-w-6xl px-6 mt-16 sm:mt-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-wider text-white uppercase sm:text-3xl">
                {isAr ? "التحدي التقني" : "THE CHALLENGE"}
              </h2>
              <p className="mt-6 text-sm sm:text-base leading-relaxed text-neutral-400" dir="auto">
                {challenge}
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold tracking-wider text-white uppercase sm:text-3xl">
                {isAr ? "رؤيتنا ومنهجنا" : "OUR APPROACH"}
              </h2>
              <p className="mt-6 text-sm sm:text-base leading-relaxed text-neutral-400" dir="auto">
                {approach}
              </p>
            </div>
          </div>
        </section>

        {/* Product Highlights */}
        <section className="container mx-auto max-w-6xl px-6 mt-20 sm:mt-32">
          <div className="border-t border-white/5 pt-16">
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              {isAr ? "أبرز مميزات المنتج" : "Product Highlights"}
            </h2>
            <p className="mt-2 text-sm text-neutral-400">
              {isAr ? "بنيت بوضوح وتناسق وتفكير برمجى متقدم." : "Built with clarity, consistency, and modern product thinking."}
            </p>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {highlights.map((h, i) => (
                <div key={i} className="space-y-3">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-glow" />
                    {h.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-400">
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scope of Work */}
        <section className="container mx-auto max-w-6xl px-6 mt-20 sm:mt-32">
          <div className="border-t border-white/5 pt-16">
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              {isAr ? "نطاق العمل" : "Scope of Work"}
            </h2>
            <p className="mt-2 text-sm text-neutral-400">
              {isAr ? "تجربة رقمية كاملة مصممة من الاستراتيجية إلى التنفيذ الفعلي." : "A complete digital experience crafted from strategy to execution."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {scope.map((tag, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/10 bg-neutral-900 px-5 py-2.5 text-xs sm:text-sm font-semibold text-neutral-300 hover:border-primary/45 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Centered Explore Project Button */}
        <section className="container mx-auto max-w-6xl px-6 mt-20 text-center">
          <a
            href={data.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-8 py-3.5 text-sm font-bold text-black shadow-glow hover:bg-neutral-100 hover:scale-105 active:scale-95 transition duration-200"
          >
            {isAr ? "اضغط هنا لاستكشاف المشروع" : "Click here to Explore The Project"}
            <ExternalLink className="h-4 w-4" />
          </a>
        </section>

        {/* Bottom Call-To-Action Banner */}
        <section className="container mx-auto max-w-5xl px-6 mt-28">
          <div className="relative rounded-3xl border border-primary/20 bg-gradient-to-r from-violet-950/45 to-indigo-950/45 p-10 sm:p-16 text-center shadow-card overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            <h2 className="font-display text-2xl font-extrabold sm:text-4xl text-white">
              {isAr ? "منتجك القادم يبدأ هنا" : "Your next product starts here"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-sm text-neutral-400 leading-relaxed">
              {isAr
                ? "من الفكرة حتى الإطلاق — نساعد الشركات الناشئة والشركات القائمة على بناء وتصميم منتجات رقمية مبهرة."
                : "From idea to launch — we help startups build products people actually want to use."}
            </p>

            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black hover:bg-neutral-100 hover:scale-105 active:scale-95 transition duration-200"
              >
                {isAr ? "ابنِ معنا" : "Build With Us"}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
