import { React } from "react";
import PropTypes from "prop-types";

/**
 * @param {object} props - The props.
 * @param {string} id - The id.
 * @param {Array} props.children The children being passed from parent
 * @returns {object} The Content header.
 */
function ContentBody({ children, id }) {
  return (
    <section id={id} className="shadow-sm p-3 mb-3 bg-body rounded">
      {children}
    </section>
  );
}

ContentBody.defaultProps = {
  id: "",
};

ContentBody.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
};

export default ContentBody;
