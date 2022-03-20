import { React } from "react";
import PropTypes from "prop-types";

/**
 * @param {object} props - The props.
 * @param {Array} props.children The children being passed from parent
 * @param {string} props.id Id of the section
 * @param {boolean} props.highlightSection Highlight this section.
 * @returns {object} The Content header.
 */
function ContentBody({ children, id, highlightSection }) {
  const classes = `shadow-sm p-3 mb-3 bg-body rounded ${
    highlightSection ? "border border-success" : ""
  }`;

  return (
    <section id={id} className={classes}>
      {children}
    </section>
  );
}

ContentBody.defaultProps = {
  id: "",
  highlightSection: false,
};

ContentBody.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  highlightSection: PropTypes.bool,
};

export default ContentBody;
