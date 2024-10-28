import { React } from "react";
import { useTranslation } from "react-i18next";
import ColumnHoc from "../util/column-hoc";

/**
 * Columns for themes lists.
 *
 * @returns {object} The columns for the themes lists.
 */
function getFeedSourcesColumns() {
  const { t } = useTranslation("common", { keyPrefix: "feed-sources-list" });

  const columns = [
    {
      key: "publishing-from",
      content: ({ feedType }) => <>{feedType}</>,
      label: t("columns.feed-type"),
    },
  ];

  return columns;
}

export default ColumnHoc(getFeedSourcesColumns);
