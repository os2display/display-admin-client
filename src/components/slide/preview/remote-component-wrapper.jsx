import { React, useEffect, useState } from "react";
import {
  createRemoteComponent,
  createRequires,
} from "@paciolan/remote-component";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import FormCheckbox from "../../util/forms/form-checkbox";
import { resolve } from "../../../remote-component.config";
import "./remote-component-wrapper.scss";
import ErrorBoundary from "../../../error-boundary";

/**
 * A remote component wrapper
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {boolean} props.url The url for the remote component.
 * @param {object} props.mediaData Object of loaded media.
 * @returns {object} The component.
 */
function RemoteComponentWrapper({ slide, url, mediaData }) {
  const { t } = useTranslation("common");

  const [show, setShow] = useState(false);
  const [remoteComponentSlide, setRemoteComponentSlide] = useState(null);

  // Remote component configuration
  const requires = createRequires(resolve);
  const RemoteComponent = createRemoteComponent({ requires });

  /** Create remoteComponentSlide from slide and mediaData */
  useEffect(() => {
    if (slide) {
      // Local slide and local content, to not accidentally mess with the actual content.
      const newSlide = { ...slide };
      newSlide.mediaData = mediaData;
      setRemoteComponentSlide(newSlide);
    }
  }, [slide, mediaData]);

  /** Get show from local storage */
  useEffect(() => {
    const localStorageShow = localStorage.getItem("preview-slide");
    setShow(localStorageShow === "true");
  }, []);

  /**
   * Changes the show value, and saves to localstorage
   *
   * @param {object} props Props.
   * @param {boolean} props.target The returned value from the checkbox.
   */
  function onChange({ target }) {
    const { value } = target;
    localStorage.setItem("preview-slide", value);
    setShow(value);
  }

  return (
    <>
      <FormCheckbox
        label={t("remote-component-wrapper.show-preview-label")}
        onChange={onChange}
        name="show-preview"
        value={show}
      />
      {show && remoteComponentSlide && (
        <div className="remote-component-wrapper">
          <div className="remote-component-content">
            <ErrorBoundary errorText="remote-component.error-boundary-text">
              <RemoteComponent
                url={url}
                slide={remoteComponentSlide}
                content={remoteComponentSlide.content}
                run={show}
                slideDone={() => {}}
              />
            </ErrorBoundary>
          </div>
        </div>
      )}
    </>
  );
}

RemoteComponentWrapper.propTypes = {
  slide: PropTypes.shape({ content: PropTypes.shape({}).isRequired })
    .isRequired,
  url: PropTypes.string.isRequired,
  mediaData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RemoteComponentWrapper;
