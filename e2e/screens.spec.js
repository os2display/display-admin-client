import { test, expect } from "@playwright/test";

test.describe("Screen list tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/screen/list");
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
    await page.route("**/screens*", async (route) => {
      const json = {
        "@id": "/v2/screens",
        "hydra:member": [
          {
            "@type": "Screen",
            "@id": "/v2/screens/00APXK73HQ11PM0X3P12EG14DZ",
            title: "Ab eos dolorum minima inventore.",
            description:
              "Non inventore ab vitae. Voluptatem assumenda aliquam sunt nulla sint corrupti et. Nihil consectetur facere cum modi aliquid. Non aut voluptas voluptas laudantium.",
            size: "42",
            created: "1981-09-01T17:22:18+02:00",
            modified: "2021-12-09T12:01:33+01:00",
            modifiedBy: "",
            createdBy: "",
            layout: "/v2/layouts/009S1H8VER00GK086N0M1J16K9",
            location:
              "Natus aut est eveniet deleniti nihil voluptatum. Accusamus similique adipisci at qui molestiae quia nihil eligendi. Delectus repellendus ut asperiores ut debitis.",
            regions: [],
            inScreenGroups: "/v2/screens/00APXK73HQ11PM0X3P12EG14DZ/groups",
            dimensions: {
              width: 1920,
              height: 1200,
            },
          },
          {
            "@type": "Screen",
            "@id": "/v2/screens/00AYESM1AR002E0YKH0JQ70185",
            title: "Accusantium aperiam mollitia consectetur.",
            description:
              "Asperiores id aut temporibus expedita quia rem. Sunt possimus voluptas voluptas exercitationem. Totam odio necessitatibus aut velit. Nisi est voluptates suscipit rerum perspiciatis.",
            size: "55",
            created: "1981-12-04T09:31:11+01:00",
            modified: "2021-12-09T12:01:33+01:00",
            modifiedBy: "",
            createdBy: "",
            layout: "/v2/layouts/009S1H8VER00GK086N0M1J16K9",
            location:
              "Occaecati beatae iure molestias sapiente nihil. Tempore quo quibusdam odit quia.",
            regions: [],
            inScreenGroups: "/v2/screens/00AYESM1AR002E0YKH0JQ70185/groups",
            dimensions: {
              width: 1920,
              height: 1200,
            },
          },
        ],
      };

      await route.fulfill({ json });
    });
    await expect(page).toHaveTitle(/OS2Display admin/);
    await page.getByLabel("Email").fill("johndoe@example.com");
    await page.getByLabel("Kodeord").fill("password");
    await page.locator("#login").click();
  });

  test("It loads screens list", async ({ page }) => {
    await expect(page.locator("table").locator("tbody")).not.toBeEmpty();
    await expect(page.locator("tbody").locator("tr td")).toHaveCount(14);
  });

  test("It goes to screen edit", async ({ page }) => {
    await page.route("**/screens/*", async (route) => {
      const json = {
        "@id": "/v2/screens/00APXK73HQ11PM0X3P12EG14DZ",
        title: "Ab eos dolorum minima inventore.",
        description:
          "Non inventore ab vitae. Voluptatem assumenda aliquam sunt nulla sint corrupti et. Nihil consectetur facere cum modi aliquid. Non aut voluptas voluptas laudantium.",
        size: "42",
        created: "1981-09-01T17:22:18+02:00",
        modified: "2021-12-09T12:01:33+01:00",
        modifiedBy: "",
        createdBy: "",
        layout: "/v2/layouts/009S1H8VER00GK086N0M1J16K9",
        location:
          "Natus aut est eveniet deleniti nihil voluptatum. Accusamus similique adipisci at qui molestiae quia nihil eligendi. Delectus repellendus ut asperiores ut debitis.",
        regions: [],
        inScreenGroups: "/v2/screens/00APXK73HQ11PM0X3P12EG14DZ/groups",
        dimensions: {
          width: 1920,
          height: 1200,
        },
      };

      await route.fulfill({ json });
    });
    await expect(page.locator("#screenTitle")).not.toBeVisible();
    await page.locator("tbody").locator("#edit_button").nth(0).click();
    await expect(page.locator("#screenTitle")).toBeVisible();
  });

  test("The correct amount of column headers loaded", async ({ page }) => {
    await expect(page.locator("thead").locator("th")).toHaveCount(7);
  });
});

test.describe("Screen create tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/screen/create");
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

  test("It loads create screen page", async ({ page }) => {
    await expect(page.locator("#save_screen")).toBeVisible();
  });

  test("It cancels create screen", async ({ page }) => {
    await expect(page.locator("#cancel_screen")).toBeVisible();
    await page.locator("#cancel_screen").click();
    await expect(page.locator("#cancel_screen")).not.toBeVisible();
  });
});
