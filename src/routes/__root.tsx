import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { I18nProvider } from "@/lib/i18n";
import { Toaster } from "@/components/ui/sonner";
import { AnimationLayer } from "@/components/site/AnimationLayer";
import { useFontCheck } from "@/lib/useFontCheck";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TMOOH — Smart Digital Solutions" },
      {
        name: "description",
        content:
          "TMOOH builds and launches digital brands — websites, mobile apps, AI, marketing and design.",
      },
      { property: "og:title", content: "TMOOH — Smart Digital Solutions" },
      {
        property: "og:description",
        content:
          "We don't just build. We launch brands. From concept to launch — fast, smart, scalable.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "TMOOH — Smart Digital Solutions" },
      { name: "description", content: "A web application that guides users through sequential instructions and displays company information." },
      { property: "og:description", content: "A web application that guides users through sequential instructions and displays company information." },
      { name: "twitter:description", content: "A web application that guides users through sequential instructions and displays company information." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/rMNoDwZGWKfz026JSSsC0b487v42/social-images/social-1777967158011-WhatsApp_Image_2026-05-03_at_9.59.07_PM.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/rMNoDwZGWKfz026JSSsC0b487v42/social-images/social-1777967158011-WhatsApp_Image_2026-05-03_at_9.59.07_PM.webp" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "shortcut icon", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://ralzzfemcjsbbsrhnffa.supabase.co" },
      {
        rel: "preload",
        href: "/fonts/AlJazeeraArabic-Bold.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useFontCheck();
  return (
    <I18nProvider>
      <Outlet />
      <AnimationLayer />
      <Toaster richColors position="top-center" />
    </I18nProvider>
  );
}
