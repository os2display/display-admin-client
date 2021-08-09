import { React } from "react";
import PropTypes from "prop-types";

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
  const { primary, secondary, tertiary, fontColor } = data.colors;
  return (
    <div className="d-flex flex-column">
      {primary && (
        <div style={{ backgroundColor: `${primary}` }}>{primary}</div>
      )}
      {secondary && (
        <div style={{ backgroundColor: `${secondary}` }}>{secondary}</div>
      )}
      {tertiary && (
        <div style={{ backgroundColor: `${tertiary}` }}>{tertiary}</div>
      )}
      {fontColor && (
        <div style={{ backgroundColor: `${fontColor}` }}>{fontColor}</div>
      )}
    </div>
  );
}

ColorPreviewForList.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    colors: PropTypes.shape({
      primary: PropTypes.string,
      secondary: PropTypes.string,
      tertiary: PropTypes.string,
      fontColor: PropTypes.string,
    }),
  }).isRequired,
};

export default ColorPreviewForList;
