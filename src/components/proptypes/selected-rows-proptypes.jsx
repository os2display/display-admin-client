import PropTypes from "prop-types";

/**
 * The proptypes for selectedrows, as these are in multiple places.
 */
const SelectedRowsProptypes = PropTypes.arrayOf(
  PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
);

export default SelectedRowsProptypes;
