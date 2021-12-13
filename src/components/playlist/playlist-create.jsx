import { React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import idFromUrl from "../util/helpers/id-from-url";
import SideAndTopbarHOC from "../side-and-topbar-hoc/side-and-topbar-hoc";
import {
  displayError,
  displaySuccess,
} from "../util/list/toast-component/display-toast";
import {
  usePostV1PlaylistsMutation,
  usePutV1PlaylistsByIdSlidesMutation,
} from "../../redux/api/api.generated";
import PlaylistForm from "./playlist-form";

/**
 * The playlist edit component.
 *
 * @returns {object} The playlist edit page.
 */
function PlaylistCreate() {
  const { t } = useTranslation("common");
  const history = useHistory();
  const headerText = t("playlist-create.create-new-playlist");
  const [formStateObject, setFormStateObject] = useState({
    slides: [],
    title: "",
    description: "",
    modifiedBy: "",
    createdBy: "",
    schedules: [],
    published: {
      from: null,
      to: null,
    },
  });
  const [slideId, setSlideId] = useState();
  const [loadingMessage, setLoadingMessage] = useState("");
  const [savingSlides, setSavingSlides] = useState(false);
  const [savingPlaylists, setSavingPlaylists] = useState(false);
  const [slidesToAdd, setSlidesToAdd] = useState([]);

  const [PostV1Playlist, { data, error: saveError, isSuccess: isSaveSuccess }] =
    usePostV1PlaylistsMutation();

  const [
    PutV1PlaylistsByIdSlides,
    { error: saveErrorSlides, isSuccess: isSaveSuccessSlides },
  ] = usePutV1PlaylistsByIdSlidesMutation();

  // Slides are saved successfully, display a message
  useEffect(() => {
    if (isSaveSuccessSlides) {
      setSavingSlides(false);
      displaySuccess(t("playlist-create.success-messages.saved-slides"));
    }
  }, [isSaveSuccessSlides]);

  // Slides are not saved successfully, display a message
  useEffect(() => {
    if (saveErrorSlides) {
      setSavingSlides(false);
      displayError(
        t("playlist-create.error-messages.save-slides-error", {
          error: saveErrorSlides.error
            ? saveErrorSlides.error
            : saveErrorSlides.data["hydra:description"],
        })
      );
    }
  }, [saveErrorSlides]);

  /** If the playlist is saved, display the success message */
  useEffect(() => {
    if (isSaveSuccess) {
      displaySuccess(t("playlist-create.success-messages.saved-playlist"));
      setSavingPlaylists(false);
    }
  }, [isSaveSuccess]);

  /** If the playlist is saved with error, display the error message */
  useEffect(() => {
    if (saveError) {
      displayError(
        t("playlist-create.error-messages.save-playlist-error", {
          error: saveError.error
            ? saveError.error
            : saveError.data["hydra:description"],
        })
      );
      setSavingPlaylists(false);
    }
  }, [saveError]);

  /**
   * Set state on change in input field
   *
   * @param {object} props - The props.
   * @param {object} props.target - Event target.
   */
  function handleInput({ target }) {
    const localFormStateObject = { ...formStateObject };
    localFormStateObject[target.id] = target.value;
    setFormStateObject(localFormStateObject);
  }

  /**
   * When the screen is saved, the group(s) will be saved. When saved, it
   * redirects to edit screen.
   */
  useEffect(() => {
    if (isSaveSuccessSlides && data) {
      history.push(`/playlist/edit/${idFromUrl(data["@id"])}`);
    }
  }, [isSaveSuccessSlides]);

  /** Set loaded data into form state. */
  useEffect(() => {
    if (data) {
      setFormStateObject(data);
    }
  }, [data]);

  /** Sets the id of slides for api call. */
  useEffect(() => {
    if (formStateObject && !slideId) {
      setSlideId(idFromUrl(formStateObject.slides));
    }
  }, [formStateObject]);

  /** When the playlist is saved, the slide will be saved. */
  useEffect(() => {
    if (isSaveSuccess && slidesToAdd && data) {
      setSavingSlides(true);
      setLoadingMessage(t("playlist-create.loading-messages.saving-slides"));
      PutV1PlaylistsByIdSlides({
        id: idFromUrl(data["@id"]),
        body: JSON.stringify(slidesToAdd),
      });
    }
  }, [isSaveSuccess]);

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

  /** Handles submit. */
  function handleSubmit() {
    setSavingPlaylists(true);
    setLoadingMessage(t("playlist-create.loading-messages.saving-playlist"));
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
        from: formStateObject.published.from,
        to: formStateObject.published.from,
      },
    };
    PostV1Playlist({
      playlistPlaylistInput: JSON.stringify(saveData),
    });
    if (Array.isArray(formStateObject.slides)) {
      handleSaveSlides();
    }
  }

  return (
    <PlaylistForm
      playlist={formStateObject}
      headerText={headerText}
      isLoading={savingPlaylists || savingSlides}
      loadingMessage={loadingMessage}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      slideId={slideId}
    />
  );
}

export default SideAndTopbarHOC(PlaylistCreate);
