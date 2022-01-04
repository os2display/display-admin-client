import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import set from "lodash.set";
import {
  api,
  useGetV1FeedSourcesQuery,
} from "../../../redux/api/api.generated";
import MultiSelectComponent from "../../util/forms/multiselect-dropdown/multi-dropdown";
import idFromUrl from "../../util/helpers/id-from-url";
import ContentForm from "./content-form";

/**
 * Multiselect with options supplied by endpoint.
 *
 * @param {object} props - The props.
 * @param {string} props.name - The name of the field.
 * @param {object} props.value - The value.
 * @param {Function} props.onChange - On change callback.
 * @param {string} props.optionsEndpoint - Endpoint from which to fetch the options.
 * @returns {object} - The FeedSelector component.
 */
function MultiselectFromEndpoint({ name, label, value, onChange, optionsEndpoint }) {
  const { t } = useTranslation("common");
  const [ options, setOptions ] = useState(null);

  useEffect(() => {
    if (optionsEndpoint) {
      fetch(optionsEndpoint).then(response => response.json()).then(
        (data) => {
          setOptions(data.map((element) => {
            return {
              '@id': element.value,
              value: element.value,
              key: element.value,
              title: element.title,
            }
          }));
        }
      ).catch((err) => {
        // @TODO: Handle error.
      })
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
      {options && <MultiSelectComponent
        options={options}
        selected={getSelected(value)}
        name={name}
        disableSearch
        labelledBy="Select"
        overrideStrings={{
          allItemsAreSelected: t("multiselect.all-selected"),
          clearSelected: t("multiselect.clear-selection"),
          selectAll: t("multiselect.selected-all"),
          selectSomeItems: t("multiselect.select-some-options"),
        }}
        handleSelection={({target}) => {
          const newSelections = target.value.map((element) => element.value)
          onChange({target: { id: target.id, value: newSelections }})}
        }
        filterCallback={() => {}}
        label={label ?? t("multiselect.select")}
      />}
    </>
  );
}

MultiselectFromEndpoint.defaultProps = {
  label: null,
}

MultiselectFromEndpoint.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  optionsEndpoint: PropTypes.string.isRequired,
};

export default MultiselectFromEndpoint;
