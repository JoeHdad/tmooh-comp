import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";
import type { TranslateMapEntry } from "@/lib/gemini-translate";

const CATEGORY_OPTIONS = [
  { value: "web",       label: "🌐 Web Development" },
  { value: "mobile",    label: "📱 Mobile Apps" },
  { value: "ai",        label: "🤖 AI & Automation" },
  { value: "design",    label: "🎨 UI/UX Design" },
  { value: "graphics",  label: "🖌️ Graphic Design" },
  { value: "marketing", label: "📣 Digital Marketing" },
];

/** Mapping: English fields → their Arabic counterparts to be auto-translated */
const TRANSLATE_MAP: TranslateMapEntry[] = [
  { from: "description",        to: "description_ar",      mode: "text" },
  { from: "industry",           to: "industry_ar",         mode: "text" },
  { from: "services",           to: "services_ar",         mode: "text" },
  { from: "platform",           to: "platform_ar",         mode: "text" },
  { from: "role",               to: "role_ar",             mode: "text" },
  { from: "challenge",          to: "challenge_ar",        mode: "text" },
  { from: "solution",           to: "solution_ar",         mode: "text" },
  { from: "highlights_en_json", to: "highlights_ar_json",  mode: "highlights_json" },
  { from: "scope",              to: "scope_ar",            mode: "array" },
];

export const Route = createFileRoute("/admin/portfolio")({
  component: () => (
    <CrudPage
      title="Portfolio"
      description="Manage your project showcase. Arabic content is auto-translated by AI upon saving."
      table="portfolio_projects"
      autoTranslateMap={TRANSLATE_MAP}
      fields={[
        { name: "title",       label: "Title",          type: "text",     required: true },
        { name: "description", label: "Description",    type: "textarea", placeholder: "Short project description (English)" },
        {
          name:  "image_url",
          label: "Project Image",
          type:  "image",
          placeholder: "https://...",
        },
        { name: "link_url",   label: "Project Link",    type: "url" },
        {
          name:    "category",
          label:   "Category",
          type:    "select",
          options: CATEGORY_OPTIONS,
        },
        { name: "industry", label: "Industry",          type: "text",     placeholder: "e.g. Retail & E-Commerce" },
        { name: "services", label: "Services",          type: "text",     placeholder: "e.g. Custom Web Dev, UI/UX Design" },
        { name: "platform", label: "Platform",          type: "text",     placeholder: "e.g. Web Application" },
        { name: "role",     label: "Role",              type: "text",     placeholder: "e.g. Full-Stack Engineering" },
        { name: "challenge",label: "Challenge",         type: "textarea", placeholder: "Describe the technical challenge (English)" },
        { name: "solution", label: "Solution / Approach", type: "textarea", placeholder: "Describe the approach and solution (English)" },
        {
          name: "highlights_en_json",
          label: "Highlights (JSON array)",
          type: "textarea",
          placeholder: '[{"title": "Built for speed", "desc": "lightning fast"}]',
        },
        {
          name: "scope",
          label: "Scope of Work",
          type: "string_array",
          placeholder: "Next.js\nSupabase\nTailwind\n(one item per line)",
        },
        { name: "gallery",    label: "Gallery Images",  type: "gallery" },
        { name: "sort_order", label: "Sort Order",      type: "number" },
        { name: "published",  label: "Published",       type: "boolean" },
      ]}
      listColumns={[
        { name: "image_url",  label: "Image" },
        { name: "title",      label: "Title" },
        { name: "category",   label: "Category" },
        { name: "sort_order", label: "Order" },
        { name: "published",  label: "Status" },
      ]}
    />
  ),
});
