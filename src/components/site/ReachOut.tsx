import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";

const EMAIL = "tmooh.contact@gmail.com";
const WHATSAPP = "+970595172603";
const WHATSAPP_LINK = "https://wa.me/970595172603";

export function ReachOut() {
  const { t } = useI18n();
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-6 text-center">
        <h2 className="font-display text-4xl font-bold sm:text-5xl">{t("reach.title")}</h2>
        <p className="mt-4 text-muted-foreground">{t("reach.sub")}</p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <motion.a
            href={`mailto:${EMAIL}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-card p-8 shadow-card transition hover:border-primary/40 hover:shadow-glow"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow">
                {t("reach.email")}
              </div>
              <div
                className="mt-2 font-display text-lg font-semibold transition group-hover:text-primary-glow"
                dir="ltr"
              >
                {EMAIL}
              </div>
            </div>
          </motion.a>

          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-card p-8 shadow-card transition hover:border-primary/40 hover:shadow-glow"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow">
                {t("reach.whatsapp")}
              </div>
              <div
                className="mt-2 font-display text-lg font-semibold transition group-hover:text-primary-glow"
                dir="ltr"
              >
                {WHATSAPP}
              </div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
