import { React, useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./login.scss";
import PropTypes from "prop-types";
import ConfigLoader from "../../config-loader";

/**
 * OIDC Login component
 *
 * @param {object} props The props
 * @param {string} props.providerKey The provider key
 * @param {string} props.text Button text
 * @param {object} props.icon Button icon
 * @returns {object} - The component
 */
function OIDCLogin({ providerKey, text, icon }) {
  // Hooks
  const { t } = useTranslation("common", { keyPrefix: "oidc-login" });

  // State
  const [oidcAuthUrl, setOidcAuthUrl] = useState("");
  const [oidcAuthLoadingError, setOidcAuthLoadingError] = useState("");

  useEffect(() => {
    ConfigLoader.loadConfig().then((config) => {
      fetch(
        `${config.api}v1/authentication/oidc/urls?providerKey=${providerKey}`,
        {
          mode: "cors",
          credentials: "include",
        }
      )
        .then((resp) => {
          resp.json().then((data) => {
            setOidcAuthUrl(data.authorizationUrl);
          });
        })
        .catch(() => {
          setOidcAuthLoadingError(t("error-fetching-oidc-urls"));
        });
    });

    return () => {};
  }, []);

  return (
    <>
      {!oidcAuthUrl && (
        <Spinner animation="border" className="margin-right-button" />
      )}
      {oidcAuthUrl !== "" && (
        <a
          href={oidcAuthUrl}
          className="margin-right-button btn btn-primary btn-lg margin-right-button d-flex align-items-center"
          aria-label={t("login-with-oidc-aria-label")}
          aria-describedby="ad-explanation"
        >
          {icon}
          {text}
        </a>
      )}
      {oidcAuthLoadingError !== "" && (
        <Alert variant="danger mt-2">{oidcAuthLoadingError}</Alert>
      )}
    </>
  );
}

OIDCLogin.propTypes = {
  providerKey: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
};

export default OIDCLogin;
