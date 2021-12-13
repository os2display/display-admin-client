import { React } from "react";
import SideAndTopbarHOC from '../side-and-topbar-hoc/side-and-topbar-hoc';
import SlideManager from "./slide-manager";

/**
 * The slide create component.
 *
 * @returns {object} The slide create page.
 */
function SlideCreate() {
  // If a theme is previously used, chances are they want the same theme.
  let themeInfo = null;
  if (localStorage.getItem("prev-used-theme-id")) {
    themeInfo = localStorage.getItem("prev-used-theme-id");
  }

  // Initialize to empty slide object.
  const data = {
    title: "",
    description: "",
    templateInfo: [],
    theme: themeInfo,
    // Duration defaults to 15s
    content: { duration: 15 },
    media: [],
    published: { from: null, to: null },
  };

  return <SlideManager saveMethod="POST" initialState={data} />;
}

export default SideAndTopbarHOC(SlideCreate);
