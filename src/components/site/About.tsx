import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Code2, Palette, Megaphone, Sparkles, Layers, Languages, Rocket, Award, Clock, Briefcase, Users } from "lucide-react";
import logo from "@/assets/tmooh-logo.svg";
import { useSiteSettings } from "@/lib/useSiteSettings";

export function About() {
  const { t } = useI18n();
  const { about } = useSiteSettings();
  const title = about.title || t("about.title");

  const tags = [
    { key: "about.tag1", Icon: Code2, pos: "top-2 end-4" },
    { key: "about.tag2", Icon: Palette, pos: "top-20 start-4" },
    { key: "about.tag3", Icon: Megaphone, pos: "bottom-16 start-2" },
  ];

  const cells = [
    { kind: "years", height: "h-44 sm:h-48", delay: 0 },
    { kind: "vision", height: "h-56 sm:h-64", delay: 0.1 },
    { kind: "mission", height: "h-64 sm:h-80", delay: 0.2 },
    { kind: "teams", height: "h-72 sm:h-96", delay: 0.3 },
  ] as const;

  const stats = [
    { id: "1", Icon: Award },
    { id: "2", Icon: Clock },
    { id: "3", Icon: Briefcase },
    { id: "4", Icon: Users },
  ];

  const advantages = [
    { key: "about.whatsets.1", Icon: Sparkles },
    { key: "about.whatsets.2", Icon: Layers },
    { key: "about.whatsets.3", Icon: Languages },
    { key: "about.whatsets.4", Icon: Rocket },
  ];

  return (
    <div className="space-y-24 py-16 sm:py-24">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="h-[300px] w-[300px] rounded-full bg-primary/10 blur-[120px]" />
        </div>
        <div className="container mx-auto max-w-6xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow">
              {t("nav.about")}
            </p>
            <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl md:text-6xl text-gradient">
              {title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Logo & Tagline / Intro Section */}
      <section className="relative">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Logo side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto h-80 w-full max-w-md"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={logo} alt="TMOOH" className="h-56 w-auto" />
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

            {/* Intro text side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <div
                dir="auto"
                className="text-lg leading-relaxed text-foreground/90 sm:text-xl font-medium border-l-4 border-primary-glow pl-6 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-6"
              >
                {t("about.intro")}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story & Stats Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            {/* Story text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <h2 className="font-display text-3xl font-bold sm:text-4xl text-gradient" dir="auto">
                {t("about.story.title")}
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground" dir="auto">
                {t("about.story.body")}
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {stats.map(({ id, Icon }, i) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card/40 p-5 shadow-card flex flex-col items-center justify-center text-center transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-gradient mb-1">
                    {t(`why.stat.${id}.val`)}
                  </div>
                  <div className="text-xs font-semibold tracking-wide text-muted-foreground">
                    {t(`why.stat.${id}.lbl`)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Staircase cells section (Vision, Mission, etc.) */}
      <section className="relative">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="rounded-3xl border border-primary/40 p-3 sm:p-4 bg-card/10 backdrop-blur-sm">
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

      {/* What Sets Us Apart section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow">
              {t("about.whatsets.eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl text-gradient">
              {t("about.whatsets.title")}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map(({ key, Icon }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-card/30 p-6 shadow-card hover:border-primary/20 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-card border border-white/10 text-primary-glow shadow-sm group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2" dir="auto">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground" dir="auto">
                  {t(`${key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
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
