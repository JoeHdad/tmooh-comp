import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";

const CATEGORY_OPTIONS = [
  { value: "web",       label: "🌐 Web Development" },
  { value: "mobile",    label: "📱 Mobile Apps" },
  { value: "ai",        label: "🤖 AI & Automation" },
  { value: "design",    label: "🎨 UI/UX Design" },
  { value: "marketing", label: "📣 Digital Marketing" },
];

export const Route = createFileRoute("/admin/portfolio")({
  component: () => (
    <CrudPage
      title="Portfolio"
      description="Manage your project showcase."
      table="portfolio_projects"
      fields={[
        { name: "title",       label: "Title",       type: "text",     required: true },
        { name: "description", label: "DescriptionEn", type: "textarea" },
        { name: "description_ar", label: "DescriptionAr", type: "textarea" },
        {
          name:  "image_url",
          label: "Project Image",
          type:  "image",
          placeholder: "https://...",
        },
        { name: "link_url",   label: "Project Link", type: "url" },
        {
          name:    "category",
          label:   "Category",
          type:    "select",
          options: CATEGORY_OPTIONS,
        },
        { name: "industry",     label: "Industry (En)",    type: "text" },
        { name: "industry_ar",  label: "Industry (Ar)",    type: "text" },
        { name: "services",     label: "Services (En)",    type: "text" },
        { name: "services_ar",  label: "Services (Ar)",    type: "text" },
        { name: "platform",     label: "Platform (En)",    type: "text" },
        { name: "platform_ar",  label: "Platform (Ar)",    type: "text" },
        { name: "role",         label: "Role (En)",        type: "text" },
        { name: "role_ar",      label: "Role (Ar)",        type: "text" },
        { name: "challenge",    label: "Challenge (En)",   type: "textarea" },
        { name: "challenge_ar", label: "Challenge (Ar)",   type: "textarea" },
        { name: "solution",     label: "Solution (En)", type: "textarea" },
        { name: "solution_ar",  label: "Solution (Ar)", type: "textarea" },
        { name: "highlights_en_json", label: "Highlights JSON En (array of {title, desc})", type: "textarea", placeholder: '[{"title": "Built for speed", "desc": "lightning fast"}]' },
        { name: "highlights_ar_json", label: "Highlights JSON Ar (array of {title, desc})", type: "textarea", placeholder: '[{"title": "مصمم للسرعة", "desc": "سريع جدا"}]' },
        { name: "scope",  label: "Scope (En)", type: "string_array", placeholder: "Next.js\nSupabase\nTailwind" },
        { name: "scope_ar",  label: "Scope (Ar)", type: "string_array", placeholder: "تصميم واجهات\nبرمجة" },
        { name: "gallery", label: "Gallery Images", type: "gallery" },
        { name: "sort_order", label: "Sort Order",   type: "number" },
        { name: "published",  label: "Published",    type: "boolean" },
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
