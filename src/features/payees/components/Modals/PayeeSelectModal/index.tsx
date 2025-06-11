import { useQuery } from "@tanstack/react-query";
import { foldQuery } from "@/lib/helpers/foldQuery";
import { ModalContentLoading } from "@/components/ui/Modals/ModalContentLoading";
import { ModalContentMessage } from "@/components/ui/Modals/ModalContentMessage";
import { FormattedMessage, useIntl } from "react-intl";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import type { TPayeeEntity } from "@/features/payees/api/schema";
import { payeesListQueryOptions } from "@/features/payees/api/queries/payeesListQuery";
import { EntitySelectList } from "@/components/ui/EntitySelectList";
import { toPayeeEntitySelectList } from "@/features/payees/api/helpers/toPayeeEntitySelectList";
import { useDisclosure } from "@/lib/hooks/useDisclosure";
import { PayeeCreateModal } from "@/features/payees/components/Modals/PayeeCreateModal";
import { PayeeUpdateModal } from "@/features/payees/components/Modals/PayeeUpdateModal";

interface IProps {
  closeModal: () => void;
  handleOnSelectPayee: (payee: TPayeeEntity | null) => void;
  defaultSelectedPayee: TPayeeEntity | null;
}

export function PayeeSelectModal({
  closeModal,
  handleOnSelectPayee,
  defaultSelectedPayee,
}: IProps) {
  const [selectedPayee, setSelectedPayee] = useState<TPayeeEntity | null>(
    defaultSelectedPayee
  );
  const [isPayeeCreateModalOpen, { open: openAdd, close: closeEdit }] =
    useDisclosure();
  const [isPayeeUpdateModalOpen, { open: openUpdate, close: closeUpdate }] =
    useDisclosure();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const intl = useIntl();
  const query = useQuery(payeesListQueryOptions);

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth={!fullScreen}
      maxWidth={fullScreen ? undefined : "sm"}
      open
      onClose={closeModal}
      scroll="paper"
    >
      <>
        <Stack sx={{ mx: 2 }} direction="row" justifyContent="space-between">
          <DialogTitle>
            {intl.formatMessage({ id: "Payees.modals.select.title" })}
          </DialogTitle>
          <ButtonGroup variant="outlined" size="small">
            <IconButton disableRipple onClick={openAdd}>
              <AddIcon />
            </IconButton>

            <IconButton
              disabled={!Boolean(selectedPayee)}
              onClick={openUpdate}
              disableRipple
            >
              <EditIcon />
            </IconButton>
          </ButtonGroup>
        </Stack>

        <DialogContent sx={{ minHeight: 300 }} dividers>
          {foldQuery(query, {
            loadingComponent: () => <ModalContentLoading />,
            successComponent: (data) => {
              if (data && data.payees?.length > 0) {
                return (
                  <EntitySelectList
                    data={toPayeeEntitySelectList(data.payees)}
                    selectedItemId={selectedPayee?.id ?? null}
                    handleItemClick={(item) => {
                      setSelectedPayee(item.data);
                    }}
                  />
                );
              }
              return (
                <ModalContentMessage type="info">
                  <FormattedMessage id="Payees.dataList.emptyListMessage" />
                </ModalContentMessage>
              );
            },
            errorComponent: () => (
              <ModalContentMessage type="error">
                <FormattedMessage id="Common.genericErrorMessage" />
              </ModalContentMessage>
            ),
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>
            <FormattedMessage id="Common.forms.cancelButton" />
          </Button>
          <Button
            disabled={Boolean(
              query.isLoading || query.isError || !query.data || !selectedPayee
            )}
            onClick={() => {
              handleOnSelectPayee(selectedPayee);
              closeModal();
            }}
          >
            Select
          </Button>
        </DialogActions>
        {isPayeeCreateModalOpen ? (
          <PayeeCreateModal closeModal={closeEdit} />
        ) : null}
        {isPayeeUpdateModalOpen && selectedPayee ? (
          <PayeeUpdateModal
            closeModal={closeUpdate}
            payeeId={selectedPayee.id}
          />
        ) : null}
      </>
    </Dialog>
  );
}
