import { React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

/**
 * @param {object} props The props.
 * @param {boolean} props.live Whether it is overridden by campaign or not.
 * @returns {object} The published yes/no component.
 */
function LiveIcon({ live }) {
  return (
    <FontAwesomeIcon
      icon={faCheckSquare}
      style={live ? { color: "green" } : { color: "grey" }}
    />
  );
}

LiveIcon.propTypes = {
  live: PropTypes.bool.isRequired,
};

export default LiveIcon;
