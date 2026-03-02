/**
 * Rebuild the media array from all content fields that reference media.
 *
 * This ensures that the top-level `media` array (sent to the API as slide_media
 * associations) always matches the media actually referenced in the slide's
 * `content` object.
 *
 * @param {object} content - The slide content object.
 * @returns {string[]} Deduplicated array of media IRIs.
 */
export default function rebuildMediaFromContent(content) {
  const media = [];

  const mediaIriRegex = /\/v2\/media\/.+/;

  const isMediaIri = (value) =>
    typeof value === "string" &&
    !value.startsWith("TEMP--") &&
    mediaIriRegex.test(value);

  const collectMediaFromValue = (value, seen = new Set()) => {
    // 1) Ignore empty values early (nothing to scan)
    if (value === null || value === undefined) return;

    // 2) If it's a string, it might be a media IRI; validate and collect it
    if (typeof value === "string") {
      if (isMediaIri(value)) media.push(value);
      return;
    }

    // 3) If it's not an object (e.g. number/boolean/function), it cannot contain nested media
    if (typeof value !== "object") return;

    // 4) Defensive guard against circular references:
    //    - JSON content won't have cycles, but runtime objects might.
    //    - If we've seen this object/array already, stop to avoid infinite recursion.
    if (seen.has(value)) return;
    seen.add(value);

    // 5) If it's an array, scan each element (elements can be strings, objects, or more arrays)
    if (Array.isArray(value)) {
      value.forEach((item) => collectMediaFromValue(item, seen));
      return;
    }

    // 6) Otherwise it's a plain object: scan its property values recursively
    Object.values(value).forEach((item) => collectMediaFromValue(item, seen));
  };

  const fieldsToScan = new Set([]);

  // Scan content for media references.
  if (content && typeof content === "object") {
    Object.keys(content).forEach((key) => fieldsToScan.add(key));
  }

  // Scan the entire content object (one traversal)
  collectMediaFromValue(content);

  return [...new Set(media)];
}
