import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Send } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  full_name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  company_name: z.string().trim().max(150).optional().or(z.literal("")),
  project_details: z.string().trim().min(1).max(2000),
  agree: z.literal(true),
});

export function Contact() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    project_details: "",
    agree: false,
  });

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? t("contact.error"));
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert({
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      company_name: form.company_name.trim() || null,
      project_details: form.project_details.trim(),
    });
    setLoading(false);
    if (error) {
      toast.error(t("contact.error"));
      return;
    }
    toast.success(t("contact.success"));
    setForm({ full_name: "", email: "", phone: "", company_name: "", project_details: "", agree: false });
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container mx-auto max-w-3xl px-6">
        <h2 className="text-center font-display text-4xl font-bold sm:text-5xl">
          {t("contact.title")}
        </h2>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-3xl border border-white/10 bg-card p-6 shadow-card sm:p-10"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold">{t("contact.send")}</h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={t("contact.fullName") + " *"}>
              <input
                required
                value={form.full_name}
                onChange={(e) => set("full_name", e.target.value)}
                maxLength={100}
                className={inputCls}
                placeholder={t("contact.fullName")}
              />
            </Field>
            <Field label={t("contact.email") + " *"}>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                maxLength={255}
                className={inputCls}
                placeholder="example@email.com"
              />
            </Field>
            <Field label={t("contact.phone")}>
              <input
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                maxLength={30}
                className={inputCls}
                placeholder="+972 59 870 8958"
              />
            </Field>
            <Field label={t("contact.company")}>
              <input
                value={form.company_name}
                onChange={(e) => set("company_name", e.target.value)}
                maxLength={150}
                className={inputCls}
                placeholder={t("contact.companyPh")}
              />
            </Field>
          </div>

          <div className="mt-5">
            <Field label={t("contact.details") + " *"}>
              <textarea
                required
                rows={5}
                value={form.project_details}
                onChange={(e) => set("project_details", e.target.value)}
                maxLength={2000}
                className={`${inputCls} resize-y`}
                placeholder={t("contact.detailsPh")}
              />
            </Field>
          </div>

          <label className="mt-5 flex items-start gap-3 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={(e) => set("agree", e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-white/20 bg-transparent accent-primary"
              required
            />
            <span>{t("contact.agree")}</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-3.5 font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
            {loading ? t("contact.submitting") : t("contact.submit")}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-2xl border border-white/10 bg-background/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/30";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-foreground/90">{label}</span>
      {children}
    </label>
  );
}
