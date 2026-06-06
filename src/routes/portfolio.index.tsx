import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { PortfolioPage } from "@/components/site/PortfolioPage";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Portfolio - 30+ Web Development & Mobile App Projects | Tmooh" },
      {
        name: "description",
        content:
          "Explore our portfolio of 30+ successful digital projects. From web development to mobile apps, UI/UX design, and digital marketing. See how we've helped businesses transform and achieve measurable results.",
      },
      { property: "og:title", content: "Portfolio - 30+ Web Development & Mobile App Projects | Tmooh" },
      {
        property: "og:description",
        content:
          "Explore our portfolio of 30+ successful digital projects. From web development to mobile apps, UI/UX design, and digital marketing.",
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
        <PortfolioPage />
      </main>
      <Footer />
    </div>
  );
}
