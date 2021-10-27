import { React } from "react";
import PropTypes from "prop-types";

/**
 * A link for the list
 *
 * @param {object} props Props.
 * @param {object} props.data Data data object with colors.ejs
 * @returns {object} A link for the list.
 */
function ImageForList({ data }) {
  return <img src={data.logo?.url} alt={data.logo?.description} width="70" />;
}

ImageForList.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    logo: PropTypes.shape({
      description: PropTypes.string,
      url: PropTypes.string,
    }),
  }).isRequired,
};

export default ImageForList;
