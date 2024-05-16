import { React, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import MultiSelectComponent from "../../../util/forms/multiselect-dropdown/multi-dropdown";
import { displayError } from "../../../util/list/toast-component/display-toast";
import userContext from "../../../../context/user-context";
/**
 * A multiselect and table for groups.
 *
 * @param {string} props The props.
 * @param {string} props.name The name for the input
 * @param {string} props.id The id used for the get.
 * @param {string} props.helpText Helptext for dropdown.
 * @returns {object} Select groups table.
 */
function StationSelector({
  onChange,
  name,
  helpText,
  label,
  value: inputValue,
}) {
  const { t } = useTranslation("common", { keyPrefix: "station-selector" });
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { config } = useContext(userContext);

  /**
   * Adds group to list of groups.
   *
   * @param {object} props - The props.
   * @param {object} props.target - The target.
   */
  const handleSelect = ({ target }) => {
    const { value, id: localId } = target;
    onChange({
      target: { id: localId, value },
    });
  };

  /**
   * Fetches data for the multi component
   *
   * @param {string} filter - The filter.
   */
  const onFilter = (filter) => {
    setSearchText(filter);
  };
  /**
   * Map the data recieved from the midttrafik api.
   *
   * @param {object} locationData
   * @returns {object} The mapped data.
   */
  const mapLocationData = (locationData) => {
    return locationData.map((location) => ({
      id: location.StopLocation.extId,
      name: location.StopLocation.name,
    }));
  };

  useEffect(() => {
    fetch(
      `https://www.rejseplanen.dk/api/location.name?accessId=${
        config.rejseplanenApiKey || ""
      }&format=json&input=${searchText}`
    )
      .then((response) => response.json())
      .then((rpData) => {
        if (rpData?.stopLocationOrCoordLocation) {
          setData(mapLocationData(rpData.stopLocationOrCoordLocation));
        }
      })
      .catch((er) => {
        displayError(t("get-error"), er);
      });
  }, [searchText]);

  return (
    <>
      {data && (
        <>
          <MultiSelectComponent
            options={data}
            singleSelect
            handleSelection={handleSelect}
            name={name}
            selected={inputValue || []}
            filterCallback={onFilter}
            label={label}
          />
          <small>{helpText}</small>
        </>
      )}
    </>
  );
}

StationSelector.defaultProps = {
  helpText: "",
  value: null,
};

StationSelector.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      x: PropTypes.string,
      y: PropTypes.string,
    })
  ),
  helpText: PropTypes.string,
};

export default StationSelector;
