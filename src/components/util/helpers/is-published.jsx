import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";

/**
 * @param {object} props Props.
 * @param {object} props.published Published object.
 * @param props.from
 * @param props.to
 */
function IsPublished({ from, to }) {
  // extend isbetween
  dayjs.extend(isBetween);
  if (from && to) {
    return dayjs(new Date()).isBetween(dayjs(from), dayjs(to), "minute");
  }
  if (!from && to) {
    const today = new Date();
    return dayjs(today).isBetween(
      dayjs(today.getMinutes() - 1),
      dayjs(to),
      "minute"
    );
  }
  return false;
}

export default IsPublished;
