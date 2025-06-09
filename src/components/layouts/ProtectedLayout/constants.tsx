import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CategoryIcon from '@mui/icons-material/Category'; 

export const PROTECTED_LAYOUT_DRAWER_ITEMS = {
  payee: {
    intlId: "Common.protectedLayout.navbars.links.payees",
    icon: <CorporateFareIcon />,
    href: "/payees",
  },
  account: {
    intlId: "Common.protectedLayout.navbars.links.accounts",
    icon: <AccountBalanceIcon />,
    href: "/accounts",
  },
  category: {
    intlId: "Common.protectedLayout.navbars.links.categories",
    icon: <CategoryIcon />,
  }
};
