/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import LinkForList from "./list/link-for-list";

/**
 * Hoc that wraps arrays in checkbox and delete button
 *
 * @param {Array} columns - The array to wrap
 * @returns {Array} Array of columns for lists.
 */
function SelectColumnHoc(columns) {
  return function WithSelectColumnHoc({
    handleSelected,
    handleDelete,
    editTarget,
    ...props
  }) {
    const { t } = useTranslation("common", { keyPrefix: "select-column-hoc" });

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
      content: ({ "@id": id }) => (
        <div className="d-flex">
          <LinkForList id={id} param={`${editTarget}/edit`} targetBlank />
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
