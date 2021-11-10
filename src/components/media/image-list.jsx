import { React } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import WithLoading from "../util/loading-component/with-loading";
/**
 * The image list component.
 *
 * @param {object} props Props.
 * @param {Array} props.media List of media elements
 * @param {Function} props.handleChecked The callback for checking the checkbox
 * @returns {object} The image list page.
 */
function ImageList({ media, handleChecked }) {
  // Translations
  const { t } = useTranslation("common");

  return (
    <div className="row row-cols-2 row-cols-sm-3 row-cols-xl-4 row-cols-xxl-5 media-list">
      {media.map((data) => (
        <div key={data["@id"]} className="col mb-3">
          <div
            className={`card bg-light h-100 media-item +
                  ${data.selected ? " selected" : ""}`}
          >
            <button
              type="button"
              className="media-item-button"
              onClick={() => handleChecked(data)}
            >
              <img
                src={data.assets.uri}
                className="card-img-top"
                alt={data.description}
              />
            </button>
            <Form.Check
              type="checkbox"
              checked={data.selected}
              tabIndex={-1}
              aria-label={t("media-list.checkbox-form-aria-label")}
              readOnly
            />

            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-auto">
                  <h2 className="h6">{data.name}</h2>
                </div>
                {/* @TODO: readd if the api supports putting media */}
                {/* <div className="col-auto ms-auto">
                        <Link
                          className="btn btn-primary btn-sm"
                          to={`/media/edit/${idFromUrl(data["@id"])}`}
                        >
                          {t("media-list.edit-button")}
                        </Link>
                      </div> */}
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
  handleChecked: PropTypes.func.isRequired,
};

export default WithLoading(ImageList);
