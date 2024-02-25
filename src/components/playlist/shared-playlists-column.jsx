import { React } from "react";
import { useTranslation } from "react-i18next";
import Published from "../util/published";
import Playing from "../util/playing";

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
      content: ({ published }) => <Published published={published} />,
    },
    {
      path: "playing",
      label: t("playing"),
      // eslint-disable-next-line react/prop-types
      content: ({ publishedFrom, publishedTo, published }) => (
        <Playing
          published={published || { from: publishedFrom, to: publishedTo }}
        />
      ),
    },
  ];

  return columns;
}

export default getSharedPlaylistColumns;
