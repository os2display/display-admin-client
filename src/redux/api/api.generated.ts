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
        params: { state: queryArg.state, code: queryArg.code },
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
    loginCheckPost: build.mutation<
      LoginCheckPostApiResponse,
      LoginCheckPostApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/authentication/token`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postRefreshTokenItem: build.mutation<
      PostRefreshTokenItemApiResponse,
      PostRefreshTokenItemApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/authentication/token/refresh`,
        method: "POST",
        body: queryArg.refreshTokenRequest,
      }),
    }),
    getV1CampaignsByIdScreenGroups: build.query<
      GetV1CampaignsByIdScreenGroupsApiResponse,
      GetV1CampaignsByIdScreenGroupsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/campaigns/${queryArg.id}/screen-groups`,
        params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage },
      }),
    }),
    getV1CampaignsByIdScreens: build.query<
      GetV1CampaignsByIdScreensApiResponse,
      GetV1CampaignsByIdScreensApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/campaigns/${queryArg.id}/screens`,
        params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage },
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
          supportedFeedOutputType: queryArg.supportedFeedOutputType,
          title: queryArg.title,
          description: queryArg.description,
          createdBy: queryArg.createdBy,
          modifiedBy: queryArg.modifiedBy,
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
          createdBy: queryArg.createdBy,
          modifiedBy: queryArg.modifiedBy,
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
          createdBy: queryArg.createdBy,
          modifiedBy: queryArg.modifiedBy,
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
          createdBy: queryArg.createdBy,
          modifiedBy: queryArg.modifiedBy,
          published: queryArg.published,
          isCampaign: queryArg.isCampaign,
          order: queryArg.order,
          sharedWithMe: queryArg.sharedWithMe,
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
          createdBy: queryArg.createdBy,
          modifiedBy: queryArg.modifiedBy,
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
    getV1ScreenGroupsByIdScreens: build.query<
      GetV1ScreenGroupsByIdScreensApiResponse,
      GetV1ScreenGroupsByIdScreensApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/screen-groups/${queryArg.id}/screens`,
        params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage },
      }),
    }),
    getV1Screens: build.query<GetV1ScreensApiResponse, GetV1ScreensApiArg>({
      query: (queryArg) => ({
        url: `/v1/screens`,
        params: {
          page: queryArg.page,
          itemsPerPage: queryArg.itemsPerPage,
          search: queryArg.search,
          createdBy: queryArg.createdBy,
          modifiedBy: queryArg.modifiedBy,
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
        params: {
          page: queryArg.page,
          itemsPerPage: queryArg.itemsPerPage,
          sharedWithMe: queryArg.sharedWithMe,
        },
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
          createdBy: queryArg.createdBy,
          modifiedBy: queryArg.modifiedBy,
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
    getV1SlidesByIdPlaylists: build.query<
      GetV1SlidesByIdPlaylistsApiResponse,
      GetV1SlidesByIdPlaylistsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/slides/${queryArg.id}/playlists`,
        params: {
          page: queryArg.page,
          itemsPerPage: queryArg.itemsPerPage,
          published: queryArg.published,
        },
      }),
    }),
    putV1SlidesByIdPlaylists: build.mutation<
      PutV1SlidesByIdPlaylistsApiResponse,
      PutV1SlidesByIdPlaylistsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/slides/${queryArg.id}/playlists`,
        method: "PUT",
        body: queryArg.body,
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
          createdBy: queryArg.createdBy,
          modifiedBy: queryArg.modifiedBy,
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
    getV1Tenants: build.query<GetV1TenantsApiResponse, GetV1TenantsApiArg>({
      query: (queryArg) => ({
        url: `/v1/tenants`,
        params: {
          page: queryArg.page,
          itemsPerPage: queryArg.itemsPerPage,
          title: queryArg.title,
          description: queryArg.description,
          createdBy: queryArg.createdBy,
          modifiedBy: queryArg.modifiedBy,
        },
      }),
    }),
    getV1TenantsById: build.query<
      GetV1TenantsByIdApiResponse,
      GetV1TenantsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/tenants/${queryArg.id}` }),
    }),
    getV1Themes: build.query<GetV1ThemesApiResponse, GetV1ThemesApiArg>({
      query: (queryArg) => ({
        url: `/v1/themes`,
        params: {
          page: queryArg.page,
          itemsPerPage: queryArg.itemsPerPage,
          title: queryArg.title,
          description: queryArg.description,
          createdBy: queryArg.createdBy,
          modifiedBy: queryArg.modifiedBy,
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
    getV1UserActivationCodeOutputsById: build.query<
      GetV1UserActivationCodeOutputsByIdApiResponse,
      GetV1UserActivationCodeOutputsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/user-activation-code-outputs/${queryArg.id}`,
      }),
    }),
    getV1UserActivationCodes: build.query<
      GetV1UserActivationCodesApiResponse,
      GetV1UserActivationCodesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/user-activation-codes`,
        params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage },
      }),
    }),
    postV1UserActivationCodes: build.mutation<
      PostV1UserActivationCodesApiResponse,
      PostV1UserActivationCodesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/user-activation-codes`,
        method: "POST",
        body: queryArg.userActivationCodeUserActivationCodeInput,
      }),
    }),
    activate: build.mutation<ActivateApiResponse, ActivateApiArg>({
      query: (queryArg) => ({
        url: `/v1/user-activation-codes/activate`,
        method: "POST",
        body: queryArg.userActivationCodeUserActivateInput,
      }),
    }),
    getV1UserActivationCodesById: build.query<
      GetV1UserActivationCodesByIdApiResponse,
      GetV1UserActivationCodesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/user-activation-codes/${queryArg.id}`,
      }),
    }),
    deleteV1UserActivationCodesById: build.mutation<
      DeleteV1UserActivationCodesByIdApiResponse,
      DeleteV1UserActivationCodesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/user-activation-codes/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    refreshCode: build.mutation<RefreshCodeApiResponse, RefreshCodeApiArg>({
      query: (queryArg) => ({
        url: `/v1/user-activation-codes/${queryArg.id}/refresh-code`,
        method: "POST",
        body: queryArg.userActivationCodeEmptyDto,
      }),
    }),
    apiV1UsersGetCollection: build.query<
      ApiV1UsersGetCollectionApiResponse,
      ApiV1UsersGetCollectionApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/users`,
        params: {
          page: queryArg.page,
          itemsPerPage: queryArg.itemsPerPage,
          fullName: queryArg.fullName,
          email: queryArg.email,
          createdBy: queryArg.createdBy,
          modifiedBy: queryArg.modifiedBy,
          order: queryArg.order,
        },
      }),
    }),
    apiV1UsersPost: build.mutation<
      ApiV1UsersPostApiResponse,
      ApiV1UsersPostApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/users`,
        method: "POST",
        body: queryArg.userUserInput,
      }),
    }),
    apiV1UsersIdGet: build.query<
      ApiV1UsersIdGetApiResponse,
      ApiV1UsersIdGetApiArg
    >({
      query: (queryArg) => ({ url: `/v1/users/${queryArg.id}` }),
    }),
    apiV1UsersIdPut: build.mutation<
      ApiV1UsersIdPutApiResponse,
      ApiV1UsersIdPutApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/users/${queryArg.id}`,
        method: "PUT",
        body: queryArg.userUserInput,
      }),
    }),
    apiV1UsersIdDelete: build.mutation<
      ApiV1UsersIdDeleteApiResponse,
      ApiV1UsersIdDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/users/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    deleteV1UsersByIdRemoveFromTenant: build.mutation<
      DeleteV1UsersByIdRemoveFromTenantApiResponse,
      DeleteV1UsersByIdRemoveFromTenantApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/users/${queryArg.id}/remove-from-tenant`,
        method: "DELETE",
      }),
    }),
  }),
});
export type GetOidcAuthTokenItemApiResponse =
  /** status 200 Get JWT token from OIDC code */ Token;
export type GetOidcAuthTokenItemApiArg = {
  /** OIDC state */
  state?: string;
  /** OIDC code */
  code?: string;
};
export type GetOidcAuthUrlsItemApiResponse =
  /** status 200 Get authentication and end session endpoints */ OidcEndpoints;
export type GetOidcAuthUrlsItemApiArg = {
  /** The key for the provider to use. Leave out to use the default provider */
  providerKey?: string;
};
export type PostLoginInfoScreenApiResponse =
  /** status 200 Login with bindKey to get JWT token for screen */ ScreenLoginOutput;
export type PostLoginInfoScreenApiArg = {
  /** Get login info with JWT token for given nonce */
  screenLoginInput: ScreenLoginInput;
};
export type LoginCheckPostApiResponse = /** status 200 User token created */ {
  token: string;
};
export type LoginCheckPostApiArg = {
  /** The login data */
  body: {
    providerId: string;
    password: string;
  };
};
export type PostRefreshTokenItemApiResponse =
  /** status 200 Refresh JWT token */ RefreshTokenResponse;
export type PostRefreshTokenItemApiArg = {
  /** Refresh JWT Token */
  refreshTokenRequest: RefreshTokenRequest;
};
export type GetV1CampaignsByIdScreenGroupsApiResponse = unknown;
export type GetV1CampaignsByIdScreenGroupsApiArg = {
  id: string;
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
};
export type GetV1CampaignsByIdScreensApiResponse = unknown;
export type GetV1CampaignsByIdScreensApiArg = {
  id: string;
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
};
export type GetV1FeedSourcesApiResponse = unknown;
export type GetV1FeedSourcesApiArg = {
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
  supportedFeedOutputType?: {
    ""?: string[];
  };
  title?: string;
  description?: string;
  createdBy?: {
    ""?: string[];
  };
  modifiedBy?: {
    ""?: string[];
  };
  order?: {
    title?: "asc" | "desc";
    description?: "asc" | "desc";
    createdAt?: "asc" | "desc";
    modifiedAt?: "asc" | "desc";
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
  createdBy?: {
    ""?: string[];
  };
  modifiedBy?: {
    ""?: string[];
  };
  order?: {
    createdAt?: "asc" | "desc";
    modifiedAt?: "asc" | "desc";
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
  createdBy?: {
    ""?: string[];
  };
  modifiedBy?: {
    ""?: string[];
  };
  order?: {
    title?: "asc" | "desc";
    description?: "asc" | "desc";
    createdAt?: "asc" | "desc";
    modifiedAt?: "asc" | "desc";
  };
};
export type PostMediaCollectionApiResponse = unknown;
export type PostMediaCollectionApiArg = {
  body: {
    title: string;
    description: string;
    license: string;
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
export type GetV1PlaylistsApiResponse = unknown;
export type GetV1PlaylistsApiArg = {
  page: number;
  /** The number of items per page */
  itemsPerPage?: number;
  title?: string;
  description?: string;
  createdBy?: {
    ""?: string[];
  };
  modifiedBy?: {
    ""?: string[];
  };
  /** If true only published content will be shown */
  published?: boolean;
  /** If true only campaigns will be shown */
  isCampaign?: boolean;
  order?: {
    title?: "asc" | "desc";
    description?: "asc" | "desc";
    createdAt?: "asc" | "desc";
    modifiedAt?: "asc" | "desc";
  };
  /** If true only entities that are shared with me will be shown */
  sharedWithMe?: boolean;
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
  /** PlaylistSlide identifier */
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
  createdBy?: {
    ""?: string[];
  };
  modifiedBy?: {
    ""?: string[];
  };
  order?: {
    title?: "asc" | "desc";
    description?: "asc" | "desc";
    createdAt?: "asc" | "desc";
  };
};
export type PostV1ScreenGroupsApiResponse = unknown;
export type PostV1ScreenGroupsApiArg = {
  /** The new ScreenGroup resource */
  screenGroupScreenGroupInput: ScreenGroupScreenGroupInput;
};
export type GetScreenGroupCampaignItemApiResponse = unknown;
export type GetScreenGroupCampaignItemApiArg = {
  /** ScreenGroupCampaign identifier */
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
  /** ScreenGroupCampaign identifier */
  id: string;
  body: Blob;
};
export type DeleteV1ScreenGroupsByIdCampaignsAndCampaignIdApiResponse = unknown;
export type DeleteV1ScreenGroupsByIdCampaignsAndCampaignIdApiArg = {
  id: string;
  campaignId: string;
};
export type GetV1ScreenGroupsByIdScreensApiResponse = unknown;
export type GetV1ScreenGroupsByIdScreensApiArg = {
  id: string;
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
};
export type GetV1ScreensApiResponse = unknown;
export type GetV1ScreensApiArg = {
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
  /** Search on both location and title */
  search?: string;
  createdBy?: {
    ""?: string[];
  };
  modifiedBy?: {
    ""?: string[];
  };
  order?: {
    title?: "asc" | "desc";
    description?: "asc" | "desc";
    createdAt?: "asc" | "desc";
    modifiedAt?: "asc" | "desc";
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
  /** The screen id */
  id: string;
  /** Bind the screen with the bind key */
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
  /** ScreenCampaign identifier */
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
  /** If true only entities that are shared with me will be shown */
  sharedWithMe?: boolean;
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
  /** The screen id */
  id: string;
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
  createdBy?: {
    ""?: string[];
  };
  modifiedBy?: {
    ""?: string[];
  };
  /** If true only published content will be shown */
  published?: boolean;
  order?: {
    title?: "asc" | "desc";
    description?: "asc" | "desc";
    createdAt?: "asc" | "desc";
    modifiedAt?: "asc" | "desc";
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
export type GetV1SlidesByIdPlaylistsApiResponse = unknown;
export type GetV1SlidesByIdPlaylistsApiArg = {
  id: string;
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
  /** If true only published content will be shown */
  published?: boolean;
};
export type PutV1SlidesByIdPlaylistsApiResponse = unknown;
export type PutV1SlidesByIdPlaylistsApiArg = {
  id: string;
  body: Blob;
};
export type GetV1TemplatesApiResponse = unknown;
export type GetV1TemplatesApiArg = {
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
  title?: string;
  description?: string;
  createdBy?: {
    ""?: string[];
  };
  modifiedBy?: {
    ""?: string[];
  };
  order?: {
    createdAt?: "asc" | "desc";
    modifiedAt?: "asc" | "desc";
  };
};
export type GetV1TemplatesByIdApiResponse = unknown;
export type GetV1TemplatesByIdApiArg = {
  id: string;
};
export type GetV1TenantsApiResponse = unknown;
export type GetV1TenantsApiArg = {
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
  title?: string;
  description?: string;
  createdBy?: {
    ""?: string[];
  };
  modifiedBy?: {
    ""?: string[];
  };
};
export type GetV1TenantsByIdApiResponse = unknown;
export type GetV1TenantsByIdApiArg = {
  id: string;
};
export type GetV1ThemesApiResponse = unknown;
export type GetV1ThemesApiArg = {
  page?: number;
  /** The number of items per page */
  itemsPerPage?: string;
  title?: string;
  description?: string;
  createdBy?: {
    ""?: string[];
  };
  modifiedBy?: {
    ""?: string[];
  };
  order?: {
    title?: "asc" | "desc";
    description?: "asc" | "desc";
    createdAt?: "asc" | "desc";
    modifiedAt?: "asc" | "desc";
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
export type GetV1UserActivationCodeOutputsByIdApiResponse = unknown;
export type GetV1UserActivationCodeOutputsByIdApiArg = {
  /** UserActivationCodeOutput identifier */
  id: string;
};
export type GetV1UserActivationCodesApiResponse = unknown;
export type GetV1UserActivationCodesApiArg = {
  /** The collection page number */
  page?: number;
  /** The number of items per page */
  itemsPerPage?: number;
};
export type PostV1UserActivationCodesApiResponse = unknown;
export type PostV1UserActivationCodesApiArg = {
  /** The new UserActivationCode resource */
  userActivationCodeUserActivationCodeInput: UserActivationCodeUserActivationCodeInput;
};
export type ActivateApiResponse = unknown;
export type ActivateApiArg = {
  /** The new UserActivationCode resource */
  userActivationCodeUserActivateInput: UserActivationCodeUserActivateInput;
};
export type GetV1UserActivationCodesByIdApiResponse = unknown;
export type GetV1UserActivationCodesByIdApiArg = {
  /** UserActivationCode identifier */
  id: string;
};
export type DeleteV1UserActivationCodesByIdApiResponse = unknown;
export type DeleteV1UserActivationCodesByIdApiArg = {
  /** UserActivationCode identifier */
  id: string;
};
export type RefreshCodeApiResponse = unknown;
export type RefreshCodeApiArg = {
  /** UserActivationCode identifier */
  id: string;
  /** The new UserActivationCode resource */
  userActivationCodeEmptyDto: UserActivationCodeEmptyDto;
};
export type ApiV1UsersGetCollectionApiResponse = unknown;
export type ApiV1UsersGetCollectionApiArg = {
  /** The collection page number */
  page?: number;
  /** The number of items per page */
  itemsPerPage?: number;
  fullName?: string;
  email?: string;
  createdBy?: {
    ""?: string[];
  };
  modifiedBy?: {
    ""?: string[];
  };
  order?: {
    createdAt?: "asc" | "desc";
  };
};
export type ApiV1UsersPostApiResponse = unknown;
export type ApiV1UsersPostApiArg = {
  /** The new User resource */
  userUserInput: UserUserInput;
};
export type ApiV1UsersIdGetApiResponse = unknown;
export type ApiV1UsersIdGetApiArg = {
  /** UserOutput identifier */
  id: string;
};
export type ApiV1UsersIdPutApiResponse = unknown;
export type ApiV1UsersIdPutApiArg = {
  /** User identifier */
  id: string;
  /** The updated User resource */
  userUserInput: UserUserInput;
};
export type ApiV1UsersIdDeleteApiResponse = unknown;
export type ApiV1UsersIdDeleteApiArg = {
  /** User identifier */
  id: string;
};
export type DeleteV1UsersByIdRemoveFromTenantApiResponse = unknown;
export type DeleteV1UsersByIdRemoveFromTenantApiArg = {
  /** User identifier */
  id: string;
};
export type Token = {
  token?: string;
  refresh_token?: string;
  refresh_token_expiration?: any;
  tenants?: {
    tenantKey?: string;
    title?: string;
    description?: string;
    roles?: string[];
  }[];
  user?: {
    fullname?: string;
    email?: string;
  };
};
export type OidcEndpoints = {
  authorizationUrl?: string;
  endSessionUrl?: string;
};
export type ScreenLoginOutput = {
  bindKey?: string;
  token?: string;
};
export type ScreenLoginInput = object;
export type RefreshTokenResponse = {
  token?: string;
  refresh_token?: string;
};
export type RefreshTokenRequest = {
  refresh_token?: string;
};
export type PlaylistPlaylistInput = {
  title?: string;
  description?: string;
  schedules?: string[];
  tenants?: string[];
  isCampaign?: boolean;
  published?: string[];
};
export type ScreenGroupScreenGroupInput = {
  title?: string;
  description?: string;
};
export type ScreenScreenInput = {
  title?: string;
  description?: string;
  size?: string;
  layout?: string;
  location?: string;
  resolution?: string;
  orientation?: string;
  enableColorSchemeChange?: any;
};
export type ScreenBindObject = {
  bindKey?: string;
};
export type SlideSlideInput = {
  title?: string;
  description?: string;
  templateInfo?: string[];
  theme?: string;
  duration?: any;
  published?: string[];
  feed?: string[];
  media?: string[];
  content?: string[];
};
export type ThemeThemeInput = {
  title?: string;
  description?: string;
  logo?: string;
  css?: string;
};
export type UserActivationCodeUserActivationCodeInput = {
  displayName?: string;
  roles?: string[];
};
export type UserActivationCodeUserActivateInput = {
  activationCode?: string;
};
export type UserActivationCodeEmptyDto = object;
export type UserUserInput = {
  fullName?: any;
};
export const {
  useGetOidcAuthTokenItemQuery,
  useGetOidcAuthUrlsItemQuery,
  usePostLoginInfoScreenMutation,
  useLoginCheckPostMutation,
  usePostRefreshTokenItemMutation,
  useGetV1CampaignsByIdScreenGroupsQuery,
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
  useGetV1ScreenGroupsByIdScreensQuery,
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
  useGetV1SlidesByIdPlaylistsQuery,
  usePutV1SlidesByIdPlaylistsMutation,
  useGetV1TemplatesQuery,
  useGetV1TemplatesByIdQuery,
  useGetV1TenantsQuery,
  useGetV1TenantsByIdQuery,
  useGetV1ThemesQuery,
  usePostV1ThemesMutation,
  useGetV1ThemesByIdQuery,
  usePutV1ThemesByIdMutation,
  useDeleteV1ThemesByIdMutation,
  useGetV1UserActivationCodeOutputsByIdQuery,
  useGetV1UserActivationCodesQuery,
  usePostV1UserActivationCodesMutation,
  useActivateMutation,
  useGetV1UserActivationCodesByIdQuery,
  useDeleteV1UserActivationCodesByIdMutation,
  useRefreshCodeMutation,
  useApiV1UsersGetCollectionQuery,
  useApiV1UsersPostMutation,
  useApiV1UsersIdGetQuery,
  useApiV1UsersIdPutMutation,
  useApiV1UsersIdDeleteMutation,
  useDeleteV1UsersByIdRemoveFromTenantMutation,
} = api;

