import { React, useEffect, useState, useContext } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Col from "react-bootstrap/Col";
import { MultiSelect } from "react-multi-select-component";
import UserContext from "../../context/user-context";
import FormInput from "../util/forms/form-input";
import { api } from "../../redux/api/api.generated.ts";
import ConfigLoader from "../../config-loader";
import { displayError } from "../util/list/toast-component/display-toast";
import localStorageKeys from "../util/local-storage-keys";
import LoginSidebar from "../navigation/login-sidebar/login-sidebar";
import "./login.scss";
import OIDCLogin from "./oidc-login";
import LoadingComponent from "../util/loading-component/loading-component";

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

  // Local state
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [activationCode, setActivationCode] = useState("");
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginMethods, setLoginMethods] = useState([]);

  /**
   * Login, both called from oidc login and manuel login.
   *
   * @param {object} data - Login data
   */
  const login = (data) => {
    const { user } = data;
    const { tenants } = data;

    if (!tenants) {
      setError(true);
      displayError(t("missing-tenants"));
    }

    // Set data in local storage, to persist login on refresh
    localStorage.setItem(localStorageKeys.API_TOKEN, data.token);
    localStorage.setItem(
      localStorageKeys.API_REFRESH_TOKEN,
      data.refresh_token
    );
    localStorage.setItem(localStorageKeys.USER_NAME, user?.fullname);
    localStorage.setItem(localStorageKeys.EMAIL, user?.email);
    localStorage.setItem(localStorageKeys.TENANTS, JSON.stringify(tenants));

    context.userName.set(user?.fullname);
    context.email.set(user?.email);
    context.tenants.set(tenants);
    context.userType.set(user?.type);

    // If there are more than one tenant, the user should pick a tenant
    if (tenants.length === 1) {
      // authenticated, and use the only tenant.
      context.authenticated.set(true);
      localStorage.setItem(
        localStorageKeys.SELECTED_TENANT,
        JSON.stringify(tenants[0])
      );
      context.selectedTenant.set(tenants[0]);
    }

    setLoggedIn(true);
  };

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

  const refreshTokenAndLogin = () => {
    ConfigLoader.loadConfig().then((config) => {
      fetch(`${config.api}v1/authentication/token/refresh`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          refresh_token: localStorage.getItem(
            localStorageKeys.API_REFRESH_TOKEN
          ),
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.code !== 200) {
            setErrorMessage(data.message);
          }

          if (data?.token) {
            login(data);
          }
        })
        .catch((err) => {
          setError(true);
          displayError(t("error-refreshing-code"), err);
        });
    });
  };

  const onActivationCodeSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      api.endpoints.postV1UserActivationCodesActivate.initiate({
        userActivationCodeActivationCode: JSON.stringify({
          activationCode,
        }),
      })
    )
      .then(() => {
        refreshTokenAndLogin();
      })
      .catch((err) => {
        setError(true);
        displayError(t("error-activating-code"), err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      api.endpoints.loginCheckPost.initiate({
        body: JSON.stringify({
          providerId: email,
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
    ConfigLoader.loadConfig().then((config) => {
      // Defaults to all enabled.
      setLoginMethods(
        config.loginMethods ?? [
          {
            type: "oidc",
            provider: "internal",
            enabled: true,
            label: null,
            icon: null,
          },
          {
            type: "oidc",
            provider: "external",
            enabled: true,
            label: null,
            icon: null,
          },
          {
            type: "username-password",
            enabled: true,
            label: null,
            icon: null,
          },
        ]
      );
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    let code = null;
    let state = null;

    if (search) {
      const query = queryString.parse(search);

      code = query.code;
      state = query.state;

      if (state && code) {
        ConfigLoader.loadConfig().then((config) => {
          const searchParams = new URLSearchParams({
            state,
            code,
          });

          fetch(`${config.api}v1/authentication/oidc/token?${searchParams}`, {
            mode: "cors",
            credentials: "include",
          })
            .then((resp) => resp.json())
            .then((data) => {
              if (data.code !== 200) {
                setErrorMessage(data.message);
              }

              if (isMounted) {
                if (data?.token) {
                  login(data);
                }
              }
            })
            .finally(() => {
              setReady(true);
            });
        });
      } else {
        setReady(true);
      }
    } else {
      setReady(true);
    }

    return () => {
      isMounted = false;
    };
  }, [search]);

  const oidcLogins = loginMethods.filter(
    (loginMethod) => loginMethod.enabled && loginMethod.type === "oidc"
  );
  const usernamePasswordLogins = loginMethods.filter(
    (loginMethod) =>
      loginMethod.enabled && loginMethod.type === "username-password"
  );

  return (
    <>
      {ready && (
        <div className="login-container container">
          <Row className="login-box-shadow">
            <Col
              md="4"
              className="bg-dark col justify-content-between d-flex flex-column"
            >
              <LoginSidebar />
            </Col>

            <Col className="bg-white">
              <div className="mx-3 px-3 my-3 mx-md-5 px-md-5 my-md-5">
                {errorMessage && errorMessage !== "" && (
                  <div className="alert-danger p-2 mt-3 mb-3">
                    {errorMessage}
                  </div>
                )}

                {loggedIn &&
                  !context.selectedTenant.get &&
                  (context.tenants.get.length ?? 0) === 0 &&
                  context.userType.get === "OIDC_EXTERNAL" && (
                    <>
                      <Form onSubmit={onActivationCodeSubmit}>
                        <FormInput
                          className={
                            error ? "form-control is-invalid" : "form-control"
                          }
                          onChange={(ev) => setActivationCode(ev.target.value)}
                          value={activationCode}
                          name="activationCode"
                          label={t("activation-code")}
                          required
                        />

                        <Button
                          type="submit"
                          className="mt-3"
                          id="activation-code-submit"
                        >
                          {t("submit")}
                        </Button>
                      </Form>
                    </>
                  )}

                {loggedIn &&
                  !context.selectedTenant.get &&
                  (context.tenants.get.length ?? 0) > 1 && (
                    <>
                      <h1>{t("logged-in-select-tenant")}</h1>

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
                    </>
                  )}

                {!loggedIn && (
                  <>
                    <h1>{t("login-header")}</h1>

                    {oidcLogins.length > 0 && (
                      <>
                        <h2 className="h4 mt-5 mb-3 fw-light">
                          {t("oidc-mit-id-header")}
                        </h2>

                        <div className="d-flex">
                          {oidcLogins.map((loginMethod) => (
                            <OIDCLogin
                              config={loginMethod}
                              key={loginMethod.provider}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    {usernamePasswordLogins.length > 0 &&
                      usernamePasswordLogins.map((loginMethod) => (
                        <div key={loginMethod.provider}>
                          <h2 className="h4 mt-5 mb-3 fw-light">
                            {loginMethod.label ?? t("os2-display-user-header")}
                          </h2>

                          <Form onSubmit={onSubmit}>
                            <FormInput
                              className={
                                error
                                  ? "form-control is-invalid"
                                  : "form-control"
                              }
                              onChange={(ev) => setEmail(ev.target.value)}
                              value={email}
                              name="email"
                              label={t("email")}
                              required
                            />

                            <FormInput
                              className={
                                error
                                  ? "form-control is-invalid"
                                  : "form-control"
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
                          </Form>
                        </div>
                      ))}
                  </>
                )}
              </div>
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
