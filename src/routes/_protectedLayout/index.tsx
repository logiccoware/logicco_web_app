import { ComingSoonPage } from "@/components/ui/ComingSoonPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protectedLayout/")({
  component: ComingSoonPage,
});
