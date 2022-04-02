import { React, useContext } from "react";
import { useTranslation } from "react-i18next";
import ColumnHoc from "../util/column-hoc";
import SelectColumnHoc from "../util/select-column-hoc";
import UserContext from "../../context/user-context";
import ListButton from "../util/list/list-button";
import Published from "../util/published";

/**
 * Columns for playlists lists.
 *
 * @param {object} props - The props.
 * @param {Function} props.listButtonCallback - The callback for getting data in
 * @param {Function} props.apiCall - The api to call
 * @returns {object} The columns for the playlists lists.
 */
function getPlaylistColumns({ listButtonCallback, apiCall }) {
  const context = useContext(UserContext);
  const { t } = useTranslation("common", {
    keyPrefix: "playlists-columns",
  });

  const columns = [
    {
      path: "published",
      label: t("published"),
      // eslint-disable-next-line react/prop-types
      content: ({ published }) => <Published published={published} />,
    },
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
      content: ({ slides }) => (
        <ListButton
          callback={listButtonCallback}
          inputData={slides}
          apiCall={apiCall}
        />
      ),
    },
  ];

  return columns;
}

const PlaylistColumns = ColumnHoc(getPlaylistColumns);
const SelectPlaylistColumns = SelectColumnHoc(getPlaylistColumns);

export { SelectPlaylistColumns, PlaylistColumns };
