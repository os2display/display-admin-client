import { test, expect } from "@playwright/test";
import contentString from "../src/components/util/helpers/content-string";

test.describe("Content string", () => {
  test("It creates a string: 'test and test'", async ({ page }) => {
    expect(contentString([{ name: "test" }, { name: "test" }], "and")).toBe(
      "test and test"
    );
  });

  test("It creates a string: 'test, hest or test'", async ({ page }) => {
    expect(
      contentString(
        [{ name: "test" }, { label: "hest" }, { name: "test" }],
        "or"
      )
    ).toBe("test, hest or test");
  });
  test("It creates a string: 'test'", async ({ page }) => {
    expect(contentString([{ name: "test" }], "or")).toBe("test");
  });
});
