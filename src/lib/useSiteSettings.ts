import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SiteSettings = {
  hero: { title?: string; subtitle?: string; cta?: string };
  about: { title?: string; body?: string };
  contact: { email?: string; phone?: string; address?: string };
};

const empty: SiteSettings = { hero: {}, about: {}, contact: {} };

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(empty);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("key,value")
      .then(({ data }) => {
        if (!data) return;
        const next: SiteSettings = { hero: {}, about: {}, contact: {} };
        data.forEach((r: any) => {
          if (r.key in next) (next as any)[r.key] = r.value ?? {};
        });
        setSettings(next);
      });
  }, []);

  return settings;
}
