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
  displayError,
  displaySuccess,
} from "../util/list/toast-component/display-toast";
import EventDatabaseFeedType from "./templates/event-database-feed-type.jsx";
import NotifiedFeedType from "./templates/notified-feed-type.jsx";
import CalendarFeedType from "./templates/calendar-feed-type.jsx";

/**
 * The theme manager component.
 *
 * @param {object} props The props.
 * @param {object} props.initialState Initial theme state.
 * @param {string} props.saveMethod POST or PUT.
 * @param {string | null} props.id Theme id.
 * @param {boolean} props.isLoading Is the theme state loading
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
      title: t("dynamic-fields.event-database-api-feed-type.title"),
      key: "1",
      secretsDefault: {
        "host": ""
      },
      template: <EventDatabaseFeedType mode={saveMethod} />,
    },
    {
      value: "App\\Feed\\NotifiedFeedType",
      title: t("dynamic-fields.notified-feed-type.title"),
      key: "2",
      secretsDefault: {
        "token": "",
      },
      template: <NotifiedFeedType mode={saveMethod} />,
    },
    {
      value: "App\\Feed\\CalendarApiFeedType",
      title: t("dynamic-fields.calendar-api-feed-type.title"),
      key: "3",
      secretsDefault: {
        "resources": []
      },
      template: <CalendarFeedType mode={saveMethod} />,
    },
    {
      value: "App\\Feed\\RssFeedType",
      title: t("dynamic-fields.rss-feed-type.title"),
      key: "4",
      secretsDefault: {},
      template: null,
    },
  ];

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

  /** Set loaded data into form state. */
  useEffect(() => {
    setFormStateObject({ ...initialState });
  }, [initialState]);

  const onFeedTypeChange = () => {
    const option = feedSourceTypeOptions.find((opt) => opt.value === formStateObject.feedType);
    const newFormStateObject = {...formStateObject};
    newFormStateObject.secrets = {...option.secretsDefault};
    setFormStateObject(newFormStateObject);
  }

  useEffect(() => {
    if (formStateObject?.feedType) {
      if (option && option.template) {
        setDynamicFormElement(
          cloneElement(option.template, {
            handleInput,
            formStateObject,
          })
        );
      } else {
        setDynamicFormElement(null);
      }
    }
  }, [formStateObject?.feedType]);

  /** Save feed source. */
  function saveFeedSource() {
    setLoadingMessage(t("loading-messages.saving-feed-source"));
    if (saveMethod === "POST") {
      postV2FeedSources({
        feedSourceFeedSourceInput: JSON.stringify(formStateObject),
      });
    } else if (saveMethod === "PUT") {
      PutV2FeedSourcesById({
        feedSourceFeedSourceInput: JSON.stringify(formStateObject),
        id,
      });
    }
  }

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
          onFeedTypeChange={}
          dynamicFormElement={dynamicFormElement}
          mode={saveMethod}
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
  mode: PropTypes.string,
};

export default FeedSourceManager;
