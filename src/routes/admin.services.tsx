import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/admin/services")({
  component: () => (
    <CrudPage
      title="Services"
      description="Manage the services shown on your site."
      table="services"
      fields={[
        { name: "name", label: "Name", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea" },
        { name: "icon", label: "Icon name (lucide)", type: "text", placeholder: "e.g. Code2" },
        { name: "sort_order", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "boolean" },
      ]}
      listColumns={[
        { name: "name", label: "Name" },
        { name: "icon", label: "Icon" },
        { name: "sort_order", label: "Order" },
        { name: "published", label: "Status" },
      ]}
    />
  ),
});
