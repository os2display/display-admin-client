import { React } from "react";
import SlideManager from "./slide-manager";

/**
 * The slide create component.
 *
 * @returns {object} The slide create page.
 */
function SlideCreate() {
  // Initialize to empty slide object.
  const data = {
    title: "",
    description: "",
    templateInfo: [],
    duration: null,
    content: {},
    media: [],
    published: { from: null, to: null },
  };

  return (
    <>
      {<SlideManager saveMethod={'POST'} initialState={data} />}
    </>
  );
}

export default SlideCreate;
