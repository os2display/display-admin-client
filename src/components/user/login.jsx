import { React, useEffect, useState, useContext } from "react";
import { Alert, Button, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import Col from "react-bootstrap/Col";
import { MultiSelect } from "react-multi-select-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity } from "@fortawesome/free-solid-svg-icons";
import LoadingComponent from "../util/loading-component/loading-component";
import UserContext from "../../context/user-context";
import FormInput from "../util/forms/form-input";
import { api } from "../../redux/api/api.generated";
import ConfigLoader from "../../config-loader";
import { displayError } from "../util/list/toast-component/display-toast";
import localStorageKeys from "../util/local-storage-keys";
import LoginSidebar from "../navigation/login-sidebar/login-sidebar";
import MitIdLogo from "./mitid-logo.svg";
import "./login.scss";

/**
 * Login component
 *
 * @returns {object} - The component
 */
function Login() {
  // Hooks
  const { t } = useTranslation("common", { keyPrefix: "login" });
  const { search } = useLocation();
  const dispatch = useDispatch();

  // Context
  const context = useContext(UserContext);

  // Local stage
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [oidcAuthUrls, setOidcAuthUrls] = useState("");
  const [oidcAuthLoadingError, setOidcAuthLoadingError] = useState("");
  const [ready, setReady] = useState(false);

  /**
   * Login, both called from oidc login and manuel login.
   *
   * @param {object} data - Login data
   */
  function login(data) {
    // Set token in local storage, to persist login on refresh
    localStorage.setItem(localStorageKeys.API_TOKEN, data.token);
    context.userName.set(data.user?.fullname);
    context.email.set(data.user?.email);
    localStorage.setItem(localStorageKeys.USER_NAME, data.user?.fullname);
    localStorage.setItem(localStorageKeys.EMAIL, data.user?.email);
    // If there are more than one tenant, the user should pick a tenant
    if (data.tenants?.length > 1) {
      // Save tenants
      localStorage.setItem(
        localStorageKeys.TENANTS,
        JSON.stringify(data.tenants)
      );
      context.tenants.set(data.tenants);
    } else if (data.tenants?.length > 0) {
      // authenticated, and use the only received tenant.
      context.authenticated.set(true);
      localStorage.setItem(
        localStorageKeys.SELECTED_TENANT,
        JSON.stringify(data.tenants[0])
      );
      context.selectedTenant.set(data.tenants[0]);
    } else {
      setError(true);
      displayError(t("missing-tenants"));
    }
  }

  /**
   * Select tenant function
   *
   * @param {Array} selected - The multiform returns an array of selected
   *   values, this is a single select, so it will only have one entry
   */
  const onSelectTenant = (selected) => {
    const { value } = selected[0];

    // set selected tenant in context
    context.selectedTenant.set(
      context.tenants.get.find((tenant) => tenant.tenantKey === value)
    );

    // Set authenticated when tenant is selected
    context.authenticated.set(true);

    // Save selected tenant in localstorage
    localStorage.setItem(
      localStorageKeys.SELECTED_TENANT,
      JSON.stringify(
        context.tenants.get.find((tenant) => tenant.tenantKey === value)
      )
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      api.endpoints.postCredentialsItem.initiate({
        credentials: JSON.stringify({
          email,
          password,
        }),
      })
    )
      .then((response) => {
        if (response?.error) {
          if (response?.error?.data?.message === "Invalid credentials.") {
            setError(true);
            displayError(t("invalid-credentials"), response.error);
          } else {
            setError(true);
            displayError(t("error"), response.error);
          }
        }
        if (response?.data?.token) {
          login(response.data);
        }
      })
      .catch((err) => {
        setError(true);
        displayError(t("error"), err);
      });
  };

  useEffect(() => {
    let isMounted = true;
    let idToken = null;
    let state = null;

    if (search) {
      const query = queryString.parse(search);
      idToken = query.id_token;
      state = query.state;
    }

    ConfigLoader.loadConfig().then((config) => {
      if (state && idToken) {
        fetch(
          `${config.api}v1/authentication/oidc/token?state=${state}&id_token=${idToken}`,
          {
            mode: "cors",
            credentials: "include",
          }
        )
          .then((resp) => resp.json())
          .then((data) => {
            if (isMounted) {
              if (data?.token) {
                login(data);
              }
            }
          })
          .catch(() => {
            if (isMounted) {
              setOidcAuthLoadingError(t("error-oidc-login"));
            }
          })
          .finally(() => {
            if (isMounted) {
              setReady(true);
            }
          });
      } else {
        fetch(`${config.api}v1/authentication/oidc/urls?providerKey=oidc`, {
          mode: "cors",
          credentials: "include",
        })
          .then((resp) => {
            resp.json().then((data) => {
              if (isMounted) {
                setOidcAuthUrls(data);
              }
            });
          })
          .catch(() => {
            if (isMounted) {
              setOidcAuthLoadingError(t("error-fetching-oidc-urls"));
            }
          })
          .finally(() => {
            if (isMounted) {
              setReady(true);
            }
          });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [search]);

  return (
    <>
      {ready && (
        <div className="login-container">
          <Row className="login-box-shadow">
            <Col
              md="4"
              className="bg-dark col justify-content-between d-flex flex-column"
            >
              <LoginSidebar />
            </Col>
            <Col>
              <Form
                onSubmit={onSubmit}
                className="mx-3 px-3 my-3 mx-md-5 px-md-5 my-md-5"
              >
                <h1>{t("login-header")}</h1>
                <h2 className="h4 mt-5 mb-3 fw-light">
                  {t("oidc-mit-id-header")}
                </h2>
                <div className="d-flex">
                  <Button
                    variant="primary"
                    type="button"
                    // todo, make mitid login work
                    onClick={() => {}}
                    className="margin-right-button"
                    size="lg"
                    aria-describedby="mitid-explanation"
                    aria-label={t("login-with-mitid-aria-label")}
                  >
                    <img width="56" className="me-2" src={MitIdLogo} alt="" />
                  </Button>
                  {oidcAuthUrls.authorizationUrl && (
                    <Link
                      className="margin-right-button btn btn-primary btn-lg margin-right-button d-flex align-items-center"
                      aria-label={t("login-with-oidc-aria-label")}
                      to={oidcAuthUrls.authorizationUrl}
                      aria-describedby="ad-explanation"
                    >
                      <FontAwesomeIcon className="me-2" icon={faCity} />
                      {t("login-with-oidc")}
                    </Link>
                  )}
                </div>
                {oidcAuthLoadingError && (
                  <Alert variant="danger mt-2">{oidcAuthLoadingError}</Alert>
                )}
                <h2 className="h4 mt-5 mb-3 fw-light">
                  {t("os2-display-user-header")}
                </h2>
                <>
                  {!context.tenants.get && (
                    <>
                      <FormInput
                        className={
                          error ? "form-control is-invalid" : "form-control"
                        }
                        onChange={(ev) => setEmail(ev.target.value)}
                        value={email}
                        name="email"
                        label={t("email")}
                        required
                      />
                      <FormInput
                        className={
                          error ? "form-control is-invalid" : "form-control"
                        }
                        onChange={(ev) => setPassword(ev.target.value)}
                        value={password}
                        name="password"
                        label={t("password")}
                        type="password"
                        required
                      />
                      <Button type="submit" className="mt-3" id="login">
                        {t("submit")}
                      </Button>
                    </>
                  )}
                  {!context.selectedTenant.get &&
                    context.tenants.get?.length > 1 && (
                      <div id="tenant-picker-section">
                        <Form.Label htmlFor="tenant">
                          {t("select-tenant-label")}
                        </Form.Label>
                        <MultiSelect
                          overrideStrings={{
                            selectSomeItems: t("select-some-options"),
                          }}
                          disableSearch
                          options={
                            context.tenants.get.map((item) => {
                              return {
                                label: item.title,
                                value: item.tenantKey,
                              };
                            }) || []
                          }
                          hasSelectAll={false}
                          onChange={onSelectTenant}
                          className="single-select"
                          labelledBy="tenant"
                        />
                        <small>{t("tenant-help-text")}</small>
                      </div>
                    )}
                </>
              </Form>
            </Col>
          </Row>
        </div>
      )}
      {!ready && (
        <LoadingComponent isLoading loadingMessage={t("please-wait")} />
      )}
    </>
  );
}

export default Login;
