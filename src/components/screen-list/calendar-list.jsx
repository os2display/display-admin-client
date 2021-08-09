import { React } from "react";
import Calendar from "./calendar";

/**
 * The calendar list component.
 *
 * @returns {object}
 *   The calendar list.
 */
function CalendarList({ data }) {
  var inAYear = new Date();
  inAYear.setDate(inAYear.getDate() + 365);
  return (
    <div className="charts">
      {data.map((data) => (
        <div className="calendar-entry">
          {data.name}
          {data.name}
          <Calendar
            data={data.playlists}
            key={data.id}
            id={data.id}
            endDateForXAxis={inAYear}
          ></Calendar>
        </div>
      ))}
    </div>
  );
}

export default CalendarList;
