import PropTypes from "prop-types";

const ColumnProptypes = PropTypes.arrayOf(
  PropTypes.shape({
    path: PropTypes.string,
    sort: PropTypes.bool,
    label: PropTypes.string,
    content: PropTypes.func,
    key: PropTypes.string,
  })
);

export default ColumnProptypes;
