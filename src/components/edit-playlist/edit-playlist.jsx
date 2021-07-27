import { React, useState, useEffect } from "react";
import { useParams, Redirect } from "react-router";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";
import getFormErrors from "../util/helpers/form-errors-helper";
import FormInput from "../util/forms/form-input";

/**
 * The edit playlist component.
 *
 * @returns {object}
 * The edit playlist page.
 */
function EditPlaylist() {
  const intl = useIntl();
  const [formStateObject, setFormStateObject] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [playlistName, setPlaylistName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const newPlaylist = id === "new";
  const [errors, setErrors] = useState([]);
  const playlistLabel = intl.formatMessage({ id: "edit_add_playlist_label" });
  const requiredFields = ["playlistName"];
  const playlistPlaceholder = intl.formatMessage({
    id: "edit_add_playlist_label_placeholder",
  });

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
          {newPlaylist && (
            <h1>
              <FormattedMessage
                id="create_new_playlist"
                defaultMessage="create_new_playlist"
              />
            </h1>
          )}
          {!newPlaylist && (
            <h1>
              <FormattedMessage
                id="edit_playlist"
                defaultMessage="edit_playlist"
              />
              {playlistName}
            </h1>
          )}
          <FormInput
            name="playlistName"
            type="text"
            errors={errors}
            label={playlistLabel}
            placeholder={playlistPlaceholder}
            value={formStateObject.playlistName}
            onChange={handleInput}
          />
          {submitted && <Redirect to="/playlists" />}
          <Button
            variant="secondary"
            type="button"
            id="playlist_cancel"
            onClick={() => history.goBack()}
          >
            <FormattedMessage id="cancel" defaultMessage="cancel" />
          </Button>
          <Button variant="primary" type="submit" id="save_playlist">
            <FormattedMessage
              id="save_playlist"
              defaultMessage="save_playlist"
            />
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditPlaylist;
