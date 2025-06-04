import { AppLogoSvg } from "@/components/ui/AppLogo/AppLogoSvg";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export function AppLogo() {
  return (
    <Stack direction="row">
      <AppLogoSvg />
      <Typography variant="h5">Logicco</Typography>
    </Stack>
  );
}
