import React from "react";
import PropTypes from "prop-types";
import Calendar from "./calendar";

/**
 * @param {object} props The props.
 * @param {Array} props.data The data to display in the calendar list.
 * @returns {object} The calendar list.
 */
function CalendarList({ data }) {
  return (
    <table className="table table-hover">
      <tbody>
        {data.map((item) => (
          <tr key={item["@id"]}>
            <td colSpan="100%">
              <h2 className="h4">{item.title}</h2>
              <Calendar screen={item} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

CalendarList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string, id: PropTypes.number })
  ).isRequired,
};
export default CalendarList;
