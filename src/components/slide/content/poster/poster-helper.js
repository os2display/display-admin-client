import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";

const capitalize = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const formatDate = (date, format) => {
  if (!date) return "";
  return capitalize(
    dayjs(date)
      .locale(localeDa)
      .format(format ?? "LLLL")
  );
};

export { formatDate, capitalize };
