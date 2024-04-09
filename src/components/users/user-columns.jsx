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
      path: "roles",
      label: t("columns.roles"),
      dataFunction: (roles) =>
        roles.map((role) => t(`roles.${role}`)).join(", "),
    },
    {
      path: "userType",
      label: t("columns.user-type"),
      dataFunction: (data) => {
        switch (data) {
          case "USERNAME_PASSWORD":
            return t("user-type.username-password");
          case "OIDC_EXTERNAL":
            return t("user-type.oidc-external");
          case "OIDC_INTERNAL":
            return t("user-type.oidc-internal");
          default:
            return data;
        }
      },
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
