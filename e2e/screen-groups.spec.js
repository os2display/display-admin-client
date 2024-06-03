import { test, expect } from "@playwright/test";

test.describe("Create group page works", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/group/create");
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

  test("It loads create group page", async ({ page }) => {
    await expect(page.locator("#save_group")).toBeVisible();
  });

  test("It redirects on save", async ({ page }) => {
    await page.route("**/screen-groups", async (route) => {
      const json = {
        title: "A laudantium aspernatur qui.",
        description: "Description",
        created: "1991-09-10T22:36:56+02:00",
        modified: "2021-12-09T12:01:33+01:00",
        modifiedBy: "",
        createdBy: "",
      };
      await route.fulfill({ json });
    });

    // Displays success toast and redirects
    await expect(
      page.locator(".Toastify").locator(".Toastify__toast--success")
    ).not.toBeVisible();
    await page.locator("#save_group").click();
    await expect(
      page
        .locator(".Toastify")
        .locator(".Toastify__toast--success")
        .getByText(/gemt/)
        .first()
    ).toBeVisible();
    await expect(page).toHaveURL(/group\/list/);
  });

  test("It cancels create group", async ({ page }) => {
    await expect(page.locator("#cancel_group")).toBeVisible();
    await page.locator("#cancel_group").click();
    await expect(page.locator("#cancel_group")).not.toBeVisible();
  });

  test("It display error toast on save error", async ({ page }) => {
    await page.route("**/screen-groups", async (route) => {
      const json = {
        "@context": "/contexts/Error",
        "@type": "hydra:Error",
        "hydra:title": "An error occurred",
        "hydra:description": "An error occurred",
      };
      await route.fulfill({ status: 500, json });
    });
    // Displays error toast and stays on page
    await expect(
      page.locator(".Toastify").locator(".Toastify__toast--error")
    ).not.toBeVisible();
    await page.locator("#save_group").click();
    await expect(
      page.locator(".Toastify").getByText(/An error occurred/)
    ).toBeVisible();
    await expect(page).toHaveURL(/group\/create/);
  });
});

test.describe("Groups list works", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/group/list");
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

    await page.route("**/screen-groups*", async (route) => {
      const json = {
        "@id": "/v2/screen-groups",
        "hydra:member": [
          {
            "@type": "ScreenGroup",
            "@id": "/v2/screen-groups/000RAH746Q1AD8011Z1JNV06N3",
            title: "Cupiditate et quidem autem iusto.",
            description:
              "Eos quibusdam consectetur nisi consequatur voluptas. Unde maxime sunt quidem magnam. Sed ipsa voluptas qui occaecati ea nobis.",
            created: "1970-10-30T08:30:07+01:00",
            modified: "2021-12-09T12:01:33+01:00",
            modifiedBy: "",
            createdBy: "",
          },
          {
            "@type": "ScreenGroup",
            "@id": "/v2/screen-groups/0012G98YZS0VTK0Z2T02AD1DC3",
            title: "Dignissimos nihil non sit laudantium.",
            description:
              "Maxime dicta magnam est voluptas voluptas. Est omnis expedita harum reprehenderit debitis laboriosam ab omnis. Sed temporibus iste voluptatibus ut qui est non voluptatem.",
            created: "1971-03-05T20:43:43+01:00",
            modified: "2021-12-09T12:01:33+01:00",
            modifiedBy: "",
            createdBy: "",
          },
          {
            "@type": "ScreenGroup",
            "@id": "/v2/screen-groups/001EZQXKKR0P7X0A3119Z016SB",
            title: "Aut nam accusantium id aut.",
            description:
              "Et est nisi autem nihil. Blanditiis facere repellat et. Est et architecto modi laboriosam corporis et.",
            created: "1971-08-07T23:56:38+01:00",
            modified: "2021-12-09T12:01:33+01:00",
            modifiedBy: "",
            createdBy: "",
          },
          {
            "@type": "ScreenGroup",
            "@id": "/v2/screen-groups/003J350X2D060H00TE1DW50640",
            title: "Velit rem commodi necessitatibus eos.",
            description:
              "Non sequi sed fugit. Nihil cumque nesciunt hic recusandae rem suscipit sunt. Nostrum voluptatem ut consequatur non illum.",
            created: "1973-11-18T23:15:03+01:00",
            modified: "2021-12-09T12:01:33+01:00",
            modifiedBy: "",
            createdBy: "",
          },
          {
            "@type": "ScreenGroup",
            "@id": "/v2/screen-groups/003Z784JQS1PNS1RX1003N0NCD",
            title: "Quod esse voluptas ut.",
            description:
              "Deleniti velit est quasi commodi alias est minima. Harum iusto odio aperiam consequatur qui est. Vel ut id aperiam nobis fugiat et modi. Est dolores rerum id sed excepturi et.",
            created: "1974-05-01T02:50:31+01:00",
            modified: "2021-12-09T12:01:33+01:00",
            modifiedBy: "",
            createdBy: "",
          },
          {
            "@type": "ScreenGroup",
            "@id": "/v2/screen-groups/009YS5ZYPH1B9T0JE01S290T5Y",
            title: "Tenetur voluptatem quo rerum exercitationem.",
            description:
              "Suscipit provident odit in eius sed voluptatibus. Neque aut corporis aspernatur quo qui. Inventore nam est sed sed maiores odio.",
            created: "1980-11-05T17:57:30+01:00",
            modified: "2021-12-09T12:01:33+01:00",
            modifiedBy: "",
            createdBy: "",
          },
          {
            "@type": "ScreenGroup",
            "@id": "/v2/screen-groups/00C1V2MX2S02N30EXM163A0E6X",
            title: "Distinctio quisquam et totam molestias.",
            description:
              "Ad ipsam architecto eum repellat excepturi. Quos deleniti itaque ut reprehenderit aut rerum autem. Nihil et mollitia voluptatibus quis voluptatem. Ex eaque sint nostrum impedit.",
            created: "1983-02-17T02:51:45+01:00",
            modified: "2021-12-09T12:01:33+01:00",
            modifiedBy: "",
            createdBy: "",
          },
          {
            "@type": "ScreenGroup",
            "@id": "/v2/screen-groups/00DDTCJCDX0H101N480E180K4B",
            title: "Cumque facere nulla reiciendis.",
            description:
              "Veritatis doloremque delectus voluptas numquam dolores nobis. Dignissimos quo facere eum iure.",
            created: "1984-08-16T16:14:03+02:00",
            modified: "2021-12-09T12:01:33+01:00",
            modifiedBy: "",
            createdBy: "",
          },
          {
            "@type": "ScreenGroup",
            "@id": "/v2/screen-groups/00GEPM6JRX0V2P0YST0JHA03CC",
            title: "Ea aspernatur odit rerum.",
            description:
              "Adipisci tenetur placeat perspiciatis assumenda. Voluptas officiis magnam reprehenderit possimus non. Tempore delectus numquam veritatis harum natus.",
            created: "1987-12-03T16:33:04+01:00",
            modified: "2021-12-09T12:01:33+01:00",
            modifiedBy: "",
            createdBy: "",
          },
          {
            "@type": "ScreenGroup",
            "@id": "/v2/screen-groups/00KXGYAJ4A1D5P0EA11SKF0BG8",
            title: "A laudantium aspernatur qui.",
            description:
              "Non fugiat nobis occaecati. Sed ut velit beatae amet ea esse. Quo dolorem commodi magni at. Illum voluptatem neque nobis et ut. Ad rerum tempore vel commodi suscipit corrupti.",
            created: "1991-09-10T22:36:56+02:00",
            modified: "2021-12-09T12:01:33+01:00",
            modifiedBy: "",
            createdBy: "",
          },
        ],
        "hydra:totalItems": 20,
      };

      await route.fulfill({ json });
    });

    await expect(page).toHaveTitle(/OS2Display admin/);
    await page.getByLabel("Email").fill("johndoe@example.com");
    await page.getByLabel("Kodeord").fill("password");
    await page.locator("#login").click();
  });

  test("It loads groups list", async ({ page }) => {
    await expect(page.locator("table").locator("tbody")).not.toBeEmpty();
    await expect(page.locator("tbody").locator("tr td").first()).toBeVisible();
  });

  test("It goes to edit (groups list)", async ({ page }) => {
    await page.route("**/screen-groups/*", async (route) => {
      const json = {
        "@id": "/v2/screen-groups/00GEPM6JRX0V2P0YST0JHA03CC",
        title: "Ea aspernatur odit rerum.",
        description:
          "Adipisci tenetur placeat perspiciatis assumenda. Voluptas officiis magnam reprehenderit possimus non. Tempore delectus numquam veritatis harum natus.",
        created: "1987-12-03T16:33:04+01:00",
        modified: "2021-12-09T12:01:33+01:00",
        modifiedBy: "",
        createdBy: "",
      };
      await route.fulfill({ json });
    });

    await expect(page.locator("#groupTitle")).not.toBeVisible();
    await page.locator("tbody").locator("tr td a").nth(0).click();
    await expect(page.locator("#groupTitle")).toBeVisible();
  });

  test("It opens delete modal (groups list)", async ({ page }) => {
    await expect(page.locator("#delete-modal")).not.toBeVisible();
    await page.locator("tbody").locator("tr td button").nth(1).click();
    await expect(page.locator("#delete-modal")).toBeVisible();
  });

  test("The correct amount of column headers loaded (groups list)", async ({
    page,
  }) => {
    await expect(page.locator("thead").locator("th")).toHaveCount(5);
  });

  test("It removes all selected", async ({ page }) => {
    await page.locator("tbody").locator("tr td input").nth(0).click();
    expect(
      page.locator("tbody").locator("tr").nth(0).getByRole("checkbox")
    ).toBeChecked();
    await page.locator("#clear-rows-button").click();
    expect(
      page.locator("tbody").locator("tr").nth(0).getByRole("checkbox")
    ).not.toBeChecked();
  });
});
