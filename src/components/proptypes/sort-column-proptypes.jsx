import PropTypes from "prop-types";

const SortColumnProptypes = PropTypes.shape({
  path: PropTypes.string,
  order: PropTypes.string,
});

export default SortColumnProptypes;
