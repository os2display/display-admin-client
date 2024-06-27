import { React } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import selectedHelper from "../util/helpers/selected-helper";
import useModal from "../../context/modal-context/modal-context-hook";
import ListLoading from "../util/loading-component/list-loading";

/**
 * The image list component.
 *
 * @param {object} props Props.
 * @param {Array} props.media List of media elements
 * @param {boolean} props.multiple Whether the image list allows for multiselect
 * @returns {object} The image list page.
 */
function ImageList({ media = [], multiple }) {
  const { selected, setSelected } = useModal();

  /**
   * Select image function
   *
   * @param {Array} data - The image/images.
   */
  function selectImage(data) {
    const selectedImages = selectedHelper(data, [...selected]);
    if (multiple) {
      setSelected(selectedImages);
    } else {
      setSelected([selectedImages[0]]);
    }
  }

  // Translations
  const { t } = useTranslation("common", { keyPrefix: "media-list" });

  return (
    <div className="row row-cols-2 row-cols-sm-3 row-cols-xl-4 row-cols-xxl-5 media-list">
      {media.map((data) => (
        <div key={data["@id"]} className="col mb-3">
          <div
            className={`card bg-light h-100 media-item +
                  ${
                    selected.find((item) => item.id === data["@id"])
                      ? " selected"
                      : ""
                  }`}
          >
            <img
              src={data.thumbnail ?? data.assets.uri}
              className="card-img-top"
              alt={data.description}
            />
            <Form.Check
              type="checkbox"
              onClick={() => selectImage(data)}
              checked={selected.find((item) => item.id === data["@id"])}
              aria-label={t("checkbox-form-aria-label", { this: data.title })}
            />
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-auto">
                  <h2 className="h6">{data.name}</h2>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <span className="small">{data.description}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

ImageList.propTypes = {
  multiple: PropTypes.bool.isRequired,
  media: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      selected: PropTypes.bool,
      "@id": PropTypes.string,
      description: PropTypes.string,
      assets: PropTypes.shape({ uri: PropTypes.string }),
    })
  ),
};

export default ListLoading(ImageList);
