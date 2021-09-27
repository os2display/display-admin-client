import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: [],
  endpoints: (build) => ({
    getV1Layouts: build.query<GetV1LayoutsApiResponse, GetV1LayoutsApiArg>({
      query: (queryArg) => ({
        url: `/v1/layouts`,
        params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage },
      }),
    }),
    getV1LayoutsById: build.query<
      GetV1LayoutsByIdApiResponse,
      GetV1LayoutsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/layouts/${queryArg.id}` }),
    }),
    getV1Media: build.query<GetV1MediaApiResponse, GetV1MediaApiArg>({
      query: (queryArg) => ({
        url: `/v1/media`,
        params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage },
      }),
    }),
    getV1MediaById: build.query<
      GetV1MediaByIdApiResponse,
      GetV1MediaByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/media/${queryArg.id}` }),
    }),
    getV1Playlists: build.query<
      GetV1PlaylistsApiResponse,
      GetV1PlaylistsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/playlists`,
        params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage },
      }),
    }),
    postV1Playlists: build.mutation<
      PostV1PlaylistsApiResponse,
      PostV1PlaylistsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/playlists`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getV1PlaylistsById: build.query<
      GetV1PlaylistsByIdApiResponse,
      GetV1PlaylistsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/playlists/${queryArg.id}` }),
    }),
    putV1PlaylistsById: build.mutation<
      PutV1PlaylistsByIdApiResponse,
      PutV1PlaylistsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/playlists/${queryArg.id}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteV1PlaylistsById: build.mutation<
      DeleteV1PlaylistsByIdApiResponse,
      DeleteV1PlaylistsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/playlists/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getV1PlaylistsByIdScreens: build.query<
      GetV1PlaylistsByIdScreensApiResponse,
      GetV1PlaylistsByIdScreensApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/playlists/${queryArg.id}/screens`,
        params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage },
      }),
    }),
    putV1PlaylistsByIdSlideAndSlideId: build.mutation<
      PutV1PlaylistsByIdSlideAndSlideIdApiResponse,
      PutV1PlaylistsByIdSlideAndSlideIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/playlists/${queryArg.id}/slide/${queryArg.slideId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteV1PlaylistsByIdSlideAndSlideId: build.mutation<
      DeleteV1PlaylistsByIdSlideAndSlideIdApiResponse,
      DeleteV1PlaylistsByIdSlideAndSlideIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/playlists/${queryArg.id}/slide/${queryArg.slideId}`,
        method: "DELETE",
      }),
    }),
    getV1PlaylistsByIdSlides: build.query<
      GetV1PlaylistsByIdSlidesApiResponse,
      GetV1PlaylistsByIdSlidesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/playlists/${queryArg.id}/slides`,
        params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage },
      }),
    }),
    getV1ScreenGroups: build.query<
      GetV1ScreenGroupsApiResponse,
      GetV1ScreenGroupsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screenGroups`,
        params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage },
      }),
    }),
    postV1ScreenGroups: build.mutation<
      PostV1ScreenGroupsApiResponse,
      PostV1ScreenGroupsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screenGroups`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getV1ScreenGroupsById: build.query<
      GetV1ScreenGroupsByIdApiResponse,
      GetV1ScreenGroupsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/screenGroups/${queryArg.id}` }),
    }),
    putV1ScreenGroupsById: build.mutation<
      PutV1ScreenGroupsByIdApiResponse,
      PutV1ScreenGroupsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screenGroups/${queryArg.id}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteV1ScreenGroupsById: build.mutation<
      DeleteV1ScreenGroupsByIdApiResponse,
      DeleteV1ScreenGroupsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screenGroups/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getV1Screens: build.query<GetV1ScreensApiResponse, GetV1ScreensApiArg>({
      query: (queryArg) => ({
        url: `/v1/screens`,
        params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage },
      }),
    }),
    postV1Screens: build.mutation<
      PostV1ScreensApiResponse,
      PostV1ScreensApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getV1ScreensById: build.query<
      GetV1ScreensByIdApiResponse,
      GetV1ScreensByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/screens/${queryArg.id}` }),
    }),
    putV1ScreensById: build.mutation<
      PutV1ScreensByIdApiResponse,
      PutV1ScreensByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens/${queryArg.id}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteV1ScreensById: build.mutation<
      DeleteV1ScreensByIdApiResponse,
      DeleteV1ScreensByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getV1ScreensByIdRegionsAndRegionIdPlaylists: build.query<
      GetV1ScreensByIdRegionsAndRegionIdPlaylistsApiResponse,
      GetV1ScreensByIdRegionsAndRegionIdPlaylistsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens/${queryArg.id}/regions/${queryArg.regionId}/playlists`,
        params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage },
      }),
    }),
    putPlaylistScreenRegionItem: build.mutation<
      PutPlaylistScreenRegionItemApiResponse,
      PutPlaylistScreenRegionItemApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens/${queryArg.id}/regions/${queryArg.regionId}/playlists/${queryArg.playlistId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deletePlaylistScreenRegionItem: build.mutation<
      DeletePlaylistScreenRegionItemApiResponse,
      DeletePlaylistScreenRegionItemApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens/${queryArg.id}/regions/${queryArg.regionId}/playlists/${queryArg.playlistId}`,
        method: "DELETE",
      }),
    }),
    getV1Slides: build.query<GetV1SlidesApiResponse, GetV1SlidesApiArg>({
      query: (queryArg) => ({
        url: `/v1/slides`,
        params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage },
      }),
    }),
    postV1Slides: build.mutation<PostV1SlidesApiResponse, PostV1SlidesApiArg>({
      query: (queryArg) => ({
        url: `/v1/slides`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getV1SlidesById: build.query<
      GetV1SlidesByIdApiResponse,
      GetV1SlidesByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/slides/${queryArg.id}` }),
    }),
    putV1SlidesById: build.mutation<
      PutV1SlidesByIdApiResponse,
      PutV1SlidesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/slides/${queryArg.id}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteV1SlidesById: build.mutation<
      DeleteV1SlidesByIdApiResponse,
      DeleteV1SlidesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/slides/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getV1SlidesByIdPlaylists: build.query<
      GetV1SlidesByIdPlaylistsApiResponse,
      GetV1SlidesByIdPlaylistsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/slides/${queryArg.id}/playlists`,
        params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage },
      }),
    }),
    getV1Templates: build.query<
      GetV1TemplatesApiResponse,
      GetV1TemplatesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/templates`,
        params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage },
      }),
    }),
    getV1TemplatesById: build.query<
      GetV1TemplatesByIdApiResponse,
      GetV1TemplatesByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/templates/${queryArg.id}` }),
    }),
  }),
});
export type GetV1LayoutsApiResponse = unknown;
export type GetV1LayoutsApiArg = {
  page?: number;
  /** The number of items per page */
  itemsPerPage?: number;
};
export type GetV1LayoutsByIdApiResponse = unknown;
export type GetV1LayoutsByIdApiArg = {
  id: string;
};
export type GetV1MediaApiResponse = unknown;
export type GetV1MediaApiArg = {
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
};
export type GetV1MediaByIdApiResponse = unknown;
export type GetV1MediaByIdApiArg = {
  id: string;
};
export type GetV1PlaylistsApiResponse = unknown;
export type GetV1PlaylistsApiArg = {
  page: number;
  /** The number of items per page */
  itemsPerPage?: number;
};
export type PostV1PlaylistsApiResponse = unknown;
export type PostV1PlaylistsApiArg = {
  /** The new Playlist resource */
  body: string;
};
export type GetV1PlaylistsByIdApiResponse = unknown;
export type GetV1PlaylistsByIdApiArg = {
  id: string;
};
export type PutV1PlaylistsByIdApiResponse = unknown;
export type PutV1PlaylistsByIdApiArg = {
  id: string;
  /** The updated Playlist resource */
  body: string;
};
export type DeleteV1PlaylistsByIdApiResponse = unknown;
export type DeleteV1PlaylistsByIdApiArg = {
  id: string;
};
export type GetV1PlaylistsByIdScreensApiResponse = unknown;
export type GetV1PlaylistsByIdScreensApiArg = {
  id: string;
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
};
export type PutV1PlaylistsByIdSlideAndSlideIdApiResponse = unknown;
export type PutV1PlaylistsByIdSlideAndSlideIdApiArg = {
  id: string;
  slideId: string;
  body: Blob;
};
export type DeleteV1PlaylistsByIdSlideAndSlideIdApiResponse = unknown;
export type DeleteV1PlaylistsByIdSlideAndSlideIdApiArg = {
  id: string;
  slideId: string;
};
export type GetV1PlaylistsByIdSlidesApiResponse = unknown;
export type GetV1PlaylistsByIdSlidesApiArg = {
  id: string;
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
};
export type GetV1ScreenGroupsApiResponse = unknown;
export type GetV1ScreenGroupsApiArg = {
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
};
export type PostV1ScreenGroupsApiResponse = unknown;
export type PostV1ScreenGroupsApiArg = {
  /** The new ScreenGroup resource */
  body: string;
};
export type GetV1ScreenGroupsByIdApiResponse = unknown;
export type GetV1ScreenGroupsByIdApiArg = {
  id: string;
};
export type PutV1ScreenGroupsByIdApiResponse = unknown;
export type PutV1ScreenGroupsByIdApiArg = {
  id: string;
  /** The updated ScreenGroup resource */
  body: string;
};
export type DeleteV1ScreenGroupsByIdApiResponse = unknown;
export type DeleteV1ScreenGroupsByIdApiArg = {
  id: string;
};
export type GetV1ScreensApiResponse = unknown;
export type GetV1ScreensApiArg = {
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
};
export type PostV1ScreensApiResponse = unknown;
export type PostV1ScreensApiArg = {
  /** The new Screen resource */
  body: string;
};
export type GetV1ScreensByIdApiResponse = unknown;
export type GetV1ScreensByIdApiArg = {
  id: string;
};
export type PutV1ScreensByIdApiResponse = unknown;
export type PutV1ScreensByIdApiArg = {
  id: string;
  /** The updated Screen resource */
  body: string;
};
export type DeleteV1ScreensByIdApiResponse = unknown;
export type DeleteV1ScreensByIdApiArg = {
  id: string;
};
export type GetV1ScreensByIdRegionsAndRegionIdPlaylistsApiResponse = unknown;
export type GetV1ScreensByIdRegionsAndRegionIdPlaylistsApiArg = {
  id: string;
  regionId: string;
  page: number;
  /** The number of items per page */
  itemsPerPage?: string;
};
export type PutPlaylistScreenRegionItemApiResponse = unknown;
export type PutPlaylistScreenRegionItemApiArg = {
  id: string;
  regionId: string;
  playlistId: string;
  body: Blob;
};
export type DeletePlaylistScreenRegionItemApiResponse = unknown;
export type DeletePlaylistScreenRegionItemApiArg = {
  id: string;
  regionId: string;
  playlistId: string;
};
export type GetV1SlidesApiResponse = unknown;
export type GetV1SlidesApiArg = {
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
};
export type PostV1SlidesApiResponse = unknown;
export type PostV1SlidesApiArg = {
  /** The new Slide resource */
  body: string;
};
export type GetV1SlidesByIdApiResponse = unknown;
export type GetV1SlidesByIdApiArg = {
  id: string;
};
export type PutV1SlidesByIdApiResponse = unknown;
export type PutV1SlidesByIdApiArg = {
  id: string;
  /** The updated Slide resource */
  body: string;
};
export type DeleteV1SlidesByIdApiResponse = unknown;
export type DeleteV1SlidesByIdApiArg = {
  id: string;
};
export type GetV1SlidesByIdPlaylistsApiResponse = unknown;
export type GetV1SlidesByIdPlaylistsApiArg = {
  id: string;
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
};
export type GetV1TemplatesApiResponse = unknown;
export type GetV1TemplatesApiArg = {
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
};
export type GetV1TemplatesByIdApiResponse = unknown;
export type GetV1TemplatesByIdApiArg = {
  id: string;
};
export const {
  useGetV1LayoutsQuery,
  useGetV1LayoutsByIdQuery,
  useGetV1MediaQuery,
  useGetV1MediaByIdQuery,
  useGetV1PlaylistsQuery,
  usePostV1PlaylistsMutation,
  useGetV1PlaylistsByIdQuery,
  usePutV1PlaylistsByIdMutation,
  useDeleteV1PlaylistsByIdMutation,
  useGetV1PlaylistsByIdScreensQuery,
  usePutV1PlaylistsByIdSlideAndSlideIdMutation,
  useDeleteV1PlaylistsByIdSlideAndSlideIdMutation,
  useGetV1PlaylistsByIdSlidesQuery,
  useGetV1ScreenGroupsQuery,
  usePostV1ScreenGroupsMutation,
  useGetV1ScreenGroupsByIdQuery,
  usePutV1ScreenGroupsByIdMutation,
  useDeleteV1ScreenGroupsByIdMutation,
  useGetV1ScreensQuery,
  usePostV1ScreensMutation,
  useGetV1ScreensByIdQuery,
  usePutV1ScreensByIdMutation,
  useDeleteV1ScreensByIdMutation,
  useGetV1ScreensByIdRegionsAndRegionIdPlaylistsQuery,
  usePutPlaylistScreenRegionItemMutation,
  useDeletePlaylistScreenRegionItemMutation,
  useGetV1SlidesQuery,
  usePostV1SlidesMutation,
  useGetV1SlidesByIdQuery,
  usePutV1SlidesByIdMutation,
  useDeleteV1SlidesByIdMutation,
  useGetV1SlidesByIdPlaylistsQuery,
  useGetV1TemplatesQuery,
  useGetV1TemplatesByIdQuery,
} = api;

