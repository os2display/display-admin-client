import { React } from "react";
import { useTranslation } from "react-i18next";
import LinkForList from "../util/list/link-for-list";
import ListButton from "../util/list/list-button";
import CampaignIcon from "../screen-list/campaign-icon";
import ColumnHoc from "../util/column-hoc";
import idFromUrl from "../util/helpers/id-from-url";

/**
 * Columns for screens lists.
 *
 * @param {object} props - The props.
 * @param {boolean} props.editNewTab - Open edit dialog in new tab.
 * @param {Function} props.listButtonCallback - The callback for getting data in
 *   the list button
 * @param {Function} props.apiCall - The api to call
 * @returns {object} The columns for the screens lists.
 */
function getScreenColumns({ editNewTab, listButtonCallback, apiCall }) {
  const { t } = useTranslation("common", { keyPrefix: "screen-list" });

  const columns = [
    {
      path: "title",
      label: t("columns.name"),
    },
    {
      // eslint-disable-next-line react/prop-types
      content: ({ inScreenGroups }) => (
        <ListButton
          callback={listButtonCallback}
          inputData={inScreenGroups}
          apiCall={apiCall}
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
    {
      key: "edit",
      // eslint-disable-next-line react/prop-types
      content: ({ "@id": id }) => (
        <LinkForList id={id} param="screen/edit" targetBlank={editNewTab} />
      ),
    },
  ];

  return columns;
}

export default ColumnHoc(getScreenColumns);
