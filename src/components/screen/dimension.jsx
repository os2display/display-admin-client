import { React } from "react";
import PropTypes from "prop-types";

/**
 * @param {object} props The props.
 * @param {string} props.height The screen height
 * @param {string} props.width The screen width
 * @returns {object} The published yes/no component.
 */
function Dimensions({ height, width }) {
  return (
    <div>
      {height}x{width}
    </div>
  );
}

Dimensions.propTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default Dimensions;
