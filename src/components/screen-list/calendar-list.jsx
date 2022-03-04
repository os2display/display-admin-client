import React, { cloneElement, Fragment } from "react";
import PropTypes from "prop-types";

/**
 * @param {object} props The props.
 * @param {Array} props.data The data to display in the calendar list.
 * @param {Array} props.children The children being passed from parent
 * @returns {object} The calendar list.
 */
function CalendarList({ data, children }) {
  return (
    <table className="table table-hover">
      {children && (
        <tbody>
          {data.map((item) => (
            <Fragment key={item["@id"]}>
              {cloneElement(children, { item })}
            </Fragment>
          ))}
        </tbody>
      )}
    </table>
  );
}

CalendarList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string, id: PropTypes.number })
  ).isRequired,
  children: PropTypes.node.isRequired,
};
export default CalendarList;
