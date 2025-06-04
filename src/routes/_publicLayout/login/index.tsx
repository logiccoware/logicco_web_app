import { createFileRoute } from "@tanstack/react-router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { LoginFormFields } from "@/features/auth/components/LoginFormFields";
import { PublicPageContainer } from "@/components/layouts/PublicLayout/PublicPageContainer";
import { useLoginForm } from "@/features/auth/api/login/forms/hooks/useLoginForm";
import type { SubmitHandler } from "react-hook-form";
import type { TLoginFormValidatedFields } from "@/features/auth/api/login/forms/schema";
import { useLoginMutation } from "@/features/auth/api/login/mutations/useLoginMutation";
import { useIntl } from "react-intl";
import { InvalidLoginCredentialsError } from "@/features/auth/exceptions/InvalidLoginCredentialsError";
import { useSnackbar } from "notistack";
import { DEFAULT_SNACKBAR_ERROR_MESSAGE_ID } from "@/lib/localization/constants";

export const Route = createFileRoute("/_publicLayout/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const t = useIntl();
  const navigate = Route.useNavigate();
  const form = useLoginForm();
  const loginMutation = useLoginMutation();
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit: SubmitHandler<TLoginFormValidatedFields> = (data) => {
    loginMutation.mutate(
      {
        payload: {
          email: data.email,
          password: data.password,
        },
      },
      {
        onSuccess: () => {
          navigate({ to: "/" });
        },
        onError: (error: unknown) => {
          const isInvalidLoginError =
            error instanceof InvalidLoginCredentialsError;

          enqueueSnackbar({
            variant: "error",
            message: t.formatMessage({
              id: isInvalidLoginError
                ? "Auth.login.form.errorMessage"
                : DEFAULT_SNACKBAR_ERROR_MESSAGE_ID,
            }),
          });
        },
      }
    );
  };
  return (
    <PublicPageContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card sx={{ width: 400, maxWidth: "90vw" }}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader
              title={t.formatMessage({ id: "Auth.login.page.title" })}
              subheader="Continue with Logicco"
            />
            <CardContent>
              <LoginFormFields form={form} />
            </CardContent>
            <CardActions>
              <Button type="submit" fullWidth>
                Sign In
              </Button>
            </CardActions>
          </form>
        </Card>
      </Box>
    </PublicPageContainer>
  );
}
