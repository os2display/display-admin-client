import { React, useContext } from "react";
import UserContext from "./context/user-context";
import NoAccess from "./components/no-access/no-access";

/**
 * The restricted route wrapper.
 *
 * @param {object} props - The props.
 * @param {Array} props.children The children being passed from parent
 * @param {Array} props.roles - The list of roles that have access to the route.
 * @returns {object} A no access component or the children.
 */
export default function RestrictedRoute({ children, roles }) {
  const context = useContext(UserContext);
  const userHasRequiredRole =
    context.userRole.get && roles.includes(context.userRole.get);

  if (context.authenticated.get && !userHasRequiredRole) {
    return <NoAccess />;
  }

  return children;
}
