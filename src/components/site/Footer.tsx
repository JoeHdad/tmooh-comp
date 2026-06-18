import { useI18n } from "@/lib/i18n";
import logo from "@/assets/tmooh-logo.svg";
import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle } from "lucide-react";

export function Footer() {
  const { t, lang } = useI18n();

  const isRtl = lang === "ar";

  return (
    <footer className="relative border-t border-white/10 bg-[#121212] py-16 text-foreground">
      <div className="container mx-auto max-w-7xl px-6">
        {/* 6-Column Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {/* Column 1: Logo & Company Desc */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <img src={logo} alt="TMOOH" className="h-12 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed text-neutral-400 max-w-xs">
              {t("footer.desc")}
            </p>
          </div>

          {/* Column 2: Site Map */}
          <div>
            <h3 className="font-display text-sm font-semibold tracking-wider text-neutral-200 uppercase">
              {t("footer.col.sitemap")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors">
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-primary transition-colors">
                  {t("nav.portfolio")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="font-display text-sm font-semibold tracking-wider text-neutral-200 uppercase">
              {t("footer.col.company")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  {t("footer.links.whoweare")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  {t("footer.links.story")}
                </Link>
              </li>
              <li>
                <a href="#why-us" className="hover:text-primary transition-colors">
                  {t("footer.links.why")}
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Works */}
          <div>
            <h3 className="font-display text-sm font-semibold tracking-wider text-neutral-200 uppercase">
              {t("footer.col.works")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
              <li>
                <Link to="/portfolio" className="hover:text-primary transition-colors">
                  {t("nav.portfolio")}
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-primary transition-colors">
                  {t("footer.links.casestudies")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  {t("footer.links.profile")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Services */}
          <div>
            <h3 className="font-display text-sm font-semibold tracking-wider text-neutral-200 uppercase">
              {t("footer.col.services")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
              <li>
                <Link to="/services/$serviceId" params={{ serviceId: "s4" }} className="hover:text-primary transition-colors">
                  {t("footer.services.s4")}
                </Link>
              </li>
              <li>
                <Link to="/services/$serviceId" params={{ serviceId: "s1" }} className="hover:text-primary transition-colors">
                  {t("footer.services.s1")}
                </Link>
              </li>
              <li>
                <Link to="/services/$serviceId" params={{ serviceId: "s3" }} className="hover:text-primary transition-colors">
                  {t("footer.services.s3")}
                </Link>
              </li>
              <li>
                <Link to="/services/$serviceId" params={{ serviceId: "s2" }} className="hover:text-primary transition-colors">
                  {t("footer.services.s2")}
                </Link>
              </li>
              <li>
                <Link to="/services/$serviceId" params={{ serviceId: "s5" }} className="hover:text-primary transition-colors">
                  {t("footer.services.s5")}
                </Link>
              </li>
              <li>
                <Link to="/services/$serviceId" params={{ serviceId: "s6" }} className="hover:text-primary transition-colors">
                  {t("footer.services.s6")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © {new Date().getFullYear()} TMOOH. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-6">
            <a href="mailto:tmooh.contact@gmail.com" className="hover:text-primary transition-colors">
              tmooh.contact@gmail.com
            </a>
            <a href="tel:+970595172603" className="hover:text-primary transition-colors">
              +970 595 172 603
            </a>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/970595172603"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:scale-110 hover:bg-emerald-600 hover:shadow-emerald-500/40 active:scale-95 ${
          isRtl ? "left-6" : "right-6"
        }`}
        aria-label="Contact Tmooh on WhatsApp"
      >
        <MessageCircle className="h-7 w-7 fill-white text-emerald-500" />
      </a>
    </footer>
  );
}
