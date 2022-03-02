import { React } from "react";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import { FormGroup, FormLabel } from "react-bootstrap";
import DOMPurify from "dompurify";
import "../../../../../node_modules/react-quill/dist/quill.snow.css";
import "./rich-text.scss";

/**
 * A rich text field for forms.
 *
 * @param {string} props The props.
 * @param {string} props.name The name of the rich text field
 * @param {string} props.label The label for the rich text field
 * @param {string} props.helpText The helptext for the rich text field, if it is needed.
 * @param {string} props.value The value of the rich text field
 * @param {Function} props.onChange The callback for changes in the rich text field
 * @param {string} props.formGroupClasses Classes for the formgroup
 * @param {boolean} props.required Whether the rich text field is required.
 * @returns {object} A rich text field.
 */
function RichText({
  name,
  label,
  helpText,
  value,
  onChange,
  formGroupClasses,
  required,
}) {
  /**
   * Transforms the target to something the form-components understand.
   *
   * @param {string} richText The rich text returned from reactquill
   */
  function onRichTextChange(richText) {
    const returnTarget = { value: DOMPurify.sanitize(richText), id: name };
    onChange({ target: returnTarget });
  }

  return (
    <>
      <FormGroup className={formGroupClasses}>
        <FormLabel htmlFor={name}>
          {label}
          {required && " *"}
        </FormLabel>
        <ReactQuill
          value={value}
          name={name}
          onChange={onRichTextChange}
          theme="snow"
        />
      </FormGroup>
      {helpText && <small>{helpText}</small>}
    </>
  );
}

RichText.defaultProps = {
  label: "",
  helpText: "",
  value: "",
  formGroupClasses: "",
  required: false,
};

RichText.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  helpText: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  formGroupClasses: PropTypes.string,
  required: PropTypes.bool,
};

export default RichText;
