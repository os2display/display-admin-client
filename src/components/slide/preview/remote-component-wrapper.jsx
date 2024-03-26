import { React, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useRemoteComponent } from "./remote-component-helper";
import ErrorBoundary from "../../../error-boundary";
import "./remote-component-wrapper.scss";
import { api } from "../../../redux/api/api.generated.ts";
import idFromUrl from "../../util/helpers/id-from-url";

/**
 * A remote component wrapper
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {boolean} props.url The url for the remote component.
 * @param {object} props.mediaData Object of loaded media.
 * @param {object} props.themeData Object of theme data.
 * @param {string} props.orientation Display orientation or horizontal.
 * @param {boolean} props.showPreview Whether to display the prevoew.
 * @param {boolean} props.closeButton Display close button on preview
 * @param {Function} props.closeCallback Close button callback on preview
 * @returns {object} The component.
 */
function RemoteComponentWrapper({
  slide,
  url,
  mediaData,
  themeData,
  showPreview,
  orientation,
  closeButton,
  closeCallback,
}) {
  const { t } = useTranslation("common");
  const [remoteComponentSlide, setRemoteComponentSlide] = useState(null);
  const [loading, err, Component] = useRemoteComponent(url);
  const [runId, setRunId] = useState("");
  const dispatch = useDispatch();
  const [loadedLogos, setLoadedLogos] = useState({});

  /** Create remoteComponentSlide from slide and mediaData */
  useEffect(() => {
    if (slide) {
      // Local slide and local content, to not accidentally mess with the actual content.
      const newSlide = { ...slide };

      if (mediaData) {
        newSlide.mediaData = mediaData;

        // Map temp images so they are visible in preview before save
        const mediaDataCopy = { ...mediaData };

        // Find tempid keys
        const keys = Object.keys(mediaDataCopy).filter((key) =>
          key.includes("TEMP")
        );

        // Create "fake" url to file
        keys.forEach((key) => {
          mediaDataCopy[key] = {
            assets: { uri: URL.createObjectURL(mediaDataCopy[key].file) },
          };
        });

        newSlide.mediaData = mediaDataCopy;
      }

      newSlide.themeData = themeData;

      // Load theme logo.
      if (newSlide?.themeData?.logo) {
        if (
          Object.prototype.hasOwnProperty.call(
            loadedLogos,
            newSlide.themeData.logo
          )
        ) {
          newSlide.mediaData[newSlide.themeData.logo] =
            loadedLogos[newSlide.themeData.logo];
        } else {
          const key = newSlide.themeData.logo;

          dispatch(
            api.endpoints.getV1MediaById.initiate({
              id: idFromUrl(newSlide.themeData.logo),
            })
          ).then((resp) => {
            if (resp.isSuccess) {
              const newLoadedLogos = { ...loadedLogos };
              newLoadedLogos[key] = resp.data;
              setLoadedLogos(newLoadedLogos);
            }
          });
        }
      }

      setRemoteComponentSlide(newSlide);
    }
  }, [slide, mediaData, themeData, loadedLogos]);

  useEffect(() => {
    if (showPreview) {
      setRunId(new Date().toISOString());
    }
  }, [showPreview]);

  return (
    <>
      <div className="d-flex justify-content-between">
        {closeButton && (
          <Button
            id="close_preview_button"
            variant="primary"
            type="button"
            onClick={closeCallback}
          >
            {t("remote-component-wrapper.close-preview")}
          </Button>
        )}
      </div>
      <div className="remote-component-wrapper">
        <div
          className={`slide remote-component-content ${orientation}`}
          id="EXE-ID-PREVIEW"
        >
          <ErrorBoundary errorText="remote-component.error-boundary-text">
            {loading && <div />}
            {!loading && err == null && remoteComponentSlide && Component && (
              <Component
                slide={remoteComponentSlide}
                content={remoteComponentSlide.content}
                run={runId}
                slideDone={() => {}}
                executionId="EXE-ID-PREVIEW"
              />
            )}
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}

RemoteComponentWrapper.defaultProps = {
  orientation: "",
  closeButton: false,
  closeCallback: () => {},
  mediaData: null,
  themeData: {},
};

RemoteComponentWrapper.propTypes = {
  slide: PropTypes.shape({ content: PropTypes.shape({}).isRequired })
    .isRequired,
  url: PropTypes.string.isRequired,
  mediaData: PropTypes.shape({
    "@id": PropTypes.string,
  }),
  themeData: PropTypes.shape({
    css: PropTypes.string,
  }),
  closeCallback: PropTypes.func,
  showPreview: PropTypes.bool.isRequired,
  closeButton: PropTypes.bool,
  orientation: PropTypes.string,
};

export default RemoteComponentWrapper;
