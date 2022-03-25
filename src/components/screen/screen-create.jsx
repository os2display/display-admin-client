import { React } from "react";
import ScreenManager from "./screen-manager";

/**
 * The screen create component.
 *
 * @returns {object} The screen create page.
 */
function ScreenCreate() {
  // Initialize to empty screen object.
  const data = {
    title: "",
    description: "",
    size: "",
    modifiedBy: "",
    createdBy: "",
    layout: "",
    location: "",
    dimensions: {
      width: 0,
      height: 0,
    },
  };

  return <ScreenManager saveMethod="POST" initialState={data} />;
}

export default ScreenCreate;
