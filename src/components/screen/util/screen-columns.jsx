import { React } from "react";
import { useTranslation } from "react-i18next";
import ListButton from "../../util/list/list-button";
import CampaignIcon from "../../screen-list/campaign-icon";
import SelectColumnHoc from "../../util/select-column-hoc";
import ColumnHoc from "../../util/column-hoc";
import idFromUrl from "../../util/helpers/id-from-url";

/**
 * Columns for screens lists.
 *
 * @param {object} props - The props.
 * @param {Function} props.apiCall - The api to call
 * @param {string} props.infoModalRedirect - The url for redirecting in the info modal.
 * @param {string} props.infoModalTitle - The info modal title.
 * @param {string} props.dataKey The data key for mapping the data.
 * @returns {object} The columns for the screens lists.
 */
function getScreenColumns({
  apiCall,
  infoModalRedirect,
  infoModalTitle,
  dataKey,
}) {
  const { t } = useTranslation("common", { keyPrefix: "screen-list" });

  const columns = [
    {
      // eslint-disable-next-line react/prop-types
      content: ({ inScreenGroups }) => (
        <ListButton
          apiCall={apiCall}
          redirectTo={infoModalRedirect}
          displayData={inScreenGroups}
          modalTitle={infoModalTitle}
          dataKey={dataKey}
        />
      ),
      key: "groups",
      label: t("columns.on-groups"),
    },
    {
      path: "location",
      label: t("columns.location"),
    },
    {
      key: "campaign",
      label: t("columns.campaign"),
      // eslint-disable-next-line react/destructuring-assignment
      content: (d) => <CampaignIcon id={idFromUrl(d["@id"])} />,
    },
  ];

  return columns;
}

const ScreenColumns = ColumnHoc(getScreenColumns);
const SelectScreenColumns = SelectColumnHoc(getScreenColumns);

export { SelectScreenColumns, ScreenColumns };
