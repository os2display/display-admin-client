import { React, useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./login.scss";
import PropTypes from "prop-types";
import ConfigLoader from "../../config-loader";
import MitIdLogo from "./mitid-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FontAwesomeIcons from "@fortawesome/free-solid-svg-icons";

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
  const [oidcAuthUrl, setOidcAuthUrl] = useState("");
  const [oidcAuthLoadingError, setOidcAuthLoadingError] = useState("");

  useEffect(() => {
    if (!provider) {
      return;
    }

    ConfigLoader.loadConfig().then((config) => {
      fetch(
        `${config.api}v1/authentication/oidc/urls?providerKey=${provider}`,
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
  }, [provider]);

  let labelText = label;

  if (labelText === null) {
    switch (provider) {
      case 'internal':
        labelText = t("login-with-internal");
        break;
      case 'external':
        labelText = t("login-with-external");
        break;
      default:
        labelText = '';
    }
  }

  let iconRender = null;

  if (icon !== null) {
    if (icon === 'mitID') {
      iconRender = (<img
        width="56"
        className="me-2"
        src={MitIdLogo}
        alt=""
      />);
    } else if (icon.indexOf('fa') === 0) {
      iconRender = (<FontAwesomeIcon
        className="me-2"
        icon={FontAwesomeIcons[icon]}
      />);
    }
  }

  return (
    <>
      {!oidcAuthUrl && (
        <Spinner animation="grow" className="margin-right-button" />
      )}
      {oidcAuthUrl !== "" && (
        <a
          href={oidcAuthUrl}
          className="margin-right-button btn btn-primary btn-lg d-flex justify-content-center align-items-center"
          style={{minWidth: "160px"}}
          aria-label={t("login-with-oidc-aria-label")}
          aria-describedby="ad-explanation"
        >
          {iconRender}
          {labelText}
        </a>
      )}
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
