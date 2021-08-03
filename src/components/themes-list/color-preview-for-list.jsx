import { React } from "react";
import PropTypes from "prop-types";
import "./color-previewer.scss";

/**
 * A link for the list
 *
 * @param {object} props
 * Props.
 * @param {object} props.data
 * Data data object with colors.ejs
 * @returns {object}
 * A link for the list.
 */
function ColorPreviewForList({ data }) {
  return (
    <div className="d-flex flex-column">
      {data.colors.primary && (
        <div
          className="preview"
          style={{ backgroundColor: `${data.colors.primary}` }}
        >
          {data.colors.primary}
        </div>
      )}
      {data.colors.secondary && (
        <div
          className="preview"
          style={{ backgroundColor: `${data.colors.secondary}` }}
        >
          {data.colors.secondary}
        </div>
      )}
      {data.colors.tertiary && (
        <div
          className="preview"
          style={{ backgroundColor: `${data.colors.tertiary}` }}
        >
          {data.colors.tertiary}
        </div>
      )}
    </div>
  );
}

ColorPreviewForList.propTypes = {
  data: PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
    .isRequired,
};

export default ColorPreviewForList;
