import { BaseModal } from "@/components/ui/Modals/BaseModal";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";

interface IProps {
  isOpen?: boolean;
  closeModal: () => void;
  title: string;
  message: string;
  isLoading: boolean;
  handleDelete: () => void;
}

export function DeleteModal({
  isOpen = false,
  closeModal,
  title,
  message,
  isLoading,
  handleDelete,
}: IProps) {
  return (
    <BaseModal isOpen={isOpen} closeModal={closeModal} title={title}>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button
          loading={isLoading}
          disabled={isLoading}
          onClick={handleDelete}
          color="error"
        >
          <FormattedMessage id="Common.forms.deleteButton" />
        </Button>
      </DialogActions>
    </BaseModal>
  );
}
