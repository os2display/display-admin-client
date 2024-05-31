import { test, expect } from "@playwright/test";

test.describe("Campaign pages work", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/campaign/create");
    await page.route("**/slides*", async (route) => {
      const json = {
        "@id": "/v2/slides",
        "hydra:member": [],
        "hydra:totalItems": 100,
        "hydra:view": {
          "@id": "/v2/slides?itemsPerPage=0\u0026title=",
          "@type": "hydra:PartialCollectionView",
        },
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

  test("It loads create campaign page", async ({ page }) => {
    await expect(page.locator("#save_playlist")).toBeVisible();
  });

  test("It removes slide", async ({ page }) => {
    // Intercept slides in dropdown
    await page.route("**/slides*", async (route) => {
      const json = {
        "@id": "/v2/slides",
        "hydra:member": [
          {
            "@type": "Slide",
            "@id": "/v2/slides/00015Y0ZVC18N407JD07SM0YCF",
            title: "Odio quidem ab dolores dolores.",
            description:
              "Accusamus odio atque numquam sunt asperiores ab. Consequatur similique amet velit sit qui doloremque dicta. Ducimus repellat facere odit quia deserunt id quos.",
            created: "1970-01-15T17:36:43.000Z",
            modified: "2021-12-09T12:01:33.000Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v2/templates/000YR9PMQC0GMC1TP90V9N07WX",
              options: [],
            },
            theme: "/v2/themes/01FPFH3WX93S4575W6Q9T8K0Y8",
            onPlaylists: [],
            duration: 107879,
            published: {
              from: null,
              to: null,
            },
            media: [
              "/v2/media/00042YZWK214MP01NA1GF517Q2",
              "/v2/media/00TET3FF6K1Q011N5S12621E4H",
              "/v2/media/01DCA32QJY1BH600BV2H140JDK",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v2/slides/000E7VDT9E0GEJ0W5X040T1CB1",
            title: "Sed ex quo minus doloremque possimus.",
            description:
              "Ipsum quo ipsam rerum ullam labore fugit ut. Repellendus a iusto dolore veritatis. Aut vero assumenda voluptates tempore doloremque expedita pariatur. Sint ducimus qui ducimus asperiores cum.",
            created: "1970-06-27T00:53:51.000Z",
            modified: "2021-12-09T12:01:33.000Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v2/templates/01FGC8EXSE1KCC1PTR0NHB0H3R",
              options: [],
            },
            theme: "",
            onPlaylists: [],
            duration: 80335,
            published: {
              from: "2021-03-19T22:20:54.000Z",
              to: "2021-12-28T06:13:08.000Z",
            },
            media: [
              "/v2/media/009H64MSPN1HEH0DTV2DEV085B",
              "/v2/media/00SC0JP6PV2QYS06R70SS31K68",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v2/slides/001M5VMMV81A6Q1KN10QY90HKE",
            title: "Maxime numquam ducimus quos non.",
            description:
              "Aut ex id earum unde aut itaque vero id. Sunt praesentium harum vel autem.",
            created: "1971-10-11T12:15:35.000Z",
            modified: "2021-12-09T12:01:33.000Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v2/templates/000BGWFMBS15N807E60HP91JCX",
              options: [],
            },
            theme: "",
            onPlaylists: [],
            duration: 21254,
            published: {
              from: null,
              to: null,
            },
            media: ["/v2/media/00YMKGY3FM106Q0SRV077G0KEX"],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v2/slides/001M9W40CC0DQE02DR0PS41J7X",
            title: "Est doloremque culpa et facere.",
            description:
              "Eos voluptatem sint fugiat magni omnis aut ut. Odit quod non rerum dolor. Quis deleniti occaecati perspiciatis et esse dolorum. Impedit sunt dolor dolores.",
            created: "1971-10-13T01:40:56.000Z",
            modified: "2021-12-09T12:01:33.000Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v2/templates/000BGWFMBS15N807E60HP91JCX",
              options: [],
            },
            theme: "",
            onPlaylists: [],
            duration: 60870,
            published: {
              from: "2021-02-26T20:12:10.000Z",
              to: "2021-06-08T05:44:41.000Z",
            },
            media: ["/v2/media/00BBYAKF190NMJ0FH118V91VV7"],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v2/slides/001W87XHKC0CX10P4215RV2K9B",
            title: "Occaecati temporibus dolore maxime tenetur.",
            description:
              "Qui rem inventore non labore quam nihil in. Sunt rerum consequatur possimus cupiditate iure quo sit ratione. Et quis mollitia et.",
            created: "1972-01-19T20:34:13.000Z",
            modified: "2021-12-09T12:01:33.000Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v2/templates/002BAP34VD1EHG0E4J0D2Y00JW",
              options: [],
            },
            theme: "",
            onPlaylists: [],
            duration: 75535,
            published: {
              from: null,
              to: "1996-02-16T00:54:17.000Z",
            },
            media: ["/v2/media/0027FWF7Y014RG0KW9053S1AX6"],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v2/slides/0021MQ8MWP0MXK1NXB1J5918PM",
            title: "Excepturi sed qui.",
            description:
              "Expedita numquam sunt autem nostrum. Sed eos molestiae earum natus. Rerum consectetur et eius illo qui sunt sapiente. Est dolore veritatis cupiditate occaecati.",
            created: "1972-03-26T20:11:47.000Z",
            modified: "2021-12-09T12:01:33.000Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v2/templates/017BG9P0E0103F0TFS17FM016M",
              options: [],
            },
            theme: "",
            onPlaylists: [],
            duration: 92829,
            published: {
              from: "2021-12-29T03:25:23.000Z",
              to: null,
            },
            media: ["/v2/media/001AX5W2S909NW0K5A0NVE0NS6"],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v2/slides/002T3E98DP1KK410PC0F2P037P",
            title: "Voluptate aliquid maxime.",
            description:
              "Veniam labore odit omnis sint. Perferendis amet soluta quo quaerat nihil ex eius error.",
            created: "1973-01-24T19:40:11.000Z",
            modified: "2021-12-09T12:01:33.000Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v2/templates/002BAP34VD1EHG0E4J0D2Y00JW",
              options: [],
            },
            theme: "/v2/themes/01FPFH3WX93S4575W6Q9T8K0YN",
            onPlaylists: [],
            duration: 41589,
            published: {
              from: null,
              to: "1989-10-31T03:15:44.000Z",
            },
            media: [
              "/v2/media/00CX9N9EJE10WT1PVM10G51N13",
              "/v2/media/016HWRGVWJ170F1AF2099T13JW",
              "/v2/media/01DCA32QJY1BH600BV2H140JDK",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v2/slides/00367HAGPF0XZA1SDN1ECH1NZX",
            title: "Non ut nobis reprehenderit pariatur.",
            description:
              "Iste asperiores reprehenderit et mollitia et. Molestias iusto repudiandae a qui accusantium nam vel nesciunt.",
            created: "1973-06-24T12:58:37.000Z",
            modified: "2021-12-09T12:01:33.000Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v2/templates/000YR9PMQC0GMC1TP90V9N07WX",
              options: [],
            },
            theme: "",
            onPlaylists: [],
            duration: 106091,
            published: {
              from: "2022-01-11T14:56:13.000Z",
              to: "2022-02-05T09:10:20.000Z",
            },
            media: ["/v2/media/00F1M5J6BY1GS517RP1T1B1306"],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v2/slides/0039BTMNG61RJ606WT1QYN1X2K",
            title: "Iusto aut et dicta neque.",
            description:
              "Nihil esse quisquam aut aliquid velit vitae. Dignissimos sit eos voluptatem corporis qui. Maxime qui eaque magni dolor et. Dolorem est velit qui ratione iure provident architecto.",
            created: "1973-08-02T11:45:30.000Z",
            modified: "2021-12-09T12:01:33.000Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v2/templates/016MHSNKCH1PQW1VY615JC19Y3",
              options: [],
            },
            theme: "/v2/themes/01FPFH3WX93S4575W6Q9T8K0YB",
            onPlaylists: [],
            duration: 79809,
            published: {
              from: "2021-08-10T06:26:30.000Z",
              to: "2021-08-12T15:26:21.000Z",
            },
            media: ["/v2/media/011ZBTXPF8123R1BA31CQR18HA"],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v2/slides/00446YF1RP0KZH0WQK1QJM1S4T",
            title: "Inventore non nisi odit voluptatem et.",
            description:
              "Et in eum fugit culpa mollitia sunt. Et cupiditate molestias quia sapiente sint maxime qui. Beatae ad quod sed provident quas expedita exercitationem enim. Pariatur illo nam consequatur.",
            created: "1974-07-02T03:19:57.000Z",
            modified: "2021-12-09T12:01:33.000Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v2/templates/017BG9P0E0103F0TFS17FM016M",
              options: [],
            },
            theme: "/v2/themes/01FPFH3WXAX8JMJTQHBV2BYEDM",
            onPlaylists: [],
            duration: 37983,
            published: {
              from: "2022-01-24T16:30:24.000Z",
              to: "2022-02-05T09:19:31.000Z",
            },
            media: [
              "/v2/media/0010X8D6JJ03G50T1J1FCW1XH6",
              "/v2/media/00F1M5J6BY1GS517RP1T1B1306",
              "/v2/media/00KXYB7Z291JXC1SY30G161HQD",
            ],
            content: [],
          },
        ],
        "hydra:totalItems": 60,
      };
      await route.fulfill({ json });
    });

    // Pick slide
    await page
      .locator("#slides-section")
      .locator(".dropdown-container")
      .nth(0)
      .press("Enter");
    await page
      .locator("#slides-section")
      .locator(".search")
      .locator('[type="text"]')
      .fill("d");
    await page
      .locator("#slides-section")
      .locator('[type="checkbox"]')
      .nth(1)
      .check();
    await page
      .locator("#slides-section")
      .locator(".dropdown-container")
      .nth(0)
      .click();
    await expect(
      page.locator("#slides-section").locator("tbody").locator("tr td")
    ).toHaveCount(7);

    // Remove slide
    await page
      .locator("#slides-section")
      .locator("tbody")
      .locator(".remove-from-list")
      .click();
    await expect(
      page.locator("#slides-section").locator("tbody")
    ).not.toBeVisible();
  });

  test("It cancels create campaign", async ({ page }) => {
    await expect(page.locator("#cancel_playlist")).toBeVisible();
    await page.locator("#cancel_playlist").click();
    await expect(page.locator("#cancel_playlist")).not.toBeVisible();
  });
});
