import { useI18n } from "@/lib/i18n";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import * as Lucide from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Megaphone,
  Code2,
  Layers,
  Smartphone,
  Cpu,
  Palette,
  Check,
  type LucideIcon,
} from "lucide-react";

const fallback = [
  { id: "s4", Icon: Code2 },
  { id: "s1", Icon: Smartphone },
  { id: "s3", Icon: Cpu },
  { id: "s6", Icon: Palette },
  { id: "s2", Icon: Layers },
  { id: "s5", Icon: Megaphone },
];

type DbService = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
};

interface ServicesProps {
  isPage?: boolean;
}

export function Services({ isPage = false }: ServicesProps) {
  const { t, lang } = useI18n();
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
        features: [] as string[],
      }));

  const renderCard = (item: (typeof items)[number], i: number, marquee = false) => {
    const Icon = item.Icon;

    return (
      <div
        key={`${item.id}-${i}${marquee ? "-marquee" : ""}`}
        dir="auto"
        className={`svc-card group relative shrink-0 rounded-3xl bg-card p-7 transition hover-lift flex flex-col justify-between ${
          marquee ? "w-[min(340px,calc(100vw-48px))]" : "w-full"
        }`}
      >
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 transition group-hover:opacity-100" />
        </div>
        <div className="relative flex-grow">
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
        
        {/* Learn More Button */}
        <div className="relative mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
          <Link
            to="/services/$serviceId"
            params={{ serviceId: item.id }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-glow transition-colors cursor-pointer group/link"
          >
            {lang === "ar" ? "عرض التفاصيل" : "Learn More"}
            <Lucide.ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow">
            {isPage ? t("services.page.eyebrow") : t("services.eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl text-gradient">
            {isPage ? t("services.page.title") : t("services.title")}
          </h2>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-6">
        <p className="mx-auto mt-8 max-w-2xl text-center text-muted-foreground">
          {isPage ? t("services.page.desc") : t("services.sub")}
        </p>
      </div>

      {isPage ? (
        <div className="container mx-auto mt-16 grid max-w-6xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => renderCard(item, i))}
        </div>
      ) : (
        <>
          <div className="container mx-auto mt-12 grid max-w-6xl gap-5 px-6 sm:hidden">
            {items.map((item, i) => renderCard(item, i))}
          </div>

          <div dir="ltr" className="relative mt-16 hidden overflow-x-hidden sm:block py-4 -my-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
            <div className="marquee-track flex w-max animate-marquee gap-5 px-6">
              {[...items, ...items].map((item, i) => renderCard(item, i, true))}
            </div>
          </div>
        </>
      )}

      {/* Services Page Custom CTA */}
      {isPage && (
        <div className="container mx-auto max-w-4xl px-6 mt-24">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-card/40 to-card/10 p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              {t("services.cta.title")}
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-muted-foreground">
              {t("services.cta.sub")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow hover:scale-[1.02] active:scale-[0.98] transition duration-200"
              >
                <Lucide.Calendar className="h-4 w-4" />
                {t("services.cta.btn.consult")}
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-foreground hover:bg-white/10 hover:border-white/20 active:scale-[0.98] transition duration-200"
              >
                <Lucide.MessageSquare className="h-4 w-4" />
                {t("services.cta.btn.contact")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
