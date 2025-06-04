import Button from "@mui/material/Button";
import { FormattedMessage } from "react-intl";

export function ModalSubmitButton() {
  return (
    <Button type="submit">
      <FormattedMessage id="Common.forms.saveButton" />
    </Button>
  );
}
