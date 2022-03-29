import { React } from "react";
import { useTranslation } from "react-i18next";
import ListButton from "../util/list/list-button";
import ColumnHoc from "../util/column-hoc";
import LinkForList from "../util/list/link-for-list";

/**
 * Columns for group lists.
 *
 * @param {object} props - The props.
 * @param {boolean} props.editNewTab - Open edit dialog in new tab.
 * @param {Function} props.listButtonCallback - The callback for getting data in
 * @param {Function} props.apiCall - The api to call
 * @returns {object} The columns for the group lists.
 */
function getGroupColumns({ editNewTab, listButtonCallback, apiCall }) {
  const { t } = useTranslation("common", { keyPrefix: "groups-columns" });

  const columns = [
    {
      // eslint-disable-next-line react/prop-types
      content: ({ screens }) => (
        <ListButton
          callback={listButtonCallback}
          inputData={screens}
          apiCall={apiCall}
        />
      ),
      key: "screens",
      label: t("screens"),
    },
    {
      key: "edit",
      // eslint-disable-next-line react/prop-types
      content: ({ "@id": id }) => (
        <LinkForList id={id} param="group/edit" targetBlank={editNewTab} />
      ),
    },
  ];

  return columns;
}

export default ColumnHoc(getGroupColumns);
