import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Services } from "@/components/site/Services";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — TMOOH" },
      { name: "description", content: "AI, web, mobile, marketing, and design services from TMOOH." },
      { property: "og:title", content: "Services — TMOOH" },
      { property: "og:description", content: "Explore the smart digital services we build and launch." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28">
        <Services />
      </main>
      <Footer />
    </div>
  );
}
