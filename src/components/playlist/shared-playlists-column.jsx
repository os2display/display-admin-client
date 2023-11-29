import { React } from "react";
import { useTranslation } from "react-i18next";
import Published from "../util/published";

/**
 * Columns for shared playlists lists.
 *
 * @returns {object} The shared playlist columns
 */
function getSharedPlaylistColumns() {
  const { t } = useTranslation("common", {
    keyPrefix: "playlists-columns",
  });

  return [
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
      content: ({ publishedFrom, publishedTo, published }) => (
        <Published
          published={published || { from: publishedFrom, to: publishedTo }}
        />
      ),
    },
  ];
}

export default getSharedPlaylistColumns;
