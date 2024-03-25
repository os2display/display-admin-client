import { React, useState } from "react";
import { Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./login.scss";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FontAwesomeIcons from "@fortawesome/free-solid-svg-icons";
import ConfigLoader from "../../config-loader";
import MitIdLogo from "./mitid-logo.svg";

/**
 * OIDC Login component
 *
 * @param {object} props The props
 * @param {object} props.config The login method config
 * @returns {object} - The component
 */
function OIDCLogin({ config }) {
  // Hooks
  const { t } = useTranslation("common", { keyPrefix: "oidc-login" });

  const { provider, label, icon } = config;

  // State
  const [oidcAuthLoadingError, setOidcAuthLoadingError] = useState("");

  let labelText = label;

  if (labelText === null) {
    switch (provider) {
      case "internal":
        labelText = t("login-with-internal");
        break;
      case "external":
        labelText = t("login-with-external");
        break;
      default:
        labelText = "";
    }
  }

  let iconRender = null;

  if (icon !== null) {
    if (icon === "mitID") {
      iconRender = <img width="56" className="me-2" src={MitIdLogo} alt="" />;
    } else if (icon.indexOf("fa") === 0) {
      iconRender = (
        <FontAwesomeIcon className="me-2" icon={FontAwesomeIcons[icon]} />
      );
    }
  }

  /**
   * Get oidc urls when chosen oidc provider is clicked. After redirecting to
   * the url, a session is set in the API. Therefore, only one
   * "v1/authentication/oidc/urls" session can be active at a time.
   */
  const onClick = () => {
    ConfigLoader.loadConfig().then((siteConfig) => {
      fetch(
        `${siteConfig.api}v1/authentication/oidc/urls?providerKey=${provider}`,
        {
          mode: "cors",
          credentials: "include",
        }
      )
        .then((resp) => {
          resp.json().then((data) => {
            window.location.href = data.authorizationUrl;
          });
        })
        .catch(() => {
          setOidcAuthLoadingError(t("error-fetching-oidc-urls"));
        });
    });
  };

  return (
    <>
      <button
        onClick={onClick}
        className="margin-right-button btn btn-primary btn-lg d-flex justify-content-center align-items-center"
        style={{ minWidth: "160px" }}
        type="button"
        aria-label={t("login-with-oidc-aria-label")}
        aria-describedby="ad-explanation"
      >
        {iconRender}
        {labelText}
      </button>
      {oidcAuthLoadingError !== "" && (
        <Alert variant="danger mt-2">{oidcAuthLoadingError}</Alert>
      )}
    </>
  );
}

OIDCLogin.propTypes = {
  config: PropTypes.shape({
    provider: PropTypes.string.isRequired,
    icon: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
};

export default OIDCLogin;
