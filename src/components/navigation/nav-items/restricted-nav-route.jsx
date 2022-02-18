import { React, useContext } from "react";
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
  const userHasRequiredRole =
    context.userRole.get && roles.includes(context.userRole.get);

  if (!userHasRequiredRole) {
    return <></>;
  }

  return children;
}
export default RestrictedNavRoute;
