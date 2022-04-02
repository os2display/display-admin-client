import { React } from "react";
import { useTranslation } from "react-i18next";
import ListButton from "../util/list/list-button";
import ColumnHoc from "../util/column-hoc";
import SelectColumnHoc from "../util/select-column-hoc";

/**
 * Columns for group lists.
 *
 * @param {object} props - The props.
 * @param {Function} props.listButtonCallback - The callback for getting data in
 * @param {Function} props.apiCall - The api to call
 * @returns {object} The columns for the group lists.
 */
function getGroupColumns({ listButtonCallback, apiCall }) {
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
  ];

  return columns;
}

const GroupColumns = ColumnHoc(getGroupColumns);
const SelectGroupColumns = SelectColumnHoc(getGroupColumns);

export { SelectGroupColumns, GroupColumns };
