import { React, useEffect } from "react";
/**
 * The media list component.
 *
 * @returns {object}
 * The media list.
 */
function MediaList() {
  /**
   * Load content from fixture.
   */
  useEffect(() => {
    // @TODO load real content.
    fetch(`/fixtures/media/medias.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        setmedia(jsonData);
      });
  }, []);

  return <div>media!</div>;
}

export default MediaList;
