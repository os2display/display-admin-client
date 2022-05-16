import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * This file is built on
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
      style={{ minHeight: "36px" }}
      value={value}
      onChange={({ target }) => setValue(target.value)}
      onBlur={() => updateTableData(index, id, value)}
    />
  );
};

EditableCell.propTypes = {
  value: PropTypes.string.isRequired,
  row: PropTypes.objectOf({ index: PropTypes.number }).isRequired,
  column: PropTypes.objectOf({ id: PropTypes.string }).isRequired,
  updateTableData: PropTypes.func.isRequired,
};

export default EditableCell;
