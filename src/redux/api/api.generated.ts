import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://os2display-api.local.itkdev.dk",
  }),
  tagTypes: [],
  endpoints: (build) => ({
    getV1Layouts: build.query<GetV1LayoutsApiResponse, GetV1LayoutsApiArg>({
      query: (queryArg) => ({
        url: `/v1/layouts`,
        params: { page: queryArg.page },
      }),
    }),
    getV1LayoutsById: build.query<
      GetV1LayoutsByIdApiResponse,
      GetV1LayoutsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/layouts/${queryArg.id}` }),
    }),
    getV1Screens: build.query<GetV1ScreensApiResponse, GetV1ScreensApiArg>({
      query: (queryArg) => ({
        url: `/v1/screens`,
        params: { page: queryArg.page },
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
    deleteV1ScreensById: build.mutation<
      DeleteV1ScreensByIdApiResponse,
      DeleteV1ScreensByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens/${queryArg.id}`,
        method: "DELETE",
      }),
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
    getV1ScreensByIdGroups: build.query<
      GetV1ScreensByIdGroupsApiResponse,
      GetV1ScreensByIdGroupsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens/${queryArg.id}/groups`,
        params: { page: queryArg.page },
      }),
    }),
    putV1ScreensByIdGroupsAndGroupId: build.mutation<
      PutV1ScreensByIdGroupsAndGroupIdApiResponse,
      PutV1ScreensByIdGroupsAndGroupIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens/${queryArg.id}/groups/${queryArg.groupId}`,
        method: "PUT",
      }),
    }),
    deleteV1ScreensByIdGroupsAndGroupId: build.mutation<
      DeleteV1ScreensByIdGroupsAndGroupIdApiResponse,
      DeleteV1ScreensByIdGroupsAndGroupIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens/${queryArg.id}/groups/${queryArg.groupId}`,
        method: "DELETE",
      }),
    }),
    getV1ScreensByIdRegionsAndRegionIdPlaylists: build.query<
      GetV1ScreensByIdRegionsAndRegionIdPlaylistsApiResponse,
      GetV1ScreensByIdRegionsAndRegionIdPlaylistsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens/${queryArg.id}/regions/${queryArg.regionId}/playlists`,
        params: { page: queryArg.page },
      }),
    }),
    putV1ScreensByIdRegionsAndRegionIdPlaylistsPlaylistId: build.mutation<
      PutV1ScreensByIdRegionsAndRegionIdPlaylistsPlaylistIdApiResponse,
      PutV1ScreensByIdRegionsAndRegionIdPlaylistsPlaylistIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens/${queryArg.id}/regions/${queryArg.regionId}/playlists/${queryArg.playlistId}`,
        method: "PUT",
      }),
    }),
    deleteV1ScreensByIdRegionsAndRegionIdPlaylistsPlaylistId: build.mutation<
      DeleteV1ScreensByIdRegionsAndRegionIdPlaylistsPlaylistIdApiResponse,
      DeleteV1ScreensByIdRegionsAndRegionIdPlaylistsPlaylistIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens/${queryArg.id}/regions/${queryArg.regionId}/playlists/${queryArg.playlistId}`,
        method: "DELETE",
      }),
    }),
    getV1ScreenGroups: build.query<
      GetV1ScreenGroupsApiResponse,
      GetV1ScreenGroupsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screenGroups`,
        params: { page: queryArg.page },
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
    getV1Playlists: build.query<
      GetV1PlaylistsApiResponse,
      GetV1PlaylistsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/playlists`,
        params: { page: queryArg.page },
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
        params: { page: queryArg.page },
      }),
    }),
    putV1PlaylistsByIdScreensAndScreenId: build.mutation<
      PutV1PlaylistsByIdScreensAndScreenIdApiResponse,
      PutV1PlaylistsByIdScreensAndScreenIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/playlists/${queryArg.id}/screens/${queryArg.screenId}`,
        method: "PUT",
      }),
    }),
    deleteV1PlaylistsByIdScreensAndScreenId: build.mutation<
      DeleteV1PlaylistsByIdScreensAndScreenIdApiResponse,
      DeleteV1PlaylistsByIdScreensAndScreenIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/playlists/${queryArg.id}/screens/${queryArg.screenId}`,
        method: "DELETE",
      }),
    }),
    deleteV1PlaylistByIdSlideAndSlideId: build.mutation<
      DeleteV1PlaylistByIdSlideAndSlideIdApiResponse,
      DeleteV1PlaylistByIdSlideAndSlideIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/playlist/${queryArg.id}/slide/${queryArg.slideId}`,
        method: "DELETE",
      }),
    }),
    putV1PlaylistByIdSlideAndSlideId: build.mutation<
      PutV1PlaylistByIdSlideAndSlideIdApiResponse,
      PutV1PlaylistByIdSlideAndSlideIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/playlist/${queryArg.id}/slide/${queryArg.slideId}`,
        method: "PUT",
      }),
    }),
    getV1Slides: build.query<GetV1SlidesApiResponse, GetV1SlidesApiArg>({
      query: (queryArg) => ({
        url: `/v1/slides`,
        params: { page: queryArg.page },
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
    getV1SlidesByIdScreens: build.query<
      GetV1SlidesByIdScreensApiResponse,
      GetV1SlidesByIdScreensApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/slides/${queryArg.id}/screens`,
        params: { page: queryArg.page },
      }),
    }),
    putV1SlidesByIdScreensAndScreenId: build.mutation<
      PutV1SlidesByIdScreensAndScreenIdApiResponse,
      PutV1SlidesByIdScreensAndScreenIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/slides/${queryArg.id}/screens/${queryArg.screenId}`,
        method: "PUT",
      }),
    }),
    deleteV1SlidesByIdScreensAndScreenId: build.mutation<
      DeleteV1SlidesByIdScreensAndScreenIdApiResponse,
      DeleteV1SlidesByIdScreensAndScreenIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/slides/${queryArg.id}/screens/${queryArg.screenId}`,
        method: "DELETE",
      }),
    }),
    getV1SlidesByIdPlaylists: build.query<
      GetV1SlidesByIdPlaylistsApiResponse,
      GetV1SlidesByIdPlaylistsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/slides/${queryArg.id}/playlists`,
        params: { page: queryArg.page },
      }),
    }),
    putV1SlidesByIdPlaylistsAndPlaylistId: build.mutation<
      PutV1SlidesByIdPlaylistsAndPlaylistIdApiResponse,
      PutV1SlidesByIdPlaylistsAndPlaylistIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/slides/${queryArg.id}/playlists/${queryArg.playlistId}`,
        method: "PUT",
      }),
    }),
    deleteV1SlidesByIdPlaylistsAndPlaylistId: build.mutation<
      DeleteV1SlidesByIdPlaylistsAndPlaylistIdApiResponse,
      DeleteV1SlidesByIdPlaylistsAndPlaylistIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/slides/${queryArg.id}/playlists/${queryArg.playlistId}`,
        method: "DELETE",
      }),
    }),
    getV1Templates: build.query<
      GetV1TemplatesApiResponse,
      GetV1TemplatesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/templates`,
        params: { page: queryArg.page },
      }),
    }),
    getV1TemplateById: build.query<
      GetV1TemplateByIdApiResponse,
      GetV1TemplateByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/template/${queryArg.id}` }),
    }),
    getV1Media: build.query<GetV1MediaApiResponse, GetV1MediaApiArg>({
      query: (queryArg) => ({
        url: `/v1/media`,
        params: { page: queryArg.page },
      }),
    }),
    getV1MediaById: build.query<
      GetV1MediaByIdApiResponse,
      GetV1MediaByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/media/${queryArg.id}` }),
    }),
  }),
});
export type GetV1LayoutsApiResponse = unknown;
export type GetV1LayoutsApiArg = {
  page: number;
};
export type GetV1LayoutsByIdApiResponse = /** status 200 OK */ {
  "@context"?: string;
  "@id": string;
  title: string;
  grid: {
    rows: number;
    columns: number;
  };
  regions: {
    id: string;
    title: string;
    gridArea: string[];
  }[];
};
export type GetV1LayoutsByIdApiArg = {
  /** The UUID for the screen layout to fetch */
  id: string;
};
export type GetV1ScreensApiResponse = unknown;
export type GetV1ScreensApiArg = {
  page: number;
};
export type PostV1ScreensApiResponse = unknown;
export type PostV1ScreensApiArg = {
  body: {
    "@context"?: string;
    "@id": string;
    title: string;
    description: string;
    size: number;
    dimensions: {
      height: number;
      width: number;
    };
    location: string;
    regions: string[];
    inScreenGroups?: string;
    layout: string;
    modified: string;
    created: string;
    modifiedBy: string;
    createdBy: string;
  };
};
export type GetV1ScreensByIdApiResponse = unknown;
export type GetV1ScreensByIdApiArg = {
  /** The UUID for the screen to get */
  id: string;
};
export type DeleteV1ScreensByIdApiResponse = unknown;
export type DeleteV1ScreensByIdApiArg = {
  /** The UUID for the screen to get */
  id: string;
};
export type PutV1ScreensByIdApiResponse = unknown;
export type PutV1ScreensByIdApiArg = {
  /** The UUID for the screen to get */
  id: string;
  body: {
    "@context"?: string;
    "@id": string;
    title: string;
    description: string;
    size: number;
    dimensions: {
      height: number;
      width: number;
    };
    location: string;
    regions: string[];
    inScreenGroups?: string;
    layout: string;
    modified: string;
    created: string;
    modifiedBy: string;
    createdBy: string;
  };
};
export type GetV1ScreensByIdGroupsApiResponse = unknown;
export type GetV1ScreensByIdGroupsApiArg = {
  /** Screens ID */
  id: string;
  page: number;
};
export type PutV1ScreensByIdGroupsAndGroupIdApiResponse = unknown;
export type PutV1ScreensByIdGroupsAndGroupIdApiArg = {
  id: string;
  groupId: string;
};
export type DeleteV1ScreensByIdGroupsAndGroupIdApiResponse = unknown;
export type DeleteV1ScreensByIdGroupsAndGroupIdApiArg = {
  id: string;
  groupId: string;
};
export type GetV1ScreensByIdRegionsAndRegionIdPlaylistsApiResponse = unknown;
export type GetV1ScreensByIdRegionsAndRegionIdPlaylistsApiArg = {
  id: string;
  regionId: string;
  page: number;
};
export type PutV1ScreensByIdRegionsAndRegionIdPlaylistsPlaylistIdApiResponse =
  unknown;
export type PutV1ScreensByIdRegionsAndRegionIdPlaylistsPlaylistIdApiArg = {
  id: string;
  regionId: string;
  playlistId: string;
};
export type DeleteV1ScreensByIdRegionsAndRegionIdPlaylistsPlaylistIdApiResponse =
  unknown;
export type DeleteV1ScreensByIdRegionsAndRegionIdPlaylistsPlaylistIdApiArg = {
  id: string;
  regionId: string;
  playlistId: string;
};
export type GetV1ScreenGroupsApiResponse = unknown;
export type GetV1ScreenGroupsApiArg = {
  page: number;
};
export type PostV1ScreenGroupsApiResponse = unknown;
export type PostV1ScreenGroupsApiArg = {
  body: {
    "@context"?: string;
    "@id": string;
    title: string;
    description: string;
    modified: string;
    created: string;
    modifiedBy: string;
    createdBy: string;
  };
};
export type GetV1ScreenGroupsByIdApiResponse = /** status 200 OK */ {
  "@context"?: string;
  "@id": string;
  title: string;
  description: string;
  modified: string;
  created: string;
  modifiedBy: string;
  createdBy: string;
};
export type GetV1ScreenGroupsByIdApiArg = {
  id: string;
};
export type PutV1ScreenGroupsByIdApiResponse = unknown;
export type PutV1ScreenGroupsByIdApiArg = {
  id: string;
  body: {
    "@context"?: string;
    "@id": string;
    title: string;
    description: string;
    modified: string;
    created: string;
    modifiedBy: string;
    createdBy: string;
  };
};
export type DeleteV1ScreenGroupsByIdApiResponse = unknown;
export type DeleteV1ScreenGroupsByIdApiArg = {
  id: string;
};
export type GetV1PlaylistsApiResponse = unknown;
export type GetV1PlaylistsApiArg = {
  page: number;
};
export type PostV1PlaylistsApiResponse = unknown;
export type PostV1PlaylistsApiArg = {
  body: {
    "@context"?: string;
    "@id": string;
    title: string;
    description: string;
    modified: string;
    created: string;
    modifiedBy: string;
    createdBy: string;
    onScreens?: string;
    published: {
      from: string;
      to: string;
    };
  };
};
export type GetV1PlaylistsByIdApiResponse = unknown;
export type GetV1PlaylistsByIdApiArg = {
  id: string;
};
export type PutV1PlaylistsByIdApiResponse = unknown;
export type PutV1PlaylistsByIdApiArg = {
  id: string;
  body: {
    "@context"?: string;
    "@id": string;
    title: string;
    description: string;
    modified: string;
    created: string;
    modifiedBy: string;
    createdBy: string;
    onScreens?: string;
    published: {
      from: string;
      to: string;
    };
  };
};
export type DeleteV1PlaylistsByIdApiResponse = unknown;
export type DeleteV1PlaylistsByIdApiArg = {
  id: string;
};
export type GetV1PlaylistsByIdScreensApiResponse = unknown;
export type GetV1PlaylistsByIdScreensApiArg = {
  id: string;
  page: number;
};
export type PutV1PlaylistsByIdScreensAndScreenIdApiResponse = unknown;
export type PutV1PlaylistsByIdScreensAndScreenIdApiArg = {
  id: string;
  screenId: string;
};
export type DeleteV1PlaylistsByIdScreensAndScreenIdApiResponse = unknown;
export type DeleteV1PlaylistsByIdScreensAndScreenIdApiArg = {
  id: string;
  screenId: string;
};
export type DeleteV1PlaylistByIdSlideAndSlideIdApiResponse = unknown;
export type DeleteV1PlaylistByIdSlideAndSlideIdApiArg = {
  id: string;
  slideId: string;
};
export type PutV1PlaylistByIdSlideAndSlideIdApiResponse = unknown;
export type PutV1PlaylistByIdSlideAndSlideIdApiArg = {
  id: string;
  slideId: string;
};
export type GetV1SlidesApiResponse = unknown;
export type GetV1SlidesApiArg = {
  page: number;
};
export type PostV1SlidesApiResponse = unknown;
export type PostV1SlidesApiArg = {
  body: {
    "@context"?: string;
    "@id": string;
    title: string;
    description: string;
    modified: string;
    created: string;
    modifiedBy: string;
    createdBy: string;
    template: {
      "@id": string;
      options: object[];
    };
    onScreens?: string;
    onPlaylists?: string;
    duration: number;
    published: number;
    content: object;
  };
};
export type GetV1SlidesByIdApiResponse = unknown;
export type GetV1SlidesByIdApiArg = {
  id: string;
};
export type PutV1SlidesByIdApiResponse = unknown;
export type PutV1SlidesByIdApiArg = {
  id: string;
  body: {
    "@context"?: string;
    "@id": string;
    title: string;
    description: string;
    modified: string;
    created: string;
    modifiedBy: string;
    createdBy: string;
    template: {
      "@id": string;
      options: object[];
    };
    onScreens?: string;
    onPlaylists?: string;
    duration: number;
    published: number;
    content: object;
  };
};
export type DeleteV1SlidesByIdApiResponse = unknown;
export type DeleteV1SlidesByIdApiArg = {
  id: string;
};
export type GetV1SlidesByIdScreensApiResponse = unknown;
export type GetV1SlidesByIdScreensApiArg = {
  id: string;
  page: number;
};
export type PutV1SlidesByIdScreensAndScreenIdApiResponse = unknown;
export type PutV1SlidesByIdScreensAndScreenIdApiArg = {
  id: string;
  screenId: string;
};
export type DeleteV1SlidesByIdScreensAndScreenIdApiResponse = unknown;
export type DeleteV1SlidesByIdScreensAndScreenIdApiArg = {
  id: string;
  screenId: string;
};
export type GetV1SlidesByIdPlaylistsApiResponse = unknown;
export type GetV1SlidesByIdPlaylistsApiArg = {
  id: string;
  page: number;
};
export type PutV1SlidesByIdPlaylistsAndPlaylistIdApiResponse = unknown;
export type PutV1SlidesByIdPlaylistsAndPlaylistIdApiArg = {
  id: string;
  playlistId: string;
};
export type DeleteV1SlidesByIdPlaylistsAndPlaylistIdApiResponse = unknown;
export type DeleteV1SlidesByIdPlaylistsAndPlaylistIdApiArg = {
  id: string;
  playlistId: string;
};
export type GetV1TemplatesApiResponse = unknown;
export type GetV1TemplatesApiArg = {
  page: number;
};
export type GetV1TemplateByIdApiResponse = unknown;
export type GetV1TemplateByIdApiArg = {
  id: string;
};
export type GetV1MediaApiResponse = unknown;
export type GetV1MediaApiArg = {
  page: number;
};
export type GetV1MediaByIdApiResponse = unknown;
export type GetV1MediaByIdApiArg = {
  id: string;
};
export const {
  useGetV1LayoutsQuery,
  useGetV1LayoutsByIdQuery,
  useGetV1ScreensQuery,
  usePostV1ScreensMutation,
  useGetV1ScreensByIdQuery,
  useDeleteV1ScreensByIdMutation,
  usePutV1ScreensByIdMutation,
  useGetV1ScreensByIdGroupsQuery,
  usePutV1ScreensByIdGroupsAndGroupIdMutation,
  useDeleteV1ScreensByIdGroupsAndGroupIdMutation,
  useGetV1ScreensByIdRegionsAndRegionIdPlaylistsQuery,
  usePutV1ScreensByIdRegionsAndRegionIdPlaylistsPlaylistIdMutation,
  useDeleteV1ScreensByIdRegionsAndRegionIdPlaylistsPlaylistIdMutation,
  useGetV1ScreenGroupsQuery,
  usePostV1ScreenGroupsMutation,
  useGetV1ScreenGroupsByIdQuery,
  usePutV1ScreenGroupsByIdMutation,
  useDeleteV1ScreenGroupsByIdMutation,
  useGetV1PlaylistsQuery,
  usePostV1PlaylistsMutation,
  useGetV1PlaylistsByIdQuery,
  usePutV1PlaylistsByIdMutation,
  useDeleteV1PlaylistsByIdMutation,
  useGetV1PlaylistsByIdScreensQuery,
  usePutV1PlaylistsByIdScreensAndScreenIdMutation,
  useDeleteV1PlaylistsByIdScreensAndScreenIdMutation,
  useDeleteV1PlaylistByIdSlideAndSlideIdMutation,
  usePutV1PlaylistByIdSlideAndSlideIdMutation,
  useGetV1SlidesQuery,
  usePostV1SlidesMutation,
  useGetV1SlidesByIdQuery,
  usePutV1SlidesByIdMutation,
  useDeleteV1SlidesByIdMutation,
  useGetV1SlidesByIdScreensQuery,
  usePutV1SlidesByIdScreensAndScreenIdMutation,
  useDeleteV1SlidesByIdScreensAndScreenIdMutation,
  useGetV1SlidesByIdPlaylistsQuery,
  usePutV1SlidesByIdPlaylistsAndPlaylistIdMutation,
  useDeleteV1SlidesByIdPlaylistsAndPlaylistIdMutation,
  useGetV1TemplatesQuery,
  useGetV1TemplateByIdQuery,
  useGetV1MediaQuery,
  useGetV1MediaByIdQuery,
} = api;

