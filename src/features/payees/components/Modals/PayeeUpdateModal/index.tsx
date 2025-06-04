import { BaseModal } from "@/components/ui/Modals/BaseModal";
import { payeeQuery } from "@/features/payees/api/queries/payeeQuery";
import { UpdateModalContent } from "@/features/payees/components/Modals/PayeeUpdateModal/UpdateModalContent";
import { useQuery } from "@tanstack/react-query";
import { foldQuery } from "@/lib/helpers/foldQuery";
import { ModalContentLoading } from "@/components/ui/Modals/ModalContentLoading";
import { ModalContentError } from "@/components/ui/Modals/ModalContentError";
import { FormattedMessage } from "react-intl";

interface IProps {
  isOpen?: boolean;
  closeModal: () => void;
  title: string;
  payeeId: string;
}

export function PayeeUpdateModal({
  isOpen = false,
  closeModal,
  title,
  payeeId,
}: IProps) {
  const query = useQuery(payeeQuery(payeeId));

  return (
    <BaseModal isOpen={isOpen} closeModal={closeModal} title={title}>
      {foldQuery(query, {
        loadingComponent: () => <ModalContentLoading />,
        successComponent: (data) => {
          if (data) {
            return (
              <UpdateModalContent closeModal={closeModal} payee={data.payee} />
            );
          }
          return null;
        },
        errorComponent: () => (
          <ModalContentError>
            <FormattedMessage id="Common.genericErrorMessage" />
          </ModalContentError>
        ),
      })}
    </BaseModal>
  );
}
