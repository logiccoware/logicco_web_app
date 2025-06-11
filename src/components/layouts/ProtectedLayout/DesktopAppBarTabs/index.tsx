import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import ListIcon from "@mui/icons-material/List";
import { AppLink } from "@/components/ui/AppLink";
import { useLocation } from "@tanstack/react-router";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function DesktopAppbarTabs() {
  const { pathname } = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  if (!isDesktop) return null;

  return (
    <Tabs
      value={pathname.includes("/spendings") ? "/transactions/spendings" : pathname}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      <Tab
        label="Spending"
        value="/transactions/spendings"
        icon={<DataUsageIcon />}
        iconPosition="start"
        component={AppLink}
        to="/transactions/spendings/payees"
      />
      <Tab
        label="Transactions"
        value="/transactions/list"
        icon={<ListIcon />}
        iconPosition="start"
        component={AppLink}
        to="/transactions/list"
      />
    </Tabs>
  );
}
