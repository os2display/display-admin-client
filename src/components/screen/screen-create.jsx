import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import set from "lodash.set";
import idFromUrl from "../util/helpers/id-from-url";
import {
  usePostV1ScreensMutation,
  usePutV1ScreensByIdScreenGroupsMutation,
  usePutPlaylistScreenRegionItemMutation,
} from "../../redux/api/api.generated";
import ScreenForm from "./screen-form";

/**
 * The screen create component.
 *
 * @returns {object} The screen create page.
 */
function ScreenCreate() {
  const { t } = useTranslation("common");
  const headerText = t("screen-create.create-screen-header");
  const [groupsToAdd, setGroupsToAdd] = useState();
  const history = useHistory();
  const [isSaving, setIsSaving] = useState(false);
  const [playlistsToAdd, setPlaylistsToAdd] = useState();
  const [formStateObject, setFormStateObject] = useState({
    title: "",
    description: "",
    size: "",
    modifiedBy: "",
    createdBy: "",
    layout: "",
    location: "",
    dimensions: {
      width: 0,
      height: 0,
    },
  });

  const [
    PostV1Screens,
    {
      data,
      isLoading: isSavingScreen,
      error: saveError,
      isSuccess: isSaveSuccess,
    },
  ] = usePostV1ScreensMutation();

  const [
    putPlaylistScreenRegionItem,
    { error: savePlaylistError, isSuccess: isSavePlaylistSuccess },
  ] = usePutPlaylistScreenRegionItemMutation();

  const [
    PutV1ScreensByIdScreenGroups,
    {
      isLoading: isSavingGroups,
      error: saveErrorGroups,
      isSuccess: isSaveSuccessGroups,
    },
  ] = usePutV1ScreensByIdScreenGroupsMutation();

  /** When the screen is saved, the groups will be saved. */
  useEffect(() => {
    if (isSaveSuccess && data) {
      PutV1ScreensByIdScreenGroups({
        id: idFromUrl(data["@id"]),
        body: JSON.stringify(groupsToAdd),
      });
    }
  }, [isSaveSuccess]);

  /** Adds playlists to regions. */
  useEffect(() => {
    if (playlistsToAdd && playlistsToAdd.length > 0 && data) {
      setIsSaving(true);
      const playlistToAdd = playlistsToAdd.splice(0, 1).shift();
      putPlaylistScreenRegionItem({
        body: JSON.stringify(playlistToAdd.list),
        id: idFromUrl(data["@id"]),
        regionId: playlistToAdd.regionId,
      });
    } else {
      setIsSaving(false);
    }
  }, [playlistsToAdd, isSavePlaylistSuccess, isSaveSuccess]);

  /** When the screen and group(s) are saved. it redirects to edit screen. */
  useEffect(() => {
    if (isSaveSuccessGroups && data) {
      history.push(`/screen/edit/${idFromUrl(data["@id"])}`);
    }
  }, [isSaveSuccessGroups]);

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

  /** Handles submit. */
  function handleSubmit() {
    formStateObject.dimensions.width = parseInt(
      formStateObject.dimensions.width,
      10
    );
    formStateObject.dimensions.height = parseInt(
      formStateObject.dimensions.height,
      10
    );
    const saveData = {
      title: formStateObject.title,
      description: formStateObject.description,
      size: formStateObject.size,
      modifiedBy: formStateObject.modifiedBy,
      createdBy: formStateObject.createdBy,
      layout: formStateObject.layout,
      location: formStateObject.location,
      dimensions: {
        width: formStateObject.dimensions.width,
        height: formStateObject.dimensions.height,
      },
    };
    const { inScreenGroups } = formStateObject;
    if (inScreenGroups?.length > 0) {
      setGroupsToAdd(
        inScreenGroups.map((group) => {
          return idFromUrl(group);
        })
      );
    }
    PostV1Screens({ screenScreenInput: JSON.stringify(saveData) });
    const toSave = [];
    const formStateObjectPlaylists = formStateObject.playlists.map(
      (playlist) => {
        return {
          id: idFromUrl(playlist["@id"]),
          regionId: idFromUrl(playlist.region),
        };
      }
    );

    // Unique regions that will have a playlist connected.
    const regions = [
      ...new Set(
        formStateObjectPlaylists.map((playlists) => playlists.regionId)
      ),
    ];

    // Filter playlists by region
    regions.forEach((element) => {
      const filteredPlaylists = formStateObjectPlaylists
        .map((localPlaylists, index) => {
          if (element === localPlaylists.regionId) {
            return { playlist: localPlaylists.id, weight: index };
          }
          return undefined;
        })
        .filter((anyValue) => typeof anyValue !== "undefined");
      // Collect playlists with according ids for saving
      toSave.push({
        list: filteredPlaylists,
        regionId: element,
      });
    });
    // Set playlists to save
    setPlaylistsToAdd(toSave);
  }

  return (
    <ScreenForm
      screen={formStateObject}
      headerText={headerText}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      isLoading={false}
      isSaveSuccess={isSaveSuccess || isSaveSuccessGroups}
      isSaving={isSavingScreen || isSavingGroups || isSaving || false}
      errors={saveError || saveErrorGroups || savePlaylistError || false}
    />
  );
}

export default ScreenCreate;
