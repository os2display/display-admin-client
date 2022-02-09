import dayjs from "dayjs";

/**
 * @param {object} props Props.
 * @param {object} props.published Published object.
 * @param props.from
 * @param props.to
 */
function calculateIsPublished({ from: fromInput, to: toInput }) {
  const now = dayjs(new Date());
  const from = fromInput ? dayjs(fromInput) : null;
  const to = toInput ? dayjs(toInput) : null;

  if (from !== null && to !== null) {
    return now.isAfter(from) && now.isBefore(to);
  }
  if (from !== null && to === null) {
    return now.isAfter(from);
  }
  if (from === null && to !== null) {
    return now.isBefore(to);
  }
  return true;
}

export default calculateIsPublished;
