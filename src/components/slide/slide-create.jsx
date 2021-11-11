import { React, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import set from "lodash.set";
import {
  usePostMediaCollectionMutation,
  usePostV1SlidesMutation,
} from "../../redux/api/api.generated";
import SlideForm from "./slide-form";
import { ulid } from "ulid";
import uniqWith from "lodash.uniqwith";

/**
 * The slide create component.
 *
 * @returns {object} The slide create page.
 */
function SlideCreate() {
  const { t } = useTranslation("common");
  const headerText = t("slide-create.create-slide-header");

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
    { data: savedMediaData, isSuccess: isSaveMediaSuccess },
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
    let themeId = "";
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
    const localFormStateObject = { ...formStateObject };
    set(localFormStateObject.content, target.id, target.value);
    setFormStateObject(localFormStateObject);
  }

  /**
   * Handle change to a media entity.
   *
   * @param entry
   * @param fieldId
   * @param localFormStateObject
   * @param localMediaData
   * @param isArrayEntry
   */
  function handleMediaEntry(entry, fieldId, localFormStateObject, localMediaData, isArrayEntry) {
    // Not uploaded file.
    if (entry.file && entry.file instanceof File) {
      // Create a tempId for the media.
      const tempId = entry.tempId ?? `TEMP--${ulid(new Date().getTime())}`;

      if (isArrayEntry) {
        if (!Array.isArray(localFormStateObject.content[fieldId])) {
          localFormStateObject.content[fieldId] = [];
        }

        set(localFormStateObject.content, fieldId, uniqWith([...localFormStateObject.content[fieldId], tempId]));
      }
      else {
        set(localFormStateObject.content, fieldId, tempId);
      }

      entry.tempId = tempId;
      set(localMediaData, tempId, entry);
    }
    // Previously uploaded file.
    else {
      console.log('Previously uploaded file. @TODO');
    }
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

    // Handle each entry in field.
    if (Array.isArray(fieldValue)) {
      fieldValue.forEach((entry) => {
        handleMediaEntry(entry, fieldId, localFormStateObject, localMediaData, true);
      });
    }
    else {
      handleMediaEntry(fieldValue, fieldId, localFormStateObject, localMediaData, false);
    }

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
              newSubmittingMedia.push({fieldName, entry, tempId: id});
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
        const entry = media.entry;

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
        newFormStateObject.media.push(savedMediaData["@id"]);

        // Replace TEMP-- id with real id.
        const newList = newFormStateObject.content[submittedMedia.fieldName].map((id) => id === submittedMedia.tempId ? savedMediaData["@id"] : id);
        newFormStateObject.content[submittedMedia.fieldName] = newList;
        setFormStateObject(newFormStateObject);

        const newMediaData = { ...mediaData };
        newMediaData[savedMediaData["@id"]] = savedMediaData;
        setMediaData(newMediaData);

        // Save new list.
        setSubmittingMedia(newSubmittingMedia);
      }
    }
  }, [isSaveMediaSuccess]);

  /** Handle submitting is done. */
  useEffect(() => {
    if (isSaveSuccess) {
      setSubmitting(false);
    }
  }, [isSaveSuccess]);

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
          mediaData={mediaData}
          isLoading={false}
          isSaveSuccess={isSaveSuccess}
          isSaving={submitting || isSaving}
          errors={saveError || false}
          selectTheme={selectTheme}
          selectedTheme={selectedTheme}
//          mediaFields={mediaFields}
        />
      )}
    </>
  );
}

export default SlideCreate;
