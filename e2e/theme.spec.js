import { test, expect } from "@playwright/test";

test.describe("Theme pages work", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/themes/list");
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
    await expect(page).toHaveTitle(/OS2Display admin/);
    await page.getByLabel("Email").fill("johndoe@example.com");
    await page.getByLabel("Kodeord").fill("password");
    await page.locator("#login").click();
  });

  test("It loads create theme page", async ({ page }) => {
    page.getByText("Opret nyt tema").click();
    await expect(page.locator("#save_theme")).toBeVisible();
  });

  test("It display error toast on save error", async ({ page }) => {
    await page.route("**/themes", async (route) => {
      const json = {
        "@context": "/contexts/Error",
        "@type": "hydra:Error",
        "hydra:title": "An error occurred",
        "hydra:description": "An error occurred",
      };
      await route.fulfill({ status: 500, json });
    });
    page.getByText("Opret nyt tema").click();

    // Displays error toast and stays on page
    await expect(
      page.locator(".Toastify").locator(".Toastify__toast--error")
    ).not.toBeVisible();
    await page.locator("#save_theme").click();
    await expect(
      page.locator(".Toastify").locator(".Toastify__toast--error")
    ).toBeVisible();
    await expect(
      page
        .locator(".Toastify")
        .locator(".Toastify__toast--error")
        .getByText(/An error occurred/)
        .first()
    ).toBeVisible();
    await expect(page).toHaveURL(/themes\/create/);
  });

  test("It cancels create theme", async ({ page }) => {
    page.getByText("Opret nyt tema").click();
    await expect(page.locator("#cancel_theme")).toBeVisible();
    await page.locator("#cancel_theme").click();
    await expect(page.locator("#cancel_theme")).not.toBeVisible();
  });
});
