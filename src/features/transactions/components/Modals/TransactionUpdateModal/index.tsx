import { useQuery } from "@tanstack/react-query";
import { foldQuery } from "@/lib/helpers/foldQuery";
import { ModalContentLoading } from "@/components/ui/Modals/ModalContentLoading";
import { ModalContentMessage } from "@/components/ui/Modals/ModalContentMessage";
import { FormattedMessage, useIntl } from "react-intl";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { transactionQueryOptions } from "@/features/transactions/api/queries/transactionQuery";
import { UpdateContent } from "./UpdateContent";
import { useAccountDefaultCookie } from "@/features/accounts/hooks/useAccountDefaultCookie";

interface IProps {
  closeModal: () => void;
  transactionId: string;
}

export function TransactionUpdateModal({ closeModal, transactionId }: IProps) {
  const { accountDefaultCookie } = useAccountDefaultCookie();
  const intl = useIntl();
  const query = useQuery(transactionQueryOptions(transactionId));
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth={!fullScreen}
      maxWidth={fullScreen ? undefined : "sm"}
      open
      onClose={closeModal}
      scroll="paper"
    >
      <DialogTitle>
        {intl.formatMessage({ id: "Transactions.modals.update.title" })}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={closeModal}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      {foldQuery(query, {
        loadingComponent: () => <ModalContentLoading />,
        successComponent: (data) => {
          if (data && accountDefaultCookie) {
            return (
              <UpdateContent
                closeModal={closeModal}
                transaction={data}
                account={accountDefaultCookie}
              />
            );
          }
          return null;
        },
        errorComponent: () => (
          <ModalContentMessage type="error">
            <FormattedMessage id="Common.genericErrorMessage" />
          </ModalContentMessage>
        ),
      })}
    </Dialog>
  );
}
