import { test, expect } from "@playwright/test";

const themesJson = {
  "@context": "/contexts/Theme",
  "@id": "/v2/themes",
  "@type": "hydra:Collection",
  "hydra:member": [
    {
      "@type": "Theme",
      "@id": "/v2/themes/01FTNTE788816N6YCW9NVM2JQB",
      title: "Consequatur quisquam recusandae asperiores accusamus.",
      description:
        "Occaecati debitis et saepe eum sint dolorem. Enim ipsum inventore sed libero et velit qui suscipit. Deserunt laudantium quibusdam enim nostrum soluta qui ipsam non.",
      onSlides: [],
      created: "2022-01-30T15:42:42+01:00",
      modified: "2022-01-30T15:42:42+01:00",
      modifiedBy: "",
      createdBy: "",
      css: "",
    },
    {
      "@type": "Theme",
      "@id": "/v2/themes/01FTNTE788816N6YCW9NVM2JQC",
      title: "Sit vitae voluptas sint non.",
      description:
        "Optio quos qui illo error. Laborum vero a officia id corporis. Saepe provident esse hic eligendi. Culpa ut ab voluptas sed a.",
      onSlides: [
        {
          "@type": "Slide",
          "@id": "/v2/slides/007ZR8C9811R741WAP1KHK0T09",
          title: "Mollitia iure culpa exercitationem.",
          description:
            "Facilis nihil minus vel eum. Ut corrupti dicta quo modi temporibus est.",
          created: "1978-09-14T10:51:02+01:00",
          modified: "2022-01-30T15:42:42+01:00",
          modifiedBy: "",
          createdBy: "",
          templateInfo: {
            "@id": "/v2/templates/017BG9P0E0103F0TFS17FM016M",
            options: [],
          },
          theme: "/v2/themes/01FTNTE788816N6YCW9NVM2JQC",
          onPlaylists: [],
          duration: 92789,
          published: {
            from: "2021-08-04T05:24:19+02:00",
            to: "2021-11-14T19:59:53+01:00",
          },
          media: ["/v2/media/00MTYFFTN30XNZ0F350YM31TN5"],
          content: [],
          feed: null,
        },
        {
          "@type": "Slide",
          "@id": "/v2/slides/00GYC65JP01DEG1F6H0R5Q0JBA",
          title: "Voluptatem recusandae hic.",
          description:
            "Nulla occaecati praesentium quia magni ipsum dolor. Et aliquid natus molestiae ut quis. Ad voluptatum qui consequatur deleniti labore est. Voluptas hic veritatis quidem molestias qui.",
          created: "1988-06-15T11:26:36+02:00",
          modified: "2022-01-30T15:42:42+01:00",
          modifiedBy: "",
          createdBy: "",
          templateInfo: {
            "@id": "/v2/templates/002BAP34VD1EHG0E4J0D2Y00JW",
            options: [],
          },
          theme: "/v2/themes/01FTNTE788816N6YCW9NVM2JQC",
          onPlaylists: [],
          duration: 78938,
          published: {
            from: "2021-10-09T12:14:12+02:00",
            to: "2021-12-24T16:18:08+01:00",
          },
          media: [
            "/v2/media/00YB5658GH0TAE1A1N0XBB0YR7",
            "/v2/media/01CVTNA9Y917EX09MY0FNX0GKA",
            "/v2/media/01E4S5SPXR19MP1KGY16TD1XG2",
          ],
          content: [],
          feed: null,
        },
        {
          "@type": "Slide",
          "@id": "/v2/slides/00V28394SD1WBY1BPE1STN13MD",
          title: "Reprehenderit neque nam mollitia quia.",
          description:
            "Omnis aliquam ea architecto dignissimos. Harum provident asperiores neque consequatur sit sed. Quasi ipsa illum et qui deleniti quo.",
          created: "1999-06-23T10:05:00+02:00",
          modified: "2022-01-30T15:42:42+01:00",
          modifiedBy: "",
          createdBy: "",
          templateInfo: {
            "@id": "/v2/templates/01FGC8EXSE1KCC1PTR0NHB0H3R",
            options: [],
          },
          theme: "/v2/themes/01FTNTE788816N6YCW9NVM2JQC",
          onPlaylists: [],
          duration: 69299,
          published: {
            from: "2021-06-09T03:25:34+02:00",
            to: "2021-11-05T02:30:21+01:00",
          },
          media: ["/v2/media/0041NS3DFY1EMS0XGQ025B0425"],
          content: [],
          feed: null,
        },
      ],
      created: "2022-01-30T15:42:42+01:00",
      modified: "2022-01-30T15:42:42+01:00",
      modifiedBy: "",
      createdBy: "",
      css: "",
    },
    {
      "@type": "Theme",
      "@id": "/v2/themes/01FTNTE788816N6YCW9NVM2JQD",
      title: "Enim ex eveniet facere.",
      description:
        "Delectus aut nam et eum. Fugit repellendus illo veritatis. Ex esse veritatis voluptate vel possimus. Aut incidunt sunt cumque asperiores incidunt iure sequi.",
      onSlides: [
        {
          "@type": "Slide",
          "@id": "/v2/slides/003VYYZPPN1MQ61MEM1TE10G2J",
          title: "Quos ducimus culpa consequuntur nulla aliquid.",
          description:
            "At quia quia voluptatibus eius. Delectus quia consequuntur aut nihil. Impedit sit aut dolorum aut dolore. Dolore beatae ipsa voluptas.",
          created: "1974-03-21T14:49:33+01:00",
          modified: "2022-01-30T15:42:42+01:00",
          modifiedBy: "",
          createdBy: "",
          templateInfo: {
            "@id": "/v2/templates/01FGC8EXSE1KCC1PTR0NHB0H3R",
            options: [],
          },
          theme: "/v2/themes/01FTNTE788816N6YCW9NVM2JQD",
          onPlaylists: ["/v2/playlists/00XVQEW1EV0N3K0JZQ0TYS0T1G"],
          duration: 77194,
          published: {
            from: "2021-07-02T08:33:02+02:00",
            to: "2022-03-12T20:52:07+01:00",
          },
          media: [
            "/v2/media/00GEQ02WW10SZ21F9G1MAZ0KR8",
            "/v2/media/00MTYFFTN30XNZ0F350YM31TN5",
            "/v2/media/00SSYSBFHR16PM09MQ0B0K0202",
            "/v2/media/00X6A9GBZM0EHF05AA0B350D8E",
          ],
          content: [],
          feed: null,
        },
        {
          "@type": "Slide",
          "@id": "/v2/slides/00EBKSK8ZZ0Y301VFR0WGQ05F4",
          title: "Maiores repudiandae quibusdam et rerum.",
          description:
            "At totam ut animi nisi ut ut qui. Aspernatur omnis quod temporibus non quo numquam. Dignissimos non eius numquam neque. Numquam modi tempora minus ad aut aut sit.",
          created: "1985-08-21T22:37:57+02:00",
          modified: "2022-01-30T15:42:42+01:00",
          modifiedBy: "",
          createdBy: "",
          templateInfo: {
            "@id": "/v2/templates/0044JYNRTJ1KD0128318R80B3Q",
            options: [],
          },
          theme: "/v2/themes/01FTNTE788816N6YCW9NVM2JQD",
          onPlaylists: [],
          duration: 66516,
          published: {
            from: "2021-08-30T14:57:29+02:00",
            to: "2021-10-24T12:24:48+02:00",
          },
          media: ["/v2/media/00031XCV6Z1W860V5R0SXB0D6R"],
          content: [],
          feed: null,
        },
        {
          "@type": "Slide",
          "@id": "/v2/slides/00VRS9JQ7C1BZZ1NBA1XE50E19",
          title: "Doloremque cum aliquam quis sint.",
          description:
            "Est quos beatae voluptatem optio et sit. Culpa fugiat quam et quisquam error a. Aut molestias quaerat quia aut non ipsum autem. Sunt aspernatur eos dolores quas alias. Culpa aut maiores consectetur.",
          created: "2000-03-29T12:07:31+02:00",
          modified: "2022-01-30T15:42:42+01:00",
          modifiedBy: "",
          createdBy: "",
          templateInfo: {
            "@id": "/v2/templates/01FGC8EXSE1KCC1PTR0NHB0H3R",
            options: [],
          },
          theme: "/v2/themes/01FTNTE788816N6YCW9NVM2JQD",
          onPlaylists: [],
          duration: 28295,
          published: {
            from: "2022-03-18T13:47:21+01:00",
            to: "2022-03-19T12:34:17+01:00",
          },
          media: [
            "/v2/media/003NVKRN4E183T0C431JF7036P",
            "/v2/media/00C07KS3R00PEV24RF09870SH9",
            "/v2/media/0170X462SF1P3205JP1R6K0553",
          ],
          content: [],
          feed: null,
        },
        {
          "@type": "Slide",
          "@id": "/v2/slides/00X2XD9Y011VB31K2T10JW0NR1",
          title: "Eveniet repellendus et autem repellat.",
          description:
            "Rerum praesentium quo sequi. Accusamus fugiat voluptatem est quam. Esse voluptatem quia fugiat nisi delectus omnis.",
          created: "2001-09-04T01:28:51+02:00",
          modified: "2022-01-30T15:42:42+01:00",
          modifiedBy: "",
          createdBy: "",
          templateInfo: {
            "@id": "/v2/templates/017BG9P0E0103F0TFS17FM016M",
            options: [],
          },
          theme: "/v2/themes/01FTNTE788816N6YCW9NVM2JQD",
          onPlaylists: ["/v2/playlists/007TM6JDGF1ECH07J10ZHY0S7P"],
          duration: 99209,
          published: {
            from: "2021-11-11T07:58:12+01:00",
            to: "2021-11-13T19:36:00+01:00",
          },
          media: [
            "/v2/media/00J8PGYF1N12T60T200QN50KKJ",
            "/v2/media/014S7FGP500Z8P18ZW12631TCP",
            "/v2/media/019PTTMBQB0Z2D05VQ0HVC1M5M",
          ],
          content: [],
          feed: null,
        },
        {
          "@type": "Slide",
          "@id": "/v2/slides/011KV2WHQS0NDK1Q1Q01GY0XPS",
          title: "Harum ducimus reiciendis.",
          description:
            "Est aut quis omnis. Cumque id officiis molestias accusamus est molestias. Nulla qui aut quo sunt et.",
          created: "2006-08-10T03:26:54+02:00",
          modified: "2022-01-30T15:42:42+01:00",
          modifiedBy: "",
          createdBy: "",
          templateInfo: {
            "@id": "/v2/templates/01FGC8EXSE1KCC1PTR0NHB0H3R",
            options: [],
          },
          theme: "/v2/themes/01FTNTE788816N6YCW9NVM2JQD",
          onPlaylists: [],
          duration: 7509,
          published: {
            from: "2021-07-22T07:48:05+02:00",
            to: "2021-09-03T23:11:43+02:00",
          },
          media: [
            "/v2/media/008ARWMTYJ0SX810490JQQ0DAK",
            "/v2/media/00E98GAQXH1Y2C1G131MVH0YWZ",
            "/v2/media/00MTYFFTN30XNZ0F350YM31TN5",
            "/v2/media/0142VZYZ7H0XHE1XJB1M730VGS",
            "/v2/media/015H8MEPVH13BE15A11MHJ0KAM",
          ],
          content: [],
          feed: null,
        },
      ],
      created: "2022-01-30T15:42:42+01:00",
      modified: "2022-01-30T15:42:42+01:00",
      modifiedBy: "",
      createdBy: "",
      css: "",
    },
  ],
  "hydra:totalItems": 20,
};

test.describe("Theme pages work", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/themes/list");
    await page.route("**/themes*", async (route) => {
      await route.fulfill({ json: themesJson });
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

test.describe("Themes list work", () => {
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
    await page.route("**/themes*", async (route) => {
      await route.fulfill({ json: themesJson });
    });
    await expect(page).toHaveTitle(/OS2Display admin/);
    await page.getByLabel("Email").fill("johndoe@example.com");
    await page.getByLabel("Kodeord").fill("password");
    await page.locator("#login").click();
  });

  test("It loads themes list", async ({ page }) => {
    await expect(page.locator("table").locator("tbody")).not.toBeEmpty();
    await expect(page.locator("tbody").locator("tr td").first()).toBeVisible();
  });

  test("It goes to edit", async ({ page }) => {
    await expect(page.locator("#themeTitle")).not.toBeVisible();

    await page.route("**/themes*", async (route) => {
      const json = {
        "@context": "/contexts/Theme",
        "@id": "/v2/themes",
        "@type": "hydra:Collection",
        "hydra:member": [
          {
            "@type": "Theme",
            "@id": "/v2/themes/01FTNTE788816N6YCW9NVM2JQB",
            title: "Consequatur quisquam recusandae asperiores accusamus.",
            description:
              "Occaecati debitis et saepe eum sint dolorem. Enim ipsum inventore sed libero et velit qui suscipit. Deserunt laudantium quibusdam enim nostrum soluta qui ipsam non.",
            onSlides: [],
            created: "2022-01-30T15:42:42+01:00",
            modified: "2022-01-30T15:42:42+01:00",
            modifiedBy: "",
            createdBy: "",
            css: "",
          },
          {
            "@type": "Theme",
            "@id": "/v2/themes/01FTNTE788816N6YCW9NVM2JQC",
            title: "Sit vitae voluptas sint non.",
            description:
              "Optio quos qui illo error. Laborum vero a officia id corporis. Saepe provident esse hic eligendi. Culpa ut ab voluptas sed a.",
            onSlides: [],
            created: "2022-01-30T15:42:42+01:00",
            modified: "2022-01-30T15:42:42+01:00",
            modifiedBy: "",
            createdBy: "",
            css: "",
          },
        ],
        "hydra:totalItems": 2,
      };
      await route.fulfill({ json });
    });

    await page.route("**/themes/*", async (route) => {
      const json = {
        "@type": "Theme",
        "@id": "/v2/themes/01FTNTE788816N6YCW9NVM2JQN",
        title: "Hic minus et omnis porro.",
        description:
          "Odit quia nisi accusantium natus. Ut explicabo corporis eligendi ut. Sapiente ut qui quidem explicabo optio amet velit aut. Iure sed alias asperiores perspiciatis deserunt omnis inventore mollitia.",
        onSlides: [],
        created: "2022-01-30T15:42:42+01:00",
        modified: "2022-01-30T15:42:42+01:00",
        modifiedBy: "",
        createdBy: "",
        css: "",
      };

      await route.fulfill({ json });
    });

    await page.locator("tbody").locator("tr td a").first().click();
    await expect(page.locator("#themeTitle")).toBeVisible();
  });

  test("It opens delete modal", async ({ page }) => {
    await expect(page.locator("#delete-modal")).not.toBeVisible();
    await page
      .locator("tbody")
      .nth(0)
      .locator(".remove-from-list")
      .nth(1)
      .click();
    await expect(page.locator("#delete-modal")).toBeVisible();
  });

  test("The correct amount of column headers loaded", async ({ page }) => {
    await expect(page.locator("thead").locator("th")).toHaveCount(5);
  });
});
