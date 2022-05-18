import { React, useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "../../../context/user-context";

/**
 * The restricted nav route wrapper.
 *
 * @param {object} props - The props.
 * @param {Array} props.children The children being passed from parent
 * @param {Array} props.roles - The list of roles that have access to the nav route.
 * @returns {object} Nothing or the children.
 */
function RestrictedNavRoute({ children, roles }) {
  const context = useContext(UserContext);

  // If the user has a role with access to children.
  const userHasRequiredRole = context.selectedTenant.get?.roles.find((value) =>
    roles.includes(value)
  );

  if (!userHasRequiredRole) {
    return <></>;
  }

  return children;
}

RestrictedNavRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RestrictedNavRoute;
