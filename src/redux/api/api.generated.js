"use strict";
exports.__esModule = true;
exports.useGetV1TemplatesByIdQuery = exports.useGetV1TemplatesQuery = exports.useDeleteV1SlidesByIdMutation = exports.usePutV1SlidesByIdMutation = exports.useGetV1SlidesByIdQuery = exports.usePostV1SlidesMutation = exports.useGetV1SlidesQuery = exports.useDeleteV1ScreensByIdScreenGroupsAndScreenGroupIdMutation = exports.usePutV1ScreensByIdScreenGroupsMutation = exports.useGetV1ScreensByIdScreenGroupsQuery = exports.useDeletePlaylistScreenRegionItemMutation = exports.usePutPlaylistScreenRegionItemMutation = exports.useGetV1ScreensByIdRegionsAndRegionIdPlaylistsQuery = exports.useDeleteV1ScreensByIdMutation = exports.usePutV1ScreensByIdMutation = exports.useGetV1ScreensByIdQuery = exports.usePostV1ScreensMutation = exports.useGetV1ScreensQuery = exports.useDeleteV1ScreenGroupsByIdMutation = exports.usePutV1ScreenGroupsByIdMutation = exports.useGetV1ScreenGroupsByIdQuery = exports.usePostV1ScreenGroupsMutation = exports.useGetV1ScreenGroupsQuery = exports.useDeleteV1PlaylistsByIdSlidesAndSlideIdMutation = exports.usePutV1PlaylistsByIdSlidesMutation = exports.useGetV1PlaylistsByIdSlidesQuery = exports.useGetV1PlaylistsByIdScreensQuery = exports.useDeleteV1PlaylistsByIdMutation = exports.usePutV1PlaylistsByIdMutation = exports.useGetV1PlaylistsByIdQuery = exports.usePostV1PlaylistsMutation = exports.useGetV1PlaylistsQuery = exports.useGetV1MediaByIdSlidesQuery = exports.useDeleteV1MediaByIdMutation = exports.useGetV1MediaByIdQuery = exports.usePostMediaCollectionMutation = exports.useGetV1MediaQuery = exports.useGetV1LayoutsByIdQuery = exports.useGetV1LayoutsQuery = exports.api = void 0;
var react_1 = require("@reduxjs/toolkit/query/react");
var dynamic_base_query_1 = require("../dynamic-base-query");
exports.api = (0, react_1.createApi)({
    baseQuery: dynamic_base_query_1["default"],
    tagTypes: [],
    endpoints: function (build) { return ({
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
                params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage }
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
        getV1MediaByIdSlides: build.query({
            query: function (queryArg) { return ({
                url: "/v1/media/" + queryArg.id + "/slides",
                params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage }
            }); }
        }),
        getV1Playlists: build.query({
            query: function (queryArg) { return ({
                url: "/v1/playlists",
                params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage }
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
        getV1PlaylistsByIdScreens: build.query({
            query: function (queryArg) { return ({
                url: "/v1/playlists/" + queryArg.id + "/screens",
                params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage }
            }); }
        }),
        getV1PlaylistsByIdSlides: build.query({
            query: function (queryArg) { return ({
                url: "/v1/playlists/" + queryArg.id + "/slides",
                params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage }
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
                params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage }
            }); }
        }),
        postV1ScreenGroups: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screen-groups",
                method: "POST",
                body: queryArg.screenGroupScreenGroupInput
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
        getV1Screens: build.query({
            query: function (queryArg) { return ({
                url: "/v1/screens",
                params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage }
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
        getV1ScreensByIdRegionsAndRegionIdPlaylists: build.query({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id + "/regions/" + queryArg.regionId + "/playlists",
                params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage }
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
                params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage }
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
        getV1Slides: build.query({
            query: function (queryArg) { return ({
                url: "/v1/slides",
                params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage }
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
        getV1Templates: build.query({
            query: function (queryArg) { return ({
                url: "/v1/templates",
                params: { page: queryArg.page, itemsPerPage: queryArg.itemsPerPage }
            }); }
        }),
        getV1TemplatesById: build.query({
            query: function (queryArg) { return ({ url: "/v1/templates/" + queryArg.id }); }
        })
    }); }
});
exports.useGetV1LayoutsQuery = exports.api.useGetV1LayoutsQuery, exports.useGetV1LayoutsByIdQuery = exports.api.useGetV1LayoutsByIdQuery, exports.useGetV1MediaQuery = exports.api.useGetV1MediaQuery, exports.usePostMediaCollectionMutation = exports.api.usePostMediaCollectionMutation, exports.useGetV1MediaByIdQuery = exports.api.useGetV1MediaByIdQuery, exports.useDeleteV1MediaByIdMutation = exports.api.useDeleteV1MediaByIdMutation, exports.useGetV1MediaByIdSlidesQuery = exports.api.useGetV1MediaByIdSlidesQuery, exports.useGetV1PlaylistsQuery = exports.api.useGetV1PlaylistsQuery, exports.usePostV1PlaylistsMutation = exports.api.usePostV1PlaylistsMutation, exports.useGetV1PlaylistsByIdQuery = exports.api.useGetV1PlaylistsByIdQuery, exports.usePutV1PlaylistsByIdMutation = exports.api.usePutV1PlaylistsByIdMutation, exports.useDeleteV1PlaylistsByIdMutation = exports.api.useDeleteV1PlaylistsByIdMutation, exports.useGetV1PlaylistsByIdScreensQuery = exports.api.useGetV1PlaylistsByIdScreensQuery, exports.useGetV1PlaylistsByIdSlidesQuery = exports.api.useGetV1PlaylistsByIdSlidesQuery, exports.usePutV1PlaylistsByIdSlidesMutation = exports.api.usePutV1PlaylistsByIdSlidesMutation, exports.useDeleteV1PlaylistsByIdSlidesAndSlideIdMutation = exports.api.useDeleteV1PlaylistsByIdSlidesAndSlideIdMutation, exports.useGetV1ScreenGroupsQuery = exports.api.useGetV1ScreenGroupsQuery, exports.usePostV1ScreenGroupsMutation = exports.api.usePostV1ScreenGroupsMutation, exports.useGetV1ScreenGroupsByIdQuery = exports.api.useGetV1ScreenGroupsByIdQuery, exports.usePutV1ScreenGroupsByIdMutation = exports.api.usePutV1ScreenGroupsByIdMutation, exports.useDeleteV1ScreenGroupsByIdMutation = exports.api.useDeleteV1ScreenGroupsByIdMutation, exports.useGetV1ScreensQuery = exports.api.useGetV1ScreensQuery, exports.usePostV1ScreensMutation = exports.api.usePostV1ScreensMutation, exports.useGetV1ScreensByIdQuery = exports.api.useGetV1ScreensByIdQuery, exports.usePutV1ScreensByIdMutation = exports.api.usePutV1ScreensByIdMutation, exports.useDeleteV1ScreensByIdMutation = exports.api.useDeleteV1ScreensByIdMutation, exports.useGetV1ScreensByIdRegionsAndRegionIdPlaylistsQuery = exports.api.useGetV1ScreensByIdRegionsAndRegionIdPlaylistsQuery, exports.usePutPlaylistScreenRegionItemMutation = exports.api.usePutPlaylistScreenRegionItemMutation, exports.useDeletePlaylistScreenRegionItemMutation = exports.api.useDeletePlaylistScreenRegionItemMutation, exports.useGetV1ScreensByIdScreenGroupsQuery = exports.api.useGetV1ScreensByIdScreenGroupsQuery, exports.usePutV1ScreensByIdScreenGroupsMutation = exports.api.usePutV1ScreensByIdScreenGroupsMutation, exports.useDeleteV1ScreensByIdScreenGroupsAndScreenGroupIdMutation = exports.api.useDeleteV1ScreensByIdScreenGroupsAndScreenGroupIdMutation, exports.useGetV1SlidesQuery = exports.api.useGetV1SlidesQuery, exports.usePostV1SlidesMutation = exports.api.usePostV1SlidesMutation, exports.useGetV1SlidesByIdQuery = exports.api.useGetV1SlidesByIdQuery, exports.usePutV1SlidesByIdMutation = exports.api.usePutV1SlidesByIdMutation, exports.useDeleteV1SlidesByIdMutation = exports.api.useDeleteV1SlidesByIdMutation, exports.useGetV1TemplatesQuery = exports.api.useGetV1TemplatesQuery, exports.useGetV1TemplatesByIdQuery = exports.api.useGetV1TemplatesByIdQuery;
