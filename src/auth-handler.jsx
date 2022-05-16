import { React, useContext } from "react";
import PropTypes from "prop-types";
import Login from "./components/user/login";
import UserContext from "./context/user-context";

/**
 * The auth handler wrapper.
 *
 * @param {object} props - The props.
 * @param {Array} props.children The children being passed from parent
 * @returns {object} A spinner, a login page or the children.
 */
function AuthHandler({ children }) {
  const context = useContext(UserContext);

  if (!context.authenticated.get || !context.selectedTenant.get) {
    return <Login />;
  }

  return children;
}

AuthHandler.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthHandler;
