import { useI18n } from "@/lib/i18n";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import * as Lucide from "lucide-react";
import {
  BarChart3,
  Megaphone,
  Code2,
  Brush,
  Layers,
  Smartphone,
  Check,
  type LucideIcon,
} from "lucide-react";

const fallback = [
  { id: "s1", Icon: BarChart3 },
  { id: "s2", Icon: Megaphone },
  { id: "s3", Icon: Code2 },
  { id: "s4", Icon: Brush },
  { id: "s5", Icon: Layers },
  { id: "s6", Icon: Smartphone },
];

type DbService = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
};

export function Services() {
  const { t } = useI18n();
  const [db, setDb] = useState<DbService[] | null>(null);

  useEffect(() => {
    supabase
      .from("services")
      .select("id,name,description,icon")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => setDb((data as DbService[]) ?? []));
  }, []);

  const useDb = db && db.length > 0;
  const items = useDb
    ? db!.map((s) => {
        const Icon =
          (s.icon && (Lucide as unknown as Record<string, LucideIcon>)[s.icon]) || Layers;
        return {
          id: s.id,
          Icon,
          title: s.name,
          desc: s.description ?? "",
          features: [] as string[],
        };
      })
    : fallback.map((f) => ({
        id: f.id,
        Icon: f.Icon,
        title: t(`services.${f.id}.title`),
        desc: t(`services.${f.id}.desc`),
        features: ["f1", "f2", "f3"].map((k) => t(`services.${f.id}.${k}`)),
      }));

  const renderCard = (item: (typeof items)[number], i: number, marquee = false) => {
    const Icon = item.Icon;

    return (
      <div
        key={`${item.id}-${i}${marquee ? "-marquee" : ""}`}
        dir="auto"
        className={`group relative shrink-0 overflow-hidden rounded-3xl ring-1 ring-white/10 ring-inset bg-card p-7 shadow-card transition hover:ring-primary/40 hover:shadow-glow hover-lift ${
          marquee ? "w-[min(340px,calc(100vw-48px))]" : "w-full"
        }`}
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 transition group-hover:opacity-100" />
        <div className="relative">
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="font-display text-xl font-semibold whitespace-normal">{item.title}</h3>
          {item.desc && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground whitespace-normal">
              {item.desc}
            </p>
          )}
          {item.features.length > 0 && (
            <>
              <div className="my-5 h-px bg-white/10" />
              <ul className="space-y-2">
                {item.features.map((f, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-foreground/80 whitespace-normal"
                  >
                    <Check className="h-3.5 w-3.5 shrink-0 text-primary-glow" />
                    {f}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow">
            {t("services.eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl text-gradient">
            {t("services.title")}
          </h2>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-6">
        <p className="mx-auto mt-8 max-w-2xl text-center text-muted-foreground">
          {t("services.sub")}
        </p>
      </div>

      <div className="container mx-auto mt-12 grid max-w-6xl gap-5 px-6 sm:hidden">
        {items.map((item, i) => renderCard(item, i))}
      </div>

      {/* Single-line animated marquee of service cards */}
      <div dir="ltr" className="relative mt-16 hidden overflow-hidden sm:block">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="marquee-track flex w-max animate-marquee gap-5 px-6">
          {[...items, ...items].map((item, i) => renderCard(item, i, true))}
        </div>
      </div>
    </section>
  );
}
