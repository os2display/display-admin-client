import { React, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Spinner } from "react-bootstrap";
import Login from "./components/user/login";
import UserContext from "./context/user-context";
import LoadingComponent from "./components/util/loading-component/loading-component";

/**
 * The auth handler wrapper.
 *
 * @param {object} props - The props.
 * @param {Array} props.children The children being passed from parent
 * @returns {object} A spinner, a login page or the children.
 */
function AuthHandler({ children }) {
  const { t } = useTranslation("common");
  const context = useContext(UserContext);

  if (context.authenticated.get === undefined) {
    return (
      <LoadingComponent
        isLoading
        loadingMessage={t("auth-handler.please-wait")}
      />
    );
  }

  if (!context.authenticated.get) {
    return <Login />;
  }

  return children;
}

export default AuthHandler;
