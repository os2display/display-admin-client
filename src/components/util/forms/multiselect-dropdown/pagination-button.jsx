import { React } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

/**
 * A pagination button for multiselect dropdowns.
 *
 * @param {string} props The props.
 * @param {Function} props.callback - The callback.
 * @param {string} props.label - The label.
 * @returns {object} A paginationbutton.
 */
const PaginationButton = ({ callback, label }) => {
  return (
    <Button variant="primary" className="mb-3" onClick={() => callback()}>
      {label}
    </Button>
  );
};

PaginationButton.propTypes = {
  label: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default PaginationButton;
