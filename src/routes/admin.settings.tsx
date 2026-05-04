import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

type Settings = {
  hero: { title: string; subtitle: string; cta: string };
  about: { title: string; body: string };
  contact: { email: string; phone: string; address: string };
};

const empty: Settings = {
  hero: { title: "", subtitle: "", cta: "" },
  about: { title: "", body: "" },
  contact: { email: "", phone: "", address: "" },
};

function SettingsPage() {
  const [data, setData] = useState<Settings>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: rows, error } = await supabase
        .from("site_settings")
        .select("key,value");
      if (error) toast.error(error.message);
      const next = { ...empty };
      rows?.forEach((r: any) => {
        if (r.key in next) (next as any)[r.key] = { ...(next as any)[r.key], ...r.value };
      });
      setData(next);
      setLoading(false);
    })();
  }, []);

  const saveKey = async (key: keyof Settings) => {
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key, value: data[key] });
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Saved");
  };

  if (loading) return <div className="text-muted-foreground">Loading…</div>;

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Site Settings</h1>
        <p className="text-sm text-muted-foreground">
          Edit headline texts shown on the public site.
        </p>
      </div>

      <Section title="Hero">
        <Field label="Title">
          <Input
            value={data.hero.title}
            onChange={(e) =>
              setData({ ...data, hero: { ...data.hero, title: e.target.value } })
            }
          />
        </Field>
        <Field label="Subtitle">
          <Textarea
            value={data.hero.subtitle}
            onChange={(e) =>
              setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })
            }
          />
        </Field>
        <Field label="CTA text">
          <Input
            value={data.hero.cta}
            onChange={(e) =>
              setData({ ...data, hero: { ...data.hero, cta: e.target.value } })
            }
          />
        </Field>
        <Button onClick={() => saveKey("hero")} disabled={saving}>
          Save Hero
        </Button>
      </Section>

      <Section title="About">
        <Field label="Title">
          <Input
            value={data.about.title}
            onChange={(e) =>
              setData({ ...data, about: { ...data.about, title: e.target.value } })
            }
          />
        </Field>
        <Field label="Body">
          <Textarea
            rows={5}
            value={data.about.body}
            onChange={(e) =>
              setData({ ...data, about: { ...data.about, body: e.target.value } })
            }
          />
        </Field>
        <Button onClick={() => saveKey("about")} disabled={saving}>
          Save About
        </Button>
      </Section>

      <Section title="Contact">
        <Field label="Email">
          <Input
            type="email"
            value={data.contact.email}
            onChange={(e) =>
              setData({ ...data, contact: { ...data.contact, email: e.target.value } })
            }
          />
        </Field>
        <Field label="Phone">
          <Input
            value={data.contact.phone}
            onChange={(e) =>
              setData({ ...data, contact: { ...data.contact, phone: e.target.value } })
            }
          />
        </Field>
        <Field label="Address">
          <Input
            value={data.contact.address}
            onChange={(e) =>
              setData({ ...data, contact: { ...data.contact, address: e.target.value } })
            }
          />
        </Field>
        <Button onClick={() => saveKey("contact")} disabled={saving}>
          Save Contact
        </Button>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-card p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-1 block">{label}</Label>
      {children}
    </div>
  );
}
