import { useI18n, type Lang } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/tmooh-logo.svg";

const navItems = [
  { key: "nav.home", to: "/" as const },
  { key: "nav.services", to: "/services" as const },
  { key: "nav.portfolio", to: "/portfolio" as const },
  { key: "nav.about", to: "/about" as const },
  { key: "nav.contact", to: "/contact" as const },
];

export function Header() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = () => setLang(lang === "en" ? ("ar" as Lang) : ("en" as Lang));

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <div className="w-full max-w-5xl">
        <nav
          className={`flex w-full items-center justify-between gap-3 rounded-full border border-white/10 px-3 py-2 transition-all sm:gap-6 sm:px-5 ${
            scrolled ? "bg-background/80 backdrop-blur-xl shadow-card" : "bg-card/40 backdrop-blur-md"
          }`}
        >
          <Link to="/" className="flex items-center gap-2 ps-1" onClick={() => setOpen(false)}>
            <img src={logo} alt="TMOOH" className="h-9 w-auto" />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: true }}
                  activeProps={{ className: "bg-white/10 text-foreground" }}
                  className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-foreground/80 transition hover:bg-white/5"
            >
              {lang === "en" ? "ع" : "EN"}
            </button>
            <Link
              to="/contact"
              className="hidden rounded-full bg-gradient-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow transition hover:opacity-90 sm:inline-block sm:text-sm"
            >
              {t("nav.cta")}
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-foreground md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-2 rounded-3xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-card p-3 md:hidden"
            >
              <ul className="flex flex-col">
                {navItems.map((item) => (
                  <li key={item.key}>
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      activeOptions={{ exact: true }}
                      activeProps={{ className: "bg-white/10 text-foreground" }}
                      className="block rounded-2xl px-4 py-3 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
                <li className="mt-2">
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl bg-gradient-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground shadow-glow"
                  >
                    {t("nav.cta")}
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

