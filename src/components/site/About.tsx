import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Code2, Palette, Megaphone } from "lucide-react";
import logo from "@/assets/tmooh-logo.png";

export function About() {
  const { t } = useI18n();

  const tags = [
    { key: "about.tag1", Icon: Code2, pos: "top-2 end-4" },
    { key: "about.tag2", Icon: Palette, pos: "top-20 start-4" },
    { key: "about.tag3", Icon: Megaphone, pos: "bottom-16 start-2" },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <h2 className="text-center font-display text-4xl font-bold sm:text-5xl">
          {t("about.title")}
        </h2>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg leading-relaxed text-foreground/90 sm:text-xl"
          >
            {t("about.body")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto h-80 w-full max-w-md"
          >
            {/* Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={logo} alt="TMOOH" className="h-64 w-auto" />
            </div>
            {/* Floating tags */}
            {tags.map(({ key, Icon, pos }) => (
              <div
                key={key}
                className={`absolute ${pos} inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/80 px-4 py-2 text-xs font-medium shadow-card backdrop-blur`}
              >
                <Icon className="h-3.5 w-3.5 text-primary-glow" />
                {t(key)}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats grid */}
        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title={t("about.years")}
            sub={t("about.yearsLabel")}
            featured
          />
          <InfoCard title={t("about.vision")} body={t("about.visionDesc")} />
          <InfoCard title={t("about.mission")} body={t("about.missionDesc")} />
          <InfoCard title={t("about.teams")} body={t("about.teamsDesc")} />
        </div>
      </div>
    </section>
  );
}

function StatCard({ title, sub, featured }: { title: string; sub: string; featured?: boolean }) {
  return (
    <div
      className={`rounded-3xl border border-white/10 p-6 text-center shadow-card ${
        featured ? "bg-gradient-primary text-primary-foreground" : "bg-card"
      }`}
    >
      <div className="font-display text-5xl font-bold">{title}</div>
      <div className="mt-2 text-sm opacity-90">{sub}</div>
    </div>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-card p-6 shadow-card">
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
