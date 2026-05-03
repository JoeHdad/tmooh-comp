import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { About } from "@/components/site/About";
import { Testimonials } from "@/components/site/Testimonials";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — TMOOH" },
      { name: "description", content: "Who we are: a passionate team building meaningful digital products." },
      { property: "og:title", content: "About — TMOOH" },
      { property: "og:description", content: "Our vision, mission, and the team behind TMOOH." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28">
        <About />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
