import { BaseModal } from "@/components/ui/Modals/BaseModal";
import { UpdateModalContent } from "@/features/accounts/components/Modals/AccountUpdateModal/UpdateModalContent";
import { useQuery } from "@tanstack/react-query";
import { foldQuery } from "@/lib/helpers/foldQuery";
import { ModalContentLoading } from "@/components/ui/Modals/ModalContentLoading";
import { ModalContentMessage } from "@/components/ui/Modals/ModalContentMessage";
import { FormattedMessage, useIntl } from "react-intl";
import { accountQueryOptions } from "@/features/accounts/api/queries/accountQuery";
import DialogContent from "@mui/material/DialogContent";

interface IProps {
  isOpen?: boolean;
  closeModal: () => void;
  accountId: string;
  accountDefaultId?: string;
}

export function AccountUpdateModal({
  isOpen = false,
  closeModal,
  accountId,
  accountDefaultId,
}: IProps) {
  const intl = useIntl();
  const query = useQuery(accountQueryOptions(accountId));

  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={closeModal}
      title={intl.formatMessage({ id: "Accounts.modals.update.title" })}
    >
      <DialogContent>
        {foldQuery(query, {
          loadingComponent: () => <ModalContentLoading />,
          successComponent: (data) => {
            if (data) {
              return (
                <UpdateModalContent
                  closeModal={closeModal}
                  account={data.account}
                  accountDefaultId={accountDefaultId}
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
      </DialogContent>
    </BaseModal>
  );
}
