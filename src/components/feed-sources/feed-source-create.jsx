import { React } from "react";
import FeedSourceManager from "./feed-source-manager";

/**
 * The themes create component.
 *
 * @returns {object} The themes create page.
 */
function FeedSourceCreate() {
  // Initialize to empty feed source object.
  const data = {
    title: "",
    description: "",
    feedType: "",
    secrets: {},
  };

  return <FeedSourceManager saveMethod="POST" initialState={data} />;
}

export default FeedSourceCreate;
