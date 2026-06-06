import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/portfolio")({
  component: Page,
});

function Page() {
  return <Outlet />;
}
