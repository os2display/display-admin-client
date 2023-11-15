import { React, useEffect, useState, useContext } from "react";
import { Alert, Button, Card, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Col from "react-bootstrap/Col";
import { MultiSelect } from "react-multi-select-component";
import LoadingComponent from "../util/loading-component/loading-component";
import UserContext from "../../context/user-context";
import FormInput from "../util/forms/form-input";
import { api } from "../../redux/api/api.generated";
import ConfigLoader from "../../config-loader";
import { displayError } from "../util/list/toast-component/display-toast";
import localStorageKeys from "../util/local-storage-keys";

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
      api.endpoints.loginCheckPost.initiate({
        body: JSON.stringify({
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
    let code = null;
    let state = null;

    if (search) {
      const query = queryString.parse(search);
      code = query.code;
      state = query.state;
    }

    ConfigLoader.loadConfig().then((config) => {
      if (state && code) {
        fetch(
          `${config.api}v1/authentication/oidc/token?state=${state}&code=${code}`,
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
        <Card className="m-5 bg-light">
          <Form onSubmit={onSubmit} className="m-3">
            <Row>
              <Col md>
                <h3 className="mb-3">{t("login-with-oidc")}</h3>
                {oidcAuthUrls && (
                  <Button
                    className="btn btn-primary"
                    type="button"
                    href={oidcAuthUrls.authorizationUrl}
                  >
                    {t("login-with-oidc")}
                  </Button>
                )}
                {oidcAuthLoadingError && (
                  <Alert variant="danger">{oidcAuthLoadingError}</Alert>
                )}
              </Col>
              <Col md>
                <>
                  {!context.tenants.get && (
                    <>
                      <h3>{t("login-with-username-password")}</h3>
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
              </Col>
            </Row>
          </Form>
        </Card>
      )}
      {!ready && (
        <LoadingComponent isLoading loadingMessage={t("please-wait")} />
      )}
    </>
  );
}

export default Login;
