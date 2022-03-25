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
    ...props
  }) {
    const { t } = useTranslation("common", { keyPrefix: "slides-list" });

    const pickCell = handleSelected
      ? [
          {
            key: "pick",
            label: t("columns.pick"),
            content: (d) => (
              <CheckboxForList
                onSelected={() => handleSelected(d)}
                // eslint-disable-next-line react/destructuring-assignment
                disabled={disableCheckbox && d.onSlides.length > 0}
                selected={selectedRows.indexOf(d) > -1}
              />
            ),
          },
        ]
      : [];

    const returnColumns = pickCell.concat(columns(props));

    returnColumns.push({
      key: "delete",
      content: (d) => (
        <Button
          variant="danger"
          className="remove-from-list"
          disabled={
            // eslint-disable-next-line react/destructuring-assignment
            disableDelete && (selectedRows.length > 0 || d.onSlides?.length > 0)
          }
          onClick={() => handleDelete(d)}
        >
          {t("delete-button")}
        </Button>
      ),
    });

    return returnColumns;
  };
}

export default ColumnHoc;
