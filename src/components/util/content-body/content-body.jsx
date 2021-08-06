import { React } from "react";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * The props.
 * @param {Array} props.children
 * The children being passed from parent
 * @returns {object}
 * The Content header.
 */
function ContentBody({ children }) {
  return (
    <section className="shadow-sm p-3 mb-3 bg-body rounded">{children}</section>
  );
}

ContentBody.propTypes = {
  children: PropTypes.isRequired,
};

export default ContentBody;
