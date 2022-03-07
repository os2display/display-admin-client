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

/**
 * Login component
 *
 * @returns {object} - The component
 */
function Login() {
  // Hooks
  const { t } = useTranslation("common");
  const { search } = useLocation();
  const dispatch = useDispatch();

  // Context
  const context = useContext(UserContext);

  // Local stage
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [oidcAuthUrls, setOidcAuthUrls] = useState("");
  const [oidcAuthLoadingError, setOidcAuthLoadingError] = useState("");
  const [ready, setReady] = useState(false);

  /**
   * Select tenant function
   *
   * @param {Array} selected - The multiform returns an array of selected
   *   values, this is a single select, so it will only have one entry
   */
  function onSelectTenant(selected) {
    const { value } = selected[0];

    // set selected tenant in context
    context.selectedTenant.set(
      context.tenants.get.find((tenant) => tenant.tenantKey === value)
    );

    // Set authenticated when tenant is selected
    context.authenticated.set(true);

    // Save selected tenant in localstorage
    localStorage.setItem(
      "selected-tenant",
      JSON.stringify(
        context.tenants.get.find((tenant) => tenant.tenantKey === value)
      )
    );
  }

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      api.endpoints.postCredentialsItem.initiate({
        credentials: JSON.stringify({
          email: context.userEmail.get,
          password,
        }),
      })
    )
      .then((response) => {
        if (response?.error) {
          if (response?.error?.data?.message === "Invalid credentials.") {
            setError(true);
            setPassword("");
            displayError(t("login.invalid-credentials"));
          } else {
            setError(true);
            setPassword("");
            displayError(response.error.data.message ?? t("login.error"));
          }
        }

        if (response?.data?.token) {
          // Set token in local storage, to persist login on refresh
          localStorage.setItem("api-token", response.data.token);
          localStorage.setItem("email", context.userEmail.get);

          // If there are more than one tenant, the user should pick a tenant
          if (response.data.tenants.length > 1) {
            // Save tenants
            localStorage.setItem(
              "tenants",
              JSON.stringify(response.data.tenants)
            );
            context.tenants.set(response.data.tenants);
          } else {
            // authenticated, and use the only received tenant.
            context.authenticated.set(true);
            localStorage.setItem(
              "selected-tenant",
              JSON.stringify(response.data.tenants[0])
            );
            context.selectedTenant.set(response.data.tenants[0]);
          }
        }
      })
      .catch((err) => {
        setError(true);
        setPassword("");
        displayError(JSON.stringify(err));
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
                context.authenticated.set(true);
              }
            }
          })
          .catch(() => {
            if (isMounted) {
              setOidcAuthLoadingError(t("login.error-oidc-login"));
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
              setOidcAuthLoadingError(t("login.error-fetching-oidc-urls"));
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
                <h3 className="mb-3">{t("login.login-with-oidc")}</h3>
                {oidcAuthUrls && (
                  <Button
                    className="btn btn-primary"
                    type="button"
                    href={oidcAuthUrls.authorizationUrl}
                  >
                    {t("login.login-with-oidc")}
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
                      <h3>{t("login.login-with-username-password")}</h3>
                      <FormInput
                        className={
                          error ? "form-control is-invalid" : "form-control"
                        }
                        onChange={(ev) =>
                          context.userEmail.set(ev.target.value)
                        }
                        value={context.userEmail.get}
                        name="email"
                        label={t("login.email")}
                        required
                      />
                      <FormInput
                        className={
                          error ? "form-control is-invalid" : "form-control"
                        }
                        onChange={(ev) => setPassword(ev.target.value)}
                        value={password}
                        name="password"
                        label={t("login.password")}
                        type="password"
                        required
                      />
                    </>
                  )}
                  {!context.selectedTenant.get &&
                    context.tenants.get?.length > 1 && (
                      <div>
                        <Form.Label htmlFor="tenant">
                          {t("login.select-tenant-label")}
                        </Form.Label>
                        <MultiSelect
                          overrideStrings={{
                            selectSomeItems: t("login.select-some-options"),
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
                        <small>{t("login.tenant-help-text")}</small>
                      </div>
                    )}
                </>

                <Button type="submit" className="mt-3">
                  {t("login.submit")}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      )}
      {!ready && (
        <LoadingComponent isLoading loadingMessage={t("login.please-wait")} />
      )}
    </>
  );
}

export default Login;
