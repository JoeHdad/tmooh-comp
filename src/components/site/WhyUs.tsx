import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import imgFast from "@/assets/why-fast.jpg";
import imgPurpose from "@/assets/why-purpose.jpg";
import imgCollab from "@/assets/why-collab.jpg";
import imgScale from "@/assets/why-scale.jpg";

const items = [
  { n: "01", key: "1", img: imgFast },
  { n: "02", key: "2", img: imgPurpose },
  { n: "03", key: "3", img: imgCollab },
  { n: "04", key: "4", img: imgScale },
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
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            {t("why.title")}
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ n, key, img }, i) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-card shadow-card transition hover:border-primary/40 hover:shadow-glow"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={img}
                  alt={t(`why.${key}.title`)}
                  loading="lazy"
                  width={640}
                  height={800}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              </div>
              <div className="p-6">
                <div className="inline-flex h-9 items-center justify-center rounded-full bg-white/5 px-3 text-xs font-bold tracking-wider text-primary-glow">
                  {n}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {t(`why.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`why.${key}.desc`)}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
