import { React } from "react";
import { useTranslation } from "react-i18next";
import SelectColumnHoc from "../util/select-column-hoc";
import ColumnHoc from "../util/column-hoc";

/**
 * Columns for Users lists.
 *
 * @param {object} props - The props.
 * @param {Function} props.apiCall - The api to call
 * @param {string} props.infoModalRedirect - The url for redirecting in the info modal.
 * @param {string} props.infoModalTitle - The info modal title.
 * @param {string} props.dataKey The data key for mapping the data.
 * @param {Function} props.handleDelete
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
