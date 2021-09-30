import { api as generatedApi } from './api.generated'
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const api = generatedApi.enhanceEndpoints({
  baseQuery: fetchBaseQuery({
    baseUrl: '/fisk/',
  }),
})
