import PropTypes from "prop-types";

const SelectedCellsProptypes = PropTypes.arrayOf(
  PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
);

export default SelectedCellsProptypes;
