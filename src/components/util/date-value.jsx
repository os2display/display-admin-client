import { React, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";

/**
 * @param {object} props The props.
 * @param {string} props.date Date string to format.
 * @returns {object} Formatted date
 */
function DateValue({ date }) {
  useEffect(() => {
    dayjs.extend(localizedFormat);
  }, []);

  return date ? dayjs(date).locale(localeDa).format("l LT") : "";
}

DateValue.propTypes = {
  date: PropTypes.string,
};

export default DateValue;
