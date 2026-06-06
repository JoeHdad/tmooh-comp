import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Quote } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  avatar_url: string | null;
  content: string;
  rating: number | null;
};

export function Testimonials() {
  const { t } = useI18n();
  const [items, setItems] = useState<Testimonial[] | null>(null);

  useEffect(() => {
    supabase
      .from("testimonials")
      .select("id, name, role, avatar_url, content, rating")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setItems(data as Testimonial[]);
        } else {
          // Fall back to i18n hardcoded testimonials
          setItems([
            { id: "1", name: t("testi.1.name"), role: t("testi.1.role"), avatar_url: null, content: t("testi.1.body"), rating: 5 },
            { id: "2", name: t("testi.2.name"), role: t("testi.2.role"), avatar_url: null, content: t("testi.2.body"), rating: 5 },
            { id: "3", name: t("testi.3.name"), role: t("testi.3.role"), avatar_url: null, content: t("testi.3.body"), rating: 5 },
          ]);
        }
      });
  }, []);

  const list = items ?? [
    { id: "1", name: t("testi.1.name"), role: t("testi.1.role"), avatar_url: null, content: t("testi.1.body"), rating: 5 },
    { id: "2", name: t("testi.2.name"), role: t("testi.2.role"), avatar_url: null, content: t("testi.2.body"), rating: 5 },
    { id: "3", name: t("testi.3.name"), role: t("testi.3.role"), avatar_url: null, content: t("testi.3.body"), rating: 5 },
  ];

  return (
    <section className="relative py-24 sm:py-32 border-t border-white/5 bg-background/50">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold sm:text-5xl text-gradient">
            {t("testi.title")}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((it, i) => (
            <motion.figure
              key={it.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-3xl border border-white/10 bg-card/40 p-8 shadow-card flex flex-col justify-between hover:border-primary/30 transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute top-6 end-6 text-primary/20 group-hover:text-primary/40 transition-colors">
                <Quote className="h-8 w-8" />
              </div>
              <blockquote className="text-sm leading-relaxed text-foreground/80 italic mb-6" dir="auto">
                "{it.content}"
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-white/5 pt-4">
                {it.avatar_url ? (
                  <img
                    src={it.avatar_url}
                    alt={it.name}
                    className="h-10 w-10 rounded-full object-cover shadow-glow group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div
                    className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-glow group-hover:scale-105 transition-transform duration-300"
                    aria-hidden
                  >
                    {it.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="text-sm font-semibold text-foreground">{it.name}</div>
                  {it.role && (
                    <div className="text-xs text-muted-foreground">{it.role}</div>
                  )}
                  {it.rating && (
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: it.rating }).map((_, j) => (
                        <span key={j} className="text-amber-400 text-xs">★</span>
                      ))}
                    </div>
                  )}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
