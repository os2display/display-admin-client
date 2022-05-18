import { React } from "react";
import { useTranslation } from "react-i18next";
import ColumnHoc from "../util/column-hoc";

/**
 * Columns for themes lists.
 *
 * @returns {object} The columns for the themes lists.
 */
function getThemesColumns() {
  const { t } = useTranslation("common", { keyPrefix: "themes-list" });

  const columns = [
    {
      key: "slides",
      // eslint-disable-next-line react/prop-types
      content: ({ onNumberOfSlides }) => <>{onNumberOfSlides}</>,
      label: t("columns.number-of-slides"),
    },
  ];

  return columns;
}

export default ColumnHoc(getThemesColumns);
