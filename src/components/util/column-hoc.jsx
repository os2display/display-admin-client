/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import CheckboxForList from "./list/checkbox-for-list";
import selectedHelper from "./helpers/selected-helper";
import useModal from "../../context/modal-context/modal-context-hook";
import LinkForList from "./list/link-for-list";

/**
 * Hoc that wraps arrays in checkbox and delete button
 *
 * @param {Array} columns - The array to wrap
 * @param {boolean} omitStandardColumns - Omit title and createdBy columns.
 * @param {boolean} disableEdit - Remove edit button.
 * @returns {Array} Array of columns for lists.
 */
function ColumnHoc(columns, omitStandardColumns, disableEdit) {
  return function WithColumnHoc({
    handleDelete,
    disableCheckbox = () => {},
    disableDelete = () => {},
    ...props
  }) {
    const { t } = useTranslation("common", { keyPrefix: "column-hoc" });
    const { selected, setSelected, setModal } = useModal();
    const { pathname } = useLocation();

    /**
     * Sets item to delete, and opens delete modal.
     *
     * @param {object} item - Item to delete
     */
    function openDeleteModal(item) {
      setSelected([{ id: item["@id"], title: item.title }]);
      setModal({
        delete: true,
        accept: handleDelete,
      });
    }

    let firstColumns = [
      {
        key: "pick",
        content: (d) => (
          <CheckboxForList
            onSelected={() => setSelected(selectedHelper(d, [...selected]))}
            disabled={disableCheckbox(d)}
            title={d.title}
            selected={selected.find((item) => item.id === d["@id"])}
          />
        ),
      },
    ];

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
      content: (d) => (
        <div className="d-flex justify-content-end">
          {!disableEdit && (
            <LinkForList
              id={d["@id"]}
              param={`${pathname.split("/")[1]}/edit`}
            />
          )}
          <Button
            variant="danger"
            className="remove-from-list"
            disabled={disableDelete(d)}
            onClick={() => openDeleteModal(d)}
          >
            {t("delete-button")}
          </Button>
        </div>
      ),
    });

    return returnColumns;
  };
}

export default ColumnHoc;
