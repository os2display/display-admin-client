import { Alert, Button, Card, Form, Row, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Col from "react-bootstrap/Col";
import FormInput from "../util/forms/form-input";
import { api } from "../../redux/api/api.generated";

/**
 * Login component
 *
 * @returns {object} - The component
 */
function Login() {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { search } = useLocation();
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

          const event = new Event("authenticated");
          document.dispatchEvent(event);
        }
      })
      .catch((err) => {
        setError(JSON.stringify(err));
      });
  };

  useEffect(() => {
    let idToken = null;
    let state = null;

    if (search) {
      const query = queryString.parse(search);
      idToken = query.id_token;
      state = query.state;
    }

    if (state && idToken) {
      fetch(
        `https://displayapiservice2.local.itkdev.dk/v1/authentication/oidc/token?state=${state}&id_token=${idToken}`,
        {
          mode: "cors",
          credentials: "include",
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          if (data?.token) {
            localStorage.setItem("api-token", data.token);

            const event = new Event("authenticated");
            document.dispatchEvent(event);
          }
        })
        .catch(() => {
          setOidcAuthLoadingError(t("login.error-oidc-login"));
        })
        .finally(() => {
          setReady(true);
        });
    } else {
      fetch(
        `https://displayapiservice2.local.itkdev.dk/v1/authentication/oidc/urls?providerKey=oidc`,
        {
          mode: "cors",
          credentials: "include",
        }
      )
        .then((resp) => {
          resp.json().then((data) => {
            setOidcAuthUrls(data);
          });
        })
        .catch(() => {
          setOidcAuthLoadingError(t("login.error-fetching-oidc-urls"));
        })
        .finally(() => {
          setReady(true);
        });
    }
  }, [search]);

  return (
    <>
      {ready && (
        <Card className="m-5 bg-light">
          <h3 className="m-3">{t("login.please-authenticate")}</h3>

          <Form onSubmit={onSubmit} className="m-3">
            <Row className="g-2">
              <Col md>
                <div className="mb-4">
                  <h5 className="mb-3">{t("login.login-with-oidc")}</h5>
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
                </div>
              </Col>
              <Col md>
                <h5>{t("login.login-with-username-password")}</h5>
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
