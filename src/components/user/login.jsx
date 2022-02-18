import { React, useEffect, useState, useContext } from "react";
import { Alert, Button, Card, Form, Row, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Col from "react-bootstrap/Col";
import UserContext from '../../context/user-context';
import FormInput from "../util/forms/form-input";
import { api } from "../../redux/api/api.generated";
import ConfigLoader from "../../config-loader";

/**
 * Login component
 *
 * @returns {object} - The component
 */
function Login() {
  const { t } = useTranslation("common");
  const { search } = useLocation();
  const dispatch = useDispatch();
  const context = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [oidcAuthUrls, setOidcAuthUrls] = useState("");
  const [oidcAuthLoadingError, setOidcAuthLoadingError] = useState("");
  const [ready, setReady] = useState(false);

  const onChange = ({ target }) => {
    if (target?.id === "email") {
      setEmail(target.value);
    } else if (target?.id === "password") {
      setPassword(target.value);
    }
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
            setError(t("login.invalid-credentials"));
          } else {
            setError(response.error.data.message ?? t("login.error"));
          }
        }

        if (response?.data?.token) {
          localStorage.setItem("api-token", response.data.token);

          context.authenticated.set(true);
          // todo fix this when roles recieved
                    context.userRole.set("editor");
        }
      })
      .catch((err) => {
        setError(JSON.stringify(err));
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
                localStorage.setItem("api-token", data.token);

                context.authenticated.set(true);
                // todo fix this when roles recieved
                          context.userRole.set("editor");
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
                <h3>{t("login.login-with-username-password")}</h3>
                <FormInput
                  onChange={onChange}
                  value={email}
                  name="email"
                  label={t("login.email")}
                  required
                />
                <FormInput
                  onChange={onChange}
                  value={password}
                  name="password"
                  label={t("login.password")}
                  type="password"
                  required
                />
                {error && (
                  <div className="alert-danger mt-3 mb-3 p-3">{error}</div>
                )}
                <Button type="submit" className="mt-3">
                  {t("login.submit")}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      )}
      {!ready && <Spinner animation="border" />}
    </>
  );
}

export default Login;
