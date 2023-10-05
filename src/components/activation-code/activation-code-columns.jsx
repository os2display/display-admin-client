import { React } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
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
      label: t("columns.code"),
    },
    {
      path: "codeExpire",
      label: t("columns.code-expire"),
      dataFunction: (data) => {
        const date = dayjs(data);
        const expired = date < dayjs();

        return (
          <span style={{ color: expired ? "red" : "" }}>
            {date.format("YYYY-MM-DD HH:mm")}
          </span>
        );
      },
    },
    {
      path: "username",
      label: t("columns.display-name"),
    },
    {
      path: "createdAt",
      label: t("columns.created-at"),
      dataFunction: (data) => dayjs(data).format("YYYY-MM-DD"),
    },
    {
      path: "createdBy",
      label: t("columns.created-by"),
    },
  ];
}

const ActivationCodeColumns = ColumnHoc(getActivationCodeColumns, true, true);
const SelectActivationCodeColumns = SelectColumnHoc(
  getActivationCodeColumns,
  true
);

export { SelectActivationCodeColumns, ActivationCodeColumns };
