import { React } from "react";
import PropTypes from "prop-types";

import { Button } from "react-bootstrap";

/**
 * @param {object} props
 * the props.
 * @param {string} props.name
 * The name of the colorpreview field.
 * @param {string}  props.color
 * The color, a hex string or null.
 * @param {Function} props.openColorPicker
 * Callback for opening color picker.
 * @param {string} props.label
 * The label for the button
 * @returns {object}
 * The color previewer
 */
function ColorPreview({ name, color, openColorPicker, label }) {
  return (
    <div className="d-flex">
      <div className="color-preview" style={{ backgroundColor: color }} />
      <Button
        variant="primary"
        type="button"
        onClick={() => openColorPicker(name)}
      >
        {label}
      </Button>
    </div>
  );
}

ColorPreview.defaultProps = {
  color: null,
};

ColorPreview.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  openColorPicker: PropTypes.func.isRequired,
};
export default ColorPreview;
