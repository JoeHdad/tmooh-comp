import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, Wrench, MessagesSquare } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: Overview,
});

function Overview() {
  const [counts, setCounts] = useState({ portfolio: 0, services: 0, testimonials: 0 });

  useEffect(() => {
    (async () => {
      const [p, s, t] = await Promise.all([
        supabase.from("portfolio_projects").select("*", { count: "exact", head: true }),
        supabase.from("services").select("*", { count: "exact", head: true }),
        supabase.from("testimonials").select("*", { count: "exact", head: true }),
      ]);
      setCounts({
        portfolio: p.count ?? 0,
        services: s.count ?? 0,
        testimonials: t.count ?? 0,
      });
    })();
  }, []);

  const cards = [
    { label: "Projects", value: counts.portfolio, icon: Briefcase },
    { label: "Services", value: counts.services, icon: Wrench },
    { label: "Testimonials", value: counts.testimonials, icon: MessagesSquare },
  ];

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">Overview</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Manage all of your website content from here.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-white/10 bg-card p-6"
          >
            <c.icon className="mb-3 h-6 w-6 text-primary" />
            <div className="text-3xl font-bold">{c.value}</div>
            <div className="text-sm text-muted-foreground">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
