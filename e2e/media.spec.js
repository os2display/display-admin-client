import { test, expect } from "@playwright/test";

test.describe("media list tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/media/list");
    await page.route("**/media*", async (route) => {
      const json = {
        "@context": "/contexts/Media",
        "@id": "/v2/media",
        "@type": "hydra:Collection",
        "hydra:member": [
          {
            "@type": "Media",
            "@id": "/v2/media/001AG48FJC1NVA1EW20TSN13BP",
            title: "Laudantium aut exercitationem rerum itaque unde.",
            description:
              "Quia ut iusto dolores reiciendis animi. Magnam aut ut officiis quae. Nostrum magni et dolore dignissimos in totam qui et.",
            license: "Attribution-NonCommercial-NoDerivs License",
            created: "1971-06-13T05:21:39+01:00",
            modified: "2021-12-09T12:01:34+01:00",
            modifiedBy: "",
            createdBy: "",
            media: [],
            assets: {
              type: "image/jpeg",
              uri: "http://api-display-admin-client.local.itkdev.dk/media/test_3.jpg",
              dimensions: {
                height: 3456,
                width: 5184,
              },
              sha: "5a08dbb7fd3a074ed8659694c09cdb94fdb16cb1",
              size: 8945324,
            },
          },
          {
            "@type": "Media",
            "@id": "/v2/media/001AX5W2S909NW0K5A0NVE0NS6",
            title: "Ut eos illum quod.",
            description:
              "Et id est illum veniam eos quam placeat. Maxime ab aut aut fugit. Occaecati ut ea et occaecati repellendus amet. Quia consequuntur quod vel deserunt maiores.",
            license: "Attribution-NoDerivs License",
            created: "1971-06-18T06:59:58+01:00",
            modified: "2021-12-09T12:01:34+01:00",
            modifiedBy: "",
            createdBy: "",
            media: [],
            assets: {
              type: "image/jpeg",
              uri: "http://api-display-admin-client.local.itkdev.dk/media/test_2.jpg",
              dimensions: {
                height: 2592,
                width: 3888,
              },
              sha: "0654506b260c33544d39e5613716ef112ab38c7c",
              size: 4855058,
            },
          },
        ],
        "hydra:totalItems": 100,
      };
      await route.fulfill({ json });
    });
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

  test("It loads media list", async ({ page }) => {
    await expect(page.locator(".media-list")).not.toBeEmpty();
    await expect(page.locator(".media-item")).toHaveCount(2);
  });

  test("It selects images (media-list)", async ({ page }) => {
    await expect(page.locator("#delete_media_button")).toBeDisabled();
    await page.locator(".media-list").locator("input").nth(0).click();
    await expect(
      page.locator(".media-list").locator(".card").first()
    ).toHaveClass(/selected/);
    await expect(page.locator("#delete_media_button")).not.toBeDisabled();
  });

  test("It opens delete modal (media-list)", async ({ page }) => {
    await expect(page.locator("#delete-modal")).not.toBeVisible();
    await page.locator(".media-list").locator("input").nth(0).click();
    await page.locator("#delete_media_button").click();
    await expect(page.locator("#delete-modal")).toBeVisible();
  });
});
