import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";

const items = [1, 2, 3, 4, 5, 6];
const names = ["Sarah M.", "Ahmed K.", "Lina R.", "Omar T.", "Maya S.", "Yusuf A."];

export function Testimonials() {
  const { t } = useI18n();

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{t("testi.title")}</h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((n, i) => (
            <motion.figure
              key={n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-3xl border border-white/10 bg-card p-6 shadow-card"
            >
              <figcaption className="flex items-center gap-3">
                <div
                  className="h-11 w-11 rounded-full bg-gradient-to-br from-primary to-primary-glow"
                  aria-hidden
                />
                <div>
                  <div className="text-sm font-semibold">{names[i]}</div>
                  <div className="text-xs text-muted-foreground">{t("testi.role")}</div>
                </div>
              </figcaption>
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/80">
                "{t("testi.body")}"
              </blockquote>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
