import { React } from "react";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import { FormGroup, FormLabel } from "react-bootstrap";
import DOMPurify from "dompurify";
import "../../../../node_modules/react-quill/dist/quill.snow.css";
import "./rich-text.scss";

/**
 * An input for forms.
 *
 * @param {string} props The props.
 * @param {string} props.name The name of the input
 * @param {string} props.label The label for the input
 * @param {string} props.helpText The helptext for the input, if it is needed.
 * @param {boolean} props.required Whether the input is required.
 * @returns {object} An input.
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
      {helpText && <small className="form-text">{helpText}</small>}
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
