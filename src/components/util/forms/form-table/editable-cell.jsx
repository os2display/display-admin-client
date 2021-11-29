import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * Create an editable cell renderer This file is highly inspired, if not copy
 * pastet, from
 * https://github.com/tannerlinsley/react-table/tree/master/examples/editable-data
 *
 * @param {object} props The props.
 * @param {string} props.value The initial value of the cell
 * @param {object} props.row The row
 * @param {number} props.row.index The index of the row
 * @param {object} props.column The column
 * @param {object} props.column.id The id of the column
 * @param {Function} props.updateTableData Callback on data change
 * @returns {object} An editable cell
 */
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateTableData,
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      value={value}
      onChange={({ target }) => setValue(target.value)}
      onBlur={() => updateTableData(index, id, value)}
    />
  );
};

EditableCell.propTypes = {
  value: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  row: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  column: PropTypes.func.isRequired,
  updateTableData: PropTypes.func.isRequired,
};

export default EditableCell;
