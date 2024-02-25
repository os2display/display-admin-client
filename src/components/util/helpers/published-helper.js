import dayjs from "dayjs";

/**
 * @param {object} props Props.
 * @param {string} props.from From string
 * @param {string} props.to To string
 * @returns {object} If the entity is published.
 */
export function calculateIsPublished({ from: fromInput, to: toInput }) {
  const now = dayjs();
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

/**
 * @param {object} props Props.
 * @param {string} props.from From string
 * @param {string} props.to To string
 * @returns {object} If the entity is published.
 */
export function currentlyPlaying({ from: fromInput, to: toInput }) {
  const now = dayjs();
  const from = fromInput ? dayjs(fromInput) : null;
  const to = toInput ? dayjs(toInput) : null;
  if (from === null && to === null) {
    return true;
  }
  if (from !== null && to === null && now.isAfter(from)) {
    return true;
  }
  if (from === null && to !== null && now.isBefore(to)) {
    return true;
  }
  if (now.isBefore(to) && now.isAfter(from)) {
    return true;
  }
  return false;
}

/**
 * @param {object} props Props.
 * @param {string} props.from From string
 * @param {string} props.to To string
 * @returns {object} If the entity is published.
 */
export function willPlayInTheFuture({ from: fromInput }) {
  const now = dayjs();
  const from = fromInput ? dayjs(fromInput) : null;

  if (now.isBefore(from)) {
    return true;
  }

  return false;
}

export default {};
