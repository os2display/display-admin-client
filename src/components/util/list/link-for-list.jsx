import { React } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

/**
 * A link for the list
 *
 * @param {object} props
 * Props.
 * @param {object} props.data
 * Data data object containing the id of what is being edited.
 * @param {string} props.param
 * The datatypeparam.
 * @returns {object}
 * A link for the list.
 */
function LinkForList({ data, param }) {
  return (
    <Link className="btn btn-primary btn-success" to={`/${param}/${data.id}`}>
      <FormattedMessage id="edit" defaultMessage="edit" />
    </Link>
  );
}

LinkForList.propTypes = {
  data: PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
    .isRequired,
  param: PropTypes.string.isRequired,
};

export default LinkForList;
