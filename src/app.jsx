import { React, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import { Route, Redirect, Switch } from "react-router-dom";
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
import "./app.scss";

/**
 * App component.
 *
 * @returns {object}
 * The component.
 */
function App() {
  const [translations, setTranslations] = useState();

  /**
   * Imports language strings
   */
  useEffect(() => {
    import("./lang/da.json").then((data) => {
      setTranslations(data);
    });
  }, []);

  return (
    <>
      {translations && (
        <IntlProvider messages={translations} locale="da" defaultLocale="da">
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
              <Redirect from="/" to="/tags" exact />
            </Switch>
          </main>
        </IntlProvider>
      )}
    </>
  );
}

export default App;
