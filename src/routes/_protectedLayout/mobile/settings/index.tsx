import { DrawerItems } from "@/components/layouts/ProtectedLayout/DrawerItems";
import { ProtectedPageContainer } from "@/components/layouts/ProtectedLayout/ProtectedPageContainer";
import { createFileRoute, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/_protectedLayout/mobile/settings/")({
  component: SettingsPage,
});

function SettingsPage() {
  const { pathname } = useLocation();
  return (
    <ProtectedPageContainer title="Settings">
      <DrawerItems pathname={pathname} variant="mobile" />
    </ProtectedPageContainer>
  );
}
