import { useTranslation } from "react-i18next";
import SelectColumnHoc from "../util/select-column-hoc";
import ColumnHoc from "../util/column-hoc";
import dayjs from "dayjs";
import { Button } from "react-bootstrap";
import React from "react";
import idFromUrl from "../util/helpers/id-from-url";
import {
  api,
} from "../../redux/api/api.generated";
import { useDispatch } from "react-redux";
import { displayError } from "../util/list/toast-component/display-toast";

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
      path: "codeExpire",
      label: t("columns.code-expire"),
      dataFunction: (data) => dayjs(data).format("YYYY-MM-DD HH:mm"),
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
const SelectActivationCodeColumns = SelectColumnHoc(getActivationCodeColumns, true);

export { SelectActivationCodeColumns, ActivationCodeColumns };
