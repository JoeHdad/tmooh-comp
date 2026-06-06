import { useI18n } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowUpRight,
  Smartphone,
  Globe,
  Cpu,
  Megaphone,
  Layers,
  ArrowRight,
  Calendar,
  Star,
  Quote,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

/* ─── Types ─────────────────────────────────────────── */
type Project = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  link_url: string | null;
  category?: string | null;
};

type Category = {
  key: string;
  labelEn: string;
  labelAr: string;
  Icon: React.ElementType;
};

/* ─── Category config ────────────────────────────────── */
const CATEGORIES: Category[] = [
  { key: "all",        labelEn: "All Projects",       labelAr: "جميع المشاريع",     Icon: Layers },
  { key: "web",        labelEn: "Web Development",    labelAr: "تطوير المواقع",     Icon: Globe },
  { key: "mobile",     labelEn: "Mobile Apps",        labelAr: "تطبيقات الجوال",   Icon: Smartphone },
  { key: "ai",         labelEn: "AI & Automation",    labelAr: "الذكاء الاصطناعي", Icon: Cpu },
  { key: "design",     labelEn: "UI/UX Design",       labelAr: "تصميم واجهات",     Icon: Layers },
  { key: "marketing",  labelEn: "Digital Marketing",  labelAr: "التسويق الرقمي",   Icon: Megaphone },
];

/* ─── Fallback projects ─────────────────────────────── */
const FALLBACK_PROJECTS: Project[] = [
  { id: "f1", title: "E-Commerce Platform",      description: "Full-stack online store with payment integration, inventory management and real-time analytics.",       image_url: null, link_url: null, category: "web" },
  { id: "f2", title: "Logistics Mobile App",     description: "Cross-platform Flutter app for Al-Noor Logistics with 25K+ active users. Delivered ahead of schedule.", image_url: null, link_url: null, category: "mobile" },
  { id: "f3", title: "AI Customer Service Bot",  description: "Intelligent chatbot integrated with CRM reducing support load by 60% and boosting response speed.",     image_url: null, link_url: null, category: "ai" },
  { id: "f4", title: "StyleHub Brand & Web",     description: "Complete rebrand and responsive website redesign that doubled sales within 6 months of launch.",         image_url: null, link_url: null, category: "design" },
  { id: "f5", title: "Real Estate Portal",       description: "Property listing platform with advanced search, virtual tours and CRM for a leading real estate firm.",   image_url: null, link_url: null, category: "web" },
  { id: "f6", title: "SEO & Lead Generation",    description: "Data-driven SEO strategy and PPC campaigns that tripled qualified leads for a B2B client in 3 months.",   image_url: null, link_url: null, category: "marketing" },
  { id: "f7", title: "Healthcare Dashboard",     description: "Secure patient management system and analytics dashboard built to HIPAA standards for a regional clinic.", image_url: null, link_url: null, category: "web" },
  { id: "f8", title: "Fitness Tracking App",     description: "Native iOS & Android fitness app with AI-powered workout plans, nutrition tracking and social features.",   image_url: null, link_url: null, category: "mobile" },
  { id: "f9", title: "Social Media Growth",      description: "360° social media strategy driving 3x follower growth and 40% increase in engagement for a retail brand.", image_url: null, link_url: null, category: "marketing" },
];

/* ─── Category color map ─────────────────────────────── */
const CAT_COLORS: Record<string, string> = {
  web:       "from-blue-500/20 to-blue-600/5",
  mobile:    "from-violet-500/20 to-violet-600/5",
  ai:        "from-cyan-500/20 to-cyan-600/5",
  design:    "from-pink-500/20 to-pink-600/5",
  marketing: "from-orange-500/20 to-orange-600/5",
  default:   "from-primary/20 to-primary/5",
};

/* ─── Testimonials data ─────────────────────────────── */
const TESTI_KEYS = ["1", "2", "3"];

/* ─────────────────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────────────────── */
export function PortfolioPage() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  const [projects, setProjects] = useState<Project[] | null>(null);
  const [active, setActive] = useState("all");

  useEffect(() => {
    supabase
      .from("portfolio_projects")
      .select("id,title,description,image_url,link_url,category")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => setProjects((data as Project[]) ?? []));
  }, []);

  const allProjects = projects && projects.length > 0 ? projects : FALLBACK_PROJECTS;

  const filtered =
    active === "all"
      ? allProjects
      : allProjects.filter((p) => p.category === active);

  const testimonials = TESTI_KEYS.map((k) => ({
    id: k,
    name:    t(`testi.${k}.name`),
    role:    t(`testi.${k}.role`),
    content: t(`testi.${k}.body`),
  }));

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* bg blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="container mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow"
          >
            {isAr ? "معرض أعمالنا" : "Our Work"}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 font-display text-4xl font-extrabold sm:text-6xl text-gradient"
          >
            {isAr ? "معرض الأعمال" : "Our Portfolio"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed"
            dir="auto"
          >
            {isAr
              ? "أنجزنا أكثر من 100 مشروع في مجالات تطوير المواقع، تطبيقات الجوال، حلول الذكاء الاصطناعي، تصميم الواجهات، والتسويق الرقمي. من الشركات الناشئة إلى الشركات الكبرى، ساعدنا أكثر من 60 عميلاً على تحقيق نمو مستدام."
              : "We've completed 100+ projects using custom web development services, custom mobile app development services, AI solutions & business automation services, professional UI/UX design services, and digital marketing & SEO services. From startups to enterprises, we've helped 60+ clients achieve sustainable growth."}
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-8 sm:gap-12"
          >
            {[
              { val: "100+", lbl: isAr ? "مشروع مكتمل"  : "Projects Completed" },
              { val: "60+",  lbl: isAr ? "عميل سعيد"    : "Happy Clients" },
              { val: "99%",  lbl: isAr ? "رضا العملاء"  : "Client Satisfaction" },
              { val: "10+",  lbl: isAr ? "سنوات خبرة"   : "Years Experience" },
            ].map((s) => (
              <div key={s.lbl} className="text-center">
                <p className="font-display text-3xl font-extrabold text-gradient">{s.val}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.lbl}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORY FILTER PILLS ──────────────────────── */}
      <section className="sticky top-20 z-20 bg-background/80 backdrop-blur-lg border-b border-white/5 py-4">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {CATEGORIES.map((cat) => {
              const CatIcon = cat.Icon;
              const isActive = active === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActive(cat.key)}
                  className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-primary text-primary-foreground shadow-glow scale-[1.02]"
                      : "bg-white/5 text-muted-foreground border border-white/10 hover:bg-white/10 hover:text-foreground"
                  }`}
                >
                  <CatIcon className="h-3.5 w-3.5" />
                  {isAr ? cat.labelAr : cat.labelEn}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROJECT GRID ──────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl px-6">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-muted-foreground py-20"
              >
                {isAr ? "لا توجد مشاريع في هذه الفئة حالياً." : "No projects in this category yet."}
              </motion.p>
            ) : (
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} isAr={isAr} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* "30+ more" badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14 text-center"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/5 px-6 py-3 text-sm font-semibold text-primary-glow">
              <Star className="h-4 w-4 fill-current" />
              {isAr ? "+ 30 مشروعاً احترافياً إضافياً" : "+ 30 More Professional Projects Delivered"}
              <Star className="h-4 w-4 fill-current" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────── */}
      <section className="relative py-24 sm:py-32 border-t border-white/5 bg-background/50">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/8 blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow">
              {isAr ? "آراء العملاء" : "Client Reviews"}
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl text-gradient">
              {t("testi.title")}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((it, i) => (
              <motion.figure
                key={it.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-3xl border border-white/10 bg-card/40 p-8 shadow-card flex flex-col justify-between hover:border-primary/30 transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute top-6 end-6 text-primary/20 group-hover:text-primary/40 transition-colors">
                  <Quote className="h-8 w-8" />
                </div>
                <blockquote className="text-sm leading-relaxed text-foreground/80 italic mb-6" dir="auto">
                  "{it.content}"
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t border-white/5 pt-4">
                  <div
                    className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-glow group-hover:scale-105 transition-transform duration-300"
                    aria-hidden
                  >
                    {it.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{it.name}</div>
                    {it.role && (
                      <div className="text-xs text-muted-foreground">{it.role}</div>
                    )}
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO CTA ─────────────────────────────── */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-3xl" />
        </div>

        <div className="container mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-card/30 backdrop-blur-md p-10 sm:p-16 shadow-card relative overflow-hidden text-center"
          >
            {/* top glow line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow">
              {isAr ? "ابدأ معنا اليوم" : "Start With Us Today"}
            </p>

            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl text-foreground leading-tight" dir="auto">
              {isAr
                ? "انضم إلى 100+ شركة نجحنا في تحويل مسيرتها الرقمية!"
                : "Join 100+ Successful Businesses We've Transformed Their Digital Landscape!"}
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed" dir="auto">
              {isAr
                ? "لقد رأيت ما بنيناه للآخرين. الآن تخيّل ما يمكننا بناؤه لك. سواء كنت تحتاج إلى منصة ويب مخصصة تدرّ عائداً، أو تطبيق جوال يتوسّع مع مستخدميك، أو استراتيجية رقمية تسود السوق — لدينا الخبرة والمنهجية المثبتة للتسليم. السؤال ليس إن كنت تحتاج إلى تحوّل رقمي. بل هل ستبدأ اليوم أم ستفسح المجال لمنافسيك؟"
                : "You've just seen what we've built for others. Now imagine what we could build for you. Whether you need a custom web platform that generates revenue, a mobile app that scales with your users, or a digital strategy that dominates your market — we have the expertise and proven process to deliver. The question isn't whether you need a digital transformation. It's whether you'll start today or lose ground to competitors who will."}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-[1.02] active:scale-[0.98] transition duration-200"
              >
                <ArrowRight className="h-4 w-4" />
                {isAr ? "ابدأ مشروعك الآن" : "Start Your Project Now"}
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-foreground hover:bg-white/10 hover:border-white/20 active:scale-[0.98] transition duration-200"
              >
                <Calendar className="h-4 w-4" />
                {isAr ? "احجز مكالمة" : "Schedule a Call"}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ─── Project Card ──────────────────────────────────── */
function ProjectCard({
  project,
  index,
  isAr,
}: {
  project: Project;
  index: number;
  isAr: boolean;
}) {
  const catKey = project.category ?? "default";
  const gradient = CAT_COLORS[catKey] ?? CAT_COLORS.default;

  const CatLabel = CATEGORIES.find((c) => c.key === catKey);

  const inner = (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-card shadow-card transition-all duration-300 hover:border-primary/40 hover:shadow-glow hover:-translate-y-1"
    >
      {/* Image / gradient placeholder */}
      <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${gradient}`}>
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2/3 w-2/3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition duration-500 group-hover:scale-[1.05]" />
          </div>
        )}

        {/* Hover overlay with "View More" */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 px-5 py-2.5 text-sm font-semibold text-white">
            {isAr ? "عرض المشروع" : "View Project"}
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        {/* Category badge */}
        {CatLabel && (
          <div className="absolute start-4 top-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/50 backdrop-blur border border-white/10 px-3 py-1 text-xs font-semibold text-white">
              <CatLabel.Icon className="h-3 w-3" />
              {isAr ? CatLabel.labelAr : CatLabel.labelEn}
            </span>
          </div>
        )}

        {/* Arrow icon top-end */}
        <div className="absolute end-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 text-white" />
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200" dir="auto">
          {project.title}
        </h3>
        {project.description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3" dir="auto">
            {project.description}
          </p>
        )}

        <div className="mt-4 pt-4 border-t border-white/5 flex items-center">
          <span className="text-xs font-semibold text-primary group-hover:text-primary-glow transition-colors inline-flex items-center gap-1">
            {isAr ? "عرض التفاصيل" : "View Details"}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );

  return (
    <Link to="/portfolio/$projectId" params={{ projectId: project.id }} className="block">
      {inner}
    </Link>
  );
}
