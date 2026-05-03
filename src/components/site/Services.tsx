import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { BarChart3, Megaphone, Code2, Brush, Layers, Smartphone, Check } from "lucide-react";

const services = [
  { id: "s1", Icon: BarChart3 },
  { id: "s2", Icon: Megaphone },
  { id: "s3", Icon: Code2 },
  { id: "s4", Icon: Brush },
  { id: "s5", Icon: Layers },
  { id: "s6", Icon: Smartphone },
];

export function Services() {
  const { t } = useI18n();

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow">
            {t("services.eyebrow")}
          </p>
        </div>
      </div>

      {/* Animated single-line marquee headline */}
      <div className="relative mt-6 overflow-hidden">
        <div className="flex w-max whitespace-nowrap animate-marquee gap-12 px-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-5xl font-bold sm:text-6xl md:text-7xl text-gradient"
            >
              {t("services.title")} ✦
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-6">
        <p className="mx-auto mt-6 max-w-2xl text-center text-muted-foreground">
          {t("services.sub")}
        </p>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ id, Icon }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card p-7 shadow-card transition hover:border-primary/40 hover:shadow-glow"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 transition group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold">
                  {t(`services.${id}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`services.${id}.desc`)}
                </p>
                <div className="my-5 h-px bg-white/10" />
                <ul className="space-y-2">
                  {["f1", "f2", "f3"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                      <Check className="h-3.5 w-3.5 text-primary-glow" />
                      {t(`services.${id}.${f}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
