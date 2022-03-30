import { React } from "react";
import { useTranslation } from "react-i18next";
import ListButton from "../util/list/list-button";
import Published from "../util/published";
import ColumnHoc from "../util/column-hoc";
import LinkForList from "../util/list/link-for-list";

/**
 * Columns for playlists lists.
 *
 * @param {object} props - The props.
 * @param {boolean} props.editNewTab - Open edit dialog in new tab.
 * @param {Function} props.listButtonCallback - The callback for getting data in
 * @param {boolean} props.isShared - Whether the element is shared
 * @param {Function} props.apiCall - The api to call
 * @returns {object} The columns for the playlists lists.
 */
function getPlaylistColumns({
  editNewTab,
  listButtonCallback,
  apiCall,
  isShared = false,
}) {
  const { t } = useTranslation("common", {
    keyPrefix: "playlist-campaign-list",
  });

  const columns = [
    {
      path: "published",
      label: t("columns.published"),
      // eslint-disable-next-line react/prop-types
      content: ({ published }) => <Published published={published} />,
    },
  ];

  if (!isShared) {
    columns.push({
      key: "slides",
      label: t("columns.number-of-slides"),
      // eslint-disable-next-line react/prop-types
      content: ({ slides }) => (
        <ListButton
          callback={listButtonCallback}
          inputData={slides}
          apiCall={apiCall}
        />
      ),
    });
    columns.push({
      key: "edit",
      // eslint-disable-next-line react/prop-types
      content: ({ "@id": id }) => (
        <LinkForList id={id} param="playlist/edit" targetBlank={editNewTab} />
      ),
    });
  }

  return columns;
}

export default ColumnHoc(getPlaylistColumns);