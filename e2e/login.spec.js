import { test, expect } from "@playwright/test";

test.describe("Login works", () => {
  test("Login one tenant works", async ({ page }) => {
    await page.route("**/token", async (route) => {
      const json = {
        token: "1",
        refresh_token: "2",
        tenants: [
          {
            tenantKey: "ABC",
            title: "ABC Tenant",
            description: "Description",
            roles: ["ROLE_ADMIN"],
          },
        ],
        user: {
          fullname: "John Doe",
          email: "johndoe@example.com",
        },
      };
      await route.fulfill({ json });
    });

    await page.goto("/admin/playlist/list");
    await page.locator("#login").click();
    await expect(page.locator(".name")).toHaveText("John Doe");
  });

  test("Login three tenant works", async ({ page }) => {
    await page.route("**/token", async (route) => {
      const json = {
        token: "1",
        refresh_token: "2",
        tenants: [
          {
            tenantKey: "ABC",
            title: "ABC Tenant",
            description: "Nulla quam ipsam voluptatem cupiditate.",
            roles: ["ROLE_ADMIN"],
          },
          {
            tenantKey: "DEF",
            title: "DEF Tenant",
            description: "Inventore sed libero et.",
            roles: ["ROLE_ADMIN"],
          },
          {
            tenantKey: "XYZ",
            title: "XYC Tenant",
            description: "Itaque quibusdam tempora velit porro ut velit.",
            roles: ["ROLE_ADMIN"],
          },
        ],
        user: {
          fullname: "John Doe",
          email: "johndoe@example.com",
        },
      };
      await route.fulfill({ json });
    });
    await page.goto("/admin/group/list");
    await page.locator("#login").click();
    // Expect dropdown with tenants
    await expect(page.locator(".dropdown-container")).toBeVisible();
  });

  test("Login with tenant that has role editor", async ({ page }) => {
    await page.goto("/admin/playlist/list");
    await page.route("**/token", async (route) => {
      const json = {
        token: "1",
        refresh_token: "2",
        tenants: [
          {
            tenantKey: "ABC",
            title: "ABC Tenant",
            description: "Description",
            roles: ["ROLE_EDITOR"],
          },
        ],
        user: {
          fullname: "John Doe",
          email: "johndoe@example.com",
        },
      };
      await route.fulfill({ json });
    });

    await page.goto("/admin/group/list");
    await page.locator("#login").click();
    await expect(page.locator(".name")).toHaveText("John Doe");
    await expect(page.locator(".sidebar-nav").locator(".nav-item")).toHaveCount(
      4
    );
  });

  test("Role editor should not be able to visit restricted route", async ({
    page,
  }) => {
    await page.goto("/admin/playlist/list");
    await page.route("**/token", async (route) => {
      const json = {
        token: "1",
        refresh_token: "2",
        tenants: [
          {
            tenantKey: "ABC",
            title: "ABC Tenant",
            description: "Description",
            roles: ["ROLE_EDITOR"],
          },
        ],
        user: {
          fullname: "John Doe",
          email: "johndoe@example.com",
        },
      };
      await route.fulfill({ json });
    });
    await page.goto("/admin/shared/list");
    await page.locator("#login").click();
    await expect(page.locator("main").locator("div")).toHaveText(
      "Du har ikke adgang til denne side"
    );
  });
});
