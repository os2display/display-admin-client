import { React } from "react";
import PropTypes from "prop-types";
import ImageUploader from "../image-uploader/image-uploader";
import FormCheckbox from "./form-checkbox";
import FormInput from "./form-input";
import Select from "./select";

/**
 * @param {object} props
 * The props.
 * @param {Array} props.data
 * The data to render in the form element.
 * @param {Function} props.requiredFieldCallback
 * If the form is required, a callback to add to validation.
 * @param {Array} props.errors
 * An error list, if there are validation errors.
 * @param {Function} props.onChange
 * Callback, if the value of the field changes.
 * @param {object} props.formStateObject
 * The form state.
 * @returns {object}
 * A form element.
 */
function RenderFormElement({
  data,
  requiredFieldCallback,
  errors,
  onChange,
  formStateObject,
}) {
  if (data.required) {
    requiredFieldCallback(data.name);
  }

  /**
   * @param {object} formData
   * The data for form input.
   * @returns {object|string}
   * returns a rendered jsx object.
   */
  function renderElement(formData) {
    let returnElement;
    switch (formData.input) {
      case "input":
        returnElement = (
          <FormInput
            name={formData.name}
            type={formData.type}
            errors={formData.required ? errors : null}
            label={formData.label}
            placeholder={formData.placeholder}
            value={formStateObject[formData.name]}
            onChange={onChange}
          />
        );
        break;
      case "checkbox":
        returnElement = (
          <FormCheckbox
            label={formData.label}
            onChange={onChange}
            name={formData.name}
            helpText={formData.helpText}
            value={formStateObject[formData.name]}
          />
        );
        break;
      case "header":
        returnElement = <h2>{formData.text}</h2>;
        break;
      case "select":
        returnElement = (
          <Select
            helpText={formData.helpText}
            value={formStateObject[formData.name]}
            name={formData.name}
            options={formData.options}
            onChange={onChange}
            label={formData.label}
            errors={formData.required ? errors : null}
          />
        );
        break;
      case "image":
        if (formStateObject[formData.name]) {
          returnElement = (
            <ImageUploader
              handleImageUpload={onChange}
              inputImage={formStateObject[formData.name]}
              name={formData.name}
            />
          );
        }
        break;
      default:
        returnElement = <></>;
    }
    return returnElement;
  }
  return <>{renderElement(data)}</>;
}

RenderFormElement.defaultProps = {
  errors: [],
};

RenderFormElement.propTypes = {
  data: PropTypes.shape({
    input: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  formStateObject: PropTypes.shape({
    input: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
  }).isRequired,
  requiredFieldCallback: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RenderFormElement;
