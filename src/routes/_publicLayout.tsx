import { PublicLayout } from "@/components/layouts/PublicLayout";
import { supabase } from "@/lib/supabase/services";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_publicLayout")({
  beforeLoad: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      throw redirect({
        to: "/transactions/list",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
}
