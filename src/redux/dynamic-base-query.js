import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ConfigLoader from "../config-loader";
import localStorageKeys from "../components/util/local-storage-keys";

const extendedBaseQuery = async (args, api, extraOptions) => {
  const config = await ConfigLoader.loadConfig();
  const baseUrl = config.api;

  const newArgs = { ...args };

  // Rewrite order so the api accepts it.
  if (newArgs.params?.order) {
    newArgs.params = { ...newArgs.params, "order[title]": args.params.order };
  }

  if (!Object.prototype.hasOwnProperty.call(newArgs, "headers")) {
    newArgs.headers = {};
  }

  // post or put from media pages @TODO: Move this check out.
  if (
    newArgs.url.indexOf("media") === -1 &&
    !Object.prototype.hasOwnProperty.call(newArgs.headers, "content-type")
  ) {
    newArgs.headers["content-type"] = "application/ld+json";
  }

  if (!Object.prototype.hasOwnProperty.call(newArgs.headers, "accept")) {
    newArgs.headers.accept = "application/ld+json";
  }

  // Attach api token.
  const apiToken = localStorage.getItem(localStorageKeys.API_TOKEN);
  if (apiToken) {
    newArgs.headers.authorization = `Bearer ${apiToken ?? ""}`;
  }
  // Attach tenant key .
  const tenantKey = JSON.parse(
    localStorage.getItem(localStorageKeys.SELECTED_TENANT)
  );

  if (tenantKey) {
    newArgs.headers["Authorization-Tenant-Key"] = tenantKey.tenantKey;
  }

  const baseResult = await fetchBaseQuery({ baseUrl })(
    newArgs,
    api,
    extraOptions
  );

  // Handle authentication errors. Emit that the user should reauthenticate.
  if (baseResult?.error?.data?.code === 401) {
    localStorage.removeItem(localStorageKeys.API_TOKEN);

    const event = new Event("reauthenticate");
    document.dispatchEvent(event);
  }

  return {
    ...baseResult,
  };
};

export default extendedBaseQuery;
