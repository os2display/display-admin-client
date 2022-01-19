import { React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import set from "lodash.set";
import { ulid } from "ulid";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import {
  api,
  usePostMediaCollectionMutation,
  usePostV1SlidesMutation,
  usePutV1SlidesByIdMutation,
} from "../../redux/api/api.generated";
import SlideForm from "./slide-form";
import {
  displaySuccess,
  displayError,
} from "../util/list/toast-component/display-toast";
import idFromUrl from "../util/helpers/id-from-url";

/**
 * The slide manager component.
 *
 * @param {object} props The props.
 * @param {object} props.initialState Initial slide state.
 * @param {string} props.saveMethod POST or PUT.
 * @param {string | null} props.id Slide id.
 * @param {boolean} props.isLoading Is the slide state loading?
 * @param {object} props.loadingError Loading error.
 * @returns {object} The slide form.
 */
function SlideManager({
  initialState,
  saveMethod,
  id,
  isLoading,
  loadingError,
}) {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const history = useHistory();
  const headerText =
    saveMethod === "PUT"
      ? t("slide-manager.edit-slide-header")
      : t("slide-manager.create-slide-header");
  const [getTheme, setGetTheme] = useState(true);
  const [getTemplate, setGetTemplate] = useState(true);
  const [mediaFields, setMediaFields] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submittingMedia, setSubmittingMedia] = useState([]);
  const [mediaData, setMediaData] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState();
  const [loadingMessage, setLoadingMessage] = useState(
    t("slide-manager.loading-messages.loading-slide")
  );

  // Initialize to empty slide object.
  const [formStateObject, setFormStateObject] = useState(null);

  const [PutV1Slides, { error: saveErrorPut, isSuccess: isSaveSuccessPut }] =
    usePutV1SlidesByIdMutation();

  // Handler for creating slide.
  const [
    PostV1Slides,
    { data: postData, error: saveErrorPost, isSuccess: isSaveSuccessPost },
  ] = usePostV1SlidesMutation();

  // @TODO: Handle errors.
  const [
    PostV1MediaCollection,
    {
      data: savedMediaData,
      isSuccess: isSaveMediaSuccess,
      error: saveMediaError,
    },
  ] = usePostMediaCollectionMutation();

  // Slides are saved successfully, display a message
  useEffect(() => {
    if (isSaveMediaSuccess) {
      displaySuccess(t("slide-manager.success-messages.saved-media"));
    }
  }, [isSaveMediaSuccess]);

  // Slides are not saved successfully, display a message
  useEffect(() => {
    if (saveMediaError) {
      setSubmitting(false);
      displayError(
        t("slide-manager.error-messages.save-media-error", {
          error: saveMediaError.error
            ? saveMediaError.error
            : saveMediaError.data["hydra:description"],
        })
      );
    }
  }, [saveMediaError]);

  /** If the slide is saved, display the success message */
  useEffect(() => {
    if (isSaveSuccessPost || isSaveSuccessPut) {
      displaySuccess(t("slide-manager.success-messages.saved-slide"));
    }
  }, [isSaveSuccessPost || isSaveSuccessPut]);

  /** If the slide is saved with error, display the error message */
  useEffect(() => {
    if (saveErrorPut || saveErrorPost) {
      const saveError = saveErrorPut || saveErrorPost;
      displayError(
        t("slide-manager.error-messages.save-slide-error", {
          error: saveError.error
            ? saveError.error
            : saveError.data["hydra:description"],
        })
      );
    }
  }, [saveErrorPut, saveErrorPost]);

  /** If the slide is not loaded, display the error message */
  useEffect(() => {
    if (loadingError) {
      displayError(
        t("slide-manager.error-messages.load-slide-error", {
          error: loadingError.error
            ? loadingError.error
            : loadingError.data["hydra:description"],
          id,
        })
      );
    }
  }, [loadingError]);

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
   * @param {object} props - The props.
   * @param {object} props.target - The target.
   */
  function handleContent({ target }) {
    // Convert numbers
    const value =
      target.type === "number" ? target.valueAsNumber : target.value;
    const localFormStateObject = { ...formStateObject };
    set(localFormStateObject.content, target.id, value);
    setFormStateObject(localFormStateObject);
  }

  useEffect(() => {
    // Load template if set, getTemplate because if not, it runs on every time formstateobject is changed
    if (
      formStateObject?.templateInfo &&
      Object.prototype.hasOwnProperty.call(
        formStateObject.templateInfo,
        "@id"
      ) &&
      getTemplate
    ) {
      dispatch(
        api.endpoints.getV1TemplatesById.initiate({
          id: idFromUrl(formStateObject.templateInfo["@id"]),
        })
      )
        .then((result) => {
          const template = result.data;
          setGetTemplate(false);
          setSelectedTemplate(template);
        })
        .catch(() => {
          // @TODO: Handle error.
        });
    }

    // Load theme if set, getTheme because if not, it runs on every time formstateobject is changed
    if (formStateObject?.theme && getTheme) {
      dispatch(
        api.endpoints.getV1ThemesById.initiate({
          id: idFromUrl(formStateObject.theme),
        })
      )
        .then((result) => {
          const theme = result.data;
          setGetTheme(false);
          setSelectedTheme([theme]);
        })
        .catch(() => {
          // @TODO: Handle error.
        });
    }
  }, [formStateObject]);

  /** Set loaded data into form state. */
  useEffect(() => {
    if (initialState) {
      const localFormStateObject = JSON.parse(JSON.stringify(initialState));

      if (initialState?.feed && initialState?.feed["@id"]) {
        dispatch(
          api.endpoints.getV1FeedsByIdData.initiate({
            id: idFromUrl(initialState.feed["@id"]),
          })
        ).then((response) => {
          setFormStateObject({
            ...localFormStateObject,
            feedData: response.data,
          });
        });
      }

      // Make sure content is an object.
      if (localFormStateObject.content instanceof Array) {
        localFormStateObject.content = {};
      }

      // Upload media already added to the slide.
      const promises = [];

      localFormStateObject.media.forEach((media) => {
        promises.push(
          dispatch(
            api.endpoints.getV1MediaById.initiate({ id: idFromUrl(media) })
          )
        );
      });

      Promise.all(promises).then((results) => {
        const newMediaData = { ...mediaData };

        results.forEach((result) => {
          newMediaData[result.data["@id"]] = { ...result.data };
        });

        setMediaData(newMediaData);
      });

      // Set published to format accepted by bootstrap date component
      if (localFormStateObject.published.from) {
        localFormStateObject.published.from = dayjs(
          localFormStateObject.published.from
        ).format("YYYY-MM-DDTHH:mm");
      }
      if (localFormStateObject.published.to) {
        localFormStateObject.published.to = dayjs(
          localFormStateObject.published.to
        ).format("YYYY-MM-DDTHH:mm");
      }

      setFormStateObject(localFormStateObject);
    }
  }, [initialState]);

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
          // It is an already added temp file.
          if (entry.tempId) {
            newField.push(entry.tempId);
            set(localMediaData, entry.tempId, entry);
          }
          // It is a new temp file.
          else {
            if (!Array.isArray(localFormStateObject.content[fieldId])) {
              localFormStateObject.content[fieldId] = [];
            }

            // Create a tempId for the media.
            const tempId =
              entry.tempId ?? `TEMP--${ulid(new Date().getTime())}`;

            newField.push(tempId);

            const newEntry = { ...entry };
            newEntry.tempId = tempId;
            set(localMediaData, tempId, newEntry);
          }
        }
        // Previously selected file.
        else if (typeof entry === "string") {
          newField.push(entry);
        }
        // Previously uploaded file.
        else {
          newField.push(entry["@id"]);

          if (
            !Object.prototype.hasOwnProperty.call(localMediaData, entry["@id"])
          ) {
            set(localMediaData, entry["@id"], entry);

            localFormStateObject.media.push(entry["@id"]);
          }
        }
      });
    }

    set(localFormStateObject.content, fieldId, newField);
    set(localFormStateObject, "media", [
      ...new Set([...localFormStateObject.media]),
    ]);

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
          fieldData.forEach((mediaId) => {
            const entry = mediaData[mediaId];

            if (entry.file && entry.file instanceof File) {
              newSubmittingMedia.push({ fieldName, entry, tempId: mediaId });
            }
          });
        }
      }
    });

    // Trigger submitting hooks.
    setSubmitting(true);
    setSubmittingMedia(newSubmittingMedia);
    setLoadingMessage(t("slide-manager.loading-messages.saving-media"));
  }

  /** Handle submitting. */
  useEffect(() => {
    if (submitting) {
      if (submittingMedia.length > 0) {
        const media = submittingMedia[0];
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

        // Sets theme in localstorage, to load it on create new slide
        if (formStateObject.theme) {
          localStorage.setItem("prev-used-theme-id", formStateObject.theme);
        }

        // Construct data for submitting.
        const saveData = {
          slideSlideInput: JSON.stringify({
            title: formStateObject.title,
            theme: formStateObject.theme ?? "",
            description: formStateObject.description,
            templateInfo: formStateObject.templateInfo,
            duration: formStateObject?.content?.duration
              ? parseInt(formStateObject.content.duration, 10) * 1000
              : null,
            content: formStateObject.content,
            media: formStateObject.media,
            feed: formStateObject.feed,
            published: {
              from,
              to,
            },
          }),
        };

        if (saveMethod === "POST") {
          setLoadingMessage(t("slide-manager.loading-messages.saving-slide"));
          PostV1Slides(saveData);
        } else if (saveMethod === "PUT") {
          setLoadingMessage(t("slide-manager.loading-messages.saving-slide"));
          const putData = { ...saveData, id };

          PutV1Slides(putData);
        } else {
          throw new Error("Unsupported save method");
        }
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
        newFormStateObject.content[submittedMedia.fieldName] =
          newFormStateObject.content[submittedMedia.fieldName].map((mediaId) =>
            mediaId === submittedMedia.tempId ? savedMediaData["@id"] : mediaId
          );
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
    if (isSaveSuccessPost && postData) {
      setSubmitting(false);
      history.push(`/slide/edit/${idFromUrl(postData["@id"])}`);
    } else if (isSaveSuccessPut) {
      setSubmitting(false);
    }
  }, [isSaveSuccessPut, isSaveSuccessPost, postData]);

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
          isLoading={submitting || isLoading}
          loadingMessage={loadingMessage}
          selectTheme={selectTheme}
          selectedTheme={selectedTheme}
        />
      )}
    </>
  );
}

SlideManager.defaultProps = {
  id: null,
  isLoading: false,
  loadingError: null,
  initialState: null,
};

SlideManager.propTypes = {
  initialState: PropTypes.shape({
    feed: PropTypes.shape({
      "@id": PropTypes.string,
    }),
  }),
  saveMethod: PropTypes.string.isRequired,
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  loadingError: PropTypes.shape(PropTypes.any),
};

export default SlideManager;
