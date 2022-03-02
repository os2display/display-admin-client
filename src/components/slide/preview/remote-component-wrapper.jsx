import { React, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import RemoteComponent from "./remote-component-helper";
import ErrorBoundary from "../../../error-boundary";
import "./remote-component-wrapper.scss";

/**
 * A remote component wrapper
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {boolean} props.url The url for the remote component.
 * @param {object} props.mediaData Object of loaded media.
 * @param {string} props.orientation Display orientation or horizontal.
 * @param {boolean} props.showPreview Whether to display the prevoew.
 * @param {object} props.style A style object
 * @param {boolean} props.closeButton Display close button on preview
 * @param {Function} props.closeCallback Close button callback on preview
 * @returns {object} The component.
 */
function RemoteComponentWrapper({
  slide,
  url,
  mediaData,
  showPreview,
  orientation,
  style,
  closeButton,
  closeCallback,
}) {
  const { t } = useTranslation("common");
  const [remoteComponentSlide, setRemoteComponentSlide] = useState(null);

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
      {remoteComponentSlide && url && (
        <>
          <div className="d-flex justify-content-between">
            {closeButton && (
              <Button variant="primary" type="button" onClick={closeCallback}>
                {t("remote-component-wrapper.close-preview")}
              </Button>
            )}
          </div>
          <div className="remote-component-wrapper" style={style}>
            <div className={`remote-component-content ${orientation}`}>
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
  orientation: "",
  style: {},
  url: "",
  closeButton: false,
  closeCallback: () => {},
};

RemoteComponentWrapper.propTypes = {
  slide: PropTypes.shape({ content: PropTypes.shape({}).isRequired })
    .isRequired,
  url: PropTypes.string,
  mediaData: PropTypes.objectOf(PropTypes.any).isRequired,
  closeCallback: PropTypes.func,
  showPreview: PropTypes.bool.isRequired,
  closeButton: PropTypes.bool,
  orientation: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
};

export default RemoteComponentWrapper;
