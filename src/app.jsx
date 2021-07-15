import { React, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import { Route, Redirect, Switch } from "react-router-dom";
import TagList from "./components/tag-list/tag-list";
import Navbar from "./components/navbar/navbar";
import ScreenList from "./components/screen-list/screen-list";
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
    <IntlProvider messages={translations} locale="da" defaultLocale="da">
      <main>
        <Navbar />
        <Switch>
          <Route path="/tags" component={TagList} />
          <Route path="/screens" component={ScreenList} />
          <Redirect from="/" to="/tags" exact />
        </Switch>
      </main>
    </IntlProvider>
  );
}

export default App;
