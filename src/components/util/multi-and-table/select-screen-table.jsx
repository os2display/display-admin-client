import { React } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
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
  const intl = useIntl();

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
      label: intl.formatMessage({ id: "table_header_name" }),
    },
    {
      path: "size",
      label: intl.formatMessage({ id: "table_header_size" }),
    },
    {
      path: "dimensions",
      label: intl.formatMessage({ id: "table_header_dimensions" }),
    },
    {
      path: "overriddenByCampaign",
      label: intl.formatMessage({ id: "table_header_campaign" }),
      content: (screenData) => CampaignIcon(screenData),
    },
    {
      key: "delete",
      content: (screenData) => (
        <Button variant="danger" onClick={() => removeFromList(screenData)}>
          <FormattedMessage
            id="remove_from_list"
            defaultMessage="remove_from_list"
          />
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
