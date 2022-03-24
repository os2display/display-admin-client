import { React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import set from "lodash.set";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  usePostV1ScreensMutation,
  usePutV1ScreensByIdMutation,
  usePutV1ScreensByIdScreenGroupsMutation,
  usePutPlaylistScreenRegionItemMutation,
} from "../../redux/api/api.generated";
import ScreenForm from './screen-form';
import {
  displaySuccess,
  displayError,
} from "../util/list/toast-component/display-toast";
import idFromUrl from "../util/helpers/id-from-url";

/**
 * The screen manager component.
 *
 * @param {object} props The props.
 * @param {object} props.initialState Initial screen state.
 * @param {string} props.saveMethod POST or PUT.
 * @param {string | null} props.id screen id.
 * @param {boolean} props.isLoading Is the screen state loading?
 * @param {object} props.loadingError Loading error.
 * @param {string} props.groupId The group id
 * @returns {object} The screen form.
 */
function ScreenManager({
  initialState,
  saveMethod,
  id,
  isLoading,
  loadingError,
  groupId
}) {
  const { t } = useTranslation("common", { keyPrefix: "screen-manager" });
  const navigate = useNavigate();
  const headerText =
    saveMethod === "PUT" ? t("edit-screen-header") : t("create-screen-header");
    const [loadingMessage, setLoadingMessage] = useState("");
    const [savingScreen, setSavingScreen] = useState(false);
    const [savingGroups, setSavingGroups] = useState(false);
    const [savingPlaylists, setSavingPlaylists] = useState(false);
    const [groupsToAdd, setGroupsToAdd] = useState();
    const [playlistsToAdd, setPlaylistsToAdd] = useState();

  // Initialize to empty screen object.
  const [formStateObject, setFormStateObject] = useState(null);

  const [PutV1Screens, { error: saveErrorPut, isSuccess: isSaveSuccessPut }] =
  usePutV1ScreensByIdMutation();

  // Handler for creating screen.
  const [
    PostV1Screens,
    { data: postData, error: saveErrorPost, isSuccess: isSaveSuccessPost },
  ] = usePostV1ScreensMutation();

  // @TODO: Handle errors.
  const [
    putPlaylistScreenRegionItem,
    { error: savePlaylistError, isSuccess: isSavePlaylistSuccess },
  ] = usePutPlaylistScreenRegionItemMutation();

  const [
    PutV1ScreensByIdScreenGroups,
    { error: saveErrorGroups, isSuccess: isSaveSuccessGroups },
  ] = usePutV1ScreensByIdScreenGroupsMutation();


    /** When the screen is saved, the groups will be saved. */
    useEffect(() => {
      if ((isSaveSuccessPut || isSaveSuccessPost) && groupsToAdd) {
        setLoadingMessage(t("loading-messages.saving-groups"));
        setSavingGroups(true);
        PutV1ScreensByIdScreenGroups({
          id: id || idFromUrl(postData["@id"]),
          body: JSON.stringify(groupsToAdd),
        });
      }
    }, [isSaveSuccessPost, isSaveSuccessPut]);

    // Playlists are saved successfully, display a message
  useEffect(() => {
    if (isSavePlaylistSuccess) {
      setSavingPlaylists(false);
      displaySuccess(t("success-messages.saved-playlists"));
    }
  }, [isSavePlaylistSuccess]);

  // Groups are saved successfully, display a message
  useEffect(() => {
    if (isSaveSuccessGroups) {
      setSavingGroups(false);
      displaySuccess(t("success-messages.saved-groups"));
    }
  }, [isSaveSuccessGroups]);

  // Playlists are not saved successfully, display an error message
  useEffect(() => {
    if (savePlaylistError) {
      setSavingPlaylists(false);
      displayError(t("error-messages.save-playlists-error"), savePlaylistError);
    }
  }, [savePlaylistError]);


  // Groups are not saved successfully, display an error message
  useEffect(() => {
    if (saveErrorGroups) {
      setSavingGroups(false);
      displayError(t("error-messages.save-groups-error"), saveErrorGroups);
    }
  }, [saveErrorGroups]);

  /** If the screen is saved, display the success message */
  useEffect(() => {
    if (isSaveSuccessPost || isSaveSuccessPut) {
      displaySuccess(t("success-messages.saved-screen"));
      setSavingScreen(false);
    }
  }, [isSaveSuccessPost, isSaveSuccessPut]);

  /** If the screen is saved with error, display the error message */
  useEffect(() => {
    if (saveErrorPut || saveErrorPost) {
      displayError(t("error-messages.save-screen-error"), saveErrorPut || saveErrorPost);
      setSavingScreen(false);
    }
  }, [saveErrorPut, saveErrorPost]);

  /** If the screen is not loaded, display the error message */
  useEffect(() => {
    if (loadingError) {
      displayError(t("error-messages.load-screen-error", { id }), loadingError);
    }
  }, [loadingError]);

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


  /** Set loaded data into form state. */
  useEffect(() => {
   if (initialState) {
      const localFormStateObject = JSON.parse(JSON.stringify(initialState));
      setFormStateObject(localFormStateObject);
    }
  }, [initialState]);

    /** Adds playlists to regions. */
    useEffect(() => {
      if ((isSaveSuccessPost || isSaveSuccessPut) && playlistsToAdd && playlistsToAdd.length > 0) {
        setLoadingMessage(t("loading-messages.saving-playlists"));
        const playlistToAdd = playlistsToAdd.splice(0, 1).shift();
        debugger
        putPlaylistScreenRegionItem({
          body: JSON.stringify(playlistToAdd?.list),
          id: playlistToAdd.screenId || idFromUrl(postData["@id"]),
          regionId: playlistToAdd.regionId,
        });
      }
    }, [isSavePlaylistSuccess, isSaveSuccessPut, isSaveSuccessPost]);


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
              return { playlist: localPlaylists.id, shared: localPlaylists.shared, weight: index };
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

      if (formStateObject.playlists?.length === 0) {
        formStateObject.regions.forEach((element) => {
          toSave.push({
            list: [],
            regionId: idFromUrl(element,1),
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
  setLoadingMessage(t("loading-messages.saving-screen"));
  const localFormStateObject = JSON.parse(JSON.stringify(formStateObject));
  localFormStateObject.dimensions.width = parseInt(
    localFormStateObject.dimensions.width,
    10
  );
  localFormStateObject.dimensions.height = parseInt(
    localFormStateObject.dimensions.height,
    10
  );
  const saveData = {screenScreenInput: JSON.stringify({
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
  })
};

  if (saveMethod === "POST") {
    setLoadingMessage(t("loading-messages.saving-screen"));
    PostV1Screens(saveData);
  } else if (saveMethod === "PUT") {
    setLoadingMessage(t("loading-messages.saving-screen"));
    const putData = { ...saveData, id };

    PutV1Screens(putData);
  } else {
    throw new Error("Unsupported save method");
  }


  saveGroups();
  savePlaylists();
}

  /** Handle submitting is done. */
  useEffect(() => {
    if (isSaveSuccessPost && postData) {
      setSavingScreen(false);
      navigate(`/screen/edit/${idFromUrl(postData["@id"])}`);
    } else if (isSaveSuccessPut) {
      setSavingScreen(false);
    }
  }, [isSaveSuccessPut, isSaveSuccessPost, postData]);

  return (
    <>
      {formStateObject && (
        <ScreenForm
        screen={formStateObject}
        headerText={headerText}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        isLoading={
          savingScreen || savingPlaylists || savingGroups || isLoading
        }
        loadingMessage={loadingMessage}
        groupId={groupId}
      />
      )}
    </>
  );
}

ScreenManager.defaultProps = {
  id: null,
  isLoading: false,
  loadingError: null,
  groupId: null,
  initialState: null
};

ScreenManager.propTypes = {
  initialState: PropTypes.shape(PropTypes.any),
  saveMethod: PropTypes.string.isRequired,
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  loadingError: PropTypes.shape(PropTypes.any),
  groupId: PropTypes.string,
};

export default ScreenManager;
