import dayjs from "dayjs";

/**
 * @param {object} props Props.
 * @param {string} props.from From string
 * @param {string} props.to To string
 * @returns {object} If the entity is published.
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
