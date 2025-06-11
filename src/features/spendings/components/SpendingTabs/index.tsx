import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { AppLink } from "@/components/ui/AppLink";
import { useLocation } from "@tanstack/react-router";

export function SpendingTabs() {
  const { pathname } = useLocation();
  return (
    <Tabs value={pathname}>
      <Tab
        to="/transactions/spendings/payees"
        value="/transactions/spendings/payees"
        label="Payee"
        component={AppLink}
      />
      <Tab
        to="/transactions/spendings/categories"
        value="/transactions/spendings/categories"
        label="Category"
        component={AppLink}
      />
    </Tabs>
  );
}
