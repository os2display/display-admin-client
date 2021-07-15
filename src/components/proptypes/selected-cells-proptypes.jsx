import PropTypes from "prop-types";

/**
 * The proptypes for selectedcells, as these are in multiple places.
 */
const SelectedCellsProptypes = PropTypes.arrayOf(
  PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
);

export default SelectedCellsProptypes;
