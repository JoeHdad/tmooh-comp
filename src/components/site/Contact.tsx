import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Send, MessageCircle, Phone, Sparkles } from "lucide-react";
import { toast } from "sonner";

const EMAIL = "tmooh.solutions@gmail.com";
const WHATSAPP = "+970595172603";
const WHATSAPP_LINK = "https://wa.me/970595172603";
const PHONE = "+970595172603";

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

  const cards = [
    { key: "reach.email", label: EMAIL, Icon: Mail, href: `mailto:${EMAIL}` },
    { key: "reach.whatsapp", label: WHATSAPP, Icon: MessageCircle, href: WHATSAPP_LINK, target: "_blank" },
    { key: "contact.card.phone", label: PHONE, Icon: Phone, href: `tel:${PHONE}` },
  ];

  return (
    <section id="contact" className="relative py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[350px] w-[350px] rounded-full bg-primary/10 blur-[130px]" />
      </div>

      <div className="container mx-auto max-w-6xl px-6">
        {/* Title & Description Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow">
              {t("contact.title")}
            </p>
            <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl text-gradient leading-tight" dir="auto">
              {t("contact.page.title")}
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground" dir="auto">
              {t("contact.page.desc")}
            </p>
          </motion.div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Submission Form Side */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-3xl border border-white/10 bg-card/60 backdrop-blur p-6 shadow-card sm:p-10"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <Sparkles className="h-5 w-5" />
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

            <label className="mt-5 flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
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
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-3.5 font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 disabled:opacity-60 cursor-pointer"
            >
              <Send className="h-4 w-4" />
              {loading ? t("contact.submitting") : t("contact.submit")}
            </button>
          </motion.form>

          {/* Cards Side */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {cards.map(({ key, label, Icon, href, target }, i) => (
              <motion.a
                key={key}
                href={href}
                target={target}
                rel={target ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group flex items-center gap-5 rounded-3xl border border-white/10 bg-card/40 p-6 shadow-card hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow" dir="auto">
                    {t(key)}
                  </div>
                  <div
                    className="mt-1 font-display text-base sm:text-lg font-bold text-foreground transition group-hover:text-primary-glow"
                    dir="ltr"
                  >
                    {label}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
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
