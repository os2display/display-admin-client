import { React } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TopBar from "./components/navigation/topbar/topbar";
import SideBar from "./components/navigation/sidebar/sidebar";
import ScreenList from "./components/screen/screen-list";
import SlidesList from "./components/slide/slides-list";
import GroupsList from "./components/groups/groups-list";
import GroupCreate from "./components/groups/group-create";
import GroupEdit from "./components/groups/group-edit";
import PlaylistList from "./components/playlist/playlist-list";
import PlaylistEdit from "./components/playlist/playlist-edit";
import PlaylistCreate from "./components/playlist/playlist-create";
import MediaList from "./components/media/media-list";
// import MediaEdit from "./components/media/media-edit";
import commonDa from "./translations/da/common.json";
import EditUser from "./components/edit-user/edit-user";
import UserList from "./components/user-list/user-list";
import ScreenCreate from "./components/screen/screen-create";
import ScreenEdit from "./components/screen/screen-edit";
import SlideEdit from "./components/slide/slide-edit";
import SlideCreate from "./components/slide/slide-create";
import MediaCreate from "./components/media/media-create";
import ThemesList from "./components/themes/themes-list";
import ThemeCreate from "./components/themes/theme-create";
import ThemeEdit from "./components/themes/theme-edit";
import "./app.scss";

/**
 * App component.
 *
 * @returns {object} The component.
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
              <ToastContainer />
              <main className="col p-3">
                <Switch>
                  <Route path="/playlist/create" component={PlaylistCreate} />
                  <Route path="/playlist/edit/:id" component={PlaylistEdit} />
                  <Route path="/playlist/list" component={PlaylistList} />
                  <Route path="/screen/list" component={ScreenList} />
                  <Route path="/screen/create" component={ScreenCreate} />
                  <Route path="/screen/edit/:id" component={ScreenEdit} />
                  <Route path="/group/list" component={GroupsList} />
                  <Route path="/group/edit/:id" component={GroupEdit} />
                  <Route path="/group/create" component={GroupCreate} />
                  <Route path="/slide/list" component={SlidesList} />
                  <Route path="/slide/create" component={SlideCreate} />
                  <Route path="/slide/edit/:id" component={SlideEdit} />
                  <Route path="/media/list" component={MediaList} />
                  {/* <Route path="/media/edit/:id" component={MediaEdit} /> @TODO: readd when the api supports putting media */}
                  <Route path="/media/create" component={MediaCreate} />
                  <Route path="/themes/list" component={ThemesList} />
                  <Route path="/themes/edit/:id" component={ThemeEdit} />
                  <Route path="/themes/create" component={ThemeCreate} />
                  <Route path="/users/" component={UserList} />
                  <Route path="/user/:id" component={EditUser} />
                  <Redirect from="/" to="/slide/list" exact />
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
