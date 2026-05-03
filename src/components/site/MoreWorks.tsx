import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";

const items = [
  { img: work1, tags: ["more.tag1", "more.tag2"] },
  { img: work2, tags: ["more.tag2"] },
];

export function MoreWorks() {
  const { t } = useI18n();
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          {t("more.title")}
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {items.map((it, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group"
            >
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-card shadow-card">
                <img
                  src={it.img}
                  alt={t("more.name")}
                  loading="lazy"
                  width={960}
                  height={704}
                  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-semibold">{t("more.name")}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t("more.text")}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {it.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-glow"
                    >
                      {t(tag)}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
