import { createFileRoute } from '@tanstack/react-router'
import { ComingSoonPage } from "@/components/ui/ComingSoonPage";


export const Route = createFileRoute('/_protectedLayout/transactions/')({
  component: ComingSoonPage,
})

