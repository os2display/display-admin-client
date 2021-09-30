import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import ConfigLoader from "../../config-loader";

const extendedBaseQuery = async (args, api, extraOptions) => {
  const config = await ConfigLoader.loadConfig();
  const baseUrl = config.api;

  args.headers = {
    'content-type': 'application/ld+json',
    'accept': 'application/ld+json',
  }

  const baseResult = await fetchBaseQuery({ baseUrl })(
    args,
    api,
    extraOptions
  )

  return {
    ...baseResult,
  }
}

export default extendedBaseQuery;
