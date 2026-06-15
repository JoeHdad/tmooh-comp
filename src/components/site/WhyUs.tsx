import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Rocket, Users, Award, Globe } from "lucide-react";

const stats = [
  { id: "1", Icon: Rocket },
  { id: "2", Icon: Users },
  { id: "3", Icon: Award },
  { id: "4", Icon: Globe },
];

const items = [
  { n: "01", key: "1" },
  { n: "02", key: "2" },
  { n: "03", key: "3" },
  { n: "04", key: "4" },
];

export function WhyUs() {
  const { t } = useI18n();
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow">
            {t("why.eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl text-gradient">
            {t("why.title")}
          </h2>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Stats Grid - Left Side */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map(({ id, Icon }, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card/40 p-4 sm:p-8 shadow-card flex flex-col items-center justify-center text-center transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="mb-4 inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-5.5 w-5.5 sm:h-6 sm:w-6" />
                </div>
                <div className="font-display text-2xl xs:text-3xl sm:text-4xl font-extrabold text-gradient mb-2 whitespace-nowrap">
                  {t(`why.stat.${id}.val`)}
                </div>
                <div className="text-[11px] sm:text-xs md:text-sm font-medium tracking-wide text-muted-foreground leading-snug">
                  {t(`why.stat.${id}.lbl`)}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Reasons List - Right Side */}
          <div className="space-y-6">
            {items.map(({ n, key }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative flex gap-6 rounded-2xl border border-white/5 bg-card/10 p-6 hover:border-white/10 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-sm font-bold text-primary-foreground">
                    {n}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {t(`why.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`why.${key}.desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
