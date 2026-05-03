import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";

const steps = ["1", "2", "3", "4", "5"];

export function Process() {
  const { t } = useI18n();
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow">
            {t("process.eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            {t("process.title")}
          </h2>
        </div>

        <div className="mt-16 space-y-10">
          {steps.map((k, i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="grid grid-cols-12 items-start gap-4 border-b border-white/5 pb-10 last:border-0 sm:gap-8"
            >
              <div className="col-span-3 sm:col-span-2">
                <span className="font-display text-3xl font-bold text-primary-glow sm:text-4xl">
                  0{k}
                </span>
              </div>
              <div className="col-span-9 sm:col-span-3">
                <h3 className="font-display text-xl font-semibold">
                  {t(`process.${k}.label`)}
                </h3>
              </div>
              <div className="col-span-12 sm:col-span-7">
                <h4 className="font-display text-xl font-semibold sm:text-2xl">
                  {t(`process.${k}.title`)}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`process.${k}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
