import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import set from "lodash.set";
import idFromUrl from "../util/helpers/id-from-url";
import {
  usePostV1ScreensMutation,
  usePutV1ScreensByIdScreenGroupsMutation,
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
  const [formStateObject, setFormStateObject] = useState({
    title: "",
    description: "",
    size: "",
    created: "2021-10-08T15:29:02+02:00",
    modified: "2021-10-08T15:29:02+02:00",
    layout: "",
    location: "",
    dimensions: {
      width: 0,
      height: 0,
    },
  });

  const [
    PostV1Screens,
    { data, isLoading: isSaving, error: saveError, isSuccess: isSaveSuccess },
  ] = usePostV1ScreensMutation();

  const [
    PutV1ScreensByIdScreenGroups,
    {
      isLoading: isSavingGroups,
      error: saveErrorGroups,
      isSuccess: isSaveSuccessGroups,
    },
  ] = usePutV1ScreensByIdScreenGroupsMutation();

  /**
   * When the screen is saved, the groups will be saved.
   */
  useEffect(() => {
    if (isSaveSuccess && data) {
      PutV1ScreensByIdScreenGroups({
        id: idFromUrl(data["@id"]),
        body: JSON.stringify(groupsToAdd),
      });
    }
  }, [isSaveSuccess]);

  /**
   * When the screen and group(s) are saved.
   * it redirects to edit screen.
   */
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

  /**
   * Handles submit.
   */
  function handleSubmit() {
    formStateObject.dimensions.width = parseInt(
      formStateObject.dimensions.width,
      10
    );
    formStateObject.dimensions.height = parseInt(
      formStateObject.dimensions.height,
      10
    );
    const { inScreenGroups } = formStateObject;
    if (inScreenGroups.length > 0) {
      setGroupsToAdd(
        inScreenGroups.map((group) => {
          return idFromUrl(group);
        })
      );
    }
    PostV1Screens({ screenScreenInput: JSON.stringify(formStateObject) });
  }

  return (
    <ScreenForm
      screen={formStateObject}
      headerText={headerText}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      isLoading={false}
      isSaveSuccess={isSaveSuccess || isSaveSuccessGroups}
      isSaving={isSaving || isSavingGroups}
      errors={saveError || saveErrorGroups || false}
    />
  );
}

export default ScreenCreate;
