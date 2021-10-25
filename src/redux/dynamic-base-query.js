import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ConfigLoader from "../config-loader";

const extendedBaseQuery = async (args, api, extraOptions) => {
  const config = await ConfigLoader.loadConfig();
  const baseUrl = config.api;

  const newArgs = { ...args };

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

  const baseResult = await fetchBaseQuery({ baseUrl })(
    newArgs,
    api,
    extraOptions
  );

  return {
    ...baseResult,
  };
};

export default extendedBaseQuery;
