import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [1, 2, 3];

export function Portfolio() {
  const { t } = useI18n();

  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold sm:text-5xl">{t("portfolio.title")}</h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((n, i) => (
            <motion.article
              key={n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-card shadow-card transition hover:border-primary/40 hover:shadow-glow"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/30 via-secondary to-background">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-3/4 w-3/4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition group-hover:scale-[1.03]" />
                </div>
                <div className="absolute end-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold">{t("portfolio.cardTitle")}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t("portfolio.cardDesc")}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-display text-2xl font-bold text-gradient sm:text-3xl">
            {t("portfolio.more")}
          </p>
        </div>
      </div>
    </section>
  );
}
