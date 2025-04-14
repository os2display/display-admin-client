/* eslint-disable react/prop-types */
import { React, useContext } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import UserContext from "../../context/user-context";
import LinkForList from "./list/link-for-list";

/**
 * Hoc that wraps arrays in checkbox and delete button
 *
 * @param {Array} columns - The array to wrap
 * @param {boolean} omitStandardColumns - Omit title and createdBy columns.
 * @returns {Function} Function of columns for lists.
 */
function SelectColumnHoc(columns, omitStandardColumns) {
  return function WithSelectColumnHoc({
    handleSelected,
    handleDelete,
    editTarget,
    ...props
  }) {
    const { t } = useTranslation("common", { keyPrefix: "select-column-hoc" });
    const context = useContext(UserContext);

    let firstColumns = [];

    if (!omitStandardColumns) {
      firstColumns = [
        ...firstColumns,
        {
          path: "title",
          label: t("name"),
        },
        {
          path: "createdBy",
          label: t("created-by"),
        },
      ];
    }

    const returnColumns = firstColumns.concat(columns({ ...props }));

    returnColumns.push({
      key: "edit-delete-buttons",
      content: ({ "@id": id, tenants, region }) => (
        <div className="d-flex justify-content-end">
          {!tenants?.find(
            (tenant) =>
              tenant.tenantKey === context.selectedTenant.get.tenantKey
          ) && <LinkForList id={id} param={`${editTarget}/edit`} targetBlank />}
          <Button
            variant="danger"
            className="remove-from-list"
            onClick={() => handleDelete(id, region)}
          >
            {t("delete-button")}
          </Button>
        </div>
      ),
    });

    return returnColumns;
  };
}

export default SelectColumnHoc;
