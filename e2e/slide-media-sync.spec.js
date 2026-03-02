import { test, expect } from "@playwright/test";
import rebuildMediaFromContent from "../src/components/slide/slide-media-utils";

test.describe("Slide media sync", () => {
  test("It returns media IRIs referenced in content fields", () => {
    const content = {
      mainImage: ["/v2/media/1", "/v2/media/2"],
      backgroundVideo: ["/v2/media/3"],
    };

    const result = rebuildMediaFromContent(content);

    expect(result).toEqual(["/v2/media/1", "/v2/media/2", "/v2/media/3"]);
  });

  test("It excludes TEMP-- IDs that have not been uploaded yet", () => {
    const content = {
      mainImage: ["TEMP--abc123", "/v2/media/1"],
    };

    const result = rebuildMediaFromContent(content);

    expect(result).toEqual(["/v2/media/1"]);
  });

  test("It removes media no longer referenced in any content field", () => {
    const content = {
      mainImage: ["/v2/media/2"],
    };

    const result = rebuildMediaFromContent(content);

    expect(result).toEqual(["/v2/media/2"]);
    expect(result).not.toContain("/v2/media/1");
  });

  test("It returns empty array when all media is removed from content", () => {
    const content = {
      mainImage: [],
      backgroundVideo: ["/v2/media/3"],
    };

    const result = rebuildMediaFromContent(content);

    expect(result).toEqual(["/v2/media/3"]);
  });

  test("It deduplicates media used across multiple content fields", () => {
    const content = {
      mainImage: ["/v2/media/1"],
      thumbnail: ["/v2/media/1"],
    };

    const result = rebuildMediaFromContent(content);

    expect(result).toEqual(["/v2/media/1"]);
  });

  test("It handles non-existent content fields gracefully", () => {
    const content = {};

    const result = rebuildMediaFromContent(content);

    expect(result).toEqual([]);
  });

  test("It handles nested content field paths", () => {
    const content = {
      sections: {
        hero: ["/v2/media/1"],
      },
    };

    const result = rebuildMediaFromContent(content);

    expect(result).toEqual(["/v2/media/1"]);
  });

  test("It ignores non-media content values when scanning top-level keys", () => {
    const content = {
      images: ["/v2/media/1"],
      title: "Some text",
      separator: true,
      contacts: [{ name: "John", image: ["/v2/media/2"], tags: ["news"] }],
    };

    const result = rebuildMediaFromContent(content);

    expect(result).toContain("/v2/media/1");
    expect(result).toContain("/v2/media/2");
    expect(result).not.toContain("news");
  });

  test("It does not include non-media string arrays from content", () => {
    const content = {
      images: ["/v2/media/1"],
      tags: ["news", "sports"],
    };

    const result = rebuildMediaFromContent(content);

    expect(result).toEqual(["/v2/media/1"]);
    expect(result).not.toContain("news");
    expect(result).not.toContain("sports");
  });

  test("It avoids infinite recursion when content contains circular references", () => {
    const circular = { images: ["/v2/media/1"] };
    circular.self = circular; // create an explicit cycle

    expect(() => rebuildMediaFromContent(circular)).not.toThrow();

    const result = rebuildMediaFromContent(circular);
    expect(result).toContain("/v2/media/1");
  });
});
