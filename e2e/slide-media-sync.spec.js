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
});
