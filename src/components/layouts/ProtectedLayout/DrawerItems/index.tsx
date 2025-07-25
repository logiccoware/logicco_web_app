import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { PROTECTED_LAYOUT_DRAWER_ITEMS } from "@/components/layouts/ProtectedLayout/constants";
import IconLogout from "@mui/icons-material/Logout";
import Stack from "@mui/material/Stack";
import { AppLink } from "@/components/ui/AppLink";
import { useIntl } from "react-intl";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { CategoryManageModal } from "@/features/categories/components/Modals/CategoryManageModal";
import { useDisclosure } from "@/lib/hooks/useDisclosure";

interface IProps {
  pathname?: string;
  variant?: "default" | "mobile";
}

export function DrawerItems({ pathname, variant = "default" }: IProps) {
  const [
    isCategoryManageModalOpen,
    { open: openCategoryManageModal, close: closeCategoryManageModal },
  ] = useDisclosure();
  const intl = useIntl();
  const { logout, isLoading: isLogoutLoading } = useLogout();

  async function handleLogout() {
    await logout();
  }

  function handleOpenCategoryManageModal() {
    openCategoryManageModal();
  }

  return (
    <>
      {isCategoryManageModalOpen ? (
        <CategoryManageModal
          closeModal={closeCategoryManageModal}
          mode={{
            type: "manage",
          }}
        />
      ) : null}
      <Stack
        sx={{ height: variant === "default" ? "calc(100vh - 64px)" : "" }}
        justifyContent="space-between"
        direction="column"
      >
        <List>
          <ListItem divider disablePadding>
            <ListItemButton
              component={AppLink}
              to={PROTECTED_LAYOUT_DRAWER_ITEMS.payee.href}
              selected={pathname === PROTECTED_LAYOUT_DRAWER_ITEMS.payee.href}
            >
              <ListItemIcon>
                {PROTECTED_LAYOUT_DRAWER_ITEMS.payee.icon}
              </ListItemIcon>
              <ListItemText
                primary={intl.formatMessage({
                  id: PROTECTED_LAYOUT_DRAWER_ITEMS.payee.intlId,
                })}
              />
            </ListItemButton>
          </ListItem>
          <ListItem divider disablePadding>
            <ListItemButton
              component={AppLink}
              to={PROTECTED_LAYOUT_DRAWER_ITEMS.account.href}
              selected={pathname === PROTECTED_LAYOUT_DRAWER_ITEMS.account.href}
            >
              <ListItemIcon>
                {PROTECTED_LAYOUT_DRAWER_ITEMS.account.icon}
              </ListItemIcon>
              <ListItemText
                primary={intl.formatMessage({
                  id: PROTECTED_LAYOUT_DRAWER_ITEMS.account.intlId,
                })}
              />
            </ListItemButton>
          </ListItem>
          <ListItem divider disablePadding>
            <ListItemButton onClick={handleOpenCategoryManageModal}>
              <ListItemIcon>
                {PROTECTED_LAYOUT_DRAWER_ITEMS.category.icon}
              </ListItemIcon>
              <ListItemText
                primary={intl.formatMessage({
                  id: PROTECTED_LAYOUT_DRAWER_ITEMS.category.intlId,
                })}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              disabled={isLogoutLoading}
              onClick={() => handleLogout()}
            >
              <ListItemIcon>
                <IconLogout />
              </ListItemIcon>
              <ListItemText
                primary={intl.formatMessage({
                  id: "Common.protectedLayout.drawerButtons.logout",
                })}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Stack>
    </>
  );
}
