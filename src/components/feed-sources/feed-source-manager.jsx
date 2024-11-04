import { cloneElement, React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import FeedSourceForm from "./feed-source-form";
import {
  usePostV2FeedSourcesMutation,
  usePutV2FeedSourcesByIdMutation,
} from "../../redux/api/api.generated.ts";
import {
  displaySuccess,
  displayError,
} from "../util/list/toast-component/display-toast";
import EventDatabaseApiFeedTypeTemplate from "./feed-source-type-templates/EventDatabaseApiFeedType.template";
import NotifiedFeedTypeTemplate from "./feed-source-type-templates/NotifiedFeedType.template";
import SparkleIOFeedTypeTemplate from "./feed-source-type-templates/SparkleIOFeedType.template";
import CalendarFeedTypeTemplate from "./feed-source-type-templates/CalendarFeedType.template";

/**
 * The theme manager component.
 *
 * @param {object} props The props.
 * @param {object} props.initialState Initial theme state.
 * @param {string} props.saveMethod POST or PUT.
 * @param {string | null} props.id Theme id.
 * @param {boolean} props.isLoading Is the theme state loading?
 * @param {object} props.loadingError Loading error.
 * @returns {object} The theme form.
 */
function FeedSourceManager({
  saveMethod,
  id = null,
  isLoading = false,
  loadingError = null,
  initialState = null,
}) {
  // Hooks
  const { t } = useTranslation("common", {
    keyPrefix: "feed-source-manager",
  });
  const navigate = useNavigate();

  // State
  const [headerText] = useState(
    saveMethod === "PUT" ? t("edit-feed-source") : t("create-new-feed-source")
  );

  const [loadingMessage, setLoadingMessage] = useState(
    t("loading-messages.loading-feed-source")
  );

  const [dynamicFormElement, setDynamicFormElement] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [formStateObject, setFormStateObject] = useState();

  const [
    postV2FeedSources,
    { error: saveErrorPost, isSuccess: isSaveSuccessPost },
  ] = usePostV2FeedSourcesMutation();

  const [
    PutV2FeedSourcesById,
    { error: saveErrorPut, isSuccess: isSaveSuccessPut },
  ] = usePutV2FeedSourcesByIdMutation();

  const feedSourceTypeOptions = [
    {
      value: "App\\Feed\\EventDatabaseApiFeedType",
      title: "Eventdatabase feed",
      key: "1",
      template: <EventDatabaseApiFeedTypeTemplate />,
    },
    {
      value: "App\\Feed\\NotifiedFeedType",
      title: "Notified feed",
      key: "2",
      template: <NotifiedFeedTypeTemplate />,
    },
    {
      value: "App\\Feed\\CalendarApiFeedType",
      title: "Kalender feed",
      key: "3",
      template: <CalendarFeedTypeTemplate />,
    },
    {
      value: "App\\Feed\\SparkeIOFeedType",
      title: "Instagram feed",
      key: "4",
      template: <SparkleIOFeedTypeTemplate />,
    },
    {
      value: "App\\Feed\\RssFeedType",
      title: "RSS feed",
      key: "5",
      template: null,
    },
  ];

  /** Set loaded data into form state. */
  useEffect(() => {
    setFormStateObject(initialState);
  }, [initialState]);

  /** Save feed source. */
  function saveFeedSource() {
    setLoadingMessage(t("loading-messages.saving-feed-source"));
    const saveData = {
      title: formStateObject.title,
      description: formStateObject.description,
      feedType: formStateObject.feedType,
      supportedFeedOutputType: formStateObject.supportedFeedOutputType,
    };
    if (saveMethod === "POST") {
      postV2FeedSources({
        feedSourceFeedSourceInput: JSON.stringify(saveData),
      });
    } else if (saveMethod === "PUT") {
      PutV2FeedSourcesById({
        feedSourceFeedSourceInput: JSON.stringify(saveData),
        id,
      });
    }
  }

  /**
   * Set state on change in input field
   *
   * @param {object} props - The props.
   * @param {object} props.target - Event target.
   */
  const handleInput = ({ target }) => {
    const localFormStateObject = { ...formStateObject };
    localFormStateObject[target.id] = target.value;
    setFormStateObject(localFormStateObject);
  };


  useEffect(() => {
    if (formStateObject) {
      const option = feedSourceTypeOptions.find(
        (opt) => opt.value === formStateObject.feedType
      );
      if (option && option.template) {
        setDynamicFormElement(
          cloneElement(option.template, {
            handleInput,
            formStateObject,
            t,
          })
        );
      } else {
        setDynamicFormElement(null);
      }
    }
  }, [formStateObject ? formStateObject : null]);

  /** If the feed source is not loaded, display the error message */
  useEffect(() => {
    if (loadingError) {
      displayError(
        t("error-messages.load-feed-source-error", { id }),
        loadingError
      );
    }
  }, [loadingError]);

  /** When the media is saved, the theme will be saved. */
  useEffect(() => {
    if (isSaveSuccessPost || isSaveSuccessPut) {
      setSubmitting(false);
      displaySuccess(t("success-messages.saved-feed-source"));
      navigate("/feed-sources/list");
    }
  }, [isSaveSuccessPut, isSaveSuccessPost]);

  /** Handles submit. */
  const handleSubmit = () => {
    setSubmitting(true);
    saveFeedSource();
  };

  /** If the theme is saved with error, display the error message */
  useEffect(() => {
    if (saveErrorPut || saveErrorPost) {
      const saveError = saveErrorPut || saveErrorPost;
      setSubmitting(false);
      displayError(t("error-messages.save-feed-source-error"), saveError);
    }
  }, [saveErrorPut, saveErrorPost]);

  return (
    <>
      {formStateObject && (
        <FeedSourceForm
          feedSource={formStateObject}
          headerText={`${headerText}: ${formStateObject?.title}`}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading || submitting}
          loadingMessage={loadingMessage}
          feedSourceTypeOptions={feedSourceTypeOptions}
          dynamicFormElement={dynamicFormElement}
        />
      )}
    </>
  );
}

FeedSourceManager.propTypes = {
  initialState: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    feedType: PropTypes.string,
    feedSourceType: PropTypes.string,
    host: PropTypes.string,
    token: PropTypes.string,
    baseUrl: PropTypes.string,
    clientId: PropTypes.string,
    clientSecret: PropTypes.string,
    feedSources: PropTypes.string,
  }),
  saveMethod: PropTypes.string.isRequired,
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  loadingError: PropTypes.shape({
    data: PropTypes.shape({
      status: PropTypes.number,
    }),
  }),
};

export default FeedSourceManager;
