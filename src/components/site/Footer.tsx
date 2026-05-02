import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="container mx-auto max-w-6xl px-6 text-center">
        <div className="font-display text-5xl font-bold text-gradient">TMOOH</div>
        <p className="mt-4 text-sm text-muted-foreground">
          © {new Date().getFullYear()} TMOOH. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
