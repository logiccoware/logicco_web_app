import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import type { PropsWithChildren } from "react";
import DialogTitle from "@mui/material/DialogTitle";

interface IProps {
  isOpen?: boolean;
  closeModal: () => void;
  title: string;
  fullScreen?: boolean;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export function BaseModal({
  isOpen = false,
  closeModal,
  title,
  children,
  fullScreen = false,
}: PropsWithChildren<IProps>) {
  return (
    <StyledDialog
      fullScreen={fullScreen}
      fullWidth={!fullScreen}
      maxWidth={fullScreen ? undefined : "sm"}
      open={isOpen}
      onClose={closeModal}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title}
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
      {children}
    </StyledDialog>
  );
}
