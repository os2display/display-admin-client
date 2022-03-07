import { React, useEffect, useState, Suspense } from "react";
import { useTranslation, I18nextProvider } from "react-i18next";
import { Routes, Route, Navigate } from "react-router-dom";

import i18next from "i18next";
import { ToastContainer } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RestrictedRoute from "./restricted-route";
import Topbar from "./components/navigation/topbar/topbar";
import SideBar from "./components/navigation/sidebar/sidebar";
import ScreenList from "./components/screen/screen-list";
import SlidesList from "./components/slide/slides-list";
import GroupsList from "./components/groups/groups-list";
import GroupCreate from "./components/groups/group-create";
import GroupEdit from "./components/groups/group-edit";
import PlaylistCampaignList from "./components/playlist/playlist-campaign-list";
import PlaylistCampaignEdit from "./components/playlist/playlist-campaign-edit";
import PlaylistCampaignCreate from "./components/playlist/playlist-campaign-create";
import MediaList from "./components/media/media-list";
import commonDa from "./translations/da/common.json";
import UserList from "./components/user-list/user-list";
import ScreenCreate from "./components/screen/screen-create";
import ScreenEdit from "./components/screen/screen-edit";
import SlideEdit from "./components/slide/slide-edit";
import SlideCreate from "./components/slide/slide-create";
import MediaCreate from "./components/media/media-create";
import ThemesList from "./components/themes/themes-list";
import ThemeCreate from "./components/themes/theme-create";
import ThemeEdit from "./components/themes/theme-edit";
import UserContext from "./context/user-context";
import Logout from "./components/user/logout";
import AuthHandler from "./auth-handler";
import LoadingComponent from "./components/util/loading-component/loading-component";
import { displayError } from "./components/util/list/toast-component/display-toast";
import "react-toastify/dist/ReactToastify.css";
import "./app.scss";

/**
 * App component.
 *
 * @returns {object} The component.
 */
function App() {
  const { t } = useTranslation("common");
  const [authenticated, setAuthenticated] = useState();
  const [selectedTenant, setSelectedTenant] = useState();
  const [accessConfig, setAccessConfig] = useState();
  const [tenants, setTenants] = useState();
  const [userEmail, setUserEmail] = useState("");

  const userStore = {
    authenticated: { get: authenticated, set: setAuthenticated },
    accessConfig: { get: accessConfig, set: setAccessConfig },
    tenants: { get: tenants, set: setTenants },
    selectedTenant: { get: selectedTenant, set: setSelectedTenant },
    userEmail: { get: userEmail, set: setUserEmail },
  };

  const handleReauthenticate = () => {
    localStorage.removeItem("api-token");
    localStorage.removeItem("email");
    localStorage.removeItem("selected-tenant");
    localStorage.removeItem("tenants");

    setSelectedTenant(null);
    setTenants(null);
    setUserEmail("");
    setAuthenticated(false);
  };

  // Check that authentication token exists.
  useEffect(() => {
    const token = localStorage.getItem("api-token");

    if (token !== null) {
      setAuthenticated(true);

      // If there is a selected tenant, fetch from local storage and use
      if (localStorage.getItem("selected-tenant")) {
        setSelectedTenant(JSON.parse(localStorage.getItem("selected-tenant")));
      }

      // Fetch the users tenants from local storage and use
      if (localStorage.getItem("tenants")) {
        setTenants(JSON.parse(localStorage.getItem("tenants")));
      }

      // Get the user email for displaying in top bar.
      setUserEmail(localStorage.getItem("email"));
    } else {
      setAuthenticated(false);
    }

    document.addEventListener("reauthenticate", handleReauthenticate);

    return () => {
      document.removeEventListener("reauthenticate", handleReauthenticate);
    };
  }, []);

  useEffect(() => {
    fetch("/access-config.json")
      .then((response) => response.json())
      .then((jsonData) => {
        setAccessConfig(jsonData);
      })
      .catch(() => {
        displayError(
          "An error occurred, the access config is not found or is erroneous."
        );
      });
  }, []);

  useEffect(() => {
    i18next.init({
      interpolation: { escapeValue: false }, // React already does escaping
      lng: "da", // language to use
      resources: {
        da: {
          common: commonDa,
        },
      },
    });
  }, []);

  return (
    <>
      <UserContext.Provider value={userStore}>
        <I18nextProvider i18n={i18next}>
          <Suspense
            fallback={
              <LoadingComponent
                isLoading
                loadingMessage={t("auth-handler.please-wait")}
              />
            }
          >
            <ToastContainer
              autoClose="10000"
              position="bottom-right"
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
              draggable
              progress={undefined}
            />
            <AuthHandler>
              <Container fluid className="h-100 px-0 bg-light">
                <Row className="row-full-height g-0">
                  <SideBar />
                  <Col lg={9} xl={10}>
                    <Topbar />
                    {accessConfig && (
                      <main className="col p-3">
                        <Routes>
                          <Route path="campaign">
                            <Route
                              path="create"
                              element={
                                <RestrictedRoute
                                  roles={accessConfig.campaign.roles}
                                >
                                  <PlaylistCampaignCreate location="campaign" />
                                </RestrictedRoute>
                              }
                            />
                            <Route
                              path="edit/:id"
                              element={
                                <RestrictedRoute
                                  roles={accessConfig.campaign.roles}
                                >
                                  <PlaylistCampaignEdit location="campaign" />
                                </RestrictedRoute>
                              }
                            />
                            <Route
                              path="list"
                              element={
                                <RestrictedRoute
                                  roles={accessConfig.campaign.roles}
                                >
                                  <PlaylistCampaignList location="campaign" />
                                </RestrictedRoute>
                              }
                            />
                          </Route>
                          <Route path="playlist">
                            <Route
                              path="create"
                              element={
                                <PlaylistCampaignCreate location="playlist" />
                              }
                            />
                            <Route
                              path="edit/:id"
                              element={
                                <PlaylistCampaignEdit location="playlist" />
                              }
                            />
                            <Route
                              path="list"
                              element={
                                <PlaylistCampaignList location="playlist" />
                              }
                            />
                          </Route>

                          <Route path="screen">
                            <Route
                              path="list"
                              element={
                                <RestrictedRoute
                                  roles={accessConfig.screen.roles}
                                >
                                  <ScreenList />
                                </RestrictedRoute>
                              }
                            />
                            <Route
                              path="create"
                              element={
                                <RestrictedRoute
                                  roles={accessConfig.screen.roles}
                                >
                                  <ScreenCreate />
                                </RestrictedRoute>
                              }
                            />
                            <Route
                              path="edit/:id"
                              element={
                                <RestrictedRoute
                                  roles={accessConfig.screen.roles}
                                >
                                  <ScreenEdit />
                                </RestrictedRoute>
                              }
                            />
                          </Route>
                          <Route path="group">
                            <Route
                              path="list"
                              element={
                                <RestrictedRoute
                                  roles={accessConfig.groups.roles}
                                >
                                  <GroupsList />
                                </RestrictedRoute>
                              }
                            />
                            <Route
                              path="edit/:id"
                              element={
                                <RestrictedRoute
                                  roles={accessConfig.groups.roles}
                                >
                                  <GroupEdit />
                                </RestrictedRoute>
                              }
                            />
                            <Route
                              path="create"
                              element={
                                <RestrictedRoute
                                  roles={accessConfig.groups.roles}
                                >
                                  <GroupCreate />
                                </RestrictedRoute>
                              }
                            />
                          </Route>
                          <Route path="slide">
                            <Route path="list" element={<SlidesList />} />
                            <Route path="create" element={<SlideCreate />} />
                            <Route path="edit/:id" element={<SlideEdit />} />
                          </Route>
                          <Route path="media">
                            <Route path="list" element={<MediaList />} />
                            <Route path="create" element={<MediaCreate />} />
                          </Route>
                          <Route path="themes">
                            <Route
                              path="list"
                              element={
                                <RestrictedRoute
                                  roles={accessConfig.settings.roles}
                                >
                                  <ThemesList />
                                </RestrictedRoute>
                              }
                            />
                            <Route
                              path="edit/:id"
                              element={
                                <RestrictedRoute
                                  roles={accessConfig.settings.roles}
                                >
                                  <ThemeEdit />
                                </RestrictedRoute>
                              }
                            />
                            <Route
                              path="create"
                              element={
                                <RestrictedRoute
                                  roles={accessConfig.settings.roles}
                                >
                                  <ThemeCreate />
                                </RestrictedRoute>
                              }
                            />
                          </Route>
                          <Route
                            path="users"
                            element={
                              <RestrictedRoute
                                roles={accessConfig.settings.roles}
                              >
                                <UserList />
                              </RestrictedRoute>
                            }
                          />
                          <Route path="logout" element={<Logout />} />
                          <Route
                            path="*"
                            element={<Navigate to="/slide/list" />}
                          />
                        </Routes>
                      </main>
                    )}
                  </Col>
                </Row>
              </Container>
            </AuthHandler>
          </Suspense>
        </I18nextProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
