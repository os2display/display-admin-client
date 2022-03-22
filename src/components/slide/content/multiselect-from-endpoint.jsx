import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Alert } from "react-bootstrap";
import MultiSelectComponent from "../../util/forms/multiselect-dropdown/multi-dropdown";
import localStorageKeys from "../../util/local-storage-keys";

/**
 * Multiselect with options supplied by endpoint.
 *
 * @param {object} props - The props.
 * @param {string} props.name - The name of the field.
 * @param {string} props.label - The label for the field.
 * @param {object} props.value - The value.
 * @param {Function} props.onChange - On change callback.
 * @param {string} props.optionsEndpoint - Endpoint from which to fetch the options.
 * @param {boolean} props.singleSelect - Allow only to select one option.
 * @returns {object} - The FeedSelector component.
 */
function MultiselectFromEndpoint({
  name,
  label,
  value,
  onChange,
  optionsEndpoint,
  singleSelect,
}) {
  const { t } = useTranslation("common");
  const [options, setOptions] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (optionsEndpoint) {
      // @TODO: Handle this in service.
      const apiToken = localStorage.getItem(localStorageKeys.API_TOKEN);
      fetch(optionsEndpoint, {
        headers: {
          authorization: `Bearer ${apiToken ?? ""}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setOptions(
            data.map((element) => {
              return {
                "@id": element.value,
                value: element.value,
                key: element.value,
                title: element.title,
              };
            })
          );
        })
        .catch(() => setError(true));
    }
  }, [optionsEndpoint]);

  const getSelected = (selected) => {
    if (selected instanceof Array) {
      return options.filter((option) => selected.includes(option.value));
    }
    return [];
  };

  return (
    <>
      {options && (
        <MultiSelectComponent
          options={options}
          selected={getSelected(value)}
          name={name}
          disableSearch
          singleSelect={singleSelect}
          labelledBy="Select"
          overrideStrings={{
            allItemsAreSelected: t("multiselect.all-selected"),
            clearSelected: t("multiselect.clear-selection"),
            selectAll: t("multiselect.selected-all"),
            selectSomeItems: t("multiselect.select-some-options"),
          }}
          handleSelection={({ target }) => {
            const newSelections = target.value.map((element) => element.value);
            onChange({ target: { id: target.id, value: newSelections } });
          }}
          filterCallback={() => {}}
          label={label ?? t("multiselect.select")}
        />
      )}
      {error && (
        <Alert variant="warning">
          {t("multiselect-from-endpoint.error-fetching")}
        </Alert>
      )}
    </>
  );
}

MultiselectFromEndpoint.defaultProps = {
  label: null,
  value: [],
  singleSelect: false,
};

MultiselectFromEndpoint.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  optionsEndpoint: PropTypes.string.isRequired,
  singleSelect: PropTypes.bool,
};

export default MultiselectFromEndpoint;
