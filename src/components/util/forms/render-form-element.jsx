import { React } from "react";
import PropTypes from "prop-types";
import ImageUploader from "../image-uploader/image-uploader";
import FormCheckbox from "./form-checkbox";
import FormInput from "./form-input";
import Select from "./select";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("common");

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
        if (data.required) {
          requiredFieldCallback(data.name);
        }
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
        if (data.required) {
          requiredFieldCallback(data.name);
        }
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
        if (data.required) {
          requiredFieldCallback(data.name);
        }
        returnElement = <h2>{formData.text}</h2>;
        break;
      case "select":
        if (data.required) {
          requiredFieldCallback(data.name);
        }
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
        if (data.required) {
          requiredFieldCallback([data.name, "mediaDescription", "mediaName"]);
        }
        returnElement = (
          <ImageUploader
            errors={formData.required ? errors : null}
            multipleImages={data.multipleImages}
            handleImageUpload={onChange}
            inputImage={formStateObject[formData.name]}
            name={formData.name}
            invalidText={
              data.multipleImages
                ? t("render-form-element.images-invalid")
                : t("render-form-element.image-invalid")
            }
          />
        );
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
    multipleImages: PropTypes.bool,
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
