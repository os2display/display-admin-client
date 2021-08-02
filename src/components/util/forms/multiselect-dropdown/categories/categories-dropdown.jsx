import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import MultiSelectComponent from "../multi-dropdown";

/**
 * @param {object} props
 * the props.
 * @param {Function} props.handleCategorySelection
 * The callback when an option is selected
 * @param {Array} props.selected
 * The selected options
 * @param {string} props.name
 * The id of the form element
 * @param {Array} props.errors
 * A list of errors, or null.
 * @returns {object}
 * The multidropdown of categories.
 */
function CategoriesDropdown({
  handleCategorySelection,
  selected,
  name,
  errors,
}) {
  const intl = useIntl();
  const [options, setOptions] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const noSelectedCategories = intl.formatMessage({
    id: "categories_dropdown_no_selected",
  });
  const categoriesLabel = intl.formatMessage({
    id: "categories_dropdown_label",
  });
  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    fetch("/fixtures/categories/categories.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setOptions(jsonData.categories);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {options && (
        <>
          <MultiSelectComponent
            errors={errors}
            handleSelection={handleCategorySelection}
            options={options}
            label={categoriesLabel}
            selected={selected}
            name={name}
            isLoading={isLoading}
            noSelectedString={noSelectedCategories}
          />
        </>
      )}
    </>
  );
}

CategoriesDropdown.defaultProps = {
  errors: null,
};

CategoriesDropdown.propTypes = {
  handleCategorySelection: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.number,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default CategoriesDropdown;
