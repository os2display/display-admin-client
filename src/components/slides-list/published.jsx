import { React } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

/**
 * @param {object} props
 * The props.
 * @param {boolean} props.published
 * Whether it is published or not.
 * @returns {object}
 * The published yes/no component.
 */
function Published({ published }) {
  const intl = useIntl();
  const yes = intl.formatMessage({ id: "yes" });
  const no = intl.formatMessage({ id: "no" });

  return <div className="m-2">{published ? yes : no}</div>;
}

Published.propTypes = {
  published: PropTypes.bool.isRequired,
};

export default Published;
