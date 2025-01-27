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

const loadDropdownOptions = (url, headers, inputValue, callback, type) => {
  const query = new URLSearchParams({
    type,
    display: "options",
  });

  if (inputValue) {
    query.set("title", inputValue);
  }

  fetch(`${url}${query}`, {
    headers,
  })
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    })
    .catch(() => {
      callback([]);
      // TODO: Display error.
    });
};

export { formatDate, capitalize, loadDropdownOptions };
