import { React, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import TagList from "./components/tag-list/tag-list";
import Navbar from "./components/navbar/navbar";
import ScreenList from "./components/screen-list/screen-list";
import CategoryList from "./components/category-list/category-list";
import SlidesList from "./components/slides-list/slides-list";
import EditTag from "./components/edit-tag/edit-tag";
import EditScreen from "./components/edit-screen/edit-screen";
import EditCategories from "./components/edit-categories/edit-category";
import GroupsList from "./components/groups-list/groups-list";
import EditGroup from "./components/edit-group/edit-group";
import LocationsList from "./components/locations-list/locations-list";
import EditLocation from "./components/edit-location/edit-location";
import EditSlide from "./components/edit-slide/edit-slide";
import PlaylistsList from "./components/playlists-list/playlists-list";
import EditPlaylist from "./components/edit-playlist/edit-playlist";
import MediaList from "./components/media-list/media-list";
import EditMedia from "./components/edit-media/edit-media";
import "./app.scss";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import common_da from "./translations/da/common.json";

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
        common: common_da,
      },
    },
  });

  return (
    <>
      <I18nextProvider i18n={i18next}>
        <main>
          <Navbar />
          <Switch>
            <Route path="/tags" component={TagList} />
            <Route path="/screens" component={ScreenList} />
            <Route path="/categories" component={CategoryList} />
            <Route path="/locations" component={LocationsList} />
            <Route path="/groups" component={GroupsList} />
            <Route path="/tag/:id" component={EditTag} />
            <Route path="/category/:id" component={EditCategories} />
            <Route path="/group/:id" component={EditGroup} />
            <Route path="/screen/:id" component={EditScreen} />
            <Route path="/location/:id" component={EditLocation} />
            <Route path="/slides" component={SlidesList} />
            <Route path="/playlists" component={PlaylistsList} />
            <Route path="/media-list" component={MediaList} />
            <Route path="/playlist/:id" component={EditPlaylist} />
            <Route path="/slide/:id" component={EditSlide} />
            <Route path="/media/:id" component={EditMedia} />
            <Redirect from="/" to="/tags" exact />
          </Switch>
        </main>
      </I18nextProvider>
    </>
  );
}

export default App;
