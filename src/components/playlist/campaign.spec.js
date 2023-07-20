describe("Campaign pages work", () => {
  beforeEach(() => {
    cy.visit("/campaign/list");
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.intercept("GET", "**/slides*", {
      fixture: "playlists/playlist-slide.json",
    }).as("slides");
    cy.visit("/campaign/create");
    cy.get("#login").click();
    cy.wait(["@slides", "@token"]);
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
      .should("have.length", 16);
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
      .should("have.length", 8);

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
