import PropTypes from "prop-types";
/**
 * The proptypes for sortcolumn, as these are in multiple places.
 */
const SortColumnProptypes = PropTypes.shape({
  path: PropTypes.string,
  order: PropTypes.string,
});

export default SortColumnProptypes;
