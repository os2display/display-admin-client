import { React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import set from "lodash.set";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import {
  usePutV1PlaylistsByIdMutation,
  usePutV1ScreensByIdCampaignsMutation,
  usePutV1PlaylistsByIdSlidesMutation,
  usePutV1ScreenGroupsByIdCampaignsMutation,
  usePostV1PlaylistsMutation,
} from "../../redux/api/api.generated";
import {
  displaySuccess,
  displayError,
} from "../util/list/toast-component/display-toast";
import idFromUrl from "../util/helpers/id-from-url";
import SharedForm from "./shared-form";
import PlaylistForm from "./playlist-form";
import CampaignForm from "./campaign-form";

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
 * @returns {object} The shared manager, shared by campaign and playlists.
 */
function SharedManager({
  initialState,
  saveMethod,
  id,
  isLoading,
  loadingError,
  slideId,
}) {
  const { t } = useTranslation("common");
  const history = useHistory();
  const { location } = useParams();
  const headerText =
    saveMethod === "PUT"
      ? t(`shared-manager.${location}.edit-header`)
      : t(`shared-manager.${location}.create-header`);
  const [formStateObject, setFormStateObject] = useState();
  const [loadingMessage, setLoadingMessage] = useState("");
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

  // Slides are saved successfully, display a message
  useEffect(() => {
    if (isSaveSuccessSlides) {
      displaySuccess(
        t(`shared-manager.${location}.success-messages.saved-slides`)
      );
    }
  }, [isSaveSuccessSlides]);

  // Screens are saved successfully, display a message
  useEffect(() => {
    if (isSaveSuccessScreens) {
      displaySuccess(
        t(`shared-manager.${location}.success-messages.saved-screens`)
      );
    }
  }, [isSaveSuccessScreens]);

  // Screens are saved successfully, display a message
  useEffect(() => {
    if (isSaveSuccessGroups) {
      displaySuccess(
        t(`shared-manager.${location}.success-messages.saved-groups`)
      );
    }
  }, [isSaveSuccessGroups]);

  /** When the screen is saved, the slide will be saved. */
  useEffect(() => {
    if (isSaveSuccessPut && screensToAdd) {
      setLoadingMessage(
        t(`shared-manager.${location}.loading-messages.saving-screens`)
      );
      PutV1ScreensByIdCampaigns({
        id,
        body: JSON.stringify(screensToAdd),
      });
    }
  }, [isSaveSuccessPut]);

  /** When the screen is saved, the slide will be saved. */
  useEffect(() => {
    if (isSaveSuccessPost && screensToAdd && data) {
      setLoadingMessage(
        t(`shared-manager.${location}.loading-messages.saving-screens`)
      );
      PutV1ScreensByIdCampaigns({
        id: idFromUrl(data["@id"]),
        body: JSON.stringify(screensToAdd),
      });
    }
  }, [isSaveSuccessPost]);

  /** When the group is saved, the slide will be saved. */
  useEffect(() => {
    if (isSaveSuccessPut && groupsToAdd) {
      setLoadingMessage(
        t(`shared-manager.${location}.loading-messages.saving-groups`)
      );
      PutV1ScreenGroupsByIdCampaigns({
        id,
        body: JSON.stringify(groupsToAdd),
      });
    }
  }, [isSaveSuccessPut]);

  /** When the group is saved, the slide will be saved. */
  useEffect(() => {
    if (isSaveSuccessPost && groupsToAdd && data) {
      setLoadingMessage(
        t(`shared-manager.${location}.loading-messages.saving-groups`)
      );
      PutV1ScreenGroupsByIdCampaigns({
        id: idFromUrl(data["@id"]),
        body: JSON.stringify(groupsToAdd),
      });
    }
  }, [isSaveSuccessPost]);

  // Slides are not saved successfully, display a message
  useEffect(() => {
    if (saveErrorSlides) {
      displayError(
        t(`shared-manager.${location}.error-messages.save-slides-error`, {
          error: saveErrorSlides.error
            ? saveErrorSlides.error
            : saveErrorSlides.data["hydra:description"],
        })
      );
    }
  }, [saveErrorSlides]);

  // Screens are not saved successfully, display a message
  useEffect(() => {
    if (saveErrorScreens) {
      displayError(
        t(`shared-manager.${location}.error-messages.save-screens-error`, {
          error: saveErrorScreens.error
            ? saveErrorScreens.error
            : saveErrorScreens.data["hydra:description"],
        })
      );
    }
  }, [saveErrorScreens]);

  // Groups are not saved successfully, display a message
  useEffect(() => {
    if (saveErrorGroups) {
      displayError(
        t(`shared-manager.${location}.error-messages.save-group-error`, {
          error: saveErrorGroups.error
            ? saveErrorGroups.error
            : saveErrorGroups.data["hydra:description"],
        })
      );
    }
  }, [saveErrorGroups]);

  useEffect(() => {
    if (loadingError) {
      displayError(
        t(`shared-manager.${location}.error-messages.load-slide-error`, {
          error: loadingError.error
            ? loadingError.error
            : loadingError.data["hydra:description"],
          id,
        })
      );
    }
  }, [loadingError]);

  /** If the slide is saved, display the success message */
  useEffect(() => {
    if (isSaveSuccessPost || isSaveSuccessPut) {
      displaySuccess(t(`shared-manager.${location}.success-messages.saved`));
    }
  }, [isSaveSuccessPost || isSaveSuccessPut]);

  /** If the slide is saved with error, display the error message */
  useEffect(() => {
    if (saveErrorPut || saveErrorPost) {
      const saveError = saveErrorPut || saveErrorPost;
      displayError(
        t(`shared-manager.${location}.error-messages.save-error`, {
          error: saveError.error
            ? saveError.error
            : saveError.data["hydra:description"],
        })
      );
    }
  }, [saveErrorPut, saveErrorPost]);

  useEffect(() => {
    if (isSaveSuccessPost && data) {
      history.push(`/${location}/edit/${idFromUrl(data["@id"])}`);
    }
  }, [isSaveSuccessPost]);

  /**
   * Set state on change in input field
   *
   * @param {object} props - The props.
   * @param {object} props.target - Event target.
   */
  function handleInput({ target }) {
    const localFormStateObject = { ...formStateObject };
    set(localFormStateObject, target.id, target.value);
    setFormStateObject(localFormStateObject);
  }

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

  /** When the playlist is saved, the slide will be saved. */
  useEffect(() => {
    if (isSaveSuccessPut && slidesToAdd) {
      setLoadingMessage(
        t(`shared-manager.${location}.loading-messages.saving-slides`)
      );
      PutV1PlaylistsByIdSlides({
        id,
        body: JSON.stringify(slidesToAdd),
      });
    }
  }, [isSaveSuccessPut]);

  /** When the playlist is saved, the slide will be saved. */
  useEffect(() => {
    if (isSaveSuccessPost && slidesToAdd && data) {
      setLoadingMessage(
        t(`shared-manager.${location}.loading-messages.saving-slides`)
      );
      PutV1PlaylistsByIdSlides({
        id: idFromUrl(data["@id"]),
        body: JSON.stringify(slidesToAdd),
      });
    }
  }, [isSaveSuccessPost]);

  /** Sets slides to save. */
  function handleSaveSlides() {
    const { slides } = formStateObject;
    if (Array.isArray(slides)) {
      setSlidesToAdd(
        slides.map((slide, index) => {
          return { slide: idFromUrl(slide), weight: index };
        })
      );
    }
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
  function handleSubmit() {
    setLoadingMessage(
      t(`shared-manager.${location}.loading-messages.saving-playlist`)
    );

    // Set published.
    const from = formStateObject.published.from
      ? new Date(formStateObject.published.from).toISOString()
      : null;
    const to = formStateObject.published.to
      ? new Date(formStateObject.published.to).toISOString()
      : null;

    const saveData = {
      title: formStateObject.title,
      description: formStateObject.description,
      modifiedBy: formStateObject.modifiedBy,
      createdBy: formStateObject.createdBy,
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

    setLoadingMessage(t(`shared-manager.${location}.loading-messages.saving`));
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
  }

  return (
    <>
      {formStateObject && (
        <SharedForm
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
        >
          {location === "campaign" && (
            <CampaignForm
              handleInput={handleInput}
              campaign={formStateObject}
            />
          )}
          {location === "playlist" && (
            <PlaylistForm
              handleInput={handleInput}
              playlist={formStateObject}
            />
          )}
        </SharedForm>
      )}
    </>
  );
}

SharedManager.defaultProps = {
  id: null,
  isLoading: false,
  loadingError: null,
  initialState: null,
  slideId: "",
};

SharedManager.propTypes = {
  initialState: PropTypes.shape({
    feed: PropTypes.shape({
      "@id": PropTypes.string,
    }),
  }),
  saveMethod: PropTypes.string.isRequired,
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  loadingError: PropTypes.shape(PropTypes.any),
  slideId: PropTypes.string,
};

export default SharedManager;
