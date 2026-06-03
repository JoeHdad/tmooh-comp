import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageSquare } from "lucide-react";

export function CTASection() {
  const { t } = useI18n();

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-card/30 backdrop-blur-md p-10 sm:p-16 shadow-card relative overflow-hidden"
        >
          {/* Subtle glow border effect */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <h2 className="font-display text-3xl font-bold sm:text-5xl text-gradient uppercase tracking-tight leading-none">
            {t("cta.title")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("cta.desc")}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-[1.02] active:scale-[0.98] transition duration-200"
            >
              {t("cta.btn.services")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-foreground hover:bg-white/10 hover:border-white/20 active:scale-[0.98] transition duration-200"
            >
              <MessageSquare className="h-4 w-4" />
              {t("cta.btn.contact")}
            </Link>
          </div>

          <p className="mt-8 text-xs sm:text-sm text-muted-foreground/80 italic">
            {t("cta.note")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
