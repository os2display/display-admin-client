import { test, expect } from "@playwright/test";

test.describe("Create slide page works", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/slide/create");
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
    await page.route("**/templates?itemsPerPage*", async (route) => {
      const json = {
        "@id": "/v2/templates",
        "hydra:member": [
          {
            "@type": "Template",
            "@id": "/v2/templates/00XZXR5XDH0D1M16K10NYQ0A55",
            title: "Est totam provident sunt.",
            description:
              "Tempora qui minus officia quis consequuntur voluptates. Quasi minima eveniet repudiandae laborum dolor quasi totam qui. Iusto enim inventore molestias amet aut.",
            created: "2002-08-30T14:14:07+02:00",
            modified: "2021-12-09T12:01:33+01:00",
            modifiedBy: "",
            createdBy: "",
            resources: {
              admin:
                "http://www.harber.com/atque-inventore-consequatur-mollitia-ducimus-veritatis-doloribus-ad",
              schema: "http://www.kulas.net/quia-unde-quos-error-modi-saepe",
              component: "http://keebler.com/",
              assets: {
                type: "css",
                url: "https://www.borer.biz/voluptas-blanditiis-et-quo-aut-culpa-reiciendis-dolorum",
              },
              options: {
                fade: true,
              },
              content: {
                text: "Accusantium exercitationem animi qui provident ipsa distinctio.",
              },
            },
          },
          {
            "@type": "Template",
            "@id": "/v2/templates/016MHSNKCH1PQW1VY615JC19Y3",
            title: "Ut exercitationem est quia ad quas.",
            description:
              "Laborum quod ut ducimus suscipit quia nostrum. Saepe ex voluptas aut. Sit numquam vel est sunt. Cupiditate excepturi non saepe in voluptatem vel rem quaerat. Magni aut eaque vel deleniti.",
            created: "2012-01-28T09:17:22+01:00",
            modified: "2021-12-09T12:01:33+01:00",
            modifiedBy: "",
            createdBy: "",
            resources: {
              admin:
                "https://vandervort.com/sapiente-quo-est-rerum-nihil-sint-placeat-ipsa-id.html",
              schema:
                "http://www.gulgowski.com/debitis-voluptatem-earum-sed-totam-aut-impedit-facere",
              component:
                "https://lehner.com/officia-ducimus-ea-beatae-eum-amet-provident-sint.html",
              assets: {
                type: "css",
                url: "http://www.emmerich.net/aliquam-excepturi-id-et-ab-voluptate.html",
              },
              options: {
                fade: true,
              },
              content: {
                text: "Ut qui assumenda ex vel quod dolorem perspiciatis eos quis.",
              },
            },
          },
          {
            "@type": "Template",
            "@id": "/v2/templates/017X81AEJV2GJE0NC51KKK0EK8",
            title: "Delectus magnam repudiandae molestiae et a.",
            description:
              "Consequuntur est ut commodi sed. Fugiat repellat harum assumenda sed illo voluptatem nobis fugit. At vero consequatur ut dignissimos. Et inventore ipsam ullam ullam dolor debitis quo saepe.",
            created: "2013-06-17T03:02:15+02:00",
            modified: "2021-12-09T12:01:33+01:00",
            modifiedBy: "",
            createdBy: "",
            resources: {
              admin: "http://www.ratke.com/libero-provident-nihil-minus-alias",
              schema: "http://murazik.biz/",
              component:
                "http://kuhlman.biz/inventore-iure-tempora-perspiciatis-repudiandae-numquam-veniam-sequi-dolorem.html",
              assets: {
                type: "css",
                url: "http://dibbert.biz/eius-et-non-autem",
              },
              options: {
                fade: true,
              },
              content: {
                text: "Praesentium at porro aut corporis quis in quia asperiores sed sit.",
              },
            },
          },
        ],
        "hydra:totalItems": 12,
      };

      await route.fulfill({ json });
    });
    await expect(page).toHaveTitle(/OS2Display admin/);
    await page.getByLabel("Email").fill("johndoe@example.com");
    await page.getByLabel("Kodeord").fill("password");
    await page.locator("#login").click();
  });

  test("It loads create slide page", async ({ page }) => {
    await expect(page.locator("#save_slide")).toBeVisible();
  });

  test("It display error toast on save error", async ({ page }) => {
    await page.route("**/slides", async (route) => {
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
    await page.locator("#save_slide").click();
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
    await expect(page).toHaveURL(/slide\/create/);
  });

  test("It cancels create slide", async ({ page }) => {
    await expect(page.locator("#cancel_slide")).toBeVisible();
    await page.locator("#cancel_slide").click();
    await expect(page.locator("#cancel_slide")).not.toBeVisible();
  });
});

test.describe("Slides list works", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/slide/list");
    await page.route("**/slides*", async (route) => {
      const json = {
        "@id": "/v2/slides",
        "hydra:member": [
          {
            "@id": "/v2/slides/0086TQQC671WHA1S150MMF1Q3T",
            title: "Adipisci vero quia.",
            description:
              "Dolores porro ex sed consectetur dolorem aspernatur. Recusandae voluptatem non a aut. Tenetur optio aut fugit reprehenderit. Non dolorum temporibus possimus iure aut quas.",
            created: "1978-12-11T09:47:36.000Z",
            modified: "2021-12-09T12:01:33.000Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v2/templates/00MWCNKC4P0X5C0AT70E741E2V",
              options: [],
            },
            theme: "",
            onPlaylists: ["/v2/playlists/00S7ZQK8Y90R351YES1DJN0RKR"],
            duration: 70592,
            published: {
              from: null,
              to: "1989-08-28T18:14:52.000Z",
            },
            media: ["/v2/media/00W2E6VC0V22QK1WYH0CMP151C"],
          },
          {
            "@id": "/v2/slides/00BEFT32281WT51SNJ0JXA11AV",
            title: "Alias et id consequatur.",
            description:
              "Beatae reiciendis provident eos est totam repudiandae molestiae. Qui itaque officiis quibusdam. A nisi minus dolorum excepturi. Atque molestiae non velit ipsum consequatur nisi.",
            created: "1982-06-21T15:09:47.000Z",
            modified: "2021-12-09T12:01:33.000Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v2/templates/00PXXK8ND01SRF18YH1WN004VA",
              options: [],
            },
            theme: "/v2/themes/01FPFH3WX93S4575W6Q9T8K0YB",
            onPlaylists: [],
            duration: 40787,
            published: {
              from: "2021-03-12T18:12:47.000Z",
              to: "2021-05-20T08:42:21.000Z",
            },
            media: [
              "/v2/media/0010X8D6JJ03G50T1J1FCW1XH6",
              "/v2/media/0043AB9VWE08071MNB08Q20JSG",
              "/v2/media/009RGQK5AD19K21CZE11HC1DPX",
              "/v2/media/00HM3QQ61107C41D7M0W2B1CEK",
              "/v2/media/01BTDHQH3Z06N40M9V0TJ41YA8",
            ],
          },
          {
            "@id": "/v2/slides/00BCX948J60YCR1TC009A31MPQ",
            title: "Amet impedit eum quia quo.",
            description:
              "Quis nostrum voluptatum quam aut sint enim. Ut sed occaecati deserunt accusantium. Cupiditate et voluptatum ex quidem. Nobis rerum consequatur fugiat occaecati voluptas et.",
            created: "1982-06-02T00:11:19.000Z",
            modified: "2021-12-09T12:01:33.000Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v2/templates/000YR9PMQC0GMC1TP90V9N07WX",
              options: [],
            },
            theme: "",
            onPlaylists: [],
            duration: 4902,
            published: {
              from: null,
              to: null,
            },
            media: [
              "/v2/media/00007SBZ470CJ60C7J06H508R8",
              "/v2/media/004MDCEC451GPJ1DW80D1Z026F",
            ],
          },
          {
            "@id": "/v2/slides/000AGMKXFZ0QWX0V5013R80S3S",
            title: "Aperiam maxime autem.",
            description:
              "Ea laboriosam rerum voluptatem. Quos odit veniam cum. Quia non expedita non facere id eum nesciunt. Fugit dolorum ipsa aspernatur.",
            created: "1970-05-11T17:45:13.000Z",
            modified: "2021-12-09T12:01:33.000Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v2/templates/018A0WH44D0X1N176Z16CC0HJP",
              options: [],
            },
            theme: "",
            onPlaylists: [],
            duration: 85133,
            published: {
              from: "2021-08-13T23:56:36.000Z",
              to: null,
            },
            media: [
              "/v2/media/00CGESC8E10CZA11EV2AYR1KWC",
              "/v2/media/00HM3QQ61107C41D7M0W2B1CEK",
              "/v2/media/01DCA32QJY1BH600BV2H140JDK",
            ],
          },
          {
            "@id": "/v2/slides/014FR06WMH05WP17B71Q6Z1K7R",
            title: "Architecto dolores facilis et.",
            description:
              "Aspernatur doloremque et perferendis dolorum hic. Ab vel praesentium non pariatur. Omnis ut magni voluptas et. Ducimus harum sed beatae labore.",
            created: "2009-09-25T07:04:00.000Z",
            modified: "2021-12-09T12:01:33.000Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v2/templates/00HH42EEHC05QT14VQ041R1KEY",
              options: [],
            },
            theme: "",
            onPlaylists: ["/v2/playlists/00S7ZQK8Y90R351YES1DJN0RKR"],
            duration: 11240,
            published: {
              from: "2020-12-24T06:17:03.000Z",
              to: null,
            },
            media: ["/v2/media/000NDA6BBM1A071RNN0SP40XNJ"],
          },
          {
            "@id": "/v2/slides/00J96KHGSC1HPH0VHW1FSX0CVD",
            title: "Assumenda quaerat sint nihil perspiciatis.",
            description:
              "Eaque quaerat voluptas vitae rerum numquam dolore explicabo. Quas error voluptates quo est vel. Odit cum illum qui aut iure ipsum officiis.",
            created: "1989-11-29T16:39:50.000Z",
            modified: "2021-12-09T12:01:33.000Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v2/templates/001R8FR6VC10G51B200TK60QP3",
              options: [],
            },
            theme: "/v2/themes/01FPFH3WX93S4575W6Q9T8K0YN",
            onPlaylists: [],
            duration: 81995,
            published: {
              from: "2021-11-26T14:53:28.000Z",
              to: null,
            },
            media: [
              "/v2/media/009H64MSPN1HEH0DTV2DEV085B",
              "/v2/media/00H1A2WZ1A06BK0W781ETS1EXZ",
              "/v2/media/01BBCV60M903YC07RP09VN1JBZ",
            ],
          },
          {
            "@id": "/v2/slides/00FTMVQRPS18QD0MBY0RQ30FP0",
            title: "Atque nulla explicabo beatae.",
            description:
              "Repudiandae sapiente voluptatibus dolores voluptatem. Recusandae quia iste voluptates tempora fuga aliquam aut hic.",
            created: "1987-03-29T10:52:22.000Z",
            modified: "2021-12-09T12:01:33.000Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v2/templates/01F8MJT0AV24D602FN131008YY",
              options: [],
            },
            theme: "/v2/themes/01FPFH3WX93S4575W6Q9T8K0Y9",
            onPlaylists: [],
            duration: 32646,
            published: {
              from: "2021-09-04T10:08:04.000Z",
              to: "2021-10-27T01:46:23.000Z",
            },
            media: [
              "/v2/media/000NDA6BBM1A071RNN0SP40XNJ",
              "/v2/media/003M4E1AQG052J0HPM1X670P4F",
              "/v2/media/009RF9AGF80QP60ECM0CY01A1Y",
              "/v2/media/00QWNXTD5X0VSF1EWQ1H7H0YS2",
            ],
          },
          {
            "@id": "/v2/slides/008J6BKZMA0YHM04S813NF0DZV",
            title: "Atque quis aut qui veritatis.",
            description:
              "Dolore expedita labore praesentium beatae. Labore maiores est voluptates cupiditate praesentium. Maiores est dolorem iusto.",
            created: "1979-05-01T14:59:35.000Z",
            modified: "2021-12-09T12:01:33.000Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v2/templates/011763DN4P0FRS1T6B09180KCW",
              options: [],
            },
            theme: "",
            onPlaylists: ["/v2/playlists/01EDTHWKBM0TR3035E0Z631B8E"],
            duration: 86942,
            published: {
              from: "2020-12-26T12:37:10.000Z",
              to: null,
            },
            media: [
              "/v2/media/00JBVT18N31VBA0S3805CN03MC",
              "/v2/media/016SXZGDJR0T321KYJ19B91N1Z",
              "/v2/media/01795VPQZX0GNM00T11JJ71BS8",
            ],
          },
          {
            "@id": "/v2/slides/0118GD1EXJ1CSM1BHW0P7K1KQG",
            title: "Aut odio illum et.",
            description:
              "Voluptatibus dicta dolor suscipit eos. Voluptate atque quia quo blanditiis sint est odio. Voluptatum expedita ipsa ut et placeat laborum. Modi molestias quibusdam sunt ratione nulla sit.",
            created: "2006-03-22T07:17:31.000Z",
            modified: "2021-12-09T12:01:33.000Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v2/templates/000AT4BWMM1GJZ17WE1M9M0RFB",
              options: [],
            },
            theme: "/v2/themes/01FPFH3WX93S4575W6Q9T8K0YB",
            onPlaylists: [],
            duration: 104864,
            published: {
              from: "2021-03-27T10:02:38.000Z",
              to: null,
            },
            media: [
              "/v2/media/002B3H5Z2K10M211AK1ERC02PM",
              "/v2/media/00XA10EH8H0YYY1H4B1CC40SSA",
            ],
          },
          {
            "@id": "/v2/slides/0151GSJGTE1JSE032C14JR0CQ2",
            title: "Aut qui placeat consequatur aut.",
            description:
              "Officiis sit adipisci exercitationem ut vero nihil iste voluptas. Temporibus aut saepe rerum sint. Soluta perferendis aliquid voluptatem eos.",
            created: "2010-05-04T04:35:53.000Z",
            modified: "2021-12-09T12:01:33.000Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v2/templates/01F8MJT0AV24D602FN131008YY",
              options: [],
            },
            theme: "",
            onPlaylists: [],
            duration: 28141,
            published: {
              from: "2020-12-14T13:20:43.000Z",
              to: "2021-02-11T10:45:45.000Z",
            },
            media: [
              "/v2/media/00KXYB7Z291JXC1SY30G161HQD",
              "/v2/media/01ENQN7X2F0ANK1BNA0J3513JX",
            ],
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

  test("It loads slides list", async ({ page }) => {
    await expect(page.locator("table").locator("tbody")).not.toBeEmpty();
    await expect(page.locator("tbody").locator("tr td").first()).toBeVisible();
  });

  test("It goes to edit (slides list)", async ({ page }) => {
    await page.route("**/slides/*", async (route) => {
      const json = {
        "@id": "/v2/slides/000622HP9N1G5P1CMD035H159G",
        title: "Aut consequatur excepturi ut totam aspernatur.",
        description:
          "Et aut harum aut est. Et hic et totam. Possimus veritatis nemo sit repellat dolorem. Distinctio id voluptates laborum voluptas voluptas repellat.",
        created: "1970-03-17T08:57:16.000Z",
        modified: "2022-01-30T15:42:42.000Z",
        modifiedBy: "",
        createdBy: "",
        templateInfo: {
          "@id": "/v2/templates/00EPSCBVJS0TB0118C1JPM1VPM",
          options: [],
        },
        theme: "/v2/themes/01FTNTE789TEPTT7MC3TYM91JJ",
        onPlaylists: [],
        duration: 9834,
        published: {
          from: "2021-06-02T16:19:12.000Z",
          to: "2021-06-14T01:24:17.000Z",
        },
        media: ["/v2/media/014BH0252D18481TYB050J1WD9"],
        content: [],
        feed: null,
      };
      await route.fulfill({ json });
    });

    await expect(page.locator("#slidesTitle")).not.toBeVisible();
    await page.locator("tbody").locator("#edit_button").nth(0).click();
    await expect(page.locator("#slidesTitle")).toBeVisible();
  });

  test("The correct amount of column headers loaded", async ({ page }) => {
    await expect(page.locator("thead").locator("th")).toHaveCount(7);
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
