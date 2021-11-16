import { React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import set from "lodash.set";
import { ulid } from "ulid";
import {
  usePostMediaCollectionMutation,
  usePostV1SlidesMutation,
} from "../../redux/api/api.generated";
import SlideForm from "./slide-form";
import {
  displayError,
  displaySuccess,
} from "../util/list/toast-component/display-toast";

/**
 * The slide create component.
 *
 * @returns {object} The slide create page.
 */
function SlideCreate() {
  const { t } = useTranslation("common");
  const headerText = t("slide-create.create-slide-header");
  const [loadingMessage, setLoadingMessage] = useState("");

  // Field names in content that contain media references.
  const [mediaFields, setMediaFields] = useState([]);
  // Media data for each media reference.
  const [mediaData, setMediaData] = useState({});

  // Is in the process of submitting form.
  const [submitting, setSubmitting] = useState(false);
  // Media that should be submitted.
  const [submittingMedia, setSubmittingMedia] = useState([]);

  // The selected template and theme.
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState();

  // Initialize to empty slide object.
  const [formStateObject, setFormStateObject] = useState({
    title: "",
    description: "",
    templateInfo: [],
    duration: null,
    content: {},
    media: [],
    published: { from: null, to: null },
  });

  // Handle for creating slide.
  const [
    PostV1Slides,
    { isLoading: isSaving, error: saveError, isSuccess: isSaveSuccess },
  ] = usePostV1SlidesMutation();

  // @TODO: Handle errors.
  // Handle for creating media.
  const [
    PostV1MediaCollection,
    {
      data: savedMediaData,
      error: saveMediaError,
      isSuccess: isSaveMediaSuccess,
    },
  ] = usePostMediaCollectionMutation();

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
   * Select template.
   *
   * @param {object} props - The props.
   * @param {object} props.target - The target.
   */
  const selectTemplate = ({ target }) => {
    const { value, id: targetId } = target;
    let template = null;

    if (value.length > 0) {
      template = value.shift();
    }

    setSelectedTemplate(template);
    handleInput({
      target: { id: targetId, value: { "@id": template["@id"] } },
    });
  };

  /**
   * Select theme.
   *
   * @param {object} props - The props.
   * @param {object} props.target - The target.
   */
  const selectTheme = ({ target }) => {
    const { value, id: targetId } = target;
    let themeId = null;

    if (value.length > 0) {
      themeId = value[0]["@id"];
    }

    setSelectedTheme(value);

    handleInput({
      target: { id: targetId, value: themeId },
    });
  };

  /**
   * Update content field for id/value.
   *
   * @param {object} props The props.
   * @param {object} props.target The field and value that should be updated.
   */
  function handleContent({ target }) {
    // Convert numbers
    const value =
      target.type === "number" ? target.valueAsNumber : target.value;
    const localFormStateObject = { ...formStateObject };
    set(localFormStateObject.content, target.id, value);
    setFormStateObject(localFormStateObject);
  }

  /**
   * Handle change to a media.
   *
   * @param {string} fieldName The field name.
   */
  function handleMedia({ target }) {
    const fieldValue = target.value;
    const fieldId = target.id;
    const localFormStateObject = { ...formStateObject };
    const localMediaData = { ...mediaData };

    // Set field as a field to look into for new references.
    setMediaFields([...new Set([...mediaFields, fieldId])]);

    const newField = [];

    // Handle each entry in field.
    if (Array.isArray(fieldValue)) {
      fieldValue.forEach((entry) => {
        // New file.
        if (entry.file && entry.file instanceof File) {
          if (!Array.isArray(localFormStateObject.content[fieldId])) {
            localFormStateObject.content[fieldId] = [];
          }

          // Create a tempId for the media.
          const tempId = entry.tempId ?? `TEMP--${ulid(new Date().getTime())}`;
          newField.push(tempId);

          const newEntry = { ...entry };
          newEntry.tempId = tempId;
          set(localMediaData, tempId, newEntry);
        }
        // Previously uploaded file.
        else {
          newField.push(entry["@id"]);
        }
      });
    }

    set(localFormStateObject.content, fieldId, newField);

    setFormStateObject(localFormStateObject);
    setMediaData(localMediaData);
  }

  /** Handles submit. */
  function handleSubmit() {
    const newSubmittingMedia = [];
    // Setup submittingMedia list.
    mediaFields.forEach((fieldName) => {
      if (
        Object.prototype.hasOwnProperty.call(formStateObject.content, fieldName)
      ) {
        const fieldData = formStateObject.content[fieldName];

        if (Array.isArray(fieldData)) {
          fieldData.forEach((id) => {
            const entry = mediaData[id];

            if (entry.file && entry.file instanceof File) {
              newSubmittingMedia.push({ fieldName, entry, tempId: id });
            }
          });
        }
      }
    });

    // Trigger submitting hooks.
    setSubmitting(true);
    setSubmittingMedia(newSubmittingMedia);
  }

  /** Handle submitting. */
  useEffect(() => {
    if (submitting) {
      if (submittingMedia.length > 0) {
        const media = submittingMedia[0];

        setLoadingMessage(
          t("slide-create.loading-messages.saving-media", {
            title: media.get("title") || t("slide-create.unamed-media"),
          })
        );

        const { entry } = media;

        // Submit media.
        const formData = new FormData();
        formData.append("file", entry.file);
        formData.append("title", entry.title);
        formData.append("description", entry.description);
        formData.append("license", entry.license);
        // @TODO: Should these be optional in the API?
        formData.append("modifiedBy", "");
        formData.append("createdBy", "");

        PostV1MediaCollection({ body: formData });
      } else {
        // All media have been submitted. Submit slide.

        // Set published.
        const from = formStateObject.published.from
          ? new Date(formStateObject.published.from).toISOString()
          : null;
        const to = formStateObject.published.to
          ? new Date(formStateObject.published.to).toISOString()
          : null;

        // Construct data for submitting.
        const saveData = {
          slideSlideInput: JSON.stringify({
            title: formStateObject.title,
            theme: formStateObject.theme,
            description: formStateObject.description,
            templateInfo: formStateObject.templateInfo,
            duration: formStateObject?.content?.duration
              ? parseInt(formStateObject.content.duration, 10)
              : null,
            content: formStateObject.content,
            media: formStateObject.media,
            published: {
              from,
              to,
            },
          }),
        };

        PostV1Slides(saveData);
      }
    }
  }, [submittingMedia.length, submitting]);

  /** Submitted media is successful. */
  useEffect(() => {
    if (submitting) {
      if (isSaveMediaSuccess) {
        const newSubmittingMedia = [...submittingMedia];
        const submittedMedia = newSubmittingMedia.shift();

        const newFormStateObject = { ...formStateObject };
        newFormStateObject.media.push(mediaData["@id"]);
        newFormStateObject.content[firstMediaField] = mediaData["@id"];

        // Display toast with success message
        displaySuccess(
          t("slide-create.success-messages.saved-media", {
            title: mediaData.title || t("slide-create.unamed"),
          })
        );

        newFormStateObject.media.push(savedMediaData["@id"]);

        // Replace TEMP-- id with real id.
        newFormStateObject.content[submittedMedia.fieldName] =
          newFormStateObject.content[submittedMedia.fieldName].map((mediaId) =>
            mediaId === submittedMedia.tempId ? savedMediaData["@id"] : mediaId
          );
        setFormStateObject(newFormStateObject);

        const newMediaData = { ...mediaData };
        newMediaData[savedMediaData["@id"]] = savedMediaData;
        setMediaData(newMediaData);

        // Move to next media to upload.
        const newList = submittingMedia.slice(1);
        setSubmittingMedia(newList);
      } else if (saveMediaError) {
        // If save media has error, display toast and set submitting false
        setSubmitting(false);
        displayError(
          t("slide-create.error-messages.save-media-error", {
            title: submittingMedia[0].get("title") || t("slide-create.unamed"),
            error: saveMediaError.data["hydra:description"],
          })
        );
        // Save new list.
        setSubmittingMedia(newSubmittingMedia);
      }
    }
  }, [isSaveMediaSuccess, saveMediaError]);

  /** If the slide is saved, display the success message */
  useEffect(() => {
    if (isSaveSuccess) {
      setSubmitting(false);
      displaySuccess(t("slide-create.success-messages.saved-slide"));
    }
  }, [isSaveSuccess]);

  /** If the slide is saved with error, display the error message */
  useEffect(() => {
    if (saveError) {
      displayError(
        t("slide-create.error-messages.save-slide-error", {
          error: saveError.data
            ? saveError.data["hydra:description"]
            : saveError.error,
        })
      );
      setSubmitting(false);
    }
  }, [saveError]);

  return (
    <>
      {formStateObject && (
        <SlideForm
          slide={formStateObject}
          headerText={`${headerText}: ${formStateObject?.title}`}
          handleInput={handleInput}
          handleContent={handleContent}
          handleMedia={handleMedia}
          handleSubmit={handleSubmit}
          selectTemplate={selectTemplate}
          selectedTemplate={selectedTemplate}
          isLoading={submitting || isSaving}
          mediaData={mediaData}
          loadingMessage={loadingMessage}
          selectTheme={selectTheme}
          selectedTheme={selectedTheme}
          mediaFields={mediaFields}
        />
      )}
    </>
  );
}

export default SlideCreate;
