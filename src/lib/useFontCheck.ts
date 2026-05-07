import { useEffect } from "react";
import { toast } from "sonner";

const FONT_FAMILY = "Al Jazeera Arabic";
const WEIGHTS = [
  { weight: "300", url: "/fonts/AlJazeeraArabic-Light.ttf" },
  { weight: "400", url: "/fonts/AlJazeeraArabic-Regular.ttf" },
  { weight: "700", url: "/fonts/AlJazeeraArabic-Bold.ttf" },
];

export function useFontCheck() {
  useEffect(() => {
    if (typeof window === "undefined" || !("fonts" in document)) return;

    let cancelled = false;

    (async () => {
      const failures: string[] = [];

      // 1) Verify each font file is fetchable
      await Promise.all(
        WEIGHTS.map(async ({ weight, url }) => {
          try {
            const res = await fetch(url, { method: "HEAD" });
            if (!res.ok) {
              failures.push(`${url} (HTTP ${res.status})`);
              console.error(`[FontCheck] Failed to load ${url} — HTTP ${res.status}`);
            } else {
              console.info(`[FontCheck] OK ${url} (weight ${weight})`);
            }
          } catch (err) {
            failures.push(`${url} (network error)`);
            console.error(`[FontCheck] Network error loading ${url}`, err);
          }
        }),
      );

      // 2) Verify the browser actually registered & loaded the font face
      try {
        await document.fonts.ready;
        const loadedWeights = WEIGHTS.filter(({ weight }) =>
          document.fonts.check(`${weight} 16px "${FONT_FAMILY}"`),
        );
        console.info(
          `[FontCheck] "${FONT_FAMILY}" loaded weights:`,
          loadedWeights.map((w) => w.weight),
        );
        if (loadedWeights.length === 0) {
          failures.push(`Font face "${FONT_FAMILY}" not registered by browser`);
        }
      } catch (err) {
        failures.push("document.fonts.ready failed");
        console.error("[FontCheck] document.fonts.ready failed", err);
      }

      if (!cancelled && failures.length > 0) {
        toast.error("تعذر تحميل خط Al Jazeera Arabic", {
          description: failures.join(" • "),
          duration: 8000,
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);
}
