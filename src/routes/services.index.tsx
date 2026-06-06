import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Services } from "@/components/site/Services";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Web Development, Mobile Apps & Digital Marketing Services | Tmooh" },
      {
        name: "description",
        content:
          "Professional digital services: custom web development, mobile app development, AI automation, UI/UX design & SEO. We deliver high-performance solutions that drive measurable business growth. Get your free consultation today.",
      },
      { property: "og:title", content: "Web Development, Mobile Apps & Digital Marketing Services | Tmooh" },
      {
        property: "og:description",
        content:
          "Professional digital services: custom web development, mobile app development, AI automation, UI/UX design & SEO. We deliver high-performance solutions that drive measurable business growth. Get your free consultation today.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28">
        <Services isPage />
      </main>
      <Footer />
    </div>
  );
}
