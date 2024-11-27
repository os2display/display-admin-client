import PropTypes from "prop-types";
import dayjs from "dayjs";

/**
 * @param {object} props The props.
 * @param {string} props.date Date string to format.
 * @returns {object} Formatted date
 */
function DateValue({ date }) {
  return date ? dayjs(date).format("D/M/YYYY HH:mm") : "";
}

DateValue.propTypes = {
  date: PropTypes.string,
};

export default DateValue;
