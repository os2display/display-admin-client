import { React } from "react";
import { useTranslation } from "react-i18next";
import Publishing from "../util/publishing";

/**
 * Columns for shared playlists lists.
 *
 * @returns {object} The shared playlist columns
 */
function getSharedPlaylistColumns() {
  const { t } = useTranslation("common", {
    keyPrefix: "playlists-columns",
  });

  const columns = [
    {
      path: "title",
      label: t("name"),
    },
    {
      path: "createdBy",
      label: t("created-by"),
    },
    {
      path: "published",
      label: t("published"),
      // eslint-disable-next-line react/prop-types
      content: ({ published }) => <Publishing published={published} />,
    },
  ];

  return columns;
}

export default getSharedPlaylistColumns;
