import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import set from "lodash.set";
import idFromUrl from "../util/helpers/id-from-url";
import {
  useGetV1ScreensByIdQuery,
  usePutV1ScreensByIdMutation,
  usePutV1ScreensByIdScreenGroupsMutation,
  usePutPlaylistScreenRegionItemMutation,
} from "../../redux/api/api.generated";
import ScreenForm from "./screen-form";
import {
  displayError,
  displaySuccess,
} from "../util/list/toast-component/display-toast";

/**
 * The screen edit component.
 *
 * @returns {object} The screen edit page.
 */
function ScreenEdit() {
  const { t } = useTranslation("common");
  const headerText = t("screen-edit.edit-screen-header");
  const [formStateObject, setFormStateObject] = useState();
  const [groupId, setGroupId] = useState();
  const [loadingMessage, setLoadingMessage] = useState("");
  const [savingScreen, setSavingScreen] = useState(false);
  const [savingGroups, setSavingGroups] = useState(false);
  const [savingPlaylists, setSavingPlaylists] = useState(false);
  const [groupsToAdd, setGroupsToAdd] = useState();
  const [playlistsToAdd, setPlaylistsToAdd] = useState();
  const { id } = useParams();
  const [PutV1Screens, { error: saveError, isSuccess: isSaveSuccess }] =
    usePutV1ScreensByIdMutation();

  const [
    putPlaylistScreenRegionItem,
    { error: savePlaylistError, isSuccess: isSavePlaylistSuccess },
  ] = usePutPlaylistScreenRegionItemMutation();

  const [
    PutV1ScreensByIdScreenGroups,
    { error: saveErrorGroups, isSuccess: isSaveSuccessGroups },
  ] = usePutV1ScreensByIdScreenGroupsMutation();

  const {
    data,
    error: loadError,
    isLoading: isLoadingScreen,
  } = useGetV1ScreensByIdQuery({ id });

  /** Sets the id of groups for api call. */
  useEffect(() => {
    if (formStateObject && !groupId) {
      setGroupId(idFromUrl(formStateObject.inScreenGroups));
    }
  }, [formStateObject]);

  /** Set loaded data into form state. */
  useEffect(() => {
    if (data) {
      setFormStateObject(data);
    }
  }, [data]);

  /** When the screen is saved, the groups will be saved. */
  useEffect(() => {
    if (isSaveSuccess && groupsToAdd) {
      setLoadingMessage(t("screen-edit.loading-messages.saving-groups"));
      setSavingGroups(true);
      PutV1ScreensByIdScreenGroups({
        id,
        body: JSON.stringify(groupsToAdd),
      });
    }
  }, [isSaveSuccess]);

  useEffect(() => {
    if (isSaveSuccessGroups) {
      setSavingGroups(false);
      displaySuccess(t("screen-edit.success-messages.saved-groups"));
    }
  }, [isSaveSuccessGroups]);

  useEffect(() => {
    if (saveErrorGroups) {
      setSavingGroups(false);
      displayError(
        t("screen-edit.error-messages.save-groups-error", {
          error: saveErrorGroups.data["hydra:description"],
        })
      );
    }
  }, [saveErrorGroups]);

  useEffect(() => {
    if (isSavePlaylistSuccess) {
      setSavingPlaylists(false);
      displaySuccess(t("screen-edit.success-messages.saved-playlists"));
    }
  }, [isSavePlaylistSuccess]);

  useEffect(() => {
    if (savePlaylistError) {
      setSavingPlaylists(false);
      displayError(
        t("screen-edit.error-messages.save-playlists-error", {
          error: savePlaylistError.error
            ? savePlaylistError.error
            : savePlaylistError.data["hydra:description"],
        })
      );
    }
  }, [savePlaylistError]);

  useEffect(() => {
    if (isSaveSuccess) {
      displaySuccess(t("screen-edit.success-messages.saved-screen"));
      setSavingScreen(false);
    }
  }, [isSaveSuccess]);

  useEffect(() => {
    if (saveError) {
      displayError(
        t("screen-edit.error-messages.save-screen-error", {
          error: saveError.error
            ? saveError.error
            : saveError.data["hydra:description"],
        })
      );
      setSavingScreen(false);
    }
  }, [saveError]);

  useEffect(() => {
    if (loadError) {
      displayError(
        t("screen-edit.error-messages.load-screen-error", {
          error: loadError.error
            ? loadError.error
            : loadError.data["hydra:description"],
          id,
        })
      );
    }
  }, [loadError]);

  /** Adds playlists to regions. */
  useEffect(() => {
    if (isSaveSuccess && playlistsToAdd && playlistsToAdd.length > 0) {
      setLoadingMessage(t("screen-edit.loading-messages.saving-playlists"));
      const playlistToAdd = playlistsToAdd.splice(0, 1).shift();
      putPlaylistScreenRegionItem({
        body: JSON.stringify(playlistToAdd?.list),
        id: playlistToAdd.screenId,
        regionId: playlistToAdd.regionId,
      });
    }
  }, [isSavePlaylistSuccess, isSaveSuccess]);

  /**
   * Set state on change in input field
   *
   * @param {object} props - The props.
   * @param {object} props.target - Event target.
   */
  function handleInput({ target }) {
    let localFormStateObject = { ...formStateObject };
    localFormStateObject = JSON.parse(JSON.stringify(localFormStateObject));
    set(localFormStateObject, target.id, target.value);
    setFormStateObject(localFormStateObject);
  }

  /** Set playlists to save, if any */
  function savePlaylists() {
    const toSave = [];
    const formStateObjectPlaylists = formStateObject.playlists?.map(
      (playlist) => {
        return {
          id: idFromUrl(playlist["@id"]),
          regionId: idFromUrl(playlist.region),
        };
      }
    );
    if (formStateObjectPlaylists) {
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
          screenId: id,
        });
      });

      if (formStateObject.playlists.length === 0) {
        formStateObject.regions.forEach((element) => {
          toSave.push({
            list: [],
            regionId: idFromUrl(element),
            screenId: id,
          });
        });
      }

      // Set playlists to save
      setPlaylistsToAdd(toSave);
    }
  }

  /** Set groups to save, if any */
  function saveGroups() {
    if (Array.isArray(formStateObject.inScreenGroups)) {
      setGroupsToAdd(
        formStateObject.inScreenGroups.map((group) => {
          return idFromUrl(group);
        })
      );
    }
  }

  /** Handles submit. */
  function handleSubmit() {
    setSavingScreen(true);
    setLoadingMessage(t("screen-edit.loading-messages.saving-screen"));
    const localFormStateObject = JSON.parse(JSON.stringify(formStateObject));
    localFormStateObject.dimensions.width = parseInt(
      localFormStateObject.dimensions.width,
      10
    );
    localFormStateObject.dimensions.height = parseInt(
      localFormStateObject.dimensions.height,
      10
    );
    const saveData = {
      title: localFormStateObject.title,
      description: localFormStateObject.description,
      size: localFormStateObject.size,
      modifiedBy: localFormStateObject.modifiedBy,
      createdBy: localFormStateObject.createdBy,
      layout: localFormStateObject.layout,
      location: localFormStateObject.location,
      dimensions: {
        width: localFormStateObject.dimensions.width,
        height: localFormStateObject.dimensions.height,
      },
    };
    PutV1Screens({ id, screenScreenInput: JSON.stringify(saveData) });
    saveGroups();
    savePlaylists();
  }

  return (
    <>
      {formStateObject && groupId && (
        <ScreenForm
          screen={formStateObject}
          headerText={headerText}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          isLoading={
            savingScreen || savingPlaylists || savingGroups || isLoadingScreen
          }
          loadingMessage={loadingMessage}
          groupId={groupId}
        />
      )}
    </>
  );
}

export default ScreenEdit;
