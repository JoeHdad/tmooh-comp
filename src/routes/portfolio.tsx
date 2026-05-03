import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Portfolio } from "@/components/site/Portfolio";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — TMOOH" },
      { name: "description", content: "Selected projects we designed, built, and launched." },
      { property: "og:title", content: "Portfolio — TMOOH" },
      { property: "og:description", content: "A showcase of websites, apps, and brands we've launched." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28">
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}
