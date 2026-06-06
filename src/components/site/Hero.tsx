import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ArrowUpRight, Rocket, Users, Award, Globe } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useSiteSettings } from "@/lib/useSiteSettings";

export function Hero() {
  const { t, lang } = useI18n();
  const { hero } = useSiteSettings();
  const title1 = hero.title || t("hero.title1");
  const title2 = hero.subtitle || t("hero.title2");
  const ctaText = hero.cta || t("hero.cta");

  const stats = [
    {
      id: "1",
      value: t("why.stat.1.val"),
      label: t("why.stat.1.lbl"),
      icon: Rocket,
      glow: "rgba(168, 85, 247, 0.15)",
      textColor: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      id: "2",
      value: t("why.stat.2.val"),
      label: t("why.stat.2.lbl"),
      icon: Users,
      glow: "rgba(59, 130, 246, 0.15)",
      textColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      id: "3",
      value: t("why.stat.3.val"),
      label: t("why.stat.3.lbl"),
      icon: Award,
      glow: "rgba(16, 185, 129, 0.15)",
      textColor: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      id: "4",
      value: t("why.stat.4.val"),
      label: t("why.stat.4.lbl"),
      icon: Globe,
      glow: "rgba(245, 158, 11, 0.15)",
      textColor: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-36 pb-20"
    >
      {/* Background glow and subtle grid */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial parallax" data-parallax="0.18" aria-hidden />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden>
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="container relative mx-auto max-w-7xl px-6 z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Left Column: Text Content & Actions */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-start">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary-glow shadow-glow animate-pulse" />
              {t("hero.tag")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.2rem] text-foreground"
            >
              <span className="block text-foreground mb-2">{title1}</span>
              <span className="block text-gradient">{title2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed"
            >
              {t("hero.sub")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02]"
              >
                {ctaText}
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-foreground/90 backdrop-blur transition hover:bg-white/10"
              >
                {t("hero.cta2")}
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end w-full">
            {/* Orbital glow backgrounds */}
            <div className="absolute right-0 top-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute left-10 bottom-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-[560px]"
            >
              {/* Glowing gradient back-shadow */}
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-primary to-purple-600 opacity-25 blur-2xl pointer-events-none" />
              
              {/* Premium glassy laptop/dashboard container */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-2 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:scale-[1.01]">
                {/* Header browser-style dots */}
                <div className="absolute top-3.5 left-4 flex gap-1.5 z-20">
                  <span className="w-2 h-2 rounded-full bg-red-500/80" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                  <span className="w-2 h-2 rounded-full bg-green-500/80" />
                </div>
                <img
                  src="/hero_mockup.png"
                  alt="Tmooh Solutions Dashboard Mockup"
                  className="relative w-full rounded-xl border border-white/5 object-cover"
                  loading="eager"
                  width={800}
                  height={600}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section: Premium Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
          className="mt-20 lg:mt-28 w-full rounded-2xl border border-white/5 bg-slate-950/40 p-6 md:p-8 backdrop-blur-md shadow-2xl relative"
        >
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-4 ${
                    i > 0 ? "pt-6 md:pt-0 md:pl-6" : ""
                  } ${i % 2 === 1 ? "pl-2 md:pl-6" : ""}`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${stat.borderColor} ${stat.bgColor} ${stat.textColor}`}
                    style={{ boxShadow: `0 0 15px ${stat.glow}` }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
