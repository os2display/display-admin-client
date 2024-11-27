import { React, useContext } from "react";
import { useTranslation } from "react-i18next";
import ColumnHoc from "../util/column-hoc";
import SelectColumnHoc from "../util/select-column-hoc";
import UserContext from "../../context/user-context";
import ListButton from "../util/list/list-button";
import DateValue from "../util/date-value";
import PublishingStatus from "../util/publishingStatus";

/**
 * Columns for playlists lists.
 *
 * @param {object} props - The props.
 * @param {Function} props.apiCall - The api to call
 * @param {string} props.infoModalRedirect - The url for redirecting in the info modal.
 * @param {string} props.infoModalTitle - The info modal title.
 * @param {string} props.dataKey The data key for mapping the data.
 * @returns {object} The columns for the playlists lists.
 */
function getPlaylistColumns({
  apiCall,
  infoModalRedirect,
  infoModalTitle,
  dataKey,
}) {
  const context = useContext(UserContext);
  const { t } = useTranslation("common", {
    keyPrefix: "playlists-columns",
  });

  const columns = [
    {
      key: "slides",
      label: t("number-of-slides"),
      render: ({ tenants }) => {
        return (
          tenants?.length === 0 ||
          !tenants.find(
            (tenant) =>
              tenant.tenantKey === context.selectedTenant.get.tenantKey
          )
        );
      },
      // eslint-disable-next-line react/prop-types
      content: ({ slides, playlistSlides }) => (
        <ListButton
          apiCall={apiCall}
          redirectTo={infoModalRedirect}
          displayData={slides || playlistSlides}
          modalTitle={infoModalTitle}
          dataKey={dataKey}
        />
      ),
    },
    {
      key: "publishing-from",
      content: ({ published }) => <DateValue date={published.from} />,
      label: t("publishing-from"),
    },
    {
      key: "publishing-to",
      content: ({ published }) => <DateValue date={published.to} />,
      label: t("publishing-to"),
    },
    {
      key: "status",
      content: ({ published }) => <PublishingStatus published={published} />,
      label: t("status"),
    },
  ];

  return columns;
}

const PlaylistColumns = ColumnHoc(getPlaylistColumns);
const SelectPlaylistColumns = SelectColumnHoc(getPlaylistColumns);

export { SelectPlaylistColumns, PlaylistColumns };
