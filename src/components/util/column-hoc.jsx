/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CheckboxForList from "./list/checkbox-for-list";
import selectedHelper from './helpers/selectedHelper';
import useModal from '../../context/delete-modal-context/delete-modal-context';

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
    const { selected, setSelected, setModal } = useModal();

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
      firstColumns.unshift({
        key: "pick",
        content: (d) => (
          <CheckboxForList
            onSelected={() =>  setSelected(selectedHelper(d, [...selected]))}
            // eslint-disable-next-line react/destructuring-assignment
            disabled={disableCheckbox && d.onSlides.length > 0}
            selected={selected.indexOf(d) > -1}
          />
        ),
      });

function clickDelete(item){
  setSelected([{id: item["@id"], title: item.title}])
  setModal({
    accept: handleDelete,
  })
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
              // eslint-disable-next-line react/destructuring-assignment
              (selected.length > 0 || d.onSlides?.length > 0)
            }
            onClick={() => clickDelete(d)}
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
