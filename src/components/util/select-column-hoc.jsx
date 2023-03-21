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
 * @returns {Function} Function of columns for lists.
 */
function SelectColumnHoc(columns) {
  return function WithSelectColumnHoc({
    handleSelected,
    handleDelete,
    editTarget,
    ...props
  }) {
    const { t } = useTranslation("common", { keyPrefix: "select-column-hoc" });
    const context = useContext(UserContext);

    const firstColumns = [
      {
        path: "title",
        label: t("name"),
      },
      {
        path: "createdBy",
        label: t("created-by"),
      },
    ];

    const returnColumns = firstColumns.concat(columns({ ...props }));

    returnColumns.push({
      key: "edit-delete-buttons",
      content: ({ "@id": id, tenants }) => (
        <div className="d-flex justify-content-end">
          {!tenants?.find(
            (tenant) =>
              tenant.tenantKey === context.selectedTenant.get.tenantKey
          ) && <LinkForList id={id} param={`${editTarget}/edit`} targetBlank />}
          <Button
            variant="danger"
            className="remove-from-list"
            onClick={() => handleDelete(id)}
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
