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
  ArrowLeft,
  CheckCircle2,
  Calendar,
  MessageSquare
} from "lucide-react";

export const Route = createFileRoute("/services/$serviceId")({
  head: ({ params }) => {
    // Basic meta tags for dynamic service route
    const serviceTitles: Record<string, string> = {
      s1: "Custom Mobile App Development Services | Tmooh",
      s2: "Professional UI/UX Design Services | Tmooh",
      s3: "AI Solutions & Business Automation Services | Tmooh",
      s4: "Custom Web Development Services | Tmooh",
      s5: "Digital Marketing & SEO Services | Tmooh",
    };
    return {
      meta: [
        { title: serviceTitles[params.serviceId] || "Service Details | Tmooh" },
        { name: "description", content: "Learn more about our premium digital solutions and services tailored to scale your business." }
      ]
    };
  },
  component: ServiceDetailsPage,
});

const serviceIcons: Record<string, any> = {
  s1: Smartphone,
  s2: Layers,
  s3: Cpu,
  s4: Code2,
  s5: Megaphone,
};

function ServiceDetailsPage() {
  const { serviceId } = useParams({ from: "/services/$serviceId" });
  const { t, lang } = useI18n();

  const Icon = serviceIcons[serviceId] || Code2;
  const isArabic = lang === "ar";

  const benefits: Record<string, string[]> = {
    s1: isArabic 
      ? ["تطبيقات iOS و Android أصلية عالية الأداء", "تطوير تطبيقات متعددة المنصات باستخدام Flutter", "تصاميم واجهات مستخدم مخصصة وسلسة للهواتف", "دعم كامل للنشر والإطلاق على متاجر التطبيقات"]
      : ["High-performance native iOS & Android apps", "Cross-platform development using Flutter", "Custom fluid UI/UX designs for mobile devices", "End-to-end support for app-store launch"],
    s2: isArabic
      ? ["واجهات بديهية متمحورة حول المستخدم وسهلة التصفح", "نماذج أولية تفاعلية وعالية الدقة قبل التطوير", "أبحاث شاملة للمستخدمين وسلوك الجمهور المستهدف", "تصاميم دقيقة ومطابقة لهوية علامتك التجارية"]
      : ["Intuitive, user-centered & easy to navigate interfaces", "High-fidelity interactive prototypes before coding", "Comprehensive user research & audience behavior analysis", "Pixel-perfect designs aligned with your brand identity"],
    s3: isArabic
      ? ["بناء روبوتات دردشة ذكية مخصصة وتكاملات LLM", "أتمتة العمليات التشغيلية المعقدة لتقليل التكاليف", "تحليلات متقدمة ورؤى ذكية مبنية على البيانات", "حلول متكاملة ترفع كفاءة وإنتاجية فريق العمل"]
      : ["Custom intelligent chatbots & LLM integrations", "Complex business process automation to cut costs", "Advanced analytics & smart data-driven insights", "Integrated solutions that boost team productivity"],
    s4: isArabic
      ? ["مواقع ويب سريعة جداً، آمنة، ومتجاوبة بالكامل", "تطوير منصات تجارة إلكترونية وتطبيقات ويب مخصصة", "بنية برمجية نظيفة ومهيأة بالكامل لمحركات البحث", "بنى تقنية قابلة للتوسع اللامحدود مع نمو أعمالك"]
      : ["Ultra-fast, secure, and fully responsive websites", "Custom e-commerce platforms & complex web applications", "Clean, SEO-optimized codebase built for speed", "Scalable web architectures prepared for future growth"],
    s5: isArabic
      ? ["تحسين محركات البحث (SEO) لتصدر نتائج البحث الأولى", "إدارة حملات إعلانية مدفوعة ومستهدفة بدقة (PPC)", "تسويق استراتيجي مبني على تحليل البيانات وسلوك المستخدم", "زيادة معدلات التحويل (CRO) وتنمية المبيعات الرقمية"]
      : ["Strategic SEO to dominate top search engine results", "Targeted & high-ROI PPC ad campaigns", "Data-driven marketing aligned with user behavior", "Conversion Rate Optimization (CRO) to maximize sales"],
  };

  const currentBenefits = benefits[serviceId] || [];

  // If invalid serviceId, show empty/not found state
  if (!benefits[serviceId]) {
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

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Header />
      
      <main className="pt-32 pb-24">
        {/* Back Link */}
        <div className="container mx-auto max-w-5xl px-6 mb-8">
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {isArabic ? "العودة للخدمات" : "Back to Services"}
          </Link>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto max-w-5xl px-6 grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
              <Icon className="h-7 w-7" />
            </div>
            <h1 className="font-display text-3xl font-extrabold sm:text-5xl text-gradient">
              {t(`services.${serviceId}.title`)}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t(`services.${serviceId}.desc`)}
            </p>
          </div>

          <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-card/30 backdrop-blur-md p-8 shadow-card relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <h3 className="font-display text-xl font-bold text-foreground mb-6">
              {isArabic ? "ما نقدمه في هذه الخدمة" : "Key Offerings"}
            </h3>
            <ul className="space-y-4">
              {currentBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-foreground/90">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary-glow mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA section for consultation */}
        <section className="container mx-auto max-w-5xl px-6 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-card/40 to-card/10 p-8 sm:p-12 text-center relative overflow-hidden"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              {isArabic ? "هل أنت مستعد لبدء مشروعك؟" : "Ready to Build Your Next Digital Solution"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground">
              {isArabic 
                ? "دعنا نناقش فكرتك ونصنع حلولاً برمجية مخصصة وقابلة للتوسع لتلبية احتياجات عملك." 
                : "Let’s discuss your project and create scalable solutions tailored to your business needs."}
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
