import { React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import set from "lodash.set";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
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
  usePostV1PlaylistsMutation,
  api,
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
  const dispatch = useDispatch();
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
  const [savingRelations, setSavingRelations] = useState(false);

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

  /**
   * @param {Array} list - The list to save.
   * @returns {boolean} - If a list is ready to be saved.
   */
  function readyToSave(list) {
    return list && list.length > 0;
  }

  const bindScreens = () => {
    return new Promise((resolve, reject) => {
      if (readyToSave(screensToAdd)) {
        setLoadingMessage(t(`${location}.loading-messages.saving-screens`));

        dispatch(
          api.endpoints.putV1ScreensByIdCampaigns.initiate({
            id: id || idFromUrl(data["@id"]),
            body: JSON.stringify(screensToAdd),
          })
        )
          .then((response) => {
            if (response.error) {
              displayError(t(`${location}.error-messages.save-screens-error`), response.error);
              reject(response.error);
            } else {
              displaySuccess(t(`${location}.success-messages.saved-screens`));
              resolve();
            }
          })
          .catch((e) => {
            displayError(t(`${location}.error-messages.save-screens-error`), e);
            reject(e);
          });
      } else {
        resolve([]);
      }
    });
  };

  const bindScreenGroups = () => {
    return new Promise((resolve, reject) => {
      if (readyToSave(groupsToAdd)) {
        setLoadingMessage(t(`${location}.loading-messages.saving-groups`));

        dispatch(
          api.endpoints.putV1ScreenGroupsByIdCampaigns.initiate({
            id: id || idFromUrl(data["@id"]),
            body: JSON.stringify(groupsToAdd),
          })
        )
          .then((response) => {
            if (response.error) {
              displayError(t(`${location}.error-messages.save-group-error`), response.error);
              reject(response.error);
            } else {
              displaySuccess(t(`${location}.success-messages.saved-groups`));
              resolve();
            }
          })
          .catch((e) => {
            displayError(t(`${location}.error-messages.save-group-error`), e);
            reject(e);
          });
      } else {
        resolve([]);
      }
    });
  };

  const bindSlides = () => {
    return new Promise((resolve, reject) => {
      if (readyToSave(slidesToAdd)) {
        setLoadingMessage(t(`${location}.loading-messages.saving-slides`));

        dispatch(
          api.endpoints.putV1PlaylistsByIdSlides.initiate({
            id: id || idFromUrl(data["@id"]),
            body: JSON.stringify(slidesToAdd),
          })
        )
          .then((response) => {
            if (response.error) {
              displayError(t(`${location}.error-messages.save-slides-error`), response.error);
              reject(response.error);
            } else {
              displaySuccess(t(`${location}.success-messages.saved-slides`));
              resolve();
            }
          })
          .catch((e) => {
            displayError(t(`${location}.error-messages.save-slides-error`), e);
            reject(e);
          });
      } else {
        resolve([]);
      }
    });
  };

  // When playlist has been saved, bind relations.
  useEffect(() => {
    if (isSaveSuccessPut === true || isSaveSuccessPost === true) {
      setSavingRelations(true);
      bindScreens()
        .then(() =>
          bindScreenGroups().then(() =>
            bindSlides()
          )
        )
        .finally(() => {
          displaySuccess(t(`${location}.success-messages.saved`));
          navigate(`/${location}/list`);
          setSavingRelations(false);
        });
    }
  }, [isSaveSuccessPut, isSaveSuccessPost]);

  /** Slides are not saved successfully, display a message */
  useEffect(() => {
    if (loadingError) {
      displayError(t(`${location}.error-messages.load-error`), loadingError);
    }
  }, [loadingError]);

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

    if (Array.isArray(screens)) {
      setScreensToAdd(
        screens.map((screen) => {
          return { screen: idFromUrl(screen) };
        })
      );
    }
  }

  /** Sets groups to save. */
  function handleSaveGroups() {
    const { groups } = formStateObject;
    if (Array.isArray(groups)) {
      setGroupsToAdd(
        groups.map((group) => {
          return { screengroup: idFromUrl(group) };
        })
      );
    }
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
          isLoading={savingPlaylists || savingRelations || isLoading}
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
