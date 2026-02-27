import get from "lodash.get";

/**
 * Rebuild the media array from all content fields that reference media.
 *
 * This ensures that the top-level `media` array (sent to the API as slide_media
 * associations) always matches the media actually referenced in the slide's
 * `content` object.
 *
 * @param {object} content - The slide content object.
 * @param {string[]} mediaFields - Field names in content that hold media refs.
 * @returns {string[]} Deduplicated array of media IRIs.
 */
export default function rebuildMediaFromContent(content, mediaFields) {
  const media = [];
  const fieldsToScan = new Set(mediaFields);

  // Also scan top-level content keys to catch media fields not yet
  // tracked via handleMedia (e.g. on first edit of another field).
  if (content && typeof content === "object") {
    Object.keys(content).forEach((key) => fieldsToScan.add(key));
  }

  fieldsToScan.forEach((fieldName) => {
    const fieldData = get(content, fieldName);
    if (Array.isArray(fieldData)) {
      fieldData.forEach((mediaId) => {
        if (typeof mediaId === "string" && !mediaId.startsWith("TEMP--")) {
          media.push(mediaId);
        }
      });
    }
  });

  return [...new Set(media)];
}
