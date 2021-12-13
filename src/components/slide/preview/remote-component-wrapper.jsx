import { React, useEffect, useState } from "react";
import {
  createRemoteComponent,
  createRequires,
} from "@paciolan/remote-component";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { resolve } from "../../../remote-component.config";
import ErrorBoundary from "../../../error-boundary";
import "./remote-component-wrapper.scss";

/**
 * A remote component wrapper
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {boolean} props.url The url for the remote component.
 * @param {object} props.mediaData Object of loaded media.
 * @param {string} props.orientation display orientation or horizontal.
 * @param {boolean} props.displayHeader Whether to display the header.
 * @returns {object} The component.
 */
function RemoteComponentWrapper({
  slide,
  url,
  mediaData,
  showPreview,
  orientation,
  displayHeader,
}) {
  const { t } = useTranslation("common");
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

  return (
    <>
      {remoteComponentSlide && (
        <>
          {displayHeader && (
            <h2 className="h1">
              {t("remote-component-wrapper.header-preview")}
            </h2>
          )}
          <div className="remote-component-wrapper">
            <div
              className={`remote-component-content ${orientation}`}
            >
              <ErrorBoundary errorText="remote-component.error-boundary-text">
                <RemoteComponent
                  url={url}
                  slide={remoteComponentSlide}
                  content={remoteComponentSlide.content}
                  run={showPreview}
                  slideDone={() => {}}
                />
              </ErrorBoundary>
            </div>
          </div>
        </>
      )}
    </>
  );
}

RemoteComponentWrapper.defaultProps = {
  displayHeader: true,
  orientation: ""
};

RemoteComponentWrapper.propTypes = {
  slide: PropTypes.shape({ content: PropTypes.shape({}).isRequired })
    .isRequired,
  url: PropTypes.string.isRequired,
  mediaData: PropTypes.objectOf(PropTypes.any).isRequired,
  displayHeader: PropTypes.bool,
};

export default RemoteComponentWrapper;
