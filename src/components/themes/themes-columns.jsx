import { React } from "react";
import { useTranslation } from "react-i18next";
import LinkForList from "../util/list/link-for-list";
import ColumnHoc from "../util/column-hoc";

/**
 * Columns for themes lists.
 *
 * @param {object} props - The props.
 * @param {boolean} props.editNewTab - Open edit dialog in new tab. the list button
 * @returns {object} The columns for the themes lists.
 */
function getThemesColumns({ editNewTab }) {
  const { t } = useTranslation("common", { keyPrefix: "themes-list" });

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
      key: "slides",
      // eslint-disable-next-line react/prop-types
      content: ({ onSlides }) => <>{onSlides.length}</>,
      label: t("columns.number-of-slides"),
    },
    {
      key: "edit",
      // eslint-disable-next-line react/prop-types
      content: ({ "@id": id }) => (
        <LinkForList id={id} param="themes/edit" targetBlank={editNewTab} />
      ),
    },
  ];

  return columns;
}

export default ColumnHoc(getThemesColumns);
