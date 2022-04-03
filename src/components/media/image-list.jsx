import { React } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import selectedHelper from "../util/helpers/selectedHelper";
import useModal from "../../context/modal-context/modal-context-hook";
import ListLoading from "../util/loading-component/list-loading";

/**
 * The image list component.
 *
 * @param {object} props Props.
 * @param {Array} props.media List of media elements
 * @returns {object} The image list page.
 */
function ImageList({ media }) {
  const { selected, setSelected } = useModal();
  // Translations
  const { t } = useTranslation("common");

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
            <button
              type="button"
              className="media-item-button"
              onClick={() => setSelected(selectedHelper(data, [...selected]))}
            >
              <img
                src={data.assets.uri}
                className="card-img-top"
                alt={data.description}
              />
            </button>
            <Form.Check
              type="checkbox"
              checked={selected.find((item) => item.id === data["@id"])}
              tabIndex={-1}
              aria-label={t("media-list.checkbox-form-aria-label")}
              readOnly
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

ImageList.defaultProps = {
  media: [],
};

ImageList.propTypes = {
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
