import { ProtectedPageContainer } from "@/components/layouts/ProtectedLayout/ProtectedPageContainer";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";

export function ComingSoonPage() {
  return (
    <ProtectedPageContainer>
      <Typography textAlign="center" sx={{ mt: 4 }} variant="h4">
        <FormattedMessage id="Common.comingSoon" />
      </Typography>
    </ProtectedPageContainer>
  );
}
