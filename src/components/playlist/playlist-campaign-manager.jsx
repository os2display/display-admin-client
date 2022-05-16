import { React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import set from "lodash.set";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import idFromUrl from "../util/helpers/id-from-url";
import PlaylistCampaignForm from "./playlist-campaign-form";
import PlaylistForm from "./playlist-form";
import CampaignForm from "./campaign-form";
import {
  displaySuccess,
  displayError,
} from "../util/list/toast-component/display-toast";
import {
  usePutV1PlaylistsByIdMutation,
  usePutV1ScreensByIdCampaignsMutation,
  usePutV1PlaylistsByIdSlidesMutation,
  usePutV1ScreenGroupsByIdCampaignsMutation,
  usePostV1PlaylistsMutation,
} from "../../redux/api/api.generated";

/**
 * The shared manager component.
 *
 * @param {object} props The props.
 * @param {object} props.initialState Initial slide state.
 * @param {string} props.saveMethod POST or PUT.
 * @param {string | null} props.id Playlist id.
 * @param {boolean} props.isLoading Is the slide state loading?
 * @param {object} props.loadingError Loading error.
 * @param {string} props.slideId Slide id
 * @param {string} props.location Either playlist or campaign.
 * @returns {object} The shared manager, shared by campaign and playlists.
 */
function PlaylistCampaignManager({
  initialState,
  saveMethod,
  id,
  isLoading,
  loadingError,
  slideId,
  location,
}) {
  const { t } = useTranslation("common", {
    keyPrefix: "playlist-campaign-manager",
  });
  const navigate = useNavigate();
  const { search } = useLocation();
  const sharedParams = new URLSearchParams(search).get("shared");
  const headerText =
    saveMethod === "PUT"
      ? t(`${location}.edit-header`)
      : t(`${location}.create-header`);
  const [formStateObject, setFormStateObject] = useState();
  const [loadingMessage, setLoadingMessage] = useState("");
  const [highlightSharedSection, setHighlightSharedSection] = useState(false);
  const [slidesToAdd, setSlidesToAdd] = useState([]);
  const [screensToAdd, setScreensToAdd] = useState([]);
  const [groupsToAdd, setGroupsToAdd] = useState([]);

  const [
    PutV1Playlists,
    {
      isLoading: savingPlaylists,
      error: saveErrorPut,
      isSuccess: isSaveSuccessPut,
    },
  ] = usePutV1PlaylistsByIdMutation();

  const [
    PostV1Playlist,
    { data, error: saveErrorPost, isSuccess: isSaveSuccessPost },
  ] = usePostV1PlaylistsMutation();

  const [
    PutV1ScreensByIdCampaigns,
    {
      isLoading: savingScreens,
      error: saveErrorScreens,
      isSuccess: isSaveSuccessScreens,
    },
  ] = usePutV1ScreensByIdCampaignsMutation();

  const [
    PutV1ScreenGroupsByIdCampaigns,
    {
      isLoading: savingGroups,
      error: saveErrorGroups,
      isSuccess: isSaveSuccessGroups,
    },
  ] = usePutV1ScreenGroupsByIdCampaignsMutation();

  const [
    PutV1PlaylistsByIdSlides,
    {
      isLoading: savingSlides,
      error: saveErrorSlides,
      isSuccess: isSaveSuccessSlides,
    },
  ] = usePutV1PlaylistsByIdSlidesMutation();

  /** Set loaded data into form state. */
  useEffect(() => {
    if (initialState) {
      const localFormStateObject = JSON.parse(JSON.stringify(initialState));
      // Set published to format accepted by bootstrap date component
      if (localFormStateObject.published.from) {
        localFormStateObject.published.from = dayjs(
          localFormStateObject.published.from
        ).format("YYYY-MM-DDTHH:mm");
      }
      if (localFormStateObject.published.to) {
        localFormStateObject.published.to = dayjs(
          localFormStateObject.published.to
        ).format("YYYY-MM-DDTHH:mm");
      }

      setFormStateObject(localFormStateObject);
    }
  }, [initialState]);

  useEffect(() => {
    // If redirected from create shared playlist
    if (sharedParams === "true") {
      // Remove shared search param
      setHighlightSharedSection(true);
      const params = new URLSearchParams(search);
      params.delete("shared");
      navigate({
        search: params.toString(),
      });
    }
  }, [sharedParams]);

  // Slides are saved successfully, display a message
  useEffect(() => {
    if (isSaveSuccessSlides) {
      displaySuccess(t(`${location}.success-messages.saved-slides`));
    }
  }, [isSaveSuccessSlides]);

  // Screens are saved successfully, display a message
  useEffect(() => {
    if (isSaveSuccessScreens) {
      displaySuccess(t(`${location}.success-messages.saved-screens`));
    }
  }, [isSaveSuccessScreens]);

  // Groups are saved successfully, display a message
  useEffect(() => {
    if (isSaveSuccessGroups) {
      displaySuccess(t(`${location}.success-messages.saved-groups`));
    }
  }, [isSaveSuccessGroups]);

  /** When the screen is saved, the slide will be saved. */
  useEffect(() => {
    if (
      (isSaveSuccessPost || isSaveSuccessPut) &&
      screensToAdd &&
      formStateObject.screens
    ) {
      setLoadingMessage(t(`${location}.loading-messages.saving-screens`));

      PutV1ScreensByIdCampaigns({
        id: id || idFromUrl(data["@id"]),
        body: JSON.stringify(screensToAdd),
      });
    }
  }, [isSaveSuccessPut, isSaveSuccessPost]);

  /** When the group is saved, the slide will be saved. */
  useEffect(() => {
    if (
      (isSaveSuccessPost || isSaveSuccessPut) &&
      groupsToAdd &&
      formStateObject.groups
    ) {
      setLoadingMessage(t(`${location}.loading-messages.saving-groups`));
      PutV1ScreenGroupsByIdCampaigns({
        id: id || idFromUrl(data["@id"]),
        body: JSON.stringify(groupsToAdd),
      });
    }
  }, [isSaveSuccessPut, isSaveSuccessPost]);

  /** When the playlist is saved, the slide will be saved. */
  useEffect(() => {
    if (
      (isSaveSuccessPost || isSaveSuccessPut) &&
      slidesToAdd &&
      Array.isArray(formStateObject.slides)
    ) {
      setLoadingMessage(t(`${location}.loading-messages.saving-slides`));
      PutV1PlaylistsByIdSlides({
        id: id || idFromUrl(data["@id"]),
        body: JSON.stringify(slidesToAdd),
      });
    }
  }, [isSaveSuccessPut, isSaveSuccessPost]);

  // Slides are not saved successfully, display a message
  useEffect(() => {
    if (saveErrorSlides) {
      displayError(
        t(`${location}.error-messages.save-slides-error`),
        saveErrorSlides
      );
    }
  }, [saveErrorSlides]);

  // Screens are not saved successfully, display a message
  useEffect(() => {
    if (saveErrorScreens) {
      displayError(
        t(`${location}.error-messages.save-screens-error`),
        saveErrorScreens
      );
    }
  }, [saveErrorScreens]);

  // Groups are not saved successfully, display a message
  useEffect(() => {
    if (saveErrorGroups) {
      displayError(
        t(`${location}.error-messages.save-group-error`),
        saveErrorGroups
      );
    }
  }, [saveErrorGroups]);

  /** Slides are not saved successfully, display a message */
  useEffect(() => {
    if (loadingError) {
      displayError(t(`${location}.error-messages.load-error`), loadingError);
    }
  }, [loadingError]);

  /** If the slide is saved, display the success message and navigate to list */
  useEffect(() => {
    if (isSaveSuccessPost || isSaveSuccessPut) {
      displaySuccess(t(`${location}.success-messages.saved`));
      navigate(`/${location}/list`);
    }
  }, [isSaveSuccessPost, isSaveSuccessPut]);

  /** If the slide is saved with error, display the error message */
  useEffect(() => {
    if (saveErrorPut || saveErrorPost) {
      const saveError = saveErrorPut || saveErrorPost;
      displayError(t(`${location}.error-messages.save-error`), saveError);
    }
  }, [saveErrorPut, saveErrorPost]);

  /**
   * Set state on change in input field
   *
   * @param {object} props - The props.
   * @param {object} props.target - Event target.
   */
  const handleInput = ({ target }) => {
    const localFormStateObject = { ...formStateObject };
    set(localFormStateObject, target.id, target.value);
    setFormStateObject(localFormStateObject);
  };

  /** Sets slides to save. */
  function handleSaveSlides() {
    const { slides } = formStateObject;

    setSlidesToAdd(
      slides.map((slide, index) => {
        return { slide: idFromUrl(slide), weight: index };
      })
    );
  }

  /** Sets screens to save. */
  function handleSaveScreens() {
    const { screens } = formStateObject;

    setScreensToAdd(
      screens.map((screen) => {
        return { screen: idFromUrl(screen) };
      })
    );
  }

  /** Sets groups to save. */
  function handleSaveGroups() {
    const { groups } = formStateObject;

    setGroupsToAdd(
      groups.map((group) => {
        return { screengroup: idFromUrl(group) };
      })
    );
  }

  /** Handles submit. */
  const handleSubmit = () => {
    setLoadingMessage(t(`${location}.loading-messages.saving-playlist`));

    // Set published.
    const from = formStateObject.published.from
      ? new Date(formStateObject.published.from).toISOString()
      : null;
    const to = formStateObject.published.to
      ? new Date(formStateObject.published.to).toISOString()
      : null;

    const saveTenants = formStateObject.tenants
      ? formStateObject.tenants.map((tenant) => {
          return idFromUrl(tenant["@id"]);
        })
      : [];

    const saveData = {
      title: formStateObject.title,
      isCampaign: location === "campaign",
      description: formStateObject.description,
      modifiedBy: formStateObject.modifiedBy,
      createdBy: formStateObject.createdBy,
      tenants: saveTenants,
      schedules: formStateObject.schedules.map((schedule) => {
        return {
          rrule: schedule.rrule,
          duration: schedule.duration,
        };
      }),
      published: {
        from,
        to,
      },
    };

    setLoadingMessage(t(`${location}.loading-messages.saving`));
    if (saveMethod === "POST") {
      PostV1Playlist({
        playlistPlaylistInput: JSON.stringify(saveData),
      });
    } else if (saveMethod === "PUT") {
      PutV1Playlists({
        id,
        playlistPlaylistInput: JSON.stringify(saveData),
      });
    }

    if (Array.isArray(formStateObject.slides)) {
      handleSaveSlides();
    }

    if (Array.isArray(formStateObject.screens)) {
      handleSaveScreens();
    }

    if (Array.isArray(formStateObject.groups)) {
      handleSaveGroups();
    }
  };

  return (
    <>
      {formStateObject && (
        <PlaylistCampaignForm
          location={location}
          playlist={formStateObject}
          headerText={`${headerText}: ${
            formStateObject && formStateObject.title
          }`}
          isLoading={
            savingPlaylists ||
            savingSlides ||
            isLoading ||
            savingScreens ||
            savingGroups
          }
          loadingMessage={loadingMessage}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          slideId={slideId}
          isCampaign={location === "campaign"}
        >
          {location === "campaign" && (
            <CampaignForm
              handleInput={handleInput}
              campaign={formStateObject}
            />
          )}
          {location === "playlist" && (
            <PlaylistForm
              highlightSharedSection={highlightSharedSection}
              handleInput={handleInput}
              playlist={formStateObject}
            />
          )}
        </PlaylistCampaignForm>
      )}
    </>
  );
}

PlaylistCampaignManager.defaultProps = {
  id: null,
  isLoading: false,
  loadingError: null,
  initialState: null,
  slideId: "",
};

PlaylistCampaignManager.propTypes = {
  initialState: PropTypes.shape({
    feed: PropTypes.shape({
      "@id": PropTypes.string,
    }),
  }),
  saveMethod: PropTypes.string.isRequired,
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  loadingError: PropTypes.shape({
    data: PropTypes.shape({
      status: PropTypes.number,
    }),
  }),
  slideId: PropTypes.string,
  location: PropTypes.string.isRequired,
};

export default PlaylistCampaignManager;
