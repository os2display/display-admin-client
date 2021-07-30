import { React, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { Button, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import getFormErrors from "../util/helpers/form-errors-helper";
import FormInput from "../util/forms/form-input";
import FormInputArea from "../util/forms/form-input-area";
import SelectScreenTable from "../util/multi-and-table/select-screen-table";
import SelectSlidesTable from "../util/multi-and-table/select-slides-table";
import CategoriesDropdown from "../util/forms/multiselect-dropdown/categories/categories-dropdown";
import { useTranslation } from "react-i18next";

/**
 * The edit playlist component.
 *
 * @returns {object}
 * The edit playlist page.
 */
function EditPlaylist() {
  const { t } = useTranslation("common");
  const [formStateObject, setFormStateObject] = useState({
    playlistScreens: [],
    playlistSlides: [],
    playlistCategories: [],
  });
  const history = useHistory();
  const { id } = useParams();
  const [playlistName, setPlaylistName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const newPlaylist = id === "new";
  const [errors, setErrors] = useState([]);
  const requiredFields = ["playlistName"];

  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    if (!newPlaylist) {
      fetch(`/fixtures/playlists/playlist.json`)
        .then((response) => response.json())
        .then((jsonData) => {
          setFormStateObject({
            playlistName: jsonData.playlist.name,
            description: jsonData.playlist.description,
            playlistScreens: jsonData.playlist.onFollowingScreens,
            playlistSlides: jsonData.playlist.slides,
            playlistCategories: jsonData.playlist.categories,
          });
          setPlaylistName(jsonData.playlist.name);
        });
    }
  }, []);

  /**
   * Set state on change in input field
   *
   * @param {object} props
   * The props.
   * @param {object} props.target
   * event target
   */
  function handleInput({ target }) {
    const localFormStateObject = { ...formStateObject };
    localFormStateObject[target.id] = target.value;
    setFormStateObject(localFormStateObject);
  }

  /**
   * Handles validations, and goes back to list.
   *
   * @todo make it save.
   * @param {object} e
   * the submit event.
   * @returns {boolean}
   * Boolean indicating whether to submit form.
   */
  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    let returnValue = false;
    const createdErrors = getFormErrors(requiredFields, formStateObject);
    if (createdErrors.length > 0) {
      setErrors(createdErrors);
    } else {
      setSubmitted(true);
      returnValue = true;
    }
    return returnValue;
  }

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          {newPlaylist && <h1>{t("edit-playlist.create-new-playlist")}</h1>}
          {!newPlaylist && (
            <h1>
              {t("edit-playlist.edit-playlist")}: {playlistName}
            </h1>
          )}
          <FormInput
            name="playlistName"
            type="text"
            errors={errors}
            label={t("edit-playlist.playlist-name-label")}
            placeholder={t("edit-playlist.playlist-name-placeholder")}
            value={formStateObject.playlistName}
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
          <SelectScreenTable
            handleChange={handleInput}
            name="playlistScreens"
            errors={errors}
            selectedData={formStateObject.playlistScreens}
          />
          <SelectSlidesTable
            handleChange={handleInput}
            name="playlistSlides"
            errors={errors}
            selectedData={formStateObject.playlistSlides}
          />
          {submitted && <Redirect to="/playlists" />}
          <Button
            variant="secondary"
            type="button"
            id="playlist_cancel"
            onClick={() => history.goBack()}
          >
            {t("edit-playlist.cancel-button")}
          </Button>
          <Button variant="primary" type="submit" id="save_playlist">
            {t("edit-playlist.save-button")}
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditPlaylist;
