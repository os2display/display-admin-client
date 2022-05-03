import { React } from "react";
import { useTranslation } from "react-i18next";
import ListButton from "../util/list/list-button";
import ColumnHoc from "../util/column-hoc";
import SelectColumnHoc from "../util/select-column-hoc";

/**
 * Columns for group lists.
 *
 * @param {object} props - The props.
 * @param {Function} props.apiCall - The api to call
 * @param {string} props.infoModalRedirect - The url for redirecting in the info modal.
 * @param {string} props.infoModalTitle - The info modal title.
 * @returns {object} The columns for the group lists.
 */
function getGroupColumns({ apiCall, infoModalRedirect, infoModalTitle }) {
  const { t } = useTranslation("common", { keyPrefix: "groups-columns" });

  const columns = [
    {
      // eslint-disable-next-line react/prop-types
      content: ({ screens }) => (
        <ListButton
          redirectTo={infoModalRedirect}
          displayData={screens}
          modalTitle={infoModalTitle}
          apiCall={apiCall}
        />
      ),
      key: "screens",
      label: t("screens"),
    },
  ];

  return columns;
}

const GroupColumns = ColumnHoc(getGroupColumns);
const SelectGroupColumns = SelectColumnHoc(getGroupColumns);

export { SelectGroupColumns, GroupColumns };
