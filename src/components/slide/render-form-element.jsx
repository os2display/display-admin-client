import { React } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import ImageUploader from "../util/image-uploader/image-uploader";
import FormCheckbox from "../util/forms/form-checkbox";
import FormInput from "../util/forms/form-input";
import Select from "../util/forms/select";
import RichText from "../util/forms/rich-text";

/**
 * Render form elements for content form.
 *
 * @param {object} props - The props.
 * @param {Array} props.data - The data to render in the form element.
 * @param {Function} props.requiredFieldCallback - If the form is required, a
 *   callback to add to validation.
 * @param {Array} props.errors - An error list, if there are validation errors.
 * @param {Function} props.onChange - Callback, if the value of the field changes.
 * @param {object} props.formStateObject - The form state.
 * @param {Function} props.onMediaChange - When media have changed call this function.
 * @param {Array} props.loadedMedia - Array of loaded media entities.
 * @returns {object} - A form element.
 */
function RenderFormElement({
  data,
  requiredFieldCallback,
  errors,
  onChange,
  onMediaChange,
  formStateObject,
  loadedMedia,
}) {
  const { t } = useTranslation("common");

  const handleImageUpload = (target) => {
    onMediaChange(data.name);
    onChange(target);
  };

  /**
   * @param {object} formData - The data for form input.
   * @returns {object | string} - Returns a rendered jsx object.
   */
  function renderElement(formData) {
    let returnElement;
    let inputImage = null;

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
            helpText={formData.helpText}
            value={formStateObject[formData.name]}
            onChange={onChange}
            formGroupClasses={formData.formGroupClasses}
          />
        );
        break;
      case "rich-text-input":
        if (data.required) {
          requiredFieldCallback(data.name);
        }
        returnElement = (
          <RichText
            name={formData.name}
            type={formData.type}
            errors={formData.required ? errors : null}
            label={formData.label}
            helpText={formData.helpText}
            value={formStateObject[formData.name]}
            onChange={onChange}
            formGroupClasses={formData.formGroupClasses}
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
            formGroupClasses={formData.formGroupClasses}
          />
        );
        break;
      case "header":
        if (data.required) {
          requiredFieldCallback(data.name);
        }
        returnElement = (
          <h2 className={formData.formGroupClasses}>{formData.text}</h2>
        );
        break;
      // @TODO: This (header-h3) should be possible to create in a more efficient way, in combination with the above.
      case "header-h3":
        if (data.required) {
          requiredFieldCallback(data.name);
        }
        returnElement = (
          <h3 className={formData.formGroupClasses}>{formData.text}</h3>
        );
        break;
      case "textarea":
        if (data.required) {
          requiredFieldCallback(data.name);
        }
        returnElement = (
          <>
            {formData?.label && (
              <label htmlFor={formData.name} className="form-label">
                {formData.label}
              </label>
            )}
            <textarea
              onChange={onChange}
              name={formData.name}
              id={formData.name}
              className={`${formData.formGroupClasses} form-control`}
              rows="3"
              defaultValue={formStateObject[formData.name]}
            />
            {formData?.helpText && (
              <small className="form-text text-muted">
                {formData.helpText}
              </small>
            )}
          </>
        );
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
            formGroupClasses={formData.formGroupClasses}
          />
        );
        break;
      case "image":
        if (data.required) {
          requiredFieldCallback([data.name, "mediaDescription", "mediaName"]);
        }

        // Load image from loadedMedia if it is a @id
        if (typeof formStateObject[formData.name] === "string") {
          inputImage = { ...loadedMedia[formStateObject[formData.name]] };
          if (inputImage?.assets?.uri) {
            inputImage.url = inputImage.assets.uri;
          }
          inputImage.disableInput = true;
        } else if (formStateObject[formData.name]?.file) {
          inputImage = { ...formStateObject[formData.name] };
          inputImage.url = inputImage.file.url;
        }

        returnElement = (
          <>
            {formData?.label && (
              <label htmlFor={formData.name} className="form-label">
                {formData.label}
              </label>
            )}
            <ImageUploader
              errors={formData.required ? errors : null}
              multipleImages={data.multipleImages}
              handleImageUpload={handleImageUpload}
              inputImage={inputImage}
              name={formData.name}
              invalidText={
                data.multipleImages
                  ? t("render-form-element.images-invalid")
                  : t("render-form-element.image-invalid")
              }
              formGroupClasses={formData.formGroupClasses}
            />
            {formData.helpText && (
              <small className="form-text text-muted">
                {formData.helpText}
              </small>
            )}
          </>
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
    helpText: PropTypes.string,
    required: PropTypes.bool,
    multipleImages: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  formStateObject: PropTypes.shape({}).isRequired,
  requiredFieldCallback: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onMediaChange: PropTypes.func.isRequired,
  loadedMedia: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default RenderFormElement;