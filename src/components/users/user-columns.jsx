import { useTranslation } from "react-i18next";
import SelectColumnHoc from "../util/select-column-hoc";
import ColumnHoc from "../util/column-hoc";

/**
 * Columns for Users lists.
 *
 * @returns {object} The columns for the users lists.
 */
function getUserColumns() {
  const { t } = useTranslation("common", { keyPrefix: "users-list" });

  const columns = [
    {
      path: "activated",
      label: t("columns.activated"),
    },
  ];

  return columns;
}

const UserColumns = ColumnHoc(getUserColumns);
const SelectUserColumns = SelectColumnHoc(getUserColumns);

export { SelectUserColumns, UserColumns };
