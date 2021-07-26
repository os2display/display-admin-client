import PropTypes from "prop-types";

/**
 * @param {object} formStateObject
 * The object to validate.
 * @param {string} form
 * Which form it is.
 * @returns {object}
 * A list of validationerrors.
 */
function getFormErrors(formStateObject, form) {
  const validationErrors = [];
  const validationList = [
    { input: "screenLocations", form: "screen" },
    { input: "screen_groups", form: "screen" },
    { input: "screen_groups", form: "screen" },
  ];
  const definedList = [
    { input: "screen_name", form: "screen" },
    { input: "screen_layout", form: "screen" },
    { input: "tag_name", form: "tag" },
    { input: "category_name", form: "category" },
  ];
  validationList.forEach((element) => {
    if (
      element.form === form &&
      formStateObject[element.input] &&
      formStateObject[element.input].length === 0
    ) {
      validationErrors.push(element.input);
    }
  });
  definedList.forEach((element) => {
    if (element.form === form && !formStateObject[element.input]) {
      validationErrors.push(element.input);
    }
  });
  return validationErrors;
}

getFormErrors.propTypes = {
  formStateObject: PropTypes.shape({ screen_name: PropTypes.string })
    .isRequired,
};

export default getFormErrors;
