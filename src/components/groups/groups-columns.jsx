import { React } from "react";
import { useTranslation } from "react-i18next";
import ColumnHoc from "../util/column-hoc";
import LinkForList from "../util/list/link-for-list";

/**
 * Columns for group lists.
 *
 * @param {object} props - The props.
 * @param {boolean} props.editNewTab - Open edit dialog in new tab.
 * @returns {object} The columns for the group lists.
 */
function getGroupColumns({ editNewTab }) {
  const { t } = useTranslation("common", { keyPrefix: "groups-list" });

  const columns = [
    {
      path: "title",
      label: t("columns.name"),
    },
    {
      path: "createdBy",
      label: t("columns.created-by"),
    },
    {
      key: "edit",
      // eslint-disable-next-line react/prop-types
      content: ({ "@id": id }) => (
        <LinkForList id={id} param="group/edit" targetBlank={editNewTab} />
      ),
    },
  ];

  return columns;
}

export default ColumnHoc(getGroupColumns);
