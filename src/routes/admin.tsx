import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin | YatraNexus" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminRoot,
});

function AdminRoot() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/forgot-password";

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Outlet />
      </div>
    );
  }

  return <AdminShell />;
}
