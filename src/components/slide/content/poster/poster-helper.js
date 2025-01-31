import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localStorageKeys from "../../../util/local-storage-keys";

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
  const params = {
    type,
    display: "options",
  };

  if (inputValue) {
    params.name = inputValue;
  }

  const query = new URLSearchParams(params);

  fetch(`${url}?${query}`, {
    headers,
  })
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    })
    .catch(() => {
      callback([]);
    });
};

const loadDropdownOptionsPromise = (url, headers, inputValue, type) => {
  return new Promise((resolve, reject) => {
    const params = {
      entityType: type,
    };

    if (inputValue) {
      params.search = inputValue;
    }

    const query = new URLSearchParams(params);
    fetch(`${url}?${query}`, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
};

const getHeaders = () => {
  const apiToken = localStorage.getItem(localStorageKeys.API_TOKEN);
  const tenantKey = JSON.parse(
    localStorage.getItem(localStorageKeys.SELECTED_TENANT)
  );

  const headers = {
    authorization: `Bearer ${apiToken ?? ""}`,
  };

  if (tenantKey) {
    headers["Authorization-Tenant-Key"] = tenantKey.tenantKey;
  }

  return headers;
};

export {
  formatDate,
  capitalize,
  loadDropdownOptions,
  getHeaders,
  loadDropdownOptionsPromise,
};
