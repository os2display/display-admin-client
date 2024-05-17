describe("Campaign pages work", () => {
  beforeEach(() => {
    cy.visit("/campaign/list");
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.intercept("GET", "**/slides*", {
      body: {
        "@context": "/contexts/Slide",
        "@id": "/v2/slides",
        "@type": "hydra:Collection",
        "hydra:totalItems": 2,
        "hydra:member": [
          {
            "@id": "/v2/slides/01HY0RJQ2RRXQ73D8SNE5BSVS0",
            "@type": "Slide",
            title: "1",
            description: "",
            templateInfo: {
              "@id": "/v2/templates/01HGMA1D9G0GEM01GT06FJ0TCF",
              options: [],
            },
            onPlaylists: ["/v2/playlists/01HY0RWQN1F8JKQ4RNWB8HEGD4"],
            published: {
              from: null,
              to: null,
            },
            media: [],
            content: [],
            modifiedBy: "admin@example.com",
            createdBy: "admin@example.com",
            id: "01HY0RJQ2RRXQ73D8SNE5BSVS0",
            created: "2024-05-16T15:13:34.000Z",
            modified: "2024-05-16T15:13:34.000Z",
            relationsChecksum: {
              templateInfo: "dec7113e453ace5040f6cda2209786ae5ce937a0",
            },
          },
          {
            "@id": "/v2/slides/01HY0RJEQ3Z0Z73ZCFEF8NZ9V6",
            "@type": "Slide",
            title: "2",
            description: "",
            templateInfo: {
              "@id": "/v2/templates/01G369YWBR0XZD0M2H0BGF0F03",
              options: [],
            },
            onPlaylists: ["/v2/playlists/01HY0RWQN1F8JKQ4RNWB8HEGD4"],
            published: {
              from: null,
              to: null,
            },
            media: [],
            content: [],
            modifiedBy: "admin@example.com",
            createdBy: "admin@example.com",
            id: "01HY0RJEQ3Z0Z73ZCFEF8NZ9V6",
            created: "2024-05-16T15:13:25.000Z",
            modified: "2024-05-16T15:13:25.000Z",
            relationsChecksum: {
              templateInfo: "361c589eb586292261db3d24feaa725fc9a6c384",
            },
          },
          {
            "@id": "/v2/slides/01HY0RJ97JM2S2WTG0C7PABE4E",
            "@type": "Slide",
            title: "3",
            description: "",
            templateInfo: {
              "@id": "/v2/templates/01G369YWBR0XZD0M2H0BGF0F03",
              options: [],
            },
            onPlaylists: [],
            published: {
              from: null,
              to: null,
            },
            media: [],
            content: [],
            modifiedBy: "admin@example.com",
            createdBy: "admin@example.com",
            id: "01HY0RJ97JM2S2WTG0C7PABE4E",
            created: "2024-05-16T15:13:19.000Z",
            modified: "2024-05-16T15:13:19.000Z",
            relationsChecksum: {
              templateInfo: "361c589eb586292261db3d24feaa725fc9a6c384",
            },
          },
          {
            "@id": "/v2/slides/01HY0RJ1VK4NVD7SV5ADCN7VPC",
            "@type": "Slide",
            title: "4",
            description: "",
            templateInfo: {
              "@id": "/v2/templates/01HGMA1D9G0GEM01GT06FJ0TCF",
              options: [],
            },
            onPlaylists: [],
            published: {
              from: null,
              to: null,
            },
            media: [],
            content: [],
            modifiedBy: "admin@example.com",
            createdBy: "admin@example.com",
            id: "01HY0RJ1VK4NVD7SV5ADCN7VPC",
            created: "2024-05-16T15:13:12.000Z",
            modified: "2024-05-16T15:13:12.000Z",
            relationsChecksum: {
              templateInfo: "dec7113e453ace5040f6cda2209786ae5ce937a0",
            },
          },
          {
            "@id": "/v2/slides/01HY0RHTGX1X64Z657482XXGDW",
            "@type": "Slide",
            title: "5",
            description: "",
            templateInfo: {
              "@id": "/v2/templates/01HGMA1D9G0GEM01GT06FJ0TCF",
              options: [],
            },
            onPlaylists: [],
            published: {
              from: null,
              to: null,
            },
            media: [],
            content: [],
            modifiedBy: "admin@example.com",
            createdBy: "admin@example.com",
            id: "01HY0RHTGX1X64Z657482XXGDW",
            created: "2024-05-16T15:13:04.000Z",
            modified: "2024-05-16T15:13:04.000Z",
            relationsChecksum: {
              templateInfo: "dec7113e453ace5040f6cda2209786ae5ce937a0",
            },
          },
          {
            "@id": "/v2/slides/01HY0RHNABNG89QTKA24V4FJGF",
            "@type": "Slide",
            title: "6",
            description: "",
            templateInfo: {
              "@id": "/v2/templates/01FZD7K807VAKZ99BGSSCHRJM6",
              options: [],
            },
            onPlaylists: [],
            published: {
              from: null,
              to: null,
            },
            media: [],
            content: [],
            modifiedBy: "admin@example.com",
            createdBy: "admin@example.com",
            id: "01HY0RHNABNG89QTKA24V4FJGF",
            created: "2024-05-16T15:12:59.000Z",
            modified: "2024-05-16T15:12:59.000Z",
            relationsChecksum: {
              templateInfo: "ac5801a495911a404ce64c630653c5a76585fc8e",
            },
          },
          {
            "@id": "/v2/slides/01HY0K6PSPASSBK7QNJMYRVT6K",
            "@type": "Slide",
            title: "dd",
            description: "",
            templateInfo: {
              "@id": "/v2/templates/01FZD7K807VAKZ99BGSSCHRJM6",
              options: [],
            },
            onPlaylists: [],
            published: {
              from: null,
              to: null,
            },
            media: [],
            content: [],
            modifiedBy: "admin@example.com",
            createdBy: "admin@example.com",
            id: "01HY0K6PSPASSBK7QNJMYRVT6K",
            created: "2024-05-16T13:39:37.000Z",
            modified: "2024-05-16T13:39:37.000Z",
            relationsChecksum: {
              templateInfo: "ac5801a495911a404ce64c630653c5a76585fc8e",
            },
          },
          {
            "@id": "/v2/slides/01H66VZVD80R9X164B0EVA0PD7",
            "@type": "Slide",
            title: "d",
            description:
              "Provident eius error enim eaque fugit sit sapiente. Ullam reprehenderit quisquam dolor ut quia et enim consequatur. Sed praesentium laudantium aut consectetur. Tenetur et totam quasi.",
            templateInfo: {
              "@id": "/v2/templates/01HGMA1D9G0GEM01GT06FJ0TCF",
              options: [],
            },
            theme: "/v2/themes/01G38E20S81EAN19GY1BRD03J0",
            onPlaylists: ["/v2/playlists/01HH620MQ01RQR00WH1XQ417K0"],
            duration: 52761,
            published: {
              from: null,
              to: null,
            },
            media: ["/v2/media/00DYJGSDM50GT4118T068W1A3J"],
            content: [],
            modifiedBy: "",
            createdBy: "",
            id: "01H66VZVD80R9X164B0EVA0PD7",
            created: "2023-07-25T15:51:53.000Z",
            modified: "2023-08-03T14:43:05.000Z",
            relationsChecksum: {
              templateInfo: "dec7113e453ace5040f6cda2209786ae5ce937a0",
              theme: "7baae1442134b1b62726394be3b0c8c049c46bf5",
              media: "b07bac47ef569792417d856390700f0dc696447a",
            },
          },
        ],
      },
    });
    cy.visit("/campaign/create");
    cy.get("#login").click();
    cy.wait(["@token"]);
  });

  it("It loads create campaign page", () => {
    cy.get("#save_playlist").should("exist");
  });

  it("It drags and drops slide", () => {
    // Intercept slides in dropdown
    cy.intercept("GET", "**/slides?itemsPerPage=30**", {
      fixture: "playlists/slides.json",
    });

    // Select the top two slides
    cy.get("#slides-section").find(".dropdown-container").eq(0).type("{enter}");
    cy.get("#slides-section").find(".search").find('[type="text"]').type("d");
    cy.get("#slides-section").find('[type="checkbox"]').eq(1).check();
    cy.get("#slides-section").find('[type="checkbox"]').eq(0).check();
    cy.get("#slides-section").find(".dropdown-container").eq(0).click();

    // Test that it sorts on dropdown with keyboard
    cy.get("#slides-section")
      .get("tbody")
      .find("tr td")
      .should("have.length", 14);
    cy.get("#slides-section")
      .get("tbody")
      .find("tr td")
      .eq(1)
      .invoke("text")
      .then((firstElementText) => {
        cy.get("#slides-section")
          .get("tbody")
          .find("tr")
          .eq(0)
          .type(" {downarrow} ", { force: true });
        cy.get("#slides-section")
          .get("tbody")
          .find("tr td")
          .eq(8)
          .invoke("text")
          .should("eq", firstElementText);
      });
  });

  it("It removes slide", () => {
    // Intercept slides in dropdown
    cy.intercept("GET", "**/slides?itemsPerPage=30**", {
      fixture: "playlists/slides.json",
    }).as("slides");

    // Pick slide
    cy.get("#slides-section").find(".dropdown-container").eq(0).type("{enter}");
    cy.get("#slides-section").find(".search").find('[type="text"]').type("d");
    cy.get("#slides-section").find('[type="checkbox"]').eq(1).check();
    cy.get("#slides-section").find(".dropdown-container").eq(0).click();
    cy.get("#slides-section")
      .find("tbody")
      .find("tr td")
      .should("have.length", 7);

    // Remove slide
    cy.get("#slides-section").find("tbody").find(".remove-from-list").click();
    cy.get("#slides-section").find("tbody").should("not.exist");
  });

  it("It display error toast on save error", () => {
    // Mock error response on post
    cy.intercept("PUT", "**/playlists/*", {
      statusCode: 500,
      fixture: "error.json",
    });

    cy.intercept("GET", "**/playlists/*", {
      fixture: "playlists/playlist-successful.json",
    });

    cy.visit("/campaign/edit/123");

    // Displays error toast and stays on page
    cy.get(".Toastify").find(".Toastify__toast--error").should("not.exist");
    cy.get("#save_playlist").click();
    cy.get(".Toastify").find(".Toastify__toast--error").should("exist");
    cy.get(".Toastify")
      .find(".Toastify__toast--error")
      .contains("An error occurred");
  });

  it("It cancels create campaign", () => {
    cy.get("#cancel_playlist").should("exist");
    cy.get("#cancel_playlist").click();
    cy.get("#cancel_playlist").should("not.exist");
  });
});
