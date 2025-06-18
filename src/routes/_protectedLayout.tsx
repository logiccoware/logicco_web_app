import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { ProtectedLayout } from "@/components/layouts/ProtectedLayout";
import { PageLoading } from "@/components/ui/PageLoading";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase/client";

export const Route = createFileRoute("/_protectedLayout")({
  beforeLoad: async ({ location }) => {
    const auth = getAuth(firebaseApp);

    try {
      const user = await new Promise<User | null>((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
          auth,
          (currentUser: User | null) => {
            unsubscribe();
            resolve(currentUser);
          },
          (error) => {
            unsubscribe();
            reject(error);
          }
        );
      });

      if (!user) {
        throw redirect({
          to: "/login",
          search: {
            redirect: location.pathname,
          },
        });
      }
    } catch (error) {
      throw error;
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
