import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { WhyUs } from "@/components/site/WhyUs";
import { Process } from "@/components/site/Process";
import { MoreWorks } from "@/components/site/MoreWorks";
import { ReachOut } from "@/components/site/ReachOut";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Full-Service Digital company| Tmooh Solutions" },
      {
        name: "description",
        content:
          "Complete digital services: web development, mobile apps, professional UI/UX design, and effective digital marketing. With 10+ years of expertise, we turn your ideas into integrated solutions that deliver real results.",
      },
      { property: "og:title", content: "Full-Service Digital company| Tmooh Solutions" },
      {
        property: "og:description",
        content:
          "Complete digital services: web development, mobile apps, professional UI/UX design, and effective digital marketing. With 10+ years of expertise, we turn your ideas into integrated solutions that deliver real results.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <MoreWorks />
        <ReachOut />
      </main>
      <Footer />
    </div>
  );
}
