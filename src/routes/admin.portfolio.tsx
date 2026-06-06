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
        { name: "description", label: "Description", type: "textarea" },
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
