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
  const onRichTextChange = (richText) => {
    let sanitizedHtml = DOMPurify.sanitize(richText);
    // It returns <p><br></p> if the input is empty, apparently "needed"
    // https://github.com/quilljs/quill/issues/1328
    if (sanitizedHtml === "<p><br></p>") {
      sanitizedHtml = sanitizedHtml.replace("<p><br></p>", "");
    }
    const returnTarget = { value: sanitizedHtml, id: name };
    onChange({ target: returnTarget });
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
  ];

  return (
    <div className="text-editor">
      <FormGroup className={formGroupClasses}>
        <FormLabel htmlFor={name}>
          {label}
          {required && " *"}
        </FormLabel>
        <ReactQuill
          defaultValue={value}
          name={name}
          modules={modules}
          formats={formats}
          onChange={onRichTextChange}
          theme="snow"
        />
      </FormGroup>
      {helpText && <small>{helpText}</small>}
    </div>
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
