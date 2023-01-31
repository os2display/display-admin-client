import PropTypes from "prop-types";
/** The proptypes for column, as these are in multiple places. */
const ColumnProptypes = PropTypes.arrayOf(
  PropTypes.shape({
    path: PropTypes.string,
    label: PropTypes.string,
    content: PropTypes.func,
    key: PropTypes.string,
  })
);

export default ColumnProptypes;
