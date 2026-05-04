import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Project = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  link_url: string | null;
};

export function Portfolio() {
  const { t } = useI18n();
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    supabase
      .from("portfolio_projects")
      .select("id,title,description,image_url,link_url")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => setProjects((data as Project[]) ?? []));
  }, []);

  const items =
    projects && projects.length > 0
      ? projects
      : [1, 2, 3].map((n) => ({
          id: String(n),
          title: t("portfolio.cardTitle"),
          description: t("portfolio.cardDesc"),
          image_url: null,
          link_url: null,
        }));

  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold sm:text-5xl">{t("portfolio.title")}</h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => {
            const Wrap: any = p.link_url ? "a" : "article";
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Wrap
                  {...(p.link_url
                    ? { href: p.link_url, target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="group block overflow-hidden rounded-3xl border border-white/10 bg-card shadow-card transition hover:border-primary/40 hover:shadow-glow"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/30 via-secondary to-background">
                    {p.image_url ? (
                      <img
                        src={p.image_url}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-3/4 w-3/4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition group-hover:scale-[1.03]" />
                      </div>
                    )}
                    <div className="absolute end-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                    {p.description && (
                      <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                    )}
                  </div>
                </Wrap>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="font-display text-2xl font-bold text-gradient sm:text-3xl">
            {t("portfolio.more")}
          </p>
        </div>
      </div>
    </section>
  );
}
