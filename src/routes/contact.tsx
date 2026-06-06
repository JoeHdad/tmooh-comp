import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Tmooh Solutions | Get a Free Consultation" },
      {
        name: "description",
        content:
          "Ready to scale your business? Contact Tmooh Solutions today for custom websites, mobile apps, AI automation, and digital marketing. Let's talk!",
      },
      { property: "og:title", content: "Contact Tmooh Solutions | Get a Free Consultation" },
      {
        property: "og:description",
        content:
          "Ready to scale your business? Contact Tmooh Solutions today for custom websites, mobile apps, AI automation, and digital marketing. Let's talk!",
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
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
