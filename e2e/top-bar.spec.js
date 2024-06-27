import { test, expect } from "@playwright/test";

test.describe("Nav items loads", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/screen/create");
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
    await page.route("**/layouts*", async (route) => {
      const json = {
        "@id": "/v2/layouts",
        "hydra:member": [],
      };
      await route.fulfill({ json });
    });
    await expect(page).toHaveTitle(/OS2Display admin/);
    await page.getByLabel("Email").fill("johndoe@example.com");
    await page.getByLabel("Kodeord").fill("password");
    await page.locator("#login").click();
  });
  test("It loads", async ({ page }) => {
    await expect(page.locator("nav")).toBeVisible();
  });

  test("It navigates to slides list", async ({ page }) => {
    await page.getByRole('link', { name: 'Slides' }).click();
    await expect(page.locator("h1")).toHaveText("Slides");
  });

  test("It navigates to media list", async ({ page }) => {
    await page.getByRole('link', { name: 'Medier' }).click();
    await expect(page.locator("h1")).toHaveText("Medier");
  });

  test("It navigates to screens list", async ({ page }) => {
    await page.getByRole('link', { name: 'Skærme' }).click();
    await expect(page.locator("h1")).toHaveText("Skærme");
  });
  test("It navigates to groups list", async ({ page }) => {
    await page.getByRole('link', { name: 'Grupper' }).click();
    await expect(page.locator("h1")).toHaveText("Grupper");
  });
  test("It navigates to playlists list", async ({ page }) => {
    await page.getByRole('link', { name: 'Spillelister', exact: true  }).click();
    await expect(page.locator("h1")).toHaveText("Spillelister");
  });
  test("It navigates to themes list", async ({ page }) => {
    await page.getByRole('link', { name: 'Temaer' }).click();
    await expect(page.locator("h1")).toHaveText("Temaer");
  });

  // todo make tests green 
  test.skip("It navigates to create slide", async ({ page }) => {
    await page.goto("/admin/screen/create");
    await page.getByRole('button', { name: 'Tilføj' }).click();
    await page.getByRole('link', { name: 'Nyt slide', exact: true }).click();
    await expect(page.locator("h1")).toHaveText("Opret nyt slide");
  });

  // todo make tests green 
  test.skip("It navigates to create playlist", async ({ page }) => {
    await page.getByRole('button', { name: 'Tilføj' }).click();
    await page.getByRole('link', { name: 'Ny spilleliste' }).click();
    await expect(page.locator("h1")).toHaveText("Opret nyt spilleliste");
  });

  // todo make tests green 
  test.skip("It navigates to create screen", async ({ page }) => {
    await page.getByRole('button', { name: 'Tilføj' }).click();
    await page.getByRole('link', { name: 'Ny skærm' }).click();
    await expect(page.locator("h1")).toHaveText("Opret ny skærm");
  });
  test("It loads different menu on smaller screens", async ({ page }) => {
    await page.setViewportSize({ width: 550, height: 750 });
    await expect(page.locator("#basic-navbar-nav-burger")).toBeVisible();
    await expect(page.locator(".name")).toBeVisible();
    await expect(page.locator("#top-bar-brand")).toBeVisible();
    await expect(page.locator("#sidebar")).not.toBeVisible();
    await expect(page.locator("#topbar_signout")).not.toBeVisible();
    await page.locator("#basic-navbar-nav-burger").click();
    await expect(page.locator("#basic-navbar-nav")).toBeVisible();
    await expect(
      page.locator("#basic-navbar-nav").locator(".nav-item")
    ).toHaveCount(13);
    await expect(
      page.locator("#basic-navbar-nav").locator(".nav-add-new")
    ).toHaveCount(3);
    await expect(
      page.locator("#basic-navbar-nav").locator("#topbar_signout")
    ).toBeVisible();
  });
});
