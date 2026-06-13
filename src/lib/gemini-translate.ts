const GEMINI_API_KEY = "AIzaSyCyF29PmF7ZqNTtwDsSLh-hUM5d9TCLB4A";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

async function callGemini(prompt: string): Promise<string> {
  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });
  if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";
}

/** Translate a plain text string from English to Arabic */
export async function translateText(text: string): Promise<string> {
  if (!text?.trim()) return "";
  return callGemini(
    `Translate the following text to Arabic. Return ONLY the translated text with no extra explanation:\n\n${text}`
  );
}

/** Translate each element of a string array from English to Arabic */
export async function translateStringArray(arr: string[]): Promise<string[]> {
  if (!arr || arr.length === 0) return [];
  // Translate all at once in a single request for efficiency
  const joined = arr.map((s, i) => `${i + 1}. ${s}`).join("\n");
  const result = await callGemini(
    `Translate each of the following items to Arabic. Return ONLY the numbered list in the same format:\n\n${joined}`
  );
  // Parse back the numbered list
  const lines = result.split("\n").filter((l) => l.trim());
  return lines.map((l) => l.replace(/^\d+\.\s*/, "").trim()).filter(Boolean);
}

/** Translate a JSON string of [{title, desc}] highlights from English to Arabic */
export async function translateHighlightsJson(jsonStr: string): Promise<string> {
  if (!jsonStr?.trim()) return "";
  try {
    const arr: { title: string; desc: string }[] = JSON.parse(jsonStr);
    const prompt = `Translate the following JSON array of objects to Arabic. Each object has "title" and "desc" fields. Return ONLY valid JSON with the same structure:\n\n${JSON.stringify(arr, null, 2)}`;
    const result = await callGemini(prompt);
    // Extract JSON from result (strip any markdown fences)
    const cleaned = result.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    JSON.parse(cleaned); // validate
    return cleaned;
  } catch {
    return "";
  }
}

export type TranslateMode = "text" | "array" | "highlights_json";

export interface TranslateMapEntry {
  from: string;       // English field name
  to: string;         // Arabic field name to populate
  mode?: TranslateMode; // default "text"
}

/**
 * Given a data record and a translation map, returns the Arabic fields to merge.
 * Returns an object with the translated `to` fields filled in.
 */
export async function autoTranslateRecord(
  record: Record<string, any>,
  map: TranslateMapEntry[]
): Promise<Record<string, any>> {
  const translated: Record<string, any> = {};
  await Promise.all(
    map.map(async ({ from, to, mode = "text" }) => {
      const value = record[from];
      if (!value) return;
      try {
        if (mode === "array" && Array.isArray(value)) {
          translated[to] = await translateStringArray(value);
        } else if (mode === "highlights_json" && typeof value === "string") {
          translated[to] = await translateHighlightsJson(value);
        } else if (typeof value === "string") {
          translated[to] = await translateText(value);
        }
      } catch (e) {
        console.error(`Translation failed for field ${from}:`, e);
      }
    })
  );
  return translated;
}
