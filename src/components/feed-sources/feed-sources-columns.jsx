import { React, useContext } from "react";
import { useTranslation } from "react-i18next";
import ColumnHoc from "../util/column-hoc";
import ListButton from "../util/list/list-button";
import SelectColumnHoc from "../util/select-column-hoc";
import UserContext from "../../context/user-context";

/**
 * Retrieves the columns for feed sources data based on API call response.
 *
 * @param {object} props - The props.
 * @param {Function} props.apiCall - The API call function to retrieve feed sources data.
 * @param {string} props.infoModalRedirect - The redirect URL for information modal.
 * @param {string} props.infoModalTitle - The title for information modal.
 * @returns {object} Columns - An array of objects representing the columns for
 *   feed sources data.
 */
function getFeedSourcesColumns({ apiCall, infoModalRedirect, infoModalTitle }) {
  const context = useContext(UserContext);
  const { t } = useTranslation("common", { keyPrefix: "feed-sources-list" });

  const columns = [
    {
      key: "publishing-from",
      content: ({ feedType }) => <>{feedType}</>,
      label: t("columns.feed-type"),
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
      content: ({ id }) => (
        <ListButton
          apiCall={apiCall}
          redirectTo={infoModalRedirect}
          displayData={id}
          modalTitle={infoModalTitle}
        />
      ),
    },
  ];

  return columns;
}

const FeedSourceColumns = ColumnHoc(getFeedSourcesColumns);
const SelectFeedSourceColumns = SelectColumnHoc(getFeedSourcesColumns);

export { SelectFeedSourceColumns, FeedSourceColumns };
