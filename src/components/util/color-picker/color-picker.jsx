import { React, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { ColorPicker as CP, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

/**
 * @param {object} props The props.
 * @param {string} props.color The color, a hex string or null.
 * @param {boolean} props.show Whether to show the color picker.
 * @param {Function} props.handleChange Callback for picked color.
 * @param {Function} props.closeColorPicker Callback for closing colorpicker.
 * @returns {object} The color picker.
 */
function ColorPicker({ color, show, handleChange, closeColorPicker }) {
  if (!show) {
    return <></>;
  }
  const ref = useRef();
  const [inputColor] = useColor("hex", color ?? "");
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (ref.current && !ref.current.contains(e.target)) {
        closeColorPicker();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);
  /** @param {object} selectedColor The selected color object. */
  function onPickedColor(selectedColor) {
    const returnTarget = { value: selectedColor.hex, id: show };
    handleChange({ target: returnTarget });
  }

  return (
    <div ref={ref} style={{ maxWidth: "456px" }} className="mt-3 shadow-lg">
      <CP
        style={{ position: "absolute" }}
        width={456}
        height={228}
        color={inputColor}
        onChange={onPickedColor}
        hideHSV
        dark
      />
    </div>
  );
}

ColorPicker.defaultProps = {
  color: null,
};

ColorPicker.propTypes = {
  color: PropTypes.string,
  show: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  closeColorPicker: PropTypes.func.isRequired,
};
export default ColorPicker;
