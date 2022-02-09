import { createApi } from "@reduxjs/toolkit/query/react";
import extendedBaseQuery from "../dynamic-base-query";
export const api = createApi({
  baseQuery: extendedBaseQuery,
  tagTypes: [],
  endpoints: (build) => ({
    getOidcAuthTokenItem: build.query<
      GetOidcAuthTokenItemApiResponse,
      GetOidcAuthTokenItemApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/authentication/oidc/token`,
        params: { state: queryArg.state, id_token: queryArg.idToken },
      }),
    }),
    getOidcAuthUrlsItem: build.query<
      GetOidcAuthUrlsItemApiResponse,
      GetOidcAuthUrlsItemApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/authentication/oidc/urls`,
        params: { providerKey: queryArg.providerKey },
      }),
    }),
    postLoginInfoScreen: build.mutation<
      PostLoginInfoScreenApiResponse,
      PostLoginInfoScreenApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/authentication/screen`,
        method: "POST",
        body: queryArg.screenLoginInput,
      }),
    }),
    postCredentialsItem: build.mutation<
      PostCredentialsItemApiResponse,
      PostCredentialsItemApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/authentication/token`,
        method: "POST",
        body: queryArg.credentials,
      }),
    }),
    getV1CampaignsByIdScreens: build.query<
      GetV1CampaignsByIdScreensApiResponse,
      GetV1CampaignsByIdScreensApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/campaigns/${queryArg.id}/screens`,
        params: {
          page: queryArg.page,
          itemsPerPage: queryArg.itemsPerPage,
          order: queryArg.order,
        },
      }),
    }),
    getV1FeedSources: build.query<
      GetV1FeedSourcesApiResponse,
      GetV1FeedSourcesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/feed-sources`,
        params: {
          page: queryArg.page,
          itemsPerPage: queryArg.itemsPerPage,
          title: queryArg.title,
          description: queryArg.description,
          order: queryArg.order,
        },
      }),
    }),
    getV1FeedSourcesById: build.query<
      GetV1FeedSourcesByIdApiResponse,
      GetV1FeedSourcesByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/feed-sources/${queryArg.id}` }),
    }),
    getV1FeedSourcesByIdConfigAndName: build.query<
      GetV1FeedSourcesByIdConfigAndNameApiResponse,
      GetV1FeedSourcesByIdConfigAndNameApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/feed_sources/${queryArg.id}/config/${queryArg.name}`,
      }),
    }),
    getV1Feeds: build.query<GetV1FeedsApiResponse, GetV1FeedsApiArg>({
      query: (queryArg) => ({
        url: `/v1/feeds`,
        params: {
          page: queryArg.page,
          itemsPerPage: queryArg.itemsPerPage,
          order: queryArg.order,
        },
      }),
    }),
    getV1FeedsById: build.query<
      GetV1FeedsByIdApiResponse,
      GetV1FeedsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/feeds/${queryArg.id}` }),
    }),
    getV1FeedsByIdData: build.query<
      GetV1FeedsByIdDataApiResponse,
      GetV1FeedsByIdDataApiArg
    >({
      query: (queryArg) => ({ url: `/v1/feeds/${queryArg.id}/data` }),
    }),
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
        params: {
          page: queryArg.page,
          itemsPerPage: queryArg.itemsPerPage,
          title: queryArg.title,
          description: queryArg.description,
          order: queryArg.order,
        },
      }),
    }),
    postMediaCollection: build.mutation<
      PostMediaCollectionApiResponse,
      PostMediaCollectionApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/media`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getV1MediaById: build.query<
      GetV1MediaByIdApiResponse,
      GetV1MediaByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/media/${queryArg.id}` }),
    }),
    deleteV1MediaById: build.mutation<
      DeleteV1MediaByIdApiResponse,
      DeleteV1MediaByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/media/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getV1MediaByIdSlides: build.query<
      GetV1MediaByIdSlidesApiResponse,
      GetV1MediaByIdSlidesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/media/${queryArg.id}/slides`,
        params: {
          page: queryArg.page,
          itemsPerPage: queryArg.itemsPerPage,
          published: queryArg.published,
          order: queryArg.order,
        },
      }),
    }),
    getV1Playlists: build.query<
      GetV1PlaylistsApiResponse,
      GetV1PlaylistsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/playlists`,
        params: {
          page: queryArg.page,
          itemsPerPage: queryArg.itemsPerPage,
          title: queryArg.title,
          description: queryArg.description,
          published: queryArg.published,
          isCampaign: queryArg.isCampaign,
          order: queryArg.order,
        },
      }),
    }),
    postV1Playlists: build.mutation<
      PostV1PlaylistsApiResponse,
      PostV1PlaylistsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/playlists`,
        method: "POST",
        body: queryArg.playlistPlaylistInput,
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
        body: queryArg.playlistPlaylistInput,
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
    getV1PlaylistsByIdSlides: build.query<
      GetV1PlaylistsByIdSlidesApiResponse,
      GetV1PlaylistsByIdSlidesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/playlists/${queryArg.id}/slides`,
        params: {
          page: queryArg.page,
          itemsPerPage: queryArg.itemsPerPage,
          published: queryArg.published,
        },
      }),
    }),
    putV1PlaylistsByIdSlides: build.mutation<
      PutV1PlaylistsByIdSlidesApiResponse,
      PutV1PlaylistsByIdSlidesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/playlists/${queryArg.id}/slides`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteV1PlaylistsByIdSlidesAndSlideId: build.mutation<
      DeleteV1PlaylistsByIdSlidesAndSlideIdApiResponse,
      DeleteV1PlaylistsByIdSlidesAndSlideIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/playlists/${queryArg.id}/slides/${queryArg.slideId}`,
        method: "DELETE",
      }),
    }),
    getV1ScreenGroups: build.query<
      GetV1ScreenGroupsApiResponse,
      GetV1ScreenGroupsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screen-groups`,
        params: {
          page: queryArg.page,
          itemsPerPage: queryArg.itemsPerPage,
          title: queryArg.title,
          description: queryArg.description,
          order: queryArg.order,
        },
      }),
    }),
    postV1ScreenGroups: build.mutation<
      PostV1ScreenGroupsApiResponse,
      PostV1ScreenGroupsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screen-groups`,
        method: "POST",
        body: queryArg.screenGroupScreenGroupInput,
      }),
    }),
    getScreenGroupCampaignItem: build.query<
      GetScreenGroupCampaignItemApiResponse,
      GetScreenGroupCampaignItemApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screen-groups-campaigns/${queryArg.id}`,
      }),
    }),
    getV1ScreenGroupsById: build.query<
      GetV1ScreenGroupsByIdApiResponse,
      GetV1ScreenGroupsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/screen-groups/${queryArg.id}` }),
    }),
    putV1ScreenGroupsById: build.mutation<
      PutV1ScreenGroupsByIdApiResponse,
      PutV1ScreenGroupsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screen-groups/${queryArg.id}`,
        method: "PUT",
        body: queryArg.screenGroupScreenGroupInput,
      }),
    }),
    deleteV1ScreenGroupsById: build.mutation<
      DeleteV1ScreenGroupsByIdApiResponse,
      DeleteV1ScreenGroupsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screen-groups/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getV1ScreenGroupsByIdCampaigns: build.query<
      GetV1ScreenGroupsByIdCampaignsApiResponse,
      GetV1ScreenGroupsByIdCampaignsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screen-groups/${queryArg.id}/campaigns`,
        params: {
          page: queryArg.page,
          itemsPerPage: queryArg.itemsPerPage,
          published: queryArg.published,
        },
      }),
    }),
    putV1ScreenGroupsByIdCampaigns: build.mutation<
      PutV1ScreenGroupsByIdCampaignsApiResponse,
      PutV1ScreenGroupsByIdCampaignsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screen-groups/${queryArg.id}/campaigns`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteV1ScreenGroupsByIdCampaignsAndCampaignId: build.mutation<
      DeleteV1ScreenGroupsByIdCampaignsAndCampaignIdApiResponse,
      DeleteV1ScreenGroupsByIdCampaignsAndCampaignIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screen-groups/${queryArg.id}/campaigns/${queryArg.campaignId}`,
        method: "DELETE",
      }),
    }),
    getV1Screens: build.query<GetV1ScreensApiResponse, GetV1ScreensApiArg>({
      query: (queryArg) => ({
        url: `/v1/screens`,
        params: {
          page: queryArg.page,
          itemsPerPage: queryArg.itemsPerPage,
          title: queryArg.title,
          description: queryArg.description,
          order: queryArg.order,
        },
      }),
    }),
    postV1Screens: build.mutation<
      PostV1ScreensApiResponse,
      PostV1ScreensApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens`,
        method: "POST",
        body: queryArg.screenScreenInput,
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
        body: queryArg.screenScreenInput,
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
    postScreenBindKey: build.mutation<
      PostScreenBindKeyApiResponse,
      PostScreenBindKeyApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens/${queryArg.id}/bind`,
        method: "POST",
        body: queryArg.screenBindObject,
      }),
    }),
    getV1ScreensByIdCampaigns: build.query<
      GetV1ScreensByIdCampaignsApiResponse,
      GetV1ScreensByIdCampaignsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens/${queryArg.id}/campaigns`,
        params: {
          page: queryArg.page,
          itemsPerPage: queryArg.itemsPerPage,
          published: queryArg.published,
        },
      }),
    }),
    putV1ScreensByIdCampaigns: build.mutation<
      PutV1ScreensByIdCampaignsApiResponse,
      PutV1ScreensByIdCampaignsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens/${queryArg.id}/campaigns`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteV1ScreensByIdCampaignsAndCampaignId: build.mutation<
      DeleteV1ScreensByIdCampaignsAndCampaignIdApiResponse,
      DeleteV1ScreensByIdCampaignsAndCampaignIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens/${queryArg.id}/campaigns/${queryArg.campaignId}`,
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
        url: `/v1/screens/${queryArg.id}/regions/${queryArg.regionId}/playlists`,
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
    getV1ScreensByIdScreenGroups: build.query<
      GetV1ScreensByIdScreenGroupsApiResponse,
      GetV1ScreensByIdScreenGroupsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens/${queryArg.id}/screen-groups`,
        params: {
          page: queryArg.page,
          itemsPerPage: queryArg.itemsPerPage,
          order: queryArg.order,
        },
      }),
    }),
    putV1ScreensByIdScreenGroups: build.mutation<
      PutV1ScreensByIdScreenGroupsApiResponse,
      PutV1ScreensByIdScreenGroupsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens/${queryArg.id}/screen-groups`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteV1ScreensByIdScreenGroupsAndScreenGroupId: build.mutation<
      DeleteV1ScreensByIdScreenGroupsAndScreenGroupIdApiResponse,
      DeleteV1ScreensByIdScreenGroupsAndScreenGroupIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens/${queryArg.id}/screen-groups/${queryArg.screenGroupId}`,
        method: "DELETE",
      }),
    }),
    postScreenUnbind: build.mutation<
      PostScreenUnbindApiResponse,
      PostScreenUnbindApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screens/${queryArg.id}/unbind`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getV1Slides: build.query<GetV1SlidesApiResponse, GetV1SlidesApiArg>({
      query: (queryArg) => ({
        url: `/v1/slides`,
        params: {
          page: queryArg.page,
          itemsPerPage: queryArg.itemsPerPage,
          title: queryArg.title,
          description: queryArg.description,
          published: queryArg.published,
          order: queryArg.order,
        },
      }),
    }),
    postV1Slides: build.mutation<PostV1SlidesApiResponse, PostV1SlidesApiArg>({
      query: (queryArg) => ({
        url: `/v1/slides`,
        method: "POST",
        body: queryArg.slideSlideInput,
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
        body: queryArg.slideSlideInput,
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
    getV1Templates: build.query<
      GetV1TemplatesApiResponse,
      GetV1TemplatesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/templates`,
        params: {
          page: queryArg.page,
          itemsPerPage: queryArg.itemsPerPage,
          title: queryArg.title,
          description: queryArg.description,
          order: queryArg.order,
        },
      }),
    }),
    getV1TemplatesById: build.query<
      GetV1TemplatesByIdApiResponse,
      GetV1TemplatesByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/templates/${queryArg.id}` }),
    }),
    getV1Themes: build.query<GetV1ThemesApiResponse, GetV1ThemesApiArg>({
      query: (queryArg) => ({
        url: `/v1/themes`,
        params: {
          page: queryArg.page,
          itemsPerPage: queryArg.itemsPerPage,
          title: queryArg.title,
          description: queryArg.description,
          order: queryArg.order,
        },
      }),
    }),
    postV1Themes: build.mutation<PostV1ThemesApiResponse, PostV1ThemesApiArg>({
      query: (queryArg) => ({
        url: `/v1/themes`,
        method: "POST",
        body: queryArg.themeThemeInput,
      }),
    }),
    getV1ThemesById: build.query<
      GetV1ThemesByIdApiResponse,
      GetV1ThemesByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/themes/${queryArg.id}` }),
    }),
    putV1ThemesById: build.mutation<
      PutV1ThemesByIdApiResponse,
      PutV1ThemesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/themes/${queryArg.id}`,
        method: "PUT",
        body: queryArg.themeThemeInput,
      }),
    }),
    deleteV1ThemesById: build.mutation<
      DeleteV1ThemesByIdApiResponse,
      DeleteV1ThemesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/themes/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export type GetOidcAuthTokenItemApiResponse =
  /** status 200 Get JWT token from OIDC token */ Token;
export type GetOidcAuthTokenItemApiArg = {
  /** OIDC state */
  state?: any;
  /** OIDC id token */
  idToken?: any;
};
export type GetOidcAuthUrlsItemApiResponse =
  /** status 200 Get authentication and end session endpoints */ OidcEndpoints;
export type GetOidcAuthUrlsItemApiArg = {
  /** The key for the provider to use. Leave out to use the default provider */
  providerKey?: any;
};
export type PostLoginInfoScreenApiResponse =
  /** status 200 Login with bindKey to get JWT token for screen */ ScreenLoginOutput;
export type PostLoginInfoScreenApiArg = {
  /** Get login info with JWT token for given nonce */
  screenLoginInput: ScreenLoginInput;
};
export type PostCredentialsItemApiResponse =
  /** status 200 Get JWT token */ Token;
export type PostCredentialsItemApiArg = {
  /** Generate new JWT Token */
  credentials: Credentials;
};
export type GetV1CampaignsByIdScreensApiResponse = unknown;
export type GetV1CampaignsByIdScreensApiArg = {
  id: string;
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
  order?: {
    title?: "asc" | "desc";
    description?: "asc" | "desc";
    createdAt?: "asc" | "desc";
    updatedAt?: "asc" | "desc";
  };
};
export type GetV1FeedSourcesApiResponse = unknown;
export type GetV1FeedSourcesApiArg = {
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
  title?: string;
  description?: string;
  order?: {
    title?: "asc" | "desc";
    description?: "asc" | "desc";
    createdAt?: "asc" | "desc";
    updatedAt?: "asc" | "desc";
  };
};
export type GetV1FeedSourcesByIdApiResponse = unknown;
export type GetV1FeedSourcesByIdApiArg = {
  id: string;
};
export type GetV1FeedSourcesByIdConfigAndNameApiResponse = unknown;
export type GetV1FeedSourcesByIdConfigAndNameApiArg = {
  id: string;
  name: string;
};
export type GetV1FeedsApiResponse = unknown;
export type GetV1FeedsApiArg = {
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
  order?: {
    createdAt?: "asc" | "desc";
    updatedAt?: "asc" | "desc";
  };
};
export type GetV1FeedsByIdApiResponse = unknown;
export type GetV1FeedsByIdApiArg = {
  id: string;
};
export type GetV1FeedsByIdDataApiResponse = unknown;
export type GetV1FeedsByIdDataApiArg = {
  id: string;
};
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
  title?: string;
  description?: string;
  order?: {
    title?: "asc" | "desc";
    description?: "asc" | "desc";
    createdAt?: "asc" | "desc";
    updatedAt?: "asc" | "desc";
  };
};
export type PostMediaCollectionApiResponse = unknown;
export type PostMediaCollectionApiArg = {
  body: {
    title: string;
    description: string;
    license: string;
    modifiedBy?: string;
    createdBy?: string;
    file: Blob;
  };
};
export type GetV1MediaByIdApiResponse = unknown;
export type GetV1MediaByIdApiArg = {
  id: string;
};
export type DeleteV1MediaByIdApiResponse = unknown;
export type DeleteV1MediaByIdApiArg = {
  id: string;
};
export type GetV1MediaByIdSlidesApiResponse = unknown;
export type GetV1MediaByIdSlidesApiArg = {
  id: string;
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
  /** If true only published content will be shown */
  published?: boolean;
  order?: {
    title?: "asc" | "desc";
    description?: "asc" | "desc";
    createdAt?: "asc" | "desc";
    updatedAt?: "asc" | "desc";
  };
};
export type GetV1PlaylistsApiResponse = unknown;
export type GetV1PlaylistsApiArg = {
  page: number;
  /** The number of items per page */
  itemsPerPage?: number;
  title?: string;
  description?: string;
  /** If true only published content will be shown */
  published?: boolean;
  /** If true only campaigns will be shown */
  isCampaign?: boolean;
  order?: {
    title?: "asc" | "desc";
    description?: "asc" | "desc";
    createdAt?: "asc" | "desc";
    updatedAt?: "asc" | "desc";
  };
};
export type PostV1PlaylistsApiResponse = unknown;
export type PostV1PlaylistsApiArg = {
  /** The new Playlist resource */
  playlistPlaylistInput: PlaylistPlaylistInput;
};
export type GetV1PlaylistsByIdApiResponse = unknown;
export type GetV1PlaylistsByIdApiArg = {
  id: string;
};
export type PutV1PlaylistsByIdApiResponse = unknown;
export type PutV1PlaylistsByIdApiArg = {
  id: string;
  /** The updated Playlist resource */
  playlistPlaylistInput: PlaylistPlaylistInput;
};
export type DeleteV1PlaylistsByIdApiResponse = unknown;
export type DeleteV1PlaylistsByIdApiArg = {
  id: string;
};
export type GetV1PlaylistsByIdSlidesApiResponse = unknown;
export type GetV1PlaylistsByIdSlidesApiArg = {
  id: string;
  page: number;
  /** The number of items per page */
  itemsPerPage?: string;
  /** If true only published content will be shown */
  published?: boolean;
};
export type PutV1PlaylistsByIdSlidesApiResponse = unknown;
export type PutV1PlaylistsByIdSlidesApiArg = {
  /** Resource identifier */
  id: string;
  body: Blob;
};
export type DeleteV1PlaylistsByIdSlidesAndSlideIdApiResponse = unknown;
export type DeleteV1PlaylistsByIdSlidesAndSlideIdApiArg = {
  id: string;
  slideId: string;
};
export type GetV1ScreenGroupsApiResponse = unknown;
export type GetV1ScreenGroupsApiArg = {
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
  title?: string;
  description?: string;
  order?: {
    title?: "asc" | "desc";
    description?: "asc" | "desc";
  };
};
export type PostV1ScreenGroupsApiResponse = unknown;
export type PostV1ScreenGroupsApiArg = {
  /** The new ScreenGroup resource */
  screenGroupScreenGroupInput: ScreenGroupScreenGroupInput;
};
export type GetScreenGroupCampaignItemApiResponse = unknown;
export type GetScreenGroupCampaignItemApiArg = {
  /** Resource identifier */
  id: string;
};
export type GetV1ScreenGroupsByIdApiResponse = unknown;
export type GetV1ScreenGroupsByIdApiArg = {
  id: string;
};
export type PutV1ScreenGroupsByIdApiResponse = unknown;
export type PutV1ScreenGroupsByIdApiArg = {
  id: string;
  /** The updated ScreenGroup resource */
  screenGroupScreenGroupInput: ScreenGroupScreenGroupInput;
};
export type DeleteV1ScreenGroupsByIdApiResponse = unknown;
export type DeleteV1ScreenGroupsByIdApiArg = {
  id: string;
};
export type GetV1ScreenGroupsByIdCampaignsApiResponse = unknown;
export type GetV1ScreenGroupsByIdCampaignsApiArg = {
  id: string;
  page: number;
  /** The number of items per page */
  itemsPerPage?: string;
  /** If true only published content will be shown */
  published?: boolean;
};
export type PutV1ScreenGroupsByIdCampaignsApiResponse = unknown;
export type PutV1ScreenGroupsByIdCampaignsApiArg = {
  /** Resource identifier */
  id: string;
  body: Blob;
};
export type DeleteV1ScreenGroupsByIdCampaignsAndCampaignIdApiResponse = unknown;
export type DeleteV1ScreenGroupsByIdCampaignsAndCampaignIdApiArg = {
  id: string;
  campaignId: string;
};
export type GetV1ScreensApiResponse = unknown;
export type GetV1ScreensApiArg = {
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
  title?: string;
  description?: string;
  order?: {
    title?: "asc" | "desc";
    description?: "asc" | "desc";
    createdAt?: "asc" | "desc";
    updatedAt?: "asc" | "desc";
  };
};
export type PostV1ScreensApiResponse = unknown;
export type PostV1ScreensApiArg = {
  /** The new Screen resource */
  screenScreenInput: ScreenScreenInput;
};
export type GetV1ScreensByIdApiResponse = unknown;
export type GetV1ScreensByIdApiArg = {
  id: string;
};
export type PutV1ScreensByIdApiResponse = unknown;
export type PutV1ScreensByIdApiArg = {
  id: string;
  /** The updated Screen resource */
  screenScreenInput: ScreenScreenInput;
};
export type DeleteV1ScreensByIdApiResponse = unknown;
export type DeleteV1ScreensByIdApiArg = {
  id: string;
};
export type PostScreenBindKeyApiResponse = unknown;
export type PostScreenBindKeyApiArg = {
  id?: any;
  /** Get login info with JWT token for given nonce */
  screenBindObject: ScreenBindObject;
};
export type GetV1ScreensByIdCampaignsApiResponse = unknown;
export type GetV1ScreensByIdCampaignsApiArg = {
  id: string;
  page: number;
  /** The number of items per page */
  itemsPerPage?: string;
  /** If true only published content will be shown */
  published?: boolean;
};
export type PutV1ScreensByIdCampaignsApiResponse = unknown;
export type PutV1ScreensByIdCampaignsApiArg = {
  /** Resource identifier */
  id: string;
  body: Blob;
};
export type DeleteV1ScreensByIdCampaignsAndCampaignIdApiResponse = unknown;
export type DeleteV1ScreensByIdCampaignsAndCampaignIdApiArg = {
  id: string;
  campaignId: string;
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
  body: Blob;
};
export type DeletePlaylistScreenRegionItemApiResponse = unknown;
export type DeletePlaylistScreenRegionItemApiArg = {
  id: string;
  regionId: string;
  playlistId: string;
};
export type GetV1ScreensByIdScreenGroupsApiResponse = unknown;
export type GetV1ScreensByIdScreenGroupsApiArg = {
  id: string;
  page: number;
  /** The number of items per page */
  itemsPerPage?: string;
  order?: {
    title?: "asc" | "desc";
    description?: "asc" | "desc";
  };
};
export type PutV1ScreensByIdScreenGroupsApiResponse = unknown;
export type PutV1ScreensByIdScreenGroupsApiArg = {
  id: string;
  body: string[];
};
export type DeleteV1ScreensByIdScreenGroupsAndScreenGroupIdApiResponse =
  unknown;
export type DeleteV1ScreensByIdScreenGroupsAndScreenGroupIdApiArg = {
  id: string;
  screenGroupId: string;
};
export type PostScreenUnbindApiResponse = unknown;
export type PostScreenUnbindApiArg = {
  id?: any;
  /** Unbind from machine */
  body: string;
};
export type GetV1SlidesApiResponse = unknown;
export type GetV1SlidesApiArg = {
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
  title?: string;
  description?: string;
  /** If true only published content will be shown */
  published?: boolean;
  order?: {
    title?: "asc" | "desc";
    description?: "asc" | "desc";
    createdAt?: "asc" | "desc";
    updatedAt?: "asc" | "desc";
  };
};
export type PostV1SlidesApiResponse = unknown;
export type PostV1SlidesApiArg = {
  /** The new Slide resource */
  slideSlideInput: SlideSlideInput;
};
export type GetV1SlidesByIdApiResponse = unknown;
export type GetV1SlidesByIdApiArg = {
  id: string;
};
export type PutV1SlidesByIdApiResponse = unknown;
export type PutV1SlidesByIdApiArg = {
  id: string;
  /** The updated Slide resource */
  slideSlideInput: SlideSlideInput;
};
export type DeleteV1SlidesByIdApiResponse = unknown;
export type DeleteV1SlidesByIdApiArg = {
  id: string;
};
export type GetV1TemplatesApiResponse = unknown;
export type GetV1TemplatesApiArg = {
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
  title?: string;
  description?: string;
  order?: {
    createdAt?: "asc" | "desc";
    updatedAt?: "asc" | "desc";
  };
};
export type GetV1TemplatesByIdApiResponse = unknown;
export type GetV1TemplatesByIdApiArg = {
  id: string;
};
export type GetV1ThemesApiResponse = unknown;
export type GetV1ThemesApiArg = {
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
  title?: string;
  description?: string;
  order?: {
    title?: "asc" | "desc";
    description?: "asc" | "desc";
    createdAt?: "asc" | "desc";
    updatedAt?: "asc" | "desc";
  };
};
export type PostV1ThemesApiResponse = unknown;
export type PostV1ThemesApiArg = {
  /** The new Theme resource */
  themeThemeInput: ThemeThemeInput;
};
export type GetV1ThemesByIdApiResponse = unknown;
export type GetV1ThemesByIdApiArg = {
  id: string;
};
export type PutV1ThemesByIdApiResponse = unknown;
export type PutV1ThemesByIdApiArg = {
  id: string;
  /** The updated Theme resource */
  themeThemeInput: ThemeThemeInput;
};
export type DeleteV1ThemesByIdApiResponse = unknown;
export type DeleteV1ThemesByIdApiArg = {
  id: string;
};
export type Token = {
  token?: string;
};
export type OidcEndpoints = {
  authorizationUrl?: string;
  endSessionUrl?: string;
};
export type ScreenLoginOutput = {
  bindKey?: string;
  token?: string;
  screenId?: string;
};
export type ScreenLoginInput = object;
export type Credentials = {
  email?: string;
  password?: string;
};
export type PlaylistPlaylistInput = {
  title?: string;
  description?: string;
  schedules?: string[];
  isCampaign?: boolean;
  modifiedBy?: string;
  createdBy?: string;
  published?: string[];
};
export type ScreenGroupScreenGroupInput = {
  title?: string;
  description?: string;
  modifiedBy?: string;
  createdBy?: string;
};
export type ScreenScreenInput = {
  title?: string;
  description?: string;
  size?: string;
  modifiedBy?: string;
  createdBy?: string;
  layout?: string;
  location?: string;
  dimensions?: string[];
};
export type ScreenBindObject = {
  bindKey?: string;
};
export type SlideSlideInput = {
  title?: string;
  description?: string;
  modifiedBy?: string;
  createdBy?: string;
  templateInfo?: string[];
  theme?: string;
  duration?: number | null;
  published?: string[];
  feed?: string[] | null;
  media?: string[];
  content?: string[];
};
export type ThemeThemeInput = {
  title?: string;
  description?: string;
  modifiedBy?: string;
  createdBy?: string;
  css?: string;
};
export const {
  useGetOidcAuthTokenItemQuery,
  useGetOidcAuthUrlsItemQuery,
  usePostLoginInfoScreenMutation,
  usePostCredentialsItemMutation,
  useGetV1CampaignsByIdScreensQuery,
  useGetV1FeedSourcesQuery,
  useGetV1FeedSourcesByIdQuery,
  useGetV1FeedSourcesByIdConfigAndNameQuery,
  useGetV1FeedsQuery,
  useGetV1FeedsByIdQuery,
  useGetV1FeedsByIdDataQuery,
  useGetV1LayoutsQuery,
  useGetV1LayoutsByIdQuery,
  useGetV1MediaQuery,
  usePostMediaCollectionMutation,
  useGetV1MediaByIdQuery,
  useDeleteV1MediaByIdMutation,
  useGetV1MediaByIdSlidesQuery,
  useGetV1PlaylistsQuery,
  usePostV1PlaylistsMutation,
  useGetV1PlaylistsByIdQuery,
  usePutV1PlaylistsByIdMutation,
  useDeleteV1PlaylistsByIdMutation,
  useGetV1PlaylistsByIdSlidesQuery,
  usePutV1PlaylistsByIdSlidesMutation,
  useDeleteV1PlaylistsByIdSlidesAndSlideIdMutation,
  useGetV1ScreenGroupsQuery,
  usePostV1ScreenGroupsMutation,
  useGetScreenGroupCampaignItemQuery,
  useGetV1ScreenGroupsByIdQuery,
  usePutV1ScreenGroupsByIdMutation,
  useDeleteV1ScreenGroupsByIdMutation,
  useGetV1ScreenGroupsByIdCampaignsQuery,
  usePutV1ScreenGroupsByIdCampaignsMutation,
  useDeleteV1ScreenGroupsByIdCampaignsAndCampaignIdMutation,
  useGetV1ScreensQuery,
  usePostV1ScreensMutation,
  useGetV1ScreensByIdQuery,
  usePutV1ScreensByIdMutation,
  useDeleteV1ScreensByIdMutation,
  usePostScreenBindKeyMutation,
  useGetV1ScreensByIdCampaignsQuery,
  usePutV1ScreensByIdCampaignsMutation,
  useDeleteV1ScreensByIdCampaignsAndCampaignIdMutation,
  useGetV1ScreensByIdRegionsAndRegionIdPlaylistsQuery,
  usePutPlaylistScreenRegionItemMutation,
  useDeletePlaylistScreenRegionItemMutation,
  useGetV1ScreensByIdScreenGroupsQuery,
  usePutV1ScreensByIdScreenGroupsMutation,
  useDeleteV1ScreensByIdScreenGroupsAndScreenGroupIdMutation,
  usePostScreenUnbindMutation,
  useGetV1SlidesQuery,
  usePostV1SlidesMutation,
  useGetV1SlidesByIdQuery,
  usePutV1SlidesByIdMutation,
  useDeleteV1SlidesByIdMutation,
  useGetV1TemplatesQuery,
  useGetV1TemplatesByIdQuery,
  useGetV1ThemesQuery,
  usePostV1ThemesMutation,
  useGetV1ThemesByIdQuery,
  usePutV1ThemesByIdMutation,
  useDeleteV1ThemesByIdMutation,
} = api;

