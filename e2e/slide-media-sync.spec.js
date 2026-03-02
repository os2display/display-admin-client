import { test, expect } from "@playwright/test";
import rebuildMediaFromContent from "../src/components/slide/slide-media-utils";

test.describe("Slide media sync", () => {
  test("It returns media IRIs referenced in content fields", () => {
    const content = {
      mainImage: ["/v2/media/1", "/v2/media/2"],
      backgroundVideo: ["/v2/media/3"],
    };
    const mediaFields = ["mainImage", "backgroundVideo"];

    const result = rebuildMediaFromContent(content, mediaFields);

    expect(result).toEqual(["/v2/media/1", "/v2/media/2", "/v2/media/3"]);
  });

  test("It excludes TEMP-- IDs that have not been uploaded yet", () => {
    const content = {
      mainImage: ["TEMP--abc123", "/v2/media/1"],
    };
    const mediaFields = ["mainImage"];

    const result = rebuildMediaFromContent(content, mediaFields);

    expect(result).toEqual(["/v2/media/1"]);
  });

  test("It removes media no longer referenced in any content field", () => {
    // This is the core bug fix scenario: media/1 was previously in mainImage
    // but has been replaced by media/2. The rebuilt array must NOT contain
    // media/1 since it is no longer in any content field.
    const content = {
      mainImage: ["/v2/media/2"],
    };
    const mediaFields = ["mainImage"];

    const result = rebuildMediaFromContent(content, mediaFields);

    expect(result).toEqual(["/v2/media/2"]);
    expect(result).not.toContain("/v2/media/1");
  });

  test("It returns empty array when all media is removed from content", () => {
    // Second bug fix scenario: clearing one media field used to wipe all
    // media including those from other fields. Now it correctly rebuilds
    // from all fields.
    const content = {
      mainImage: [],
      backgroundVideo: ["/v2/media/3"],
    };
    const mediaFields = ["mainImage", "backgroundVideo"];

    const result = rebuildMediaFromContent(content, mediaFields);

    expect(result).toEqual(["/v2/media/3"]);
  });

  test("It deduplicates media used across multiple content fields", () => {
    const content = {
      mainImage: ["/v2/media/1"],
      thumbnail: ["/v2/media/1"],
    };
    const mediaFields = ["mainImage", "thumbnail"];

    const result = rebuildMediaFromContent(content, mediaFields);

    expect(result).toEqual(["/v2/media/1"]);
  });

  test("It handles non-existent content fields gracefully", () => {
    const content = {};
    const mediaFields = ["mainImage"];

    const result = rebuildMediaFromContent(content, mediaFields);

    expect(result).toEqual([]);
  });

  test("It handles nested content field paths", () => {
    const content = {
      sections: {
        hero: ["/v2/media/1"],
      },
    };
    const mediaFields = ["sections.hero"];

    const result = rebuildMediaFromContent(content, mediaFields);

    expect(result).toEqual(["/v2/media/1"]);
  });

  test("It includes media from untracked content fields", () => {
    // When only one media field has been touched via handleMedia,
    // mediaFields only contains that field. Media from other content
    // fields must still be included by scanning top-level content keys.
    const content = {
      images: ["/v2/media/1"],
      backgroundImage: ["/v2/media/2"],
    };
    const mediaFields = ["images"]; // only images was touched

    const result = rebuildMediaFromContent(content, mediaFields);

    expect(result).toContain("/v2/media/1");
    expect(result).toContain("/v2/media/2");
  });

  test("It ignores non-media content values when scanning top-level keys", () => {
    // Content has both media arrays and plain string/object values.
    // Only string array entries should be picked up as media.
    const content = {
      images: ["/v2/media/1"],
      title: "Some text",
      separator: true,
      contacts: [{ name: "John", image: ["/v2/media/2"] }],
    };
    const mediaFields = [];

    const result = rebuildMediaFromContent(content, mediaFields);

    // images field is picked up via top-level scan
    expect(result).toContain("/v2/media/1");
    // contacts is an array of objects, not strings — objects are skipped
    expect(result).not.toContain("/v2/media/2");
  });

  test("It does not include non-media string arrays from content", () => {
    // Regression: previously any array-of-strings could be treated as media,
    // e.g. tags/categories/etc. Only actual media IRIs should be returned.
    const content = {
      images: ["/v2/media/1"],
      tags: ["news", "sports"],
    };
    const mediaFields = []; // rely on top-level scan

    const result = rebuildMediaFromContent(content, mediaFields);

    expect(result).toEqual(["/v2/media/1"]);
    expect(result).not.toContain("news");
    expect(result).not.toContain("sports");
  });
});
