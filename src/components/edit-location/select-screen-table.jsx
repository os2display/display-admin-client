import { React } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useIntl, FormattedMessage } from "react-intl";
import ScreensDropdown from "../util/forms/multiselect-dropdown/screens/screens-dropdown";
import Table from "../util/table/table";
import CampaignIcon from "../screen-list/campaign-icon";

/**
 * An input for forms.
 *
 * @param {string} props
 * the props.
 * @param {string} props.radioGroupNamenpm install react-dnd react-dnd-html5-backend
 * The name of the input
 * @param {string} props.label
 * The label for the input
 * @param {Array} props.errors
 * A list of errors, or null.
 * @returns {object}
 * An input.
 */
function SelectScreenTable({ handleChange, name, data, errors }) {
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
    const indexOfItemToRemove = data
      .map((item) => {
        return item.id;
      })
      .indexOf(id);
    data.splice(indexOfItemToRemove, 1);
    const target = { value: data, id: name };
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
      {data && (
        <>
          <ScreensDropdown
            errors={errors}
            name={name}
            handleScreenSelection={handleChange}
            selected={data}
          />
          {data.length > 0 && <Table columns={columns} data={data} />}
        </>
      )}
    </>
  );
}

SelectScreenTable.defaultProps = {
  errors: [],
};

SelectScreenTable.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.number, label: PropTypes.string })
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default SelectScreenTable;
