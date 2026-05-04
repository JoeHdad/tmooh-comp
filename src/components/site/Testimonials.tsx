import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  avatar_url: string | null;
  content: string;
};

const fallbackNames = ["Sarah M.", "Ahmed K.", "Lina R.", "Omar T.", "Maya S.", "Yusuf A."];

export function Testimonials() {
  const { t } = useI18n();
  const [items, setItems] = useState<Testimonial[] | null>(null);

  useEffect(() => {
    supabase
      .from("testimonials")
      .select("id,name,role,avatar_url,content")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => setItems((data as Testimonial[]) ?? []));
  }, []);

  const list: Testimonial[] =
    items && items.length > 0
      ? items
      : fallbackNames.map((n, i) => ({
          id: String(i),
          name: n,
          role: t("testi.role"),
          avatar_url: null,
          content: t("testi.body"),
        }));

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{t("testi.title")}</h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((it, i) => (
            <motion.figure
              key={it.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-3xl border border-white/10 bg-card p-6 shadow-card"
            >
              <figcaption className="flex items-center gap-3">
                {it.avatar_url ? (
                  <img
                    src={it.avatar_url}
                    alt={it.name}
                    className="h-11 w-11 rounded-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="h-11 w-11 rounded-full bg-gradient-to-br from-primary to-primary-glow"
                    aria-hidden
                  />
                )}
                <div>
                  <div className="text-sm font-semibold">{it.name}</div>
                  {it.role && (
                    <div className="text-xs text-muted-foreground">{it.role}</div>
                  )}
                </div>
              </figcaption>
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/80">
                "{it.content}"
              </blockquote>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
