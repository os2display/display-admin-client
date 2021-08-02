import PropTypes from "prop-types";

/**
 * @param {Array} requiredFields
 * The fields that are required.
 * @param {object} formStateObject
 * The object to validate.
 * @returns {object}
 * A list of validationerrors.
 */
function getFormErrors(requiredFields, formStateObject) {
  function isImageField(field) {
    return field === "mediaName" || field === "mediaDescription";
  }
  const validationErrors = [];
  requiredFields.forEach((element) => {
    if (formStateObject.images.length > 0 && isImageField(element)) {
      formStateObject.images.forEach((field) => {
        if (field[element] === "") {
          validationErrors.push(element);
        }
      });
    }
    if (
      !formStateObject[element] ||
      (formStateObject[element].length === 0 && !isImageField(element))
    ) {
      validationErrors.push(element);
    }
  });
  return validationErrors;
}

getFormErrors.propTypes = {
  formStateObject: PropTypes.shape({ screen_name: PropTypes.string })
    .isRequired,
  requiredFields: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default getFormErrors;
