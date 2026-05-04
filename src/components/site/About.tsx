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

        {/* Stats strip */}
        <div className="mt-20 overflow-hidden rounded-3xl border border-white/10 shadow-card">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            <YearsCell title={t("about.years")} sub={t("about.yearsLabel")} />
            <InfoCell title={t("about.vision")} body={t("about.visionDesc")} />
            <InfoCell title={t("about.mission")} body={t("about.missionDesc")} />
            <TeamsCell title={t("about.teams")} body={t("about.teamsDesc")} />
          </div>
        </div>
      </div>
    </section>
  );
}

function YearsCell({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-background p-8 text-center sm:border-e sm:border-b-0">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, oklch(1 0 0 / 0.05) 0 1px, transparent 1px 14px)",
        }}
      />
      <div className="relative flex h-full flex-col items-center justify-center">
        <div className="font-display text-5xl font-bold text-gradient">{title}</div>
        <div className="mt-2 text-sm text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}

function InfoCell({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-b border-white/10 bg-card p-8 text-center sm:border-e sm:[&:nth-child(even)]:border-b-0 lg:border-b-0">
      <h3 className="font-display text-2xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

function TeamsCell({ title, body }: { title: string; body: string }) {
  const avatars = Array.from({ length: 7 });
  const colors = [
    "from-pink-500 to-rose-500",
    "from-amber-400 to-orange-500",
    "from-emerald-400 to-teal-500",
    "from-sky-400 to-indigo-500",
    "from-fuchsia-500 to-purple-600",
    "from-yellow-400 to-amber-500",
    "from-cyan-400 to-blue-500",
  ];
  return (
    <div className="bg-card p-8 text-center">
      <h3 className="font-display text-2xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
      <div className="mt-5 flex items-center justify-center -space-x-2 rtl:space-x-reverse">
        {avatars.map((_, i) => (
          <div
            key={i}
            className={`h-9 w-9 rounded-full border-2 border-card bg-gradient-to-br ${colors[i]} shadow`}
          />
        ))}
      </div>
    </div>
  );
}

