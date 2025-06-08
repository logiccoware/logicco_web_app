import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export const PROTECTED_LAYOUT_DRAWER_ITEMS = [
  {
    intlId: "Common.protectedLayout.navbars.links.payees",
    icon: <CorporateFareIcon />,
    href: "/payees",
  },
  {
    intlId: "Common.protectedLayout.navbars.links.accounts",
    icon: <AccountBalanceIcon />,
    href: "/accounts",
  },
];
