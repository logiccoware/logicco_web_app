import type { AuthContext } from "@/features/auth/context/AuthProvider";
import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { HeadContent } from "@tanstack/react-router";

interface AppRouterContext {
  auth: AuthContext;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<AppRouterContext>()({
  head: () => ({
    meta: [
      {
        name: "description",
        content:
          "Manage your finances effectively with this personal financial management app.",
      },
      {
        title: "Monovra - Finances",
      },
      {
        name: "keywords",
        content: "finance, budgeting, money management, personal finance",
      },
    ],
  }),
  component: () => (
    <>
      <HeadContent />
      <Outlet />
      <TanStackRouterDevtools position="top-right" />
    </>
  ),
});
