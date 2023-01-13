import { React } from "react";
import ThemeManager from "./theme-manager";

/**
 * The themes create component.
 *
 * @returns {object} The themes create page.
 */
function ThemeCreate() {
  // Initialize to empty theme object.
  const data = {
    title: "",
    description: "",
    modifiedBy: "",
    createdBy: "",
    cssStyles: "",
    media: [],
  };

  return <ThemeManager saveMethod="POST" initialState={data} />;
}

export default ThemeCreate;
