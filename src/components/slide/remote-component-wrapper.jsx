import { React, useEffect, useState } from "react";
import {
  createRemoteComponent,
  createRequires,
} from "@paciolan/remote-component";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import FormCheckbox from "../util/forms/form-checkbox";
import { resolve } from "./remote-component.config";
import "./remote-component-wrapper.scss";

/**
 * A remote component wrapper
 *
 * @param {object} props Props.
 * @param {object} props.content The slide content.
 * @param {boolean} props.url The url for the remote component.
 * @param {Array} props.loadedMedia Object of loaded media.
 * @param {object} props.mediaFields The uploaded but not yet saved media fields.
 * @returns {object} The component.
 */
function RemoteComponentWrapper({ content, url, mediaFields, loadedMedia }) {
  // Translations for checkbox label
  const { t } = useTranslation("common");

  // Local slide and local content, to not accidentally mess with the actual content
  const [remoteComponentSlide, setRemoteComponentSlide] = useState();
  const [remoteComponentContent, setRemoteComponentContent] = useState(content);
  const [show, setShow] = useState(
    localStorage.getItem("preview-slide") || false
  );

  // Remote compoent configuration
  const requires = createRequires(resolve);
  const RemoteComponent = createRemoteComponent({ requires });

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

  useEffect(() => {
    // Only do stuff if it is visible.
    if (show) {
      let mediaObject = {};
      // Check if there is loaded media
      setRemoteComponentContent(content);
      // If the loaded media exist both in content and loaded media
      // Then add it to the mediaobject
      if (Object.keys(loadedMedia).length > 0) {
        Object.values(content).forEach((value) => {
          if (loadedMedia[value]) {
            mediaObject = {
              [value]: { assets: loadedMedia[value].assets },
              ...mediaObject,
            };
          }
        });
        setRemoteComponentSlide({
          duration: 10000,
          ...{ mediaData: mediaObject },
        });
      }
      // If a image has just been uploaded, and not yet saved.
      if (mediaFields.length > 0) {
        // loop through content in slide, find images
        // Object.keys(slide.content).forEach(key => {
        Object.keys(content).forEach((value) => {
          if (typeof content[value] === "object" && content[value].length > 0) {
            // create a random string to refer to the not uploaded image by
            const randomString = (Math.random() + 1).toString(36).substring(2);
            mediaObject = {
              [randomString]: { assets: { uri: content[value][0].url } },
              ...mediaObject,
            };
            // Copy
            const remoteComponentContentCopy = JSON.parse(
              JSON.stringify(remoteComponentContent)
            );

            // Use random string
            remoteComponentContentCopy[value] = randomString;
            setRemoteComponentContent(remoteComponentContentCopy);
          }
          setRemoteComponentSlide({
            duration: 10000,
            ...{ mediaData: mediaObject },
          });
        });
      }
    }
  }, [loadedMedia, mediaFields, show]);

  return (
    <>
      <FormCheckbox
        label={t("remote-component-wrapper.show-preview-label")}
        onChange={onChange}
        name="show-preview"
        value={show}
      />
      {show && (
        <div className="remote-component-wrapper">
          <div className="remote-component-content">
            <RemoteComponent
              url={url}
              slide={remoteComponentSlide}
              content={remoteComponentContent}
              run
              slideDone={() => {}}
            />
          </div>
        </div>
      )}
    </>
  );
}

RemoteComponentWrapper.propTypes = {
  content: PropTypes.objectOf(PropTypes.any).isRequired,
  url: PropTypes.string.isRequired,
  mediaFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  loadedMedia: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RemoteComponentWrapper;
