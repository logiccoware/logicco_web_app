import { useLogoutMutation } from "@/features/auth/api/login/mutations/useLogoutMutation";
import { DEFAULT_SNACKBAR_ERROR_MESSAGE_ID } from "@/lib/localization/constants";
import { useNavigate } from "@tanstack/react-router";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";

export function useLogout() {
  const t = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const logoutMutation = useLogoutMutation();
  const navigate = useNavigate();
  async function logout() {
    logoutMutation.mutate(null, {
      onSuccess: () => {
        navigate({ to: "/login" });
      },
      onError: () => {
        enqueueSnackbar(
          t.formatMessage({ id: DEFAULT_SNACKBAR_ERROR_MESSAGE_ID }),
          {
            variant: "error",
          }
        );
      },
    });
  }
  return {
    logout,
    isLoading: logoutMutation.isPending,
  };
}
