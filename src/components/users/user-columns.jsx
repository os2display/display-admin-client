import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import SelectColumnHoc from "../util/select-column-hoc";
import ColumnHoc from "../util/column-hoc";

/**
 * Columns for Users lists.
 *
 * @returns {object} The columns for the users lists.
 */
function getUserColumns() {
  const { t } = useTranslation("common", { keyPrefix: "users-list" });

  return [
    {
      path: "fullName",
      label: t("columns.full-name"),
    },
    {
      path: "createdAt",
      label: t("columns.created-at"),
      dataFunction: (data) => dayjs(data).format("YYYY-MM-DDTHH:mm"),
    },
  ];
}

const UserColumns = ColumnHoc(getUserColumns, true, true);
const SelectUserColumns = SelectColumnHoc(getUserColumns, true);

export { SelectUserColumns, UserColumns };
