import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/admin/portfolio")({
  component: () => (
    <CrudPage
      title="Portfolio"
      description="Manage your project showcase."
      table="portfolio_projects"
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea" },
        { name: "image_url", label: "Image URL", type: "url" },
        { name: "link_url", label: "Project link", type: "url" },
        { name: "category", label: "Category", type: "text" },
        { name: "sort_order", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "boolean" },
      ]}
      listColumns={[
        { name: "title", label: "Title" },
        { name: "category", label: "Category" },
        { name: "sort_order", label: "Order" },
        { name: "published", label: "Status" },
      ]}
    />
  ),
});
