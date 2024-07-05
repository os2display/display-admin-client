import { test, expect } from "@playwright/test";

test.describe("Shared list tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/shared/list");
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
    await page.route("**/playlists*", async (route) => {
      const json = {
        "@context": "/contexts/Playlist",
        "@id": "/v2/playlists",
        "@type": "hydra:Collection",
        "hydra:member": [
          {
            "@type": "Playlist",
            "@id": "/v2/playlists/004ZP1XQ1G1MVZ1T0100YN0MPC",
            title: "Et consequatur voluptatibus dolore ut ut.",
            description:
              "Atque maiores nam in occaecati labore labore inventore quo. Enim nemo totam hic. Ut suscipit id sint sed quia.",
            schedules: [],
            created: "1975-06-08T13:12:49.000Z",
            modified: "2022-01-30T15:42:42.000Z",
            modifiedBy: "",
            createdBy: "",
            slides: "/v2/playlists/004ZP1XQ1G1MVZ1T0100YN0MPC/slides",
            campaignScreens: ["/v2/screens/00TH1ZRMZC141K1DMB1H7J03CS"],
            campaignScreenGroups: [],
            isCampaign: true,
            published: {
              from: "2022-03-23T21:30:21.000Z",
              to: "2022-03-25T12:39:29.000Z",
            },
          },
          {
            "@type": "Playlist",
            "@id": "/v2/playlists/007TM6JDGF1ECH07J10ZHY0S7P",
            title: "Voluptas molestias nemo et.",
            description:
              "Aperiam quam sunt quia qui. Iusto ut deserunt veritatis nobis dolorem. Aliquid quo vel quia.",
            schedules: [],
            created: "1978-07-12T17:43:59.000Z",
            modified: "2022-01-30T15:42:42.000Z",
            modifiedBy: "",
            createdBy: "",
            slides: "/v2/playlists/007TM6JDGF1ECH07J10ZHY0S7P/slides",
            campaignScreens: [],
            campaignScreenGroups: [
              "/v2/screen-groups/00EQWMS5WA1WJE0WD81VF91DFH",
              "/v2/screen-groups/0135RY0QPR1DVF0ZT70YHS1NX3",
              "/v2/screen-groups/0135RY0QPR1DVF0ZT70YHS1NX3",
            ],
            isCampaign: false,
            published: {
              from: "2021-03-21T02:10:37.000Z",
              to: "2021-11-08T12:13:31.000Z",
            },
          },
        ],
        "hydra:totalItems": 2,
      };

      await route.fulfill({ json });
    });
    await expect(page).toHaveTitle(/OS2Display admin/);
    await page.getByLabel("Email").fill("johndoe@example.com");
    await page.getByLabel("Kodeord").fill("password");
    await page.locator("#login").click();
  });

  test("It loads shared playlist list", async ({ page }) => {
    await expect(
      page.locator("table").locator("tbody").first()
    ).not.toBeEmpty();
    await expect(page.locator("tbody").locator("tr td").first()).toBeVisible();
  });

  test("A shared playlist should not be editable or deletable", async ({
    page,
  }) => {
    await expect(page.locator("#delete-button")).not.toBeVisible();
    await expect(page.locator("#clear-rows-button")).toBeDisabled();
    await expect(page.locator("tbody").locator("tr td a")).not.toBeVisible();
    await expect(
      page.locator("tbody").locator("btn btn-danger")
    ).not.toBeVisible();
  });

  test("The correct amount of column headers loaded (shared playlist list)", async ({
    page,
  }) => {
    await expect(page.locator("thead").locator("th")).toHaveCount(3);
  });
});
