import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — TMOOH" },
      { name: "description", content: "Tell us about your project — we'll get back to you fast." },
      { property: "og:title", content: "Contact — TMOOH" },
      { property: "og:description", content: "Start a conversation and launch your next digital product." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
