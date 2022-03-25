/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CheckboxForList from "./list/checkbox-for-list";

/**
 * Hoc that wraps arrays in checkbox and delete button
 *
 * @param {Array} columns - The array to wrap
 * @returns {Array} Array of columns for lists.
 */
function ColumnHoc(columns) {
  return function WithColumnHoc({
    selectedRows,
    handleSelected,
    handleDelete,
    disableCheckbox = false,
    disableDelete = false,
    isShared,
    ...props
  }) {
    const { t } = useTranslation("common", { keyPrefix: "column-hoc" });

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
    if (handleSelected) {
      firstColumns.unshift({
        key: "pick",
        content: (d) => (
          <CheckboxForList
            onSelected={() => handleSelected(d)}
            // eslint-disable-next-line react/destructuring-assignment
            disabled={disableCheckbox && d.onSlides.length > 0}
            selected={selectedRows.indexOf(d) > -1}
          />
        ),
      });
    }

    const returnColumns = firstColumns.concat(columns({ ...props, isShared }));
    if (!isShared) {
      returnColumns.push({
        key: "delete",
        content: (d) => (
          <Button
            variant="danger"
            className="remove-from-list"
            disabled={
              disableDelete &&
              // eslint-disable-next-line react/destructuring-assignment
              (selectedRows.length > 0 || d.onSlides?.length > 0)
            }
            onClick={() => handleDelete(d)}
          >
            {t("delete-button")}
          </Button>
        ),
      });
    }
    return returnColumns;
  };
}

export default ColumnHoc;
