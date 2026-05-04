import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/admin/testimonials")({
  component: () => (
    <CrudPage
      title="Testimonials"
      description="Manage client reviews."
      table="testimonials"
      fields={[
        { name: "name", label: "Client name", type: "text", required: true },
        { name: "role", label: "Role / Company", type: "text" },
        { name: "avatar_url", label: "Avatar URL", type: "url" },
        { name: "content", label: "Testimonial", type: "textarea", required: true },
        { name: "rating", label: "Rating (1-5)", type: "number" },
        { name: "sort_order", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "boolean" },
      ]}
      listColumns={[
        { name: "name", label: "Name" },
        { name: "role", label: "Role" },
        { name: "rating", label: "Rating" },
        { name: "published", label: "Status" },
      ]}
    />
  ),
});
