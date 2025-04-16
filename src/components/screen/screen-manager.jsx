import { React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import set from "lodash.set";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  usePostV2ScreensMutation,
  usePutV2ScreensByIdMutation,
} from "../../redux/api/api.generated.ts";
import ScreenForm from "./screen-form";
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
 * @param {string | null} props.id Screen id.
 * @param {boolean} props.isLoading Is the screen state loading?
 * @param {object} props.loadingError Loading error.
 * @param {string | null} props.groupId The group id
 * @returns {object} The screen form.
 */
function ScreenManager({
  saveMethod,
  id = null,
  isLoading = false,
  loadingError = null,
  groupId = null,
  initialState = null,
}) {
  const { t } = useTranslation("common", { keyPrefix: "screen-manager" });
  const [saveWithoutClose, setSaveWithoutClose] = useState(false);
  const navigate = useNavigate();
  const orientationOptions = [
    { title: "Vertikal", "@id": "vertical" },
    { title: "Horisontal", "@id": "horizontal" },
  ];
  const resolutionOptions = [
    { title: "4K", "@id": "4K" },
    { title: "HD", "@id": "HD" },
  ];
  const headerText =
    saveMethod === "PUT" ? t("edit-screen-header") : t("create-screen-header");
  const [loadingMessage, setLoadingMessage] = useState("");
  const [savingScreen, setSavingScreen] = useState(false);

  // Initialize to empty screen object.
  const [formStateObject, setFormStateObject] = useState(null);

  const [PutV2Screens, { error: saveErrorPut, isSuccess: isSaveSuccessPut }] =
    usePutV2ScreensByIdMutation();

  // Handler for creating screen.
  const [
    PostV2Screens,
    { data: postData, error: saveErrorPost, isSuccess: isSaveSuccessPost },
  ] = usePostV2ScreensMutation();

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
      displayError(
        t("error-messages.save-screen-error"),
        saveErrorPut || saveErrorPost
      );
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
  const handleInput = ({ target }) => {
    let localFormStateObject = { ...formStateObject };
    localFormStateObject = JSON.parse(JSON.stringify(localFormStateObject));
    set(localFormStateObject, target.id, target.value);
    setFormStateObject(localFormStateObject);
  };

  /** Set loaded data into form state. */
  useEffect(() => {
    if (initialState) {
      const localFormStateObject = JSON.parse(JSON.stringify(initialState));
      if (localFormStateObject.orientation) {
        localFormStateObject.orientation = orientationOptions.filter(
          (orientation) =>
            orientation["@id"] === localFormStateObject.orientation
        );
      }

      if (localFormStateObject.resolution) {
        localFormStateObject.resolution = resolutionOptions.filter(
          (resolution) => resolution["@id"] === localFormStateObject.resolution
        );
      }

      setFormStateObject(localFormStateObject);
    }
  }, [initialState]);

  /**
   * Map group ids for submitting.
   *
   * @returns {Array | null} A mapped array with group ids or null
   */
  function mapGroups() {
    if (formStateObject.inScreenGroups) {
      return formStateObject.inScreenGroups.map((group) => {
        return idFromUrl(group);
      });
    }
    return [];
  }

  /**
   * Creates an array of playlist ids and weight filtered by region id or null
   *
   * @param {string} regionId RegionId for filtering
   * @returns {Array | null} A mapped array with playlist ids and weight
   *   filtered by region id or null
   */
  function getPlaylistsByRegionId(regionId) {
    const { playlists } = formStateObject;

    return playlists
      .filter(({ region }) => idFromUrl(region) === idFromUrl(regionId))
      .map((playlist, index) => {
        return { id: idFromUrl(playlist["@id"]), weight: index };
      });
  }

  /**
   * @param {string} itemId The item to remove.
   * @param {Array} array The array to remove from.
   */
  function removeFromArray(itemId, array) {
    if (array.indexOf(itemId) >= 0) {
      array.splice(array.indexOf(itemId), 1);
    }
  }

  /**
   * Map playlists with regions and weight for submitting.
   *
   * @returns {Array | null} A mapped array with playlist, regions and weight or null
   */
  function mapPlaylistsWithRegion() {
    const returnArray = [];
    const { playlists, regions } = formStateObject;
    const regionIds = regions.map((r) => idFromUrl(r["@id"]));

    // The playlists all have a regionId, the following creates a unique list of relevant regions If there are not
    // playlists, then an empty playlist is to be saved per region
    let playlistRegions = [];
    if (playlists?.length > 0) {
      playlistRegions = [...new Set(playlists.map(({ region }) => region))];
    }

    // Then the playlists are mapped by region Looping through the regions that have a playlist connected...
    playlistRegions.forEach((regionId) => {
      // remove region id from list of regionids to finally end up with an array of region ids with empty playlist
      // arrays connected
      removeFromArray(regionId, regionIds);

      // Add regionsId and connected playlists to the returnarray
      returnArray.push({
        playlists: getPlaylistsByRegionId(regionId),
        regionId: idFromUrl(regionId),
      });
    });
    // The remaining regions are added with empty playlist arrays.
    if (regionIds.length > 0) {
      regionIds.forEach((regionId) =>
        returnArray.push({
          playlists: [],
          regionId: idFromUrl(regionId),
        })
      );
    }
    return returnArray;
  }

  /**
   * Gets orientation for submitting
   *
   * @returns {string} Orientation or empty string
   */
  function getOrientation() {
    const { orientation } = formStateObject;
    return orientation ? orientation[0]["@id"] : "";
  }

  /**
   * Gets resolution for submitting
   *
   * @returns {string} Resolution or empty string
   */
  function getResolution() {
    const { resolution } = formStateObject;
    return resolution && resolution.length > 0 ? resolution[0]["@id"] : "";
  }

  /** Handles submit. */
  const handleSubmit = () => {
    setSavingScreen(true);
    setLoadingMessage(t("loading-messages.saving-screen"));
    const localFormStateObject = JSON.parse(JSON.stringify(formStateObject));
    const {
      title,
      description,
      size,
      modifiedBy,
      createdBy,
      layout,
      location,
      enableColorSchemeChange,
    } = localFormStateObject;

    const saveData = {
      screenScreenInput: JSON.stringify({
        title,
        description,
        size,
        modifiedBy,
        createdBy,
        layout,
        location,
        enableColorSchemeChange,
        resolution: getResolution(),
        groups: mapGroups(),
        orientation: getOrientation(),
        regions: mapPlaylistsWithRegion(),
      }),
    };

    setLoadingMessage(t("loading-messages.saving-screen"));

    if (saveMethod === "POST") {
      PostV2Screens(saveData);
    } else if (saveMethod === "PUT") {
      PutV2Screens({ ...saveData, id });
    }
  };

  const handleSubmitWithRedirect = () => {
    setSaveWithoutClose(true);
    handleSubmit();
  };

  /** Handle submitting is done. */
  useEffect(() => {
    if (isSaveSuccessPut || isSaveSuccessPost) {
      setSavingScreen(false);

      if (saveWithoutClose) {
        setSaveWithoutClose(false);

        if (isSaveSuccessPost) {
          navigate(`/screen/edit/${idFromUrl(postData["@id"])}`);
        }
      } else {
        navigate("/screen/list");
      }
    }
  }, [isSaveSuccessPut, isSaveSuccessPost]);

  return (
    <>
      {formStateObject && (
        <ScreenForm
          handleSubmitWithoutRedirect={handleSubmitWithRedirect}
          screen={formStateObject}
          orientationOptions={orientationOptions}
          resolutionOptions={resolutionOptions}
          headerText={headerText}
          handleInput={handleInput}
          handleSubmitWithRedirect={handleSubmit}
          isLoading={savingScreen || isLoading}
          loadingMessage={loadingMessage}
          groupId={groupId}
        />
      )}
    </>
  );
}

ScreenManager.propTypes = {
  initialState: PropTypes.shape({
    orientation: PropTypes.string,
    resolution: PropTypes.string,
    description: PropTypes.string,
    "@id": PropTypes.string,
    enableColorSchemeChange: PropTypes.bool,
    layout: PropTypes.string,
    location: PropTypes.string,
    regions: PropTypes.arrayOf(PropTypes.string),
    screenUser: PropTypes.string,
    size: PropTypes.string,
    title: PropTypes.string,
  }),
  saveMethod: PropTypes.string.isRequired,
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  loadingError: PropTypes.shape({
    data: PropTypes.shape({
      status: PropTypes.number,
    }),
  }),
  groupId: PropTypes.string,
};

export default ScreenManager;
