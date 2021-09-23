import { React, useState } from "react";
import { ulid } from "ulid";
import * as dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { usePostV1PlaylistsMutation } from "../../redux/api/api.generated";
import PlaylistForm from "./playlist-form";

/**
 * The playlist edit component.
 *
 * @returns {object} The playlist edit page.
 */
function PlaylistCreate() {
  const { t } = useTranslation("common");
  const headerText = t("edit-playlist.create-new-playlist");

  const creationTime = dayjs().toISOString();
  const newUlid = ulid();

  const [formStateObject, setFormStateObject] = useState({
    id: newUlid,
    "@context": "/contexts/Playlist",
    "@id": `/v1/playlists/${newUlid}`,
    title: "New playlist",
    description: "",
    modified: creationTime,
    created: creationTime,
    modifiedBy: "TODO",
    createdBy: "TODO",
    slides: `/v1/slidesPlaylist?_expand=slide&playlistId=${newUlid}`,
    onScreens: `/v1/playlists/${newUlid}/screens`,
    published: {
      from: creationTime,
      to: null,
    },
  });

  const [
    PostV1Playlist,
    { isLoading: isSaving, error: saveError, isSuccess: isSaveSuccess },
  ] = usePostV1PlaylistsMutation();

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
   * Handles submit.
   */
  function handleSubmit() {
    PostV1Playlist({ body: formStateObject });
  }

  return (
    <PlaylistForm
      playlist={formStateObject}
      headerText={headerText}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      isLoading={false}
      isSaveSuccess={isSaveSuccess}
      isSaving={isSaving}
      errors={[saveError]}
    />
  );
}

export default PlaylistCreate;
