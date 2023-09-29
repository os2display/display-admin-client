"use strict";
exports.__esModule = true;
exports.useDeletePlaylistScreenRegionItemMutation = exports.usePutPlaylistScreenRegionItemMutation = exports.useGetV1ScreensByIdRegionsAndRegionIdPlaylistsQuery = exports.useDeleteV1ScreensByIdCampaignsAndCampaignIdMutation = exports.usePutV1ScreensByIdCampaignsMutation = exports.useGetV1ScreensByIdCampaignsQuery = exports.usePostScreenBindKeyMutation = exports.useDeleteV1ScreensByIdMutation = exports.usePutV1ScreensByIdMutation = exports.useGetV1ScreensByIdQuery = exports.usePostV1ScreensMutation = exports.useGetV1ScreensQuery = exports.useGetV1ScreenGroupsByIdScreensQuery = exports.useDeleteV1ScreenGroupsByIdCampaignsAndCampaignIdMutation = exports.usePutV1ScreenGroupsByIdCampaignsMutation = exports.useGetV1ScreenGroupsByIdCampaignsQuery = exports.useDeleteV1ScreenGroupsByIdMutation = exports.usePutV1ScreenGroupsByIdMutation = exports.useGetV1ScreenGroupsByIdQuery = exports.useGetScreenGroupCampaignItemQuery = exports.usePostV1ScreenGroupsMutation = exports.useGetV1ScreenGroupsQuery = exports.useDeleteV1PlaylistsByIdSlidesAndSlideIdMutation = exports.usePutV1PlaylistsByIdSlidesMutation = exports.useGetV1PlaylistsByIdSlidesQuery = exports.useDeleteV1PlaylistsByIdMutation = exports.usePutV1PlaylistsByIdMutation = exports.useGetV1PlaylistsByIdQuery = exports.usePostV1PlaylistsMutation = exports.useGetV1PlaylistsQuery = exports.useDeleteV1MediaByIdMutation = exports.useGetV1MediaByIdQuery = exports.usePostMediaCollectionMutation = exports.useGetV1MediaQuery = exports.useGetV1LayoutsByIdQuery = exports.useGetV1LayoutsQuery = exports.useGetV1FeedsByIdDataQuery = exports.useGetV1FeedsByIdQuery = exports.useGetV1FeedsQuery = exports.useGetV1FeedSourcesByIdConfigAndNameQuery = exports.useGetV1FeedSourcesByIdQuery = exports.useGetV1FeedSourcesQuery = exports.useGetV1CampaignsByIdScreensQuery = exports.useGetV1CampaignsByIdScreenGroupsQuery = exports.usePostRefreshTokenItemMutation = exports.usePostCredentialsItemMutation = exports.usePostLoginInfoScreenMutation = exports.useGetOidcAuthUrlsItemQuery = exports.useGetOidcAuthTokenItemQuery = exports.api = void 0;
exports.useDeleteV1UsersByIdMutation = exports.usePutV1UsersByIdMutation = exports.useGetV1UsersByIdQuery = exports.useGetV1UsersQuery = exports.usePostV1UserActivationCodesByIdRefreshCodeMutation = exports.useDeleteUserActivationCodeItemMutation = exports.useGetUserActivationCodeItemQuery = exports.usePostV1UserActivationCodesActivateMutation = exports.usePostV1UserActivationCodesMutation = exports.useGetUserActivationCodeCollectionQuery = exports.useDeleteV1ThemesByIdMutation = exports.usePutV1ThemesByIdMutation = exports.useGetV1ThemesByIdQuery = exports.usePostV1ThemesMutation = exports.useGetV1ThemesQuery = exports.useGetV1TenantsByIdQuery = exports.useGetV1TenantsQuery = exports.useGetV1TemplatesByIdQuery = exports.useGetV1TemplatesQuery = exports.usePutV1SlidesByIdPlaylistsMutation = exports.useGetV1SlidesByIdPlaylistsQuery = exports.useDeleteV1SlidesByIdMutation = exports.usePutV1SlidesByIdMutation = exports.useGetV1SlidesByIdQuery = exports.usePostV1SlidesMutation = exports.useGetV1SlidesQuery = exports.usePostScreenUnbindMutation = exports.useDeleteV1ScreensByIdScreenGroupsAndScreenGroupIdMutation = exports.usePutV1ScreensByIdScreenGroupsMutation = exports.useGetV1ScreensByIdScreenGroupsQuery = void 0;
var react_1 = require("@reduxjs/toolkit/query/react");
var dynamic_base_query_1 = require("../dynamic-base-query");
exports.api = (0, react_1.createApi)({
    baseQuery: dynamic_base_query_1["default"],
    tagTypes: [],
    endpoints: function (build) { return ({
        getOidcAuthTokenItem: build.query({
            query: function (queryArg) { return ({
                url: "/v1/authentication/oidc/token",
                params: { state: queryArg.state, id_token: queryArg.idToken }
            }); }
        }),
        getOidcAuthUrlsItem: build.query({
            query: function (queryArg) { return ({
                url: "/v1/authentication/oidc/urls",
                params: { providerKey: queryArg.providerKey }
            }); }
        }),
        postLoginInfoScreen: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/authentication/screen",
                method: "POST",
                body: queryArg.screenLoginInput
            }); }
        }),
        postCredentialsItem: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/authentication/token",
                method: "POST",
                body: queryArg.credentials
            }); }
        }),
        postRefreshTokenItem: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/authentication/token/refresh",
                method: "POST",
                body: queryArg.refreshTokenRequest
            }); }
        }),
        getV1CampaignsByIdScreenGroups: build.query({
            query: function (queryArg) { return ({
                url: "/v1/campaigns/" + queryArg.id + "/screen-groups",
                params: {
                    page: queryArg.page,
                    itemsPerPage: queryArg.itemsPerPage,
                    order: queryArg.order
                }
            }); }
        }),
        getV1CampaignsByIdScreens: build.query({
            query: function (queryArg) { return ({
                url: "/v1/campaigns/" + queryArg.id + "/screens",
                params: {
                    page: queryArg.page,
                    itemsPerPage: queryArg.itemsPerPage,
                    order: queryArg.order
                }
            }); }
        }),
        getV1FeedSources: build.query({
            query: function (queryArg) { return ({
                url: "/v1/feed-sources",
                params: {
                    page: queryArg.page,
                    itemsPerPage: queryArg.itemsPerPage,
                    supportedFeedOutputType: queryArg.supportedFeedOutputType,
                    title: queryArg.title,
                    description: queryArg.description,
                    createdBy: queryArg.createdBy,
                    modifiedBy: queryArg.modifiedBy,
                    order: queryArg.order
                }
            }); }
        }),
        getV1FeedSourcesById: build.query({
            query: function (queryArg) { return ({ url: "/v1/feed-sources/" + queryArg.id }); }
        }),
        getV1FeedSourcesByIdConfigAndName: build.query({
            query: function (queryArg) { return ({
                url: "/v1/feed_sources/" + queryArg.id + "/config/" + queryArg.name
            }); }
        }),
        getV1Feeds: build.query({
            query: function (queryArg) { return ({
                url: "/v1/feeds",
                params: {
                    page: queryArg.page,
                    itemsPerPage: queryArg.itemsPerPage,
                    createdBy: queryArg.createdBy,
                    modifiedBy: queryArg.modifiedBy,
                    order: queryArg.order
                }
            }); }
        }),
        getV1FeedsById: build.query({
            query: function (queryArg) { return ({ url: "/v1/feeds/" + queryArg.id }); }
        }),
        getV1FeedsByIdData: build.query({
            query: function (queryArg) { return ({ url: "/v1/feeds/" + queryArg.id + "/data" }); }
        }),
        getV1Layouts: build.query({
            query: function (queryArg) { return ({
                url: "/v1/layouts",
                params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage }
            }); }
        }),
        getV1LayoutsById: build.query({
            query: function (queryArg) { return ({ url: "/v1/layouts/" + queryArg.id }); }
        }),
        getV1Media: build.query({
            query: function (queryArg) { return ({
                url: "/v1/media",
                params: {
                    page: queryArg.page,
                    itemsPerPage: queryArg.itemsPerPage,
                    title: queryArg.title,
                    description: queryArg.description,
                    createdBy: queryArg.createdBy,
                    modifiedBy: queryArg.modifiedBy,
                    order: queryArg.order
                }
            }); }
        }),
        postMediaCollection: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/media",
                method: "POST",
                body: queryArg.body
            }); }
        }),
        getV1MediaById: build.query({
            query: function (queryArg) { return ({ url: "/v1/media/" + queryArg.id }); }
        }),
        deleteV1MediaById: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/media/" + queryArg.id,
                method: "DELETE"
            }); }
        }),
        getV1Playlists: build.query({
            query: function (queryArg) { return ({
                url: "/v1/playlists",
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
                    sharedWithMe: queryArg.sharedWithMe
                }
            }); }
        }),
        postV1Playlists: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/playlists",
                method: "POST",
                body: queryArg.playlistPlaylistInput
            }); }
        }),
        getV1PlaylistsById: build.query({
            query: function (queryArg) { return ({ url: "/v1/playlists/" + queryArg.id }); }
        }),
        putV1PlaylistsById: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/playlists/" + queryArg.id,
                method: "PUT",
                body: queryArg.playlistPlaylistInput
            }); }
        }),
        deleteV1PlaylistsById: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/playlists/" + queryArg.id,
                method: "DELETE"
            }); }
        }),
        getV1PlaylistsByIdSlides: build.query({
            query: function (queryArg) { return ({
                url: "/v1/playlists/" + queryArg.id + "/slides",
                params: {
                    page: queryArg.page,
                    itemsPerPage: queryArg.itemsPerPage,
                    createdBy: queryArg.createdBy,
                    modifiedBy: queryArg.modifiedBy,
                    published: queryArg.published,
                    order: queryArg.order
                }
            }); }
        }),
        putV1PlaylistsByIdSlides: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/playlists/" + queryArg.id + "/slides",
                method: "PUT",
                body: queryArg.body
            }); }
        }),
        deleteV1PlaylistsByIdSlidesAndSlideId: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/playlists/" + queryArg.id + "/slides/" + queryArg.slideId,
                method: "DELETE"
            }); }
        }),
        getV1ScreenGroups: build.query({
            query: function (queryArg) { return ({
                url: "/v1/screen-groups",
                params: {
                    page: queryArg.page,
                    itemsPerPage: queryArg.itemsPerPage,
                    title: queryArg.title,
                    description: queryArg.description,
                    createdBy: queryArg.createdBy,
                    modifiedBy: queryArg.modifiedBy,
                    order: queryArg.order
                }
            }); }
        }),
        postV1ScreenGroups: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screen-groups",
                method: "POST",
                body: queryArg.screenGroupScreenGroupInput
            }); }
        }),
        getScreenGroupCampaignItem: build.query({
            query: function (queryArg) { return ({
                url: "/v1/screen-groups-campaigns/" + queryArg.id
            }); }
        }),
        getV1ScreenGroupsById: build.query({
            query: function (queryArg) { return ({ url: "/v1/screen-groups/" + queryArg.id }); }
        }),
        putV1ScreenGroupsById: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screen-groups/" + queryArg.id,
                method: "PUT",
                body: queryArg.screenGroupScreenGroupInput
            }); }
        }),
        deleteV1ScreenGroupsById: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screen-groups/" + queryArg.id,
                method: "DELETE"
            }); }
        }),
        getV1ScreenGroupsByIdCampaigns: build.query({
            query: function (queryArg) { return ({
                url: "/v1/screen-groups/" + queryArg.id + "/campaigns",
                params: {
                    page: queryArg.page,
                    itemsPerPage: queryArg.itemsPerPage,
                    createdBy: queryArg.createdBy,
                    modifiedBy: queryArg.modifiedBy,
                    published: queryArg.published,
                    order: queryArg.order
                }
            }); }
        }),
        putV1ScreenGroupsByIdCampaigns: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screen-groups/" + queryArg.id + "/campaigns",
                method: "PUT",
                body: queryArg.body
            }); }
        }),
        deleteV1ScreenGroupsByIdCampaignsAndCampaignId: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screen-groups/" + queryArg.id + "/campaigns/" + queryArg.campaignId,
                method: "DELETE"
            }); }
        }),
        getV1ScreenGroupsByIdScreens: build.query({
            query: function (queryArg) { return ({
                url: "/v1/screen-groups/" + queryArg.id + "/screens",
                params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage }
            }); }
        }),
        getV1Screens: build.query({
            query: function (queryArg) { return ({
                url: "/v1/screens",
                params: {
                    page: queryArg.page,
                    itemsPerPage: queryArg.itemsPerPage,
                    search: queryArg.search,
                    createdBy: queryArg.createdBy,
                    modifiedBy: queryArg.modifiedBy,
                    order: queryArg.order
                }
            }); }
        }),
        postV1Screens: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screens",
                method: "POST",
                body: queryArg.screenScreenInput
            }); }
        }),
        getV1ScreensById: build.query({
            query: function (queryArg) { return ({ url: "/v1/screens/" + queryArg.id }); }
        }),
        putV1ScreensById: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id,
                method: "PUT",
                body: queryArg.screenScreenInput
            }); }
        }),
        deleteV1ScreensById: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id,
                method: "DELETE"
            }); }
        }),
        postScreenBindKey: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id + "/bind",
                method: "POST",
                body: queryArg.screenBindObject
            }); }
        }),
        getV1ScreensByIdCampaigns: build.query({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id + "/campaigns",
                params: {
                    page: queryArg.page,
                    itemsPerPage: queryArg.itemsPerPage,
                    createdBy: queryArg.createdBy,
                    modifiedBy: queryArg.modifiedBy,
                    published: queryArg.published,
                    order: queryArg.order
                }
            }); }
        }),
        putV1ScreensByIdCampaigns: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id + "/campaigns",
                method: "PUT",
                body: queryArg.body
            }); }
        }),
        deleteV1ScreensByIdCampaignsAndCampaignId: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id + "/campaigns/" + queryArg.campaignId,
                method: "DELETE"
            }); }
        }),
        getV1ScreensByIdRegionsAndRegionIdPlaylists: build.query({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id + "/regions/" + queryArg.regionId + "/playlists",
                params: {
                    page: queryArg.page,
                    itemsPerPage: queryArg.itemsPerPage,
                    sharedWithMe: queryArg.sharedWithMe
                }
            }); }
        }),
        putPlaylistScreenRegionItem: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id + "/regions/" + queryArg.regionId + "/playlists",
                method: "PUT",
                body: queryArg.body
            }); }
        }),
        deletePlaylistScreenRegionItem: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id + "/regions/" + queryArg.regionId + "/playlists/" + queryArg.playlistId,
                method: "DELETE"
            }); }
        }),
        getV1ScreensByIdScreenGroups: build.query({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id + "/screen-groups",
                params: {
                    page: queryArg.page,
                    itemsPerPage: queryArg.itemsPerPage,
                    order: queryArg.order
                }
            }); }
        }),
        putV1ScreensByIdScreenGroups: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id + "/screen-groups",
                method: "PUT",
                body: queryArg.body
            }); }
        }),
        deleteV1ScreensByIdScreenGroupsAndScreenGroupId: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id + "/screen-groups/" + queryArg.screenGroupId,
                method: "DELETE"
            }); }
        }),
        postScreenUnbind: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id + "/unbind",
                method: "POST",
                body: queryArg.body
            }); }
        }),
        getV1Slides: build.query({
            query: function (queryArg) { return ({
                url: "/v1/slides",
                params: {
                    page: queryArg.page,
                    itemsPerPage: queryArg.itemsPerPage,
                    title: queryArg.title,
                    description: queryArg.description,
                    createdBy: queryArg.createdBy,
                    modifiedBy: queryArg.modifiedBy,
                    published: queryArg.published,
                    order: queryArg.order
                }
            }); }
        }),
        postV1Slides: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/slides",
                method: "POST",
                body: queryArg.slideSlideInput
            }); }
        }),
        getV1SlidesById: build.query({
            query: function (queryArg) { return ({ url: "/v1/slides/" + queryArg.id }); }
        }),
        putV1SlidesById: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/slides/" + queryArg.id,
                method: "PUT",
                body: queryArg.slideSlideInput
            }); }
        }),
        deleteV1SlidesById: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/slides/" + queryArg.id,
                method: "DELETE"
            }); }
        }),
        getV1SlidesByIdPlaylists: build.query({
            query: function (queryArg) { return ({
                url: "/v1/slides/" + queryArg.id + "/playlists",
                params: {
                    page: queryArg.page,
                    itemsPerPage: queryArg.itemsPerPage,
                    createdBy: queryArg.createdBy,
                    modifiedBy: queryArg.modifiedBy,
                    published: queryArg.published,
                    order: queryArg.order
                }
            }); }
        }),
        putV1SlidesByIdPlaylists: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/slides/" + queryArg.id + "/playlists",
                method: "PUT",
                body: queryArg.body
            }); }
        }),
        getV1Templates: build.query({
            query: function (queryArg) { return ({
                url: "/v1/templates",
                params: {
                    page: queryArg.page,
                    itemsPerPage: queryArg.itemsPerPage,
                    title: queryArg.title,
                    description: queryArg.description,
                    createdBy: queryArg.createdBy,
                    modifiedBy: queryArg.modifiedBy,
                    order: queryArg.order
                }
            }); }
        }),
        getV1TemplatesById: build.query({
            query: function (queryArg) { return ({ url: "/v1/templates/" + queryArg.id }); }
        }),
        getV1Tenants: build.query({
            query: function (queryArg) { return ({
                url: "/v1/tenants",
                params: {
                    page: queryArg.page,
                    itemsPerPage: queryArg.itemsPerPage,
                    title: queryArg.title,
                    description: queryArg.description,
                    createdBy: queryArg.createdBy,
                    modifiedBy: queryArg.modifiedBy
                }
            }); }
        }),
        getV1TenantsById: build.query({
            query: function (queryArg) { return ({ url: "/v1/tenants/" + queryArg.id }); }
        }),
        getV1Themes: build.query({
            query: function (queryArg) { return ({
                url: "/v1/themes",
                params: {
                    page: queryArg.page,
                    itemsPerPage: queryArg.itemsPerPage,
                    title: queryArg.title,
                    description: queryArg.description,
                    createdBy: queryArg.createdBy,
                    modifiedBy: queryArg.modifiedBy,
                    order: queryArg.order
                }
            }); }
        }),
        postV1Themes: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/themes",
                method: "POST",
                body: queryArg.themeThemeInput
            }); }
        }),
        getV1ThemesById: build.query({
            query: function (queryArg) { return ({ url: "/v1/themes/" + queryArg.id }); }
        }),
        putV1ThemesById: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/themes/" + queryArg.id,
                method: "PUT",
                body: queryArg.themeThemeInput
            }); }
        }),
        deleteV1ThemesById: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/themes/" + queryArg.id,
                method: "DELETE"
            }); }
        }),
        getUserActivationCodeCollection: build.query({
            query: function (queryArg) { return ({
                url: "/v1/user-activation-codes",
                params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage }
            }); }
        }),
        postV1UserActivationCodes: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/user-activation-codes",
                method: "POST",
                body: queryArg.userActivationCodeUserActivationCodeInput
            }); }
        }),
        postV1UserActivationCodesActivate: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/user-activation-codes/activate",
                method: "POST",
                body: queryArg.userActivationCodeUserActivateInput
            }); }
        }),
        getUserActivationCodeItem: build.query({
            query: function (queryArg) { return ({
                url: "/v1/user-activation-codes/" + queryArg.id
            }); }
        }),
        deleteUserActivationCodeItem: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/user-activation-codes/" + queryArg.id,
                method: "DELETE"
            }); }
        }),
        postV1UserActivationCodesByIdRefreshCode: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/user-activation-codes/" + queryArg.id + "/refresh-code",
                method: "POST",
                body: queryArg.userActivationCode
            }); }
        }),
        getV1Users: build.query({
            query: function (queryArg) { return ({
                url: "/v1/users",
                params: {
                    page: queryArg.page,
                    itemsPerPage: queryArg.itemsPerPage,
                    createdBy: queryArg.createdBy,
                    modifiedBy: queryArg.modifiedBy,
                    order: queryArg.order
                }
            }); }
        }),
        getV1UsersById: build.query({
            query: function (queryArg) { return ({ url: "/v1/users/" + queryArg.id }); }
        }),
        putV1UsersById: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/users/" + queryArg.id,
                method: "PUT",
                body: queryArg.userUserInput
            }); }
        }),
        deleteV1UsersById: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/users/" + queryArg.id,
                method: "DELETE"
            }); }
        })
    }); }
});
exports.useGetOidcAuthTokenItemQuery = exports.api.useGetOidcAuthTokenItemQuery, exports.useGetOidcAuthUrlsItemQuery = exports.api.useGetOidcAuthUrlsItemQuery, exports.usePostLoginInfoScreenMutation = exports.api.usePostLoginInfoScreenMutation, exports.usePostCredentialsItemMutation = exports.api.usePostCredentialsItemMutation, exports.usePostRefreshTokenItemMutation = exports.api.usePostRefreshTokenItemMutation, exports.useGetV1CampaignsByIdScreenGroupsQuery = exports.api.useGetV1CampaignsByIdScreenGroupsQuery, exports.useGetV1CampaignsByIdScreensQuery = exports.api.useGetV1CampaignsByIdScreensQuery, exports.useGetV1FeedSourcesQuery = exports.api.useGetV1FeedSourcesQuery, exports.useGetV1FeedSourcesByIdQuery = exports.api.useGetV1FeedSourcesByIdQuery, exports.useGetV1FeedSourcesByIdConfigAndNameQuery = exports.api.useGetV1FeedSourcesByIdConfigAndNameQuery, exports.useGetV1FeedsQuery = exports.api.useGetV1FeedsQuery, exports.useGetV1FeedsByIdQuery = exports.api.useGetV1FeedsByIdQuery, exports.useGetV1FeedsByIdDataQuery = exports.api.useGetV1FeedsByIdDataQuery, exports.useGetV1LayoutsQuery = exports.api.useGetV1LayoutsQuery, exports.useGetV1LayoutsByIdQuery = exports.api.useGetV1LayoutsByIdQuery, exports.useGetV1MediaQuery = exports.api.useGetV1MediaQuery, exports.usePostMediaCollectionMutation = exports.api.usePostMediaCollectionMutation, exports.useGetV1MediaByIdQuery = exports.api.useGetV1MediaByIdQuery, exports.useDeleteV1MediaByIdMutation = exports.api.useDeleteV1MediaByIdMutation, exports.useGetV1PlaylistsQuery = exports.api.useGetV1PlaylistsQuery, exports.usePostV1PlaylistsMutation = exports.api.usePostV1PlaylistsMutation, exports.useGetV1PlaylistsByIdQuery = exports.api.useGetV1PlaylistsByIdQuery, exports.usePutV1PlaylistsByIdMutation = exports.api.usePutV1PlaylistsByIdMutation, exports.useDeleteV1PlaylistsByIdMutation = exports.api.useDeleteV1PlaylistsByIdMutation, exports.useGetV1PlaylistsByIdSlidesQuery = exports.api.useGetV1PlaylistsByIdSlidesQuery, exports.usePutV1PlaylistsByIdSlidesMutation = exports.api.usePutV1PlaylistsByIdSlidesMutation, exports.useDeleteV1PlaylistsByIdSlidesAndSlideIdMutation = exports.api.useDeleteV1PlaylistsByIdSlidesAndSlideIdMutation, exports.useGetV1ScreenGroupsQuery = exports.api.useGetV1ScreenGroupsQuery, exports.usePostV1ScreenGroupsMutation = exports.api.usePostV1ScreenGroupsMutation, exports.useGetScreenGroupCampaignItemQuery = exports.api.useGetScreenGroupCampaignItemQuery, exports.useGetV1ScreenGroupsByIdQuery = exports.api.useGetV1ScreenGroupsByIdQuery, exports.usePutV1ScreenGroupsByIdMutation = exports.api.usePutV1ScreenGroupsByIdMutation, exports.useDeleteV1ScreenGroupsByIdMutation = exports.api.useDeleteV1ScreenGroupsByIdMutation, exports.useGetV1ScreenGroupsByIdCampaignsQuery = exports.api.useGetV1ScreenGroupsByIdCampaignsQuery, exports.usePutV1ScreenGroupsByIdCampaignsMutation = exports.api.usePutV1ScreenGroupsByIdCampaignsMutation, exports.useDeleteV1ScreenGroupsByIdCampaignsAndCampaignIdMutation = exports.api.useDeleteV1ScreenGroupsByIdCampaignsAndCampaignIdMutation, exports.useGetV1ScreenGroupsByIdScreensQuery = exports.api.useGetV1ScreenGroupsByIdScreensQuery, exports.useGetV1ScreensQuery = exports.api.useGetV1ScreensQuery, exports.usePostV1ScreensMutation = exports.api.usePostV1ScreensMutation, exports.useGetV1ScreensByIdQuery = exports.api.useGetV1ScreensByIdQuery, exports.usePutV1ScreensByIdMutation = exports.api.usePutV1ScreensByIdMutation, exports.useDeleteV1ScreensByIdMutation = exports.api.useDeleteV1ScreensByIdMutation, exports.usePostScreenBindKeyMutation = exports.api.usePostScreenBindKeyMutation, exports.useGetV1ScreensByIdCampaignsQuery = exports.api.useGetV1ScreensByIdCampaignsQuery, exports.usePutV1ScreensByIdCampaignsMutation = exports.api.usePutV1ScreensByIdCampaignsMutation, exports.useDeleteV1ScreensByIdCampaignsAndCampaignIdMutation = exports.api.useDeleteV1ScreensByIdCampaignsAndCampaignIdMutation, exports.useGetV1ScreensByIdRegionsAndRegionIdPlaylistsQuery = exports.api.useGetV1ScreensByIdRegionsAndRegionIdPlaylistsQuery, exports.usePutPlaylistScreenRegionItemMutation = exports.api.usePutPlaylistScreenRegionItemMutation, exports.useDeletePlaylistScreenRegionItemMutation = exports.api.useDeletePlaylistScreenRegionItemMutation, exports.useGetV1ScreensByIdScreenGroupsQuery = exports.api.useGetV1ScreensByIdScreenGroupsQuery, exports.usePutV1ScreensByIdScreenGroupsMutation = exports.api.usePutV1ScreensByIdScreenGroupsMutation, exports.useDeleteV1ScreensByIdScreenGroupsAndScreenGroupIdMutation = exports.api.useDeleteV1ScreensByIdScreenGroupsAndScreenGroupIdMutation, exports.usePostScreenUnbindMutation = exports.api.usePostScreenUnbindMutation, exports.useGetV1SlidesQuery = exports.api.useGetV1SlidesQuery, exports.usePostV1SlidesMutation = exports.api.usePostV1SlidesMutation, exports.useGetV1SlidesByIdQuery = exports.api.useGetV1SlidesByIdQuery, exports.usePutV1SlidesByIdMutation = exports.api.usePutV1SlidesByIdMutation, exports.useDeleteV1SlidesByIdMutation = exports.api.useDeleteV1SlidesByIdMutation, exports.useGetV1SlidesByIdPlaylistsQuery = exports.api.useGetV1SlidesByIdPlaylistsQuery, exports.usePutV1SlidesByIdPlaylistsMutation = exports.api.usePutV1SlidesByIdPlaylistsMutation, exports.useGetV1TemplatesQuery = exports.api.useGetV1TemplatesQuery, exports.useGetV1TemplatesByIdQuery = exports.api.useGetV1TemplatesByIdQuery, exports.useGetV1TenantsQuery = exports.api.useGetV1TenantsQuery, exports.useGetV1TenantsByIdQuery = exports.api.useGetV1TenantsByIdQuery, exports.useGetV1ThemesQuery = exports.api.useGetV1ThemesQuery, exports.usePostV1ThemesMutation = exports.api.usePostV1ThemesMutation, exports.useGetV1ThemesByIdQuery = exports.api.useGetV1ThemesByIdQuery, exports.usePutV1ThemesByIdMutation = exports.api.usePutV1ThemesByIdMutation, exports.useDeleteV1ThemesByIdMutation = exports.api.useDeleteV1ThemesByIdMutation, exports.useGetUserActivationCodeCollectionQuery = exports.api.useGetUserActivationCodeCollectionQuery, exports.usePostV1UserActivationCodesMutation = exports.api.usePostV1UserActivationCodesMutation, exports.usePostV1UserActivationCodesActivateMutation = exports.api.usePostV1UserActivationCodesActivateMutation, exports.useGetUserActivationCodeItemQuery = exports.api.useGetUserActivationCodeItemQuery, exports.useDeleteUserActivationCodeItemMutation = exports.api.useDeleteUserActivationCodeItemMutation, exports.usePostV1UserActivationCodesByIdRefreshCodeMutation = exports.api.usePostV1UserActivationCodesByIdRefreshCodeMutation, exports.useGetV1UsersQuery = exports.api.useGetV1UsersQuery, exports.useGetV1UsersByIdQuery = exports.api.useGetV1UsersByIdQuery, exports.usePutV1UsersByIdMutation = exports.api.usePutV1UsersByIdMutation, exports.useDeleteV1UsersByIdMutation = exports.api.useDeleteV1UsersByIdMutation;
