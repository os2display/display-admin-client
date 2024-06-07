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
    resolution: "",
    orientation: "",
  };

  return (
    <div className="p-3">
      <ScreenManager saveMethod="POST" initialState={data} />
    </div>
  );
}

export default ScreenCreate;
