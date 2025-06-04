import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { ProtectedLayout } from "@/components/layouts/ProtectedLayout";
import { PageLoading } from "@/components/ui/PageLoading";
import { supabase } from "@/lib/supabase/services";

export const Route = createFileRoute("/_protectedLayout")({
  beforeLoad: async ({ location }) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Layout,
  pendingComponent: PageLoading,
});

function Layout() {
  return (
    <ProtectedLayout>
      <Outlet />
    </ProtectedLayout>
  );
}
