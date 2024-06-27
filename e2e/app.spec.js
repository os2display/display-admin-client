import { test, expect } from "@playwright/test";

test("Basic app runs", async ({ page }) => {
  await page.goto(
    "/admin/slide/list?published=all&page=1&order=asc&sort=title"
  );

  await page.route("**/slides*", async (route) => {
    const json = {
      "hydra:member": [
        {
          "@id": "/v2/slides/0086TQQC671WHA1S150MMF1Q3T",
          title: "Title on slide",
          description:
            "description",
          created: "1978-12-11T09:47:36.000Z",
          modified: "2021-12-09T12:01:33.000Z",
          modifiedBy: "",
          createdBy: "",
          templateInfo: {
            "@id": "/v2/templates/00MWCNKC4P0X5C0AT70E741E2V",
          },
          theme: "",
          onPlaylists: ["/v2/playlists/00S7ZQK8Y90R351YES1DJN0RKR"],
          duration: 70592,
          published: {
            from: null,
            to: "1989-08-28T18:14:52.000Z",
          },
        },
      ],
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
  await expect(page.getByText("Title on slide")).toBeVisible();
});
