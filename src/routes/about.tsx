import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { About } from "@/components/site/About";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Professional Software Solutions" },
      {
        name: "description",
        content:
          "Discover our award-winning web development, mobile app development, e-commerce solutions, digital marketing, graphic design, and UX/UI design services. Expert team with 10+ years experience.",
      },
      { property: "og:title", content: "About Us | Professional Software Solutions" },
      {
        property: "og:description",
        content:
          "Discover our award-winning web development, mobile app development, e-commerce solutions, digital marketing, graphic design, and UX/UI design services. Expert team with 10+ years experience.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        <About />
      </main>
      <Footer />
    </div>
  );
}
