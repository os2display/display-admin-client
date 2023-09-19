import { useTranslation } from "react-i18next";
import SelectColumnHoc from "../util/select-column-hoc";
import ColumnHoc from "../util/column-hoc";

/**
 * Columns for ActivationCode lists.
 *
 * @returns {object} The columns for the users lists.
 */
function getActivationCodeColumns() {
  const { t } = useTranslation("common", { keyPrefix: "activation-code-list" });

  return [
    {
      path: "code",
      label: t("columns.code")
    },
    {
      path: "createdAt",
      label: t("columns.created-at"),
    },
    {
      path: "createdBy",
      label: t("columns.created-by"),
    },
  ];
}

const ActivationCodeColumns = ColumnHoc(getActivationCodeColumns, true);
const SelectActivationCodeColumns = SelectColumnHoc(getActivationCodeColumns, true);

export { SelectActivationCodeColumns, ActivationCodeColumns };
