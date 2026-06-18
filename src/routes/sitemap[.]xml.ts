import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const origin = url.origin || "https://tmooh.com";

        // Static routes
        const staticPaths = ["", "/about", "/services", "/portfolio", "/contact"];

        // Predefined fallback service & portfolio IDs to ensure they are always present
        const fallbackServices = ["s1", "s2", "s3", "s4", "s5", "s6"];
        const fallbackPortfolios = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9"];

        let serviceIds: string[] = [...fallbackServices];
        let portfolioIds: string[] = [...fallbackPortfolios];

        try {
          // Fetch dynamic services
          const { data: dbServices } = await supabase
            .from("services")
            .select("id")
            .eq("published", true);

          if (dbServices && dbServices.length > 0) {
            const ids = dbServices.map((s) => s.id);
            // Combine and deduplicate
            serviceIds = Array.from(new Set([...serviceIds, ...ids]));
          }
        } catch (error) {
          console.error("Failed to fetch services for sitemap:", error);
        }

        try {
          // Fetch dynamic portfolio projects
          const { data: dbProjects } = await supabase
            .from("portfolio_projects")
            .select("id")
            .eq("published", true);

          if (dbProjects && dbProjects.length > 0) {
            const ids = dbProjects.map((p) => p.id);
            // Combine and deduplicate
            portfolioIds = Array.from(new Set([...portfolioIds, ...ids]));
          }
        } catch (error) {
          console.error("Failed to fetch portfolio projects for sitemap:", error);
        }

        // Generate URL tags
        const sitemapEntries: string[] = [];

        // 1. Static Pages
        staticPaths.forEach((path) => {
          sitemapEntries.push(`  <url>
    <loc>${origin}${path}</loc>
    <changefreq>daily</changefreq>
    <priority>${path === "" ? "1.0" : "0.8"}</priority>
  </url>`);
        });

        // 2. Services Pages
        serviceIds.forEach((id) => {
          sitemapEntries.push(`  <url>
    <loc>${origin}/services/${id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);
        });

        // 3. Portfolio Pages
        portfolioIds.forEach((id) => {
          sitemapEntries.push(`  <url>
    <loc>${origin}/portfolio/${id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);
        });

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join("\n")}
</urlset>`;

        return new Response(xml, {
          status: 200,
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      },
    },
  },
});
