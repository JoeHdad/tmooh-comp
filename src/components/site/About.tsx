import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Code2, Palette, Megaphone } from "lucide-react";
import logo from "@/assets/tmooh-logo.svg";
import { useSiteSettings } from "@/lib/useSiteSettings";

export function About() {
  const { t } = useI18n();
  const { about } = useSiteSettings();
  const title = about.title || t("about.title");
  const body = about.body || t("about.body");

  const tags = [
    { key: "about.tag1", Icon: Code2, pos: "top-2 end-4" },
    { key: "about.tag2", Icon: Palette, pos: "top-20 start-4" },
    { key: "about.tag3", Icon: Megaphone, pos: "bottom-16 start-2" },
  ];

  // Ascending staircase heights (shortest -> tallest)
  const cells = [
    { kind: "years", height: "h-44 sm:h-48", delay: 0 },
    { kind: "vision", height: "h-56 sm:h-64", delay: 0.1 },
    { kind: "mission", height: "h-64 sm:h-80", delay: 0.2 },
    { kind: "teams", height: "h-72 sm:h-96", delay: 0.3 },
  ] as const;

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <h2 className="text-center font-display text-4xl font-bold sm:text-5xl">
          {title}
        </h2>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg leading-relaxed text-foreground/90 sm:text-xl"
          >
            {body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto h-80 w-full max-w-md"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={logo} alt="TMOOH" className="h-64 w-auto" />
            </div>
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

        {/* Staircase strip */}
        <div className="mt-20 rounded-3xl border border-primary/40 p-3 sm:p-4">
          <div className="grid grid-cols-2 items-end gap-3 sm:gap-4 lg:grid-cols-4">
            {cells.map((c) => (
              <motion.div
                key={c.kind}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: c.delay, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`${c.height}`}
              >
                {c.kind === "years" && (
                  <YearsCell title={t("about.years")} sub={t("about.yearsLabel")} />
                )}
                {c.kind === "vision" && (
                  <InfoCell title={t("about.vision")} body={t("about.visionDesc")} />
                )}
                {c.kind === "mission" && (
                  <InfoCell title={t("about.mission")} body={t("about.missionDesc")} />
                )}
                {c.kind === "teams" && (
                  <TeamsCell title={t("about.teams")} body={t("about.teamsDesc")} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function YearsCell({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl bg-gradient-primary p-6 text-center shadow-glow transition-shadow duration-300 hover:shadow-card">
      <div
        className="pointer-events-none absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, oklch(1 0 0 / 0.08) 0 1px, transparent 1px 14px)",
        }}
      />
      <div className="relative flex h-full flex-col items-center justify-center">
        <div className="font-display text-5xl font-bold text-primary-foreground transition-transform duration-300 group-hover:scale-110">
          {title}
        </div>
        <div className="mt-2 text-sm text-primary-foreground/80">{sub}</div>
      </div>
    </div>
  );
}

function InfoCell({ title, body }: { title: string; body: string }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-card p-6 text-center transition-all duration-300 hover:border-primary/40 hover:shadow-card">
      <div className="pointer-events-none absolute inset-x-0 -top-1/2 h-full bg-gradient-to-b from-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col items-center justify-center">
        <h3 className="font-display text-2xl font-bold transition-transform duration-300 group-hover:-translate-y-1">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}

function TeamsCell({ title, body }: { title: string; body: string }) {
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
    <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-card p-6 text-center transition-all duration-300 hover:border-primary/40 hover:shadow-card">
      <div className="relative flex h-full flex-col items-center justify-center">
        <h3 className="font-display text-2xl font-bold transition-transform duration-300 group-hover:-translate-y-1">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
