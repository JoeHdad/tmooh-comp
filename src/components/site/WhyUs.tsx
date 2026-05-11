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

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Image collage - Desktop only */}
          <div className="hidden grid-cols-2 gap-4 lg:grid">
            <div className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-3xl border border-white/10 shadow-card">
                <img
                  src={imgFast}
                  alt=""
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-3xl border border-white/10 shadow-card">
                <img
                  src={imgCollab}
                  alt=""
                  loading="lazy"
                  className="aspect-square w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 pt-8">
              <div className="overflow-hidden rounded-3xl border border-white/10 shadow-card">
                <img
                  src={imgPurpose}
                  alt=""
                  loading="lazy"
                  className="aspect-square w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-3xl border border-white/10 shadow-card">
                <img
                  src={imgScale}
                  alt=""
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Text cards / Mobile list */}
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:gap-y-10">
            {items.map(({ n, key, img }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col"
              >
                {/* Mobile Image */}
                <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 shadow-card lg:hidden">
                  <img
                    src={img}
                    alt=""
                    loading="lazy"
                    className="aspect-video w-full object-cover"
                  />
                </div>

                <div className="flex items-center gap-4 lg:block">
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-base font-bold text-background shadow-card lg:mb-5">
                    {n}
                  </div>
                  <h3 className="font-display text-xl font-semibold lg:mt-5">
                    {t(`why.${key}.title`)}
                  </h3>
                </div>
                
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground lg:mt-2">
                  {t(`why.${key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
