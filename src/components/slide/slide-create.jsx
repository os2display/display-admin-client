import { React, useContext } from "react";
import SlideManager from "./slide-manager";
import localStorageKeys from "../util/local-storage-keys";
import UserContext from "../../context/user-context";

/**
 * The slide create component.
 *
 * @returns {object} The slide create page.
 */
function SlideCreate() {
  // Context
  const context = useContext(UserContext);

  // If a theme is previously used, chances are they want the same theme.
  let themeInfo = null;
  if (localStorage.getItem(localStorageKeys.THEME)) {
    const prevSelectedThemes = JSON.parse(
      localStorage.getItem(localStorageKeys.THEME)
    );
    themeInfo =
      prevSelectedThemes[context.selectedTenant.get.tenantKey] || null;
  }

  // Initialize to empty slide object.
  const data = {
    title: "",
    description: "",
    templateInfo: [],
    theme: themeInfo,
    content: {},
    media: [],
    published: { from: new Date(), to: null },
  };

  return <SlideManager saveMethod="POST" initialState={data} />;
}

export default SlideCreate;
