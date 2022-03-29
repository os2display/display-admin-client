import { React } from "react";
import { useTranslation } from "react-i18next";
import LinkForList from "../util/list/link-for-list";
import TemplateLabelInList from "../util/template-label-in-list";
import ListButton from "../util/list/list-button";
import Published from "../util/published";
import ColumnHoc from "../util/column-hoc";

/**
 * Columns for slides lists.
 *
 * @param {object} props - The props.
 * @param {boolean} props.editNewTab - Open edit dialog in new tab.
 * @param {Function} props.listButtonCallback - The callback for getting data in
 *   the list button
 * @returns {object} The columns for the slides lists.
 */
function getSlidesColumns({ editNewTab, listButtonCallback }) {
  const { t } = useTranslation("common", { keyPrefix: "slides-list" });

  const columns = [
    {
      // eslint-disable-next-line react/prop-types
      content: ({ templateInfo }) => (
        <TemplateLabelInList templateInfo={templateInfo} />
      ),
      key: "template",
      label: t("columns.template"),
    },
    {
      key: "playlists",
      // eslint-disable-next-line react/prop-types
      content: ({ onPlaylists }) => (
        <ListButton
          callback={() => listButtonCallback(onPlaylists)}
          inputData={onPlaylists}
        />
      ),
      label: t("columns.slide-on-playlists"),
    },
    {
      key: "published",
      // eslint-disable-next-line react/prop-types
      content: ({ published }) => <Published published={published} />,
      label: t("columns.published"),
    },
    {
      key: "edit",
      // eslint-disable-next-line react/prop-types
      content: ({ "@id": id }) => (
        <LinkForList id={id} param="slide/edit" targetBlank={editNewTab} />
      ),
    },
  ];

  return columns;
}

export default ColumnHoc(getSlidesColumns);
