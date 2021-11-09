import { React, useEffect, useState } from "react";
import {
  createRemoteComponent,
  createRequires,
} from "@paciolan/remote-component";
import PropTypes from "prop-types";
import FormCheckbox from "../util/forms/form-checkbox";
import { resolve } from "./remote-component.config";
import { useTranslation } from "react-i18next";
import "./remote-component-wrapper.scss";

/**
 * A remote component wrapper
 *
 * @param {object} props Props.
 * @param {object} props.slide The slide.
 * @param {object} props.content The slide content.
 * @param {boolean} props.url The url for the remote component.
 * @param {Array} props.loadedMedia Object of loaded media.
 * @param {object} props.mediaFields The uploaded but not yet saved media fields.
 * @returns {object} The component.
 */
function RemoteComponentWrapper({
  slide,
  content,
  url,
  mediaFields,
  loadedMedia,
}) {
  const { t } = useTranslation("common");
  const [remoteComponentSlide, setRemoteComponentSlide] = useState();
  const [remoteComponentContent, setRemoteComponentContent] = useState(content);
  const [show, setShow] = useState(false);
  const requires = createRequires(resolve);
  const RemoteComponent = createRemoteComponent({ requires });
  /**
   * @param {object} props Props.
   * @param {boolean} props.target The returned value from the checkbox.
   */
  function onChange({ target }) {
    const { value } = target;
    setShow(value);
  }

  // useEffect(() => {
  //   console.log(content)
  //   setRemoteComponentContent(content);
  // }, [JSON.stringify(content)]);

  // useEffect(() => {
  //   console.log(content)
  //   setRemoteComponentContent(content);
  // }, [content]);


  useEffect(() => {
    let mediaObject = {};

    // Check if there is loaded media
    if (Object.keys(loadedMedia).length > 0) {
      for (const [value, key] of Object.entries(slide.content)) {
        // If the loaded media exist both in content and loaded media
        // Then add it to the mediaobject
        if (loadedMedia[key]) {
          mediaObject = {
            [key]: { assets: loadedMedia[key].assets },
            ...mediaObject,
          };
        }
      }
      setRemoteComponentSlide({
        duration: 10000,
        ...{ mediaData: mediaObject },
      });
    }
    // If a image has just been uploaded, and not yet saved.
    if (mediaFields.length > 0) {
      // loop through content in slide, find images
      for (const [value, key] of Object.entries(slide.content)) {
        if (typeof key === "object" && slide.content[value].length > 0) {
          // create a random string to refer to the not uploaded image by
          const randomString = (Math.random() + 1).toString(36).substring(2);
          mediaObject = {
            [randomString]: { assets: { uri: slide.content[value][0].url } },
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
      }
    }
  }, [loadedMedia, mediaFields]);

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
  slide: PropTypes.shape({
    duration: PropTypes.number.isRequired,
    mediaData: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  content: PropTypes.objectOf(PropTypes.any).isRequired,
  url: PropTypes.string.isRequired,
  mediaFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  loadedMedia: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default RemoteComponentWrapper;
