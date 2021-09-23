import { React } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TagList from "./components/tag-list/tag-list";
import TopBar from "./components/navigation/topbar/topbar";
import SideBar from "./components/navigation/sidebar/sidebar";
import ScreenList from "./components/screen/screen-list";
import CategoryList from "./components/category-list/category-list";
import SlidesList from "./components/slides-list/slides-list";
import EditTag from "./components/edit-tag/edit-tag";
import EditCategories from "./components/edit-categories/edit-category";
import GroupsList from "./components/groups-list/groups-list";
import EditGroup from "./components/edit-group/edit-group";
import LocationsList from "./components/locations-list/locations-list";
import EditLocation from "./components/edit-location/edit-location";
import EditSlide from "./components/edit-slide/edit-slide";
import PlaylistList from "./components/playlist/playlist-list";
import PlaylistEdit from "./components/playlist/playlist-edit";
import PlaylistCreate from "./components/playlist/playlist-create";
import MediaList from "./components/media-list/media-list";
import EditMedia from "./components/edit-media/edit-media";
import ThemesList from "./components/themes-list/themes-list";
import commonDa from "./translations/da/common.json";
import EditTheme from "./components/edit-theme/edit-theme";
import EditUser from "./components/edit-user/edit-user";
import UserList from "./components/user-list/user-list";
import ScreenCreate from "./components/screen/screen-create";
import ScreenEdit from "./components/screen/screen-edit";
import "./app.scss";

/**
 * App component.
 *
 * @returns {object}
 * The component.
 */
function App() {
  i18next.init({
    interpolation: { escapeValue: false }, // React already does escaping
    lng: "da", // language to use
    resources: {
      da: {
        common: commonDa,
      },
    },
  });

  return (
    <>
      <I18nextProvider i18n={i18next}>
        <Container fluid className="h-100 px-0 bg-light">
          <Row className="row-full-height g-0">
            <SideBar />
            <Col lg={9} xl={10}>
              <TopBar />
              <main className="col p-3">
                <Switch>
                  <Route path="/playlists/create" component={PlaylistCreate} />
                  <Route path="/playlists/edit/:id" component={PlaylistEdit} />
                  <Route path="/playlists/list" component={PlaylistList} />
                  <Route path="/tags" component={TagList} />
                  <Route path="/screen/list" component={ScreenList} />
                  <Route path="/screen/create" component={ScreenCreate} />
                  <Route path="/screen/edit/:id" component={ScreenEdit} />
                  <Route path="/categories" component={CategoryList} />
                  <Route path="/locations" component={LocationsList} />
                  <Route path="/groups" component={GroupsList} />
                  <Route path="/tag/:id" component={EditTag} />
                  <Route path="/category/:id" component={EditCategories} />
                  <Route path="/group/:id" component={EditGroup} />
                  <Route path="/location/:id" component={EditLocation} />
                  <Route path="/slides" component={SlidesList} />
                  <Route path="/media-list" component={MediaList} />
                  <Route path="/slide/:id" component={EditSlide} />
                  <Route path="/media/:id" component={EditMedia} />
                  <Route path="/themes/" component={ThemesList} />
                  <Route path="/theme/:id" component={EditTheme} />
                  <Route path="/users/" component={UserList} />
                  <Route path="/user/:id" component={EditUser} />
                  <Redirect from="/" to="/slides" exact />
                </Switch>
              </main>
            </Col>
          </Row>
        </Container>
      </I18nextProvider>
    </>
  );
}

export default App;
