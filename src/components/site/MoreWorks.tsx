import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";

type Project = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  link_url: string | null;
};

export function MoreWorks() {
  const { t } = useI18n();
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    supabase
      .from("portfolio_projects")
      .select("id,title,description,image_url,link_url")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .limit(2)
      .then(({ data }) => setProjects((data as Project[]) ?? []));
  }, []);

  const items =
    projects && projects.length > 0
      ? projects.map((p) => ({
          title: p.title,
          description: p.description ?? "",
          img: p.image_url ?? work1,
          link_url: p.link_url,
          tags: [] as string[],
        }))
      : [
          {
            title: t("more.name"),
            description: t("more.text"),
            img: work1,
            tags: ["more.tag1", "more.tag2"],
            link_url: null,
          },
          {
            title: t("more.name"),
            description: t("more.text"),
            img: work2,
            tags: ["more.tag2"],
            link_url: null,
          },
        ];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            {t("more.title")}
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl">
            {t("more.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {items.map((it, i) => {
            const Wrap: any = it.link_url ? "a" : "div";
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group"
              >
                <Wrap
                  {...(it.link_url
                    ? { href: it.link_url, target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="block cursor-pointer"
                >
                  <div className="overflow-hidden rounded-3xl border border-white/10 bg-card shadow-card">
                    <img
                      src={it.img}
                      alt={it.title}
                      loading="lazy"
                      width={960}
                      height={704}
                      className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {it.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{it.description}</p>
                    </div>
                    {it.tags && it.tags.length > 0 && (
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
                    )}
                  </div>
                </Wrap>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
