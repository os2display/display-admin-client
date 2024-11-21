import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { React } from "react";
import PropTypes from "prop-types";

/**
 * @param {object} props The props.
 * @param {string} props.id The if of the tooltip.
 * @param {string} props.content The content to show in the tooltip.
 * @returns {React.JSX} Tooltip component.
 */
function Tooltip({ id, content }) {
  return (
    <>
      <span data-tooltip-id={id} className="ms-1 me-1">
        <FontAwesomeIcon icon={faQuestionCircle} className="text-secondary" />
      </span>
      <ReactTooltip id={id} openOnClick content={content} />
    </>
  );
}

Tooltip.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Tooltip;
