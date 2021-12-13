import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import set from "lodash.set";
import SideAndTopbarHOC from '../side-and-topbar-hoc/side-and-topbar-hoc';
import idFromUrl from "../util/helpers/id-from-url";
import {
  usePostV1ScreensMutation,
  usePutV1ScreensByIdScreenGroupsMutation,
  usePutPlaylistScreenRegionItemMutation,
} from "../../redux/api/api.generated";
import ScreenForm from "./screen-form";
import {
  displayError,
  displaySuccess,
} from "../util/list/toast-component/display-toast";

/**
 * The screen create component.
 *
 * @returns {object} The screen create page.
 */
function ScreenCreate() {
  const { t } = useTranslation("common");
  const history = useHistory();
  const headerText = t("screen-create.create-screen-header");
  const [groupId, setGroupId] = useState();
  const [loadingMessage, setLoadingMessage] = useState("");
  const [savingScreen, setSavingScreen] = useState(false);
  const [savingGroups, setSavingGroups] = useState(false);
  const [savingPlaylists, setSavingPlaylists] = useState(false);
  const [groupsToAdd, setGroupsToAdd] = useState();
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

  const [PostV1Screens, { data, error: saveError, isSuccess: isSaveSuccess }] =
    usePostV1ScreensMutation();

  const [
    putPlaylistScreenRegionItem,
    { error: savePlaylistError, isSuccess: isSavePlaylistSuccess },
  ] = usePutPlaylistScreenRegionItemMutation();

  const [
    PutV1ScreensByIdScreenGroups,
    { error: saveErrorGroups, isSuccess: isSaveSuccessGroups },
  ] = usePutV1ScreensByIdScreenGroupsMutation();

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
    if (isSaveSuccess && data && groupsToAdd) {
      setLoadingMessage(t("screen-create.loading-messages.saving-groups"));
      PutV1ScreensByIdScreenGroups({
        id: idFromUrl(data["@id"]),
        body: JSON.stringify(groupsToAdd),
      });
    }
  }, [isSaveSuccess]);

  // Groups are saved, display success
  useEffect(() => {
    if (isSaveSuccessGroups) {
      setSavingGroups(false);
      displaySuccess(t("screen-create.success-messages.saved-groups"));
    }
  }, [isSaveSuccessGroups]);

  // Groups are not saved, display error
  useEffect(() => {
    if (saveErrorGroups) {
      setSavingGroups(false);
      displayError(
        t("screen-create.error-messages.save-groups-error", {
          error: saveErrorGroups.error
            ? saveErrorGroups.error
            : saveErrorGroups.data["hydra:description"],
        })
      );
    }
  }, [saveErrorGroups]);

  // Playlists are saved, display success
  useEffect(() => {
    if (isSavePlaylistSuccess) {
      setSavingPlaylists(false);
      displaySuccess(t("screen-create.success-messages.saved-playlists"));
    }
  }, [isSavePlaylistSuccess]);

  // Playlists are not saved, display error
  useEffect(() => {
    if (savePlaylistError) {
      setSavingPlaylists(false);
      displayError(
        t("screen-create.error-messages.save-playlists-error", {
          error: savePlaylistError.error
            ? savePlaylistError.error
            : savePlaylistError.data["hydra:description"],
        })
      );
    }
  }, [savePlaylistError]);

  /** If the screen is saved, display the success message */
  useEffect(() => {
    if (isSaveSuccess) {
      displaySuccess(t("screen-create.success-messages.saved-screen"));
      setSavingScreen(false);
    }
  }, [isSaveSuccess]);

  /** If the screen is saved with error, display the error message */
  useEffect(() => {
    if (saveError) {
      displayError(
        t("screen-create.error-messages.save-screen-error", {
          error: saveError.error
            ? saveError.error
            : saveError.data["hydra:description"],
        })
      );
      setSavingScreen(false);
    }
  }, [saveError]);

  /** Adds playlists to regions. */
  useEffect(() => {
    if (isSaveSuccess && playlistsToAdd && playlistsToAdd.length > 0 && data) {
      setLoadingMessage(t("screen-create.loading-messages.saving-playlists"));
      const playlistToAdd = playlistsToAdd.splice(0, 1).shift();
      putPlaylistScreenRegionItem({
        body: JSON.stringify(playlistToAdd?.list),
        id: idFromUrl(data["@id"]),
        regionId: playlistToAdd.regionId,
      });
    }
  }, [isSavePlaylistSuccess, isSaveSuccess]);

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
        });
      });

      if (formStateObject.playlists.length === 0) {
        formStateObject.regions.forEach((element) => {
          toSave.push({
            list: [],
            regionId: idFromUrl(element),
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
    setLoadingMessage(t("screen-create.loading-messages.saving-screen"));
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
    PostV1Screens({ screenScreenInput: JSON.stringify(saveData) });
    saveGroups();
    savePlaylists();
  }

  return (
    <ScreenForm
      screen={formStateObject}
      headerText={headerText}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      isLoading={savingScreen || savingPlaylists || savingGroups}
      loadingMessage={loadingMessage}
      groupId={groupId}
    />
  );
}

export default SideAndTopbarHOC(ScreenCreate);
