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
 * @param {string} props.helpText Help text for dropdown.
 * @param {Function} props.onChange On change callback.
 * @param {Array} props.value Input value.
 * @returns {object} Select groups table.
 */
function StationSelector({
  onChange,
  name,
  helpText = "",
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
   * Map the data received from the midttrafik api.
   *
   * @param {Array} locationData The input location data.
   * @returns {Array} The mapped data.
   */
  const mapLocationData = (locationData) => {
    return locationData.map((location) => ({
      id: location?.StopLocation?.extId,
      name: location?.StopLocation?.name,
    }));
  };

  useEffect(() => {
    if (!config?.rejseplanenApiKey) {
      // eslint-disable-next-line no-console
      console.error("rejseplanenApiKey not set.");
      return;
    }

    // The api does not accept empty string as input.
    if (searchText !== "") {
      const baseUrl = "https://www.rejseplanen.dk/api/location.name";
      fetch(
        `${baseUrl}?${new URLSearchParams({
          accessId: config.rejseplanenApiKey || "",
          format: "json",
          input: searchText,
        })}`
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
    }
  }, [searchText]);

  return (
    <>
      {data && (
        <>
          <MultiSelectComponent
            options={data}
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
