import { React } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ScreensDropdown from "../forms/multiselect-dropdown/screens/screens-dropdown";
import Table from "../table/table";
import CampaignIcon from "../../screen-list/campaign-icon";

/**
 * A multiselect and table for screens.
 *
 * @param {string} props
 * the props.
 * @param {string} props.name
 * The name for the input
 * @param {string} props.selectedData
 * The data for the multidropdown.
 * @param {Array} props.errors
 * A list of errors, or null.
 * @returns {object}
 * An input.
 */
function SelectScreenTable({ handleChange, name, selectedData, errors }) {
  const { t } = useTranslation("common");

  /**
   * Removes screen from list of screens.
   *
   * @param {object} props
   * The props.
   * @param {string} props.id
   * The id of the screen
   */
  function removeFromList({ id }) {
    const indexOfItemToRemove = selectedData
      .map((item) => {
        return item.id;
      })
      .indexOf(id);
    selectedData.splice(indexOfItemToRemove, 1);
    const target = { value: selectedData, id: name };
    handleChange({ target });
  }

  // The columns for the table.
  const columns = [
    {
      path: "name",
      label: t("select-screen-table.columns.name"),
    },
    {
      path: "size",
      label: t("select-screen-table.columns.size"),
    },
    {
      path: "dimensions",
      label: t("select-screen-table.columns.dimensions"),
    },
    {
      path: "overriddenByCampaign",
      label: t("select-screen-table.columns.campaign"),
      content: (screenData) => CampaignIcon(screenData),
    },
    {
      key: "delete",
      content: (screenData) => (
        <Button variant="danger" onClick={() => removeFromList(screenData)}>
          {t("select-screen-table.remove-from-list")}
        </Button>
      ),
    },
  ];

  return (
    <>
      <ScreensDropdown
        errors={errors}
        name={name}
        handleScreenSelection={handleChange}
        selected={selectedData}
      />
      {selectedData?.length > 0 && (
        <Table columns={columns} data={selectedData} />
      )}
    </>
  );
}

SelectScreenTable.defaultProps = {
  errors: [],
  selectedData: [],
};

SelectScreenTable.propTypes = {
  name: PropTypes.string.isRequired,
  selectedData: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.number, label: PropTypes.string })
  ),
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default SelectScreenTable;
