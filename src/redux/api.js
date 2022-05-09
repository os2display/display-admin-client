import { api as generatedApi } from "./api/api.generated";

// Add cache clear mock-enpoint
generatedApi.injectEndpoints({
  endpoints: (builder) => ({
    tenantChangedClearCache: builder.mutation({
      query: () => ({ url: '/tenant-cache-clear' }),
    }),
  }),
});

/** Entry point for modifying api endpoints. */
generatedApi.enhanceEndpoints({
  addTagTypes: [
    "Slide",
    "Screen",
    "Playlist",
    "Template",
    "Theme",
    "Media",
    "Layout",
    "ScreenGroup",
    "FeedSource",
    "Feed",
  ],
  endpoints: {
    getV1FeedSources: {
      providesTags: ["FeedSource"],
    },
    getV1FeedSourcesById: {
      providesTags: ["FeedSource"],
    },
    getV1Feeds: {
      providesTags: ["Feed"],
    },
    getV1FeedsById: {
      providesTags: ["Feed"],
    },
    getV1FeedsByIdData: {
      providesTags: ["Feed"],
    },
    getV1Layouts: {
      providesTags: ["Layout"],
    },
    getV1Media: {
      providesTags: ["Media"],
    },
    postMediaCollection: {
      providesTags: ["Media"],
      invalidatesTags: ["Media"],
    },
    getV1MediaById: {
      providesTags: ["Media"],
    },
    deleteV1MediaById: {
      providesTags: ["Media"],
      invalidatesTags: ["Media"],
    },
    getV1MediaByIdSlides: {
      providesTags: ["Media"],
    },
    getV1Playlists: {
      providesTags: ["Playlist"],
    },
    postV1Playlists: {
      providesTags: ["Playlist"],
      invalidatesTags: ["Playlist"],
    },
    getV1PlaylistsById: {
      providesTags: ["Playlist"],
    },
    putV1PlaylistsById: {
      providesTags: ["Playlist"],
      invalidatesTags: ["Playlist"],
    },
    deleteV1PlaylistsById: {
      providesTags: ["Playlist"],
      invalidatesTags: ["Playlist"],
    },
    getV1PlaylistsByIdScreens: {
      providesTags: ["Playlist"],
    },
    getV1PlaylistsByIdSlides: {
      providesTags: ["Playlist"],
    },
    putV1PlaylistsByIdSlides: {
      providesTags: ["Playlist", "Slide"],
      invalidatesTags: ["Playlist", "Slide"],
    },
    deleteV1PlaylistsByIdSlidesAndSlideId: {
      providesTags: ["Playlist", "Slide"],
      invalidatesTags: ["Playlist", "Slide"],
    },
    getV1ScreenGroups: {
      providesTags: ["ScreenGroup"],
    },
    postV1ScreenGroups: {
      providesTags: ["ScreenGroup"],
      invalidatesTags: ["ScreenGroup"],
    },
    getV1ScreenGroupsById: {
      providesTags: ["ScreenGroup"],
    },
    putV1ScreenGroupsById: {
      providesTags: ["ScreenGroup"],
      invalidatesTags: ["ScreenGroup"],
    },
    deleteV1ScreenGroupsById: {
      providesTags: ["ScreenGroup"],
      invalidatesTags: ["ScreenGroup"],
    },
    getV1Screens: {
      providesTags: ["Screen"],
    },
    postV1Screens: {
      providesTags: ["Screen"],
      invalidatesTags: ["Screen"],
    },
    getV1ScreensById: {
      providesTags: ["Screen"],
    },
    putV1ScreensById: {
      providesTags: ["Screen"],
      invalidatesTags: ["Screen"],
    },
    deleteV1ScreensById: {
      providesTags: ["Screen"],
      invalidatesTags: ["Screen"],
    },
    getV1ScreensByIdRegionsAndRegionIdPlaylists: {
      providesTags: ["Screen", "Playlist"],
    },
    putPlaylistScreenRegionItem: {
      providesTags: ["Screen"],
      invalidatesTags: ["Screen"],
    },
    deletePlaylistScreenRegionItem: {
      providesTags: ["Screen"],
      invalidatesTags: ["Screen"],
    },
    getV1ScreensByIdScreenGroups: {
      providesTags: ["Screen", "ScreenGroup"],
    },
    putV1ScreensByIdScreenGroups: {
      providesTags: ["Screen", "ScreenGroup"],
      invalidatesTags: ["Screen", "ScreenGroup"],
    },
    deleteV1ScreensByIdScreenGroupsAndScreenGroupId: {
      providesTags: ["Screen", "ScreenGroup"],
      invalidatesTags: ["Screen", "ScreenGroup"],
    },
    getV1Slides: {
      providesTags: ["Slide"],
    },
    postV1Slides: {
      providesTags: ["Slide"],
      invalidatesTags: ["Slide", "Feed"],
    },
    getV1SlidesById: {
      providesTags: ["Slide"],
    },
    putV1SlidesById: {
      providesTags: ["Slide"],
      invalidatesTags: ["Slide", "Feed"],
    },
    deleteV1SlidesById: {
      providesTags: ["Slide"],
      invalidatesTags: ["Slide", "Feed"],
    },
    getV1Templates: {
      providesTags: ["Template"],
    },
    getV1TemplatesById: {
      providesTags: ["Template"],
    },
    getV1Themes: {
      providesTags: ["Theme"],
    },
    postV1Themes: {
      providesTags: ["Theme"],
      invalidatesTags: ["Theme"],
    },
    getV1ThemesById: {
      providesTags: ["Theme"],
    },
    putV1ThemesById: {
      providesTags: ["Theme"],
      invalidatesTags: ["Theme"],
    },
    deleteV1ThemesById: {
      providesTags: ["Theme"],
      invalidatesTags: ["Theme"],
    },
    tenantChangedClearCache: {
      invalidatesTags: ["Theme", "Screen", "ScreenGroup", "Slide", "Feed", "Playlist", "FeedSource", "Media"],
    },
  },
});

const api = generatedApi;

export default api;
