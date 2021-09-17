import { React, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { useTranslation } from "react-i18next";
import ContentBody from "../util/content-body/content-body";
import ContentFooter from "../util/content-footer/content-footer";
import FormInput from "../util/forms/form-input";
import FormInputArea from "../util/forms/form-input-area";
import SelectScreenTable from "../util/multi-and-table/select-screen-table";
import SelectSlidesTable from "../util/multi-and-table/select-slides-table";
import CategoriesDropdown from "../util/forms/multiselect-dropdown/categories/categories-dropdown";
import {
  useGetV1PlaylistsByIdQuery,
  usePutV1PlaylistsByIdMutation,
} from "../../redux/api/api.generated";

/**
 * The playlist edit component.
 *
 * @returns {object} The playlist edit page.
 */
function PlaylistEdit() {
  const { t } = useTranslation("common");
  const [formStateObject, setFormStateObject] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [playlistName, setPlaylistName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  const fiveSeconds = 5000;
  const [displaySaveSuccess, setDisplaySaveSuccess] = useState(false);

  const [
    PutV1Playlists, // This is the mutation trigger
    { isLoading: isUpdating, error: saveError, isSuccess: isSaveSuccess }, // This is the destructured mutation result
  ] = usePutV1PlaylistsByIdMutation();

  const { data, error, isLoading } = useGetV1PlaylistsByIdQuery({ id });

  /**
   * Set loaded data into form state.
   */
  useEffect(() => {
    if (data) {
      setFormStateObject(data);
    }
  }, [data]);

  /**
   * Display a banner if save is successful.
   */
  useEffect(() => {
    let timer = null;
    if (isSaveSuccess) {
      setDisplaySaveSuccess(true);
      timer = setTimeout(() => {
        setDisplaySaveSuccess(false);
      }, fiveSeconds);
    }
    return function cleanup() {
      if (timer !== null) {
        clearInterval(timer);
      }
    };
  }, [isSaveSuccess]);

  /**
   * Set state on change in input field
   *
   * @param {object} props The props.
   * @param {object} props.target Event target.
   */
  function handleInput({ target }) {
    const localFormStateObject = { ...formStateObject };
    localFormStateObject[target.id] = target.value;
    setFormStateObject(localFormStateObject);
  }

  /**
   * Handles validations, and goes back to list.
   *
   * @param {Event} event The submit event.
   * @returns {boolean} Indicating whether to submit form.
   */
  function handleSubmit(event) {
    let data = { id: id, body: formStateObject };
    PutV1Playlists(data);
  }

  return (
    <>
      <Form>
        <h1>
          {t("edit-playlist.edit-playlist")}: {playlistName}
        </h1>
        <ContentBody>
          <h2 className="h4">{t("edit-playlist.title-about")}</h2>
          <FormInput
            name="title"
            type="text"
            errors={errors}
            label={t("edit-playlist.playlist-name-label")}
            placeholder={t("edit-playlist.playlist-name-placeholder")}
            value={formStateObject.title}
            onChange={handleInput}
          />
          <FormInputArea
            name="description"
            type="text"
            label={t("edit-playlist.playlist-description-label")}
            placeholder={t("edit-playlist.playlist-description-placeholder")}
            value={formStateObject.description}
            onChange={handleInput}
          />
          <CategoriesDropdown
            errors={errors}
            name="playlistCategories"
            handleCategorySelection={handleInput}
            selected={formStateObject.playlistCategories}
          />
        </ContentBody>
        <ContentBody>
          <h2 className="h4">{t("edit-playlist.title-screens")}</h2>
          <SelectScreenTable
            handleChange={handleInput}
            name="playlistScreens"
            errors={errors}
            selectedData={formStateObject.onScreens}
          />
        </ContentBody>
        <ContentBody>
          <h2 className="h4">{t("edit-playlist.title-slides")}</h2>
          <SelectSlidesTable
            handleChange={handleInput}
            name="playlistSlides"
            errors={errors}
            selectedData={formStateObject.playlistSlides}
          />
        </ContentBody>
        <ContentFooter>
          {submitted && <Redirect to="/playlists" />}

          <Button
            variant="secondary"
            type="button"
            id="playlist_cancel"
            onClick={() => history.goBack()}
            size="lg"
            className="me-3"
          >
            {t("edit-playlist.cancel-button")}
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={handleSubmit}
            id="save_playlist"
            size="lg"
          >
            <>
              {!isUpdating && t("edit-playlist.save-button")}
              {isUpdating && (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="m-1"
                  />
                  {t("edit-playlist.saving")}
                </>
              )}
            </>
          </Button>

          {displaySaveSuccess && (
            <Alert className="mt-2" variant="success">
              {t("edit-playlist.saved")}
            </Alert>
          )}
        </ContentFooter>
      </Form>
    </>
  );
}

export default PlaylistEdit;
