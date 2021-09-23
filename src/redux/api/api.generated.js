"use strict";
exports.__esModule = true;
exports.useGetV1MediaByIdQuery = exports.useGetV1MediaQuery = exports.useGetV1TemplateByIdQuery = exports.useGetV1TemplatesQuery = exports.useDeleteV1SlidesByIdPlaylistsAndPlaylistIdMutation = exports.usePutV1SlidesByIdPlaylistsAndPlaylistIdMutation = exports.useGetV1SlidesByIdPlaylistsQuery = exports.useDeleteV1SlidesByIdScreensAndScreenIdMutation = exports.usePutV1SlidesByIdScreensAndScreenIdMutation = exports.useGetV1SlidesByIdScreensQuery = exports.useDeleteV1SlidesByIdMutation = exports.usePutV1SlidesByIdMutation = exports.useGetV1SlidesByIdQuery = exports.usePostV1SlidesMutation = exports.useGetV1SlidesQuery = exports.usePutV1PlaylistByIdSlideAndSlideIdMutation = exports.useDeleteV1PlaylistByIdSlideAndSlideIdMutation = exports.useDeleteV1PlaylistsByIdScreensAndScreenIdMutation = exports.usePutV1PlaylistsByIdScreensAndScreenIdMutation = exports.useGetV1PlaylistsByIdScreensQuery = exports.useDeleteV1PlaylistsByIdMutation = exports.usePutV1PlaylistsByIdMutation = exports.useGetV1PlaylistsByIdQuery = exports.usePostV1PlaylistsMutation = exports.useGetV1PlaylistsQuery = exports.useDeleteV1ScreenGroupsByIdMutation = exports.usePutV1ScreenGroupsByIdMutation = exports.useGetV1ScreenGroupsByIdQuery = exports.usePostV1ScreenGroupsMutation = exports.useGetV1ScreenGroupsQuery = exports.useDeleteV1ScreensByIdRegionsAndRegionIdPlaylistsPlaylistIdMutation = exports.usePutV1ScreensByIdRegionsAndRegionIdPlaylistsPlaylistIdMutation = exports.useGetV1ScreensByIdRegionsAndRegionIdPlaylistsQuery = exports.useDeleteV1ScreensByIdGroupsAndGroupIdMutation = exports.usePutV1ScreensByIdGroupsAndGroupIdMutation = exports.useGetV1ScreensByIdGroupsQuery = exports.usePutV1ScreensByIdMutation = exports.useDeleteV1ScreensByIdMutation = exports.useGetV1ScreensByIdQuery = exports.usePostV1ScreensMutation = exports.useGetV1ScreensQuery = exports.useGetV1LayoutsByIdQuery = exports.useGetV1LayoutsQuery = exports.api = void 0;
var react_1 = require("@reduxjs/toolkit/query/react");
var query_1 = require("@reduxjs/toolkit/query");
exports.api = (0, react_1.createApi)({
    baseQuery: (0, query_1.fetchBaseQuery)({
        baseUrl: "/api/"
    }),
    tagTypes: [],
    endpoints: function (build) { return ({
        getV1Layouts: build.query({
            query: function (queryArg) { return ({
                url: "/v1/layouts",
                params: { page: queryArg.page }
            }); }
        }),
        getV1LayoutsById: build.query({
            query: function (queryArg) { return ({ url: "/v1/layouts/" + queryArg.id }); }
        }),
        getV1Screens: build.query({
            query: function (queryArg) { return ({
                url: "/v1/screens",
                params: { page: queryArg.page }
            }); }
        }),
        postV1Screens: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screens",
                method: "POST",
                body: queryArg.body
            }); }
        }),
        getV1ScreensById: build.query({
            query: function (queryArg) { return ({ url: "/v1/screens/" + queryArg.id }); }
        }),
        deleteV1ScreensById: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id,
                method: "DELETE"
            }); }
        }),
        putV1ScreensById: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id,
                method: "PUT",
                body: queryArg.body
            }); }
        }),
        getV1ScreensByIdGroups: build.query({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id + "/groups",
                params: { page: queryArg.page }
            }); }
        }),
        putV1ScreensByIdGroupsAndGroupId: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id + "/groups/" + queryArg.groupId,
                method: "PUT"
            }); }
        }),
        deleteV1ScreensByIdGroupsAndGroupId: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id + "/groups/" + queryArg.groupId,
                method: "DELETE"
            }); }
        }),
        getV1ScreensByIdRegionsAndRegionIdPlaylists: build.query({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id + "/regions/" + queryArg.regionId + "/playlists",
                params: { page: queryArg.page }
            }); }
        }),
        putV1ScreensByIdRegionsAndRegionIdPlaylistsPlaylistId: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id + "/regions/" + queryArg.regionId + "/playlists/" + queryArg.playlistId,
                method: "PUT"
            }); }
        }),
        deleteV1ScreensByIdRegionsAndRegionIdPlaylistsPlaylistId: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screens/" + queryArg.id + "/regions/" + queryArg.regionId + "/playlists/" + queryArg.playlistId,
                method: "DELETE"
            }); }
        }),
        getV1ScreenGroups: build.query({
            query: function (queryArg) { return ({
                url: "/v1/screenGroups",
                params: { page: queryArg.page }
            }); }
        }),
        postV1ScreenGroups: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screenGroups",
                method: "POST",
                body: queryArg.body
            }); }
        }),
        getV1ScreenGroupsById: build.query({
            query: function (queryArg) { return ({ url: "/v1/screenGroups/" + queryArg.id }); }
        }),
        putV1ScreenGroupsById: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screenGroups/" + queryArg.id,
                method: "PUT",
                body: queryArg.body
            }); }
        }),
        deleteV1ScreenGroupsById: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/screenGroups/" + queryArg.id,
                method: "DELETE"
            }); }
        }),
        getV1Playlists: build.query({
            query: function (queryArg) { return ({
                url: "/v1/playlists",
                params: { page: queryArg.page }
            }); }
        }),
        postV1Playlists: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/playlists",
                method: "POST",
                body: queryArg.body
            }); }
        }),
        getV1PlaylistsById: build.query({
            query: function (queryArg) { return ({ url: "/v1/playlists/" + queryArg.id }); }
        }),
        putV1PlaylistsById: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/playlists/" + queryArg.id,
                method: "PUT",
                body: queryArg.body
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
                params: { page: queryArg.page }
            }); }
        }),
        putV1PlaylistsByIdScreensAndScreenId: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/playlists/" + queryArg.id + "/screens/" + queryArg.screenId,
                method: "PUT"
            }); }
        }),
        deleteV1PlaylistsByIdScreensAndScreenId: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/playlists/" + queryArg.id + "/screens/" + queryArg.screenId,
                method: "DELETE"
            }); }
        }),
        deleteV1PlaylistByIdSlideAndSlideId: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/playlist/" + queryArg.id + "/slide/" + queryArg.slideId,
                method: "DELETE"
            }); }
        }),
        putV1PlaylistByIdSlideAndSlideId: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/playlist/" + queryArg.id + "/slide/" + queryArg.slideId,
                method: "PUT"
            }); }
        }),
        getV1Slides: build.query({
            query: function (queryArg) { return ({
                url: "/v1/slides",
                params: { page: queryArg.page }
            }); }
        }),
        postV1Slides: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/slides",
                method: "POST",
                body: queryArg.body
            }); }
        }),
        getV1SlidesById: build.query({
            query: function (queryArg) { return ({ url: "/v1/slides/" + queryArg.id }); }
        }),
        putV1SlidesById: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/slides/" + queryArg.id,
                method: "PUT",
                body: queryArg.body
            }); }
        }),
        deleteV1SlidesById: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/slides/" + queryArg.id,
                method: "DELETE"
            }); }
        }),
        getV1SlidesByIdScreens: build.query({
            query: function (queryArg) { return ({
                url: "/v1/slides/" + queryArg.id + "/screens",
                params: { page: queryArg.page }
            }); }
        }),
        putV1SlidesByIdScreensAndScreenId: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/slides/" + queryArg.id + "/screens/" + queryArg.screenId,
                method: "PUT"
            }); }
        }),
        deleteV1SlidesByIdScreensAndScreenId: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/slides/" + queryArg.id + "/screens/" + queryArg.screenId,
                method: "DELETE"
            }); }
        }),
        getV1SlidesByIdPlaylists: build.query({
            query: function (queryArg) { return ({
                url: "/v1/slides/" + queryArg.id + "/playlists",
                params: { page: queryArg.page }
            }); }
        }),
        putV1SlidesByIdPlaylistsAndPlaylistId: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/slides/" + queryArg.id + "/playlists/" + queryArg.playlistId,
                method: "PUT"
            }); }
        }),
        deleteV1SlidesByIdPlaylistsAndPlaylistId: build.mutation({
            query: function (queryArg) { return ({
                url: "/v1/slides/" + queryArg.id + "/playlists/" + queryArg.playlistId,
                method: "DELETE"
            }); }
        }),
        getV1Templates: build.query({
            query: function (queryArg) { return ({
                url: "/v1/templates",
                params: { page: queryArg.page }
            }); }
        }),
        getV1TemplateById: build.query({
            query: function (queryArg) { return ({ url: "/v1/template/" + queryArg.id }); }
        }),
        getV1Media: build.query({
            query: function (queryArg) { return ({
                url: "/v1/media",
                params: { page: queryArg.page }
            }); }
        }),
        getV1MediaById: build.query({
            query: function (queryArg) { return ({ url: "/v1/media/" + queryArg.id }); }
        })
    }); }
});
exports.useGetV1LayoutsQuery = exports.api.useGetV1LayoutsQuery, exports.useGetV1LayoutsByIdQuery = exports.api.useGetV1LayoutsByIdQuery, exports.useGetV1ScreensQuery = exports.api.useGetV1ScreensQuery, exports.usePostV1ScreensMutation = exports.api.usePostV1ScreensMutation, exports.useGetV1ScreensByIdQuery = exports.api.useGetV1ScreensByIdQuery, exports.useDeleteV1ScreensByIdMutation = exports.api.useDeleteV1ScreensByIdMutation, exports.usePutV1ScreensByIdMutation = exports.api.usePutV1ScreensByIdMutation, exports.useGetV1ScreensByIdGroupsQuery = exports.api.useGetV1ScreensByIdGroupsQuery, exports.usePutV1ScreensByIdGroupsAndGroupIdMutation = exports.api.usePutV1ScreensByIdGroupsAndGroupIdMutation, exports.useDeleteV1ScreensByIdGroupsAndGroupIdMutation = exports.api.useDeleteV1ScreensByIdGroupsAndGroupIdMutation, exports.useGetV1ScreensByIdRegionsAndRegionIdPlaylistsQuery = exports.api.useGetV1ScreensByIdRegionsAndRegionIdPlaylistsQuery, exports.usePutV1ScreensByIdRegionsAndRegionIdPlaylistsPlaylistIdMutation = exports.api.usePutV1ScreensByIdRegionsAndRegionIdPlaylistsPlaylistIdMutation, exports.useDeleteV1ScreensByIdRegionsAndRegionIdPlaylistsPlaylistIdMutation = exports.api.useDeleteV1ScreensByIdRegionsAndRegionIdPlaylistsPlaylistIdMutation, exports.useGetV1ScreenGroupsQuery = exports.api.useGetV1ScreenGroupsQuery, exports.usePostV1ScreenGroupsMutation = exports.api.usePostV1ScreenGroupsMutation, exports.useGetV1ScreenGroupsByIdQuery = exports.api.useGetV1ScreenGroupsByIdQuery, exports.usePutV1ScreenGroupsByIdMutation = exports.api.usePutV1ScreenGroupsByIdMutation, exports.useDeleteV1ScreenGroupsByIdMutation = exports.api.useDeleteV1ScreenGroupsByIdMutation, exports.useGetV1PlaylistsQuery = exports.api.useGetV1PlaylistsQuery, exports.usePostV1PlaylistsMutation = exports.api.usePostV1PlaylistsMutation, exports.useGetV1PlaylistsByIdQuery = exports.api.useGetV1PlaylistsByIdQuery, exports.usePutV1PlaylistsByIdMutation = exports.api.usePutV1PlaylistsByIdMutation, exports.useDeleteV1PlaylistsByIdMutation = exports.api.useDeleteV1PlaylistsByIdMutation, exports.useGetV1PlaylistsByIdScreensQuery = exports.api.useGetV1PlaylistsByIdScreensQuery, exports.usePutV1PlaylistsByIdScreensAndScreenIdMutation = exports.api.usePutV1PlaylistsByIdScreensAndScreenIdMutation, exports.useDeleteV1PlaylistsByIdScreensAndScreenIdMutation = exports.api.useDeleteV1PlaylistsByIdScreensAndScreenIdMutation, exports.useDeleteV1PlaylistByIdSlideAndSlideIdMutation = exports.api.useDeleteV1PlaylistByIdSlideAndSlideIdMutation, exports.usePutV1PlaylistByIdSlideAndSlideIdMutation = exports.api.usePutV1PlaylistByIdSlideAndSlideIdMutation, exports.useGetV1SlidesQuery = exports.api.useGetV1SlidesQuery, exports.usePostV1SlidesMutation = exports.api.usePostV1SlidesMutation, exports.useGetV1SlidesByIdQuery = exports.api.useGetV1SlidesByIdQuery, exports.usePutV1SlidesByIdMutation = exports.api.usePutV1SlidesByIdMutation, exports.useDeleteV1SlidesByIdMutation = exports.api.useDeleteV1SlidesByIdMutation, exports.useGetV1SlidesByIdScreensQuery = exports.api.useGetV1SlidesByIdScreensQuery, exports.usePutV1SlidesByIdScreensAndScreenIdMutation = exports.api.usePutV1SlidesByIdScreensAndScreenIdMutation, exports.useDeleteV1SlidesByIdScreensAndScreenIdMutation = exports.api.useDeleteV1SlidesByIdScreensAndScreenIdMutation, exports.useGetV1SlidesByIdPlaylistsQuery = exports.api.useGetV1SlidesByIdPlaylistsQuery, exports.usePutV1SlidesByIdPlaylistsAndPlaylistIdMutation = exports.api.usePutV1SlidesByIdPlaylistsAndPlaylistIdMutation, exports.useDeleteV1SlidesByIdPlaylistsAndPlaylistIdMutation = exports.api.useDeleteV1SlidesByIdPlaylistsAndPlaylistIdMutation, exports.useGetV1TemplatesQuery = exports.api.useGetV1TemplatesQuery, exports.useGetV1TemplateByIdQuery = exports.api.useGetV1TemplateByIdQuery, exports.useGetV1MediaQuery = exports.api.useGetV1MediaQuery, exports.useGetV1MediaByIdQuery = exports.api.useGetV1MediaByIdQuery;
