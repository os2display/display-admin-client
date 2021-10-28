import { React } from "react";
import PropTypes from "prop-types";

/**
 * @param {object} props The props.
 * @param {Array} props.children The children being passed from parent
 * @returns {object} The Content header.
 */
function ContentFooter({ children }) {
  return (
    <section className="content-footer d-grid gap-2 d-lg-block align-items-end mb-5">
      {children}
    </section>
  );
}

ContentFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentFooter;
