import { React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

/**
 * @param {object} props
 * The props.
 * @param {boolean} props.overriddenByCampaign
 * Whether it is overridden by campaign or not.
 * @returns {object}
 * The published yes/no component.
 */
function CampaignIcon({ overriddenByCampaign }) {
  return (
    <div className="m-2">
      <FontAwesomeIcon
        icon={faExclamationCircle}
        style={overriddenByCampaign ? { color: "red" } : { color: "grey" }}
      />
    </div>
  );
}

CampaignIcon.propTypes = {
  overriddenByCampaign: PropTypes.bool.isRequired,
};

export default CampaignIcon;
