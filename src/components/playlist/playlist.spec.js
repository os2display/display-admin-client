describe("Playlist pages work", () => {
  beforeEach(() => {
    // Mock successful response on get tenants
    cy.intercept("GET", "**/tenants*", {
      statusCode: 201,
      fixture: "playlists/tenants.json",
    }).as("tenants");

    cy.visit("/playlist/list");
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.intercept("GET", "**/slides*", {
      fixture: "playlists/playlist-slide.json",
    }).as("slides");
    cy.visit("/playlist/create");
    cy.get("#login").click();
    cy.wait(["@slides", "@token", "@tenants"]);
  });

  it("It loads create playlist page", () => {
    cy.get("#save_playlist").should("exist");
  });

  it("It drags and drops slide", () => {
    // Intercept slides in dropdown
    cy.intercept("GET", "**/slides?**", {
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
    cy.intercept("GET", "**/slides?**", {
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

  it("It redirects on save", () => {
    // Mock successful response on post
    cy.intercept("POST", "**/playlists", {
      statusCode: 201,
      fixture: "playlists/playlist-successful.json",
    });

    // Mock successful response on slides put
    cy.intercept("PUT", "**/slides", {
      statusCode: 201,
      fixture: "playlists/playlist-slide.json",
    });

    // Mock successful response on get
    cy.intercept("GET", "**/playlists/*", {
      fixture: "playlists/playlist-successful.json",
    });

    // Displays success toast and redirects
    cy.get(".Toastify").find(".Toastify__toast--success").should("not.exist");
    cy.get("#save_playlist").click();
    cy.get(".Toastify").find(".Toastify__toast--success").contains("gemt");
    cy.url().should("include", "playlist/edit/");

    cy.get("#title")
      .invoke("val")
      .should("match", /^Et consequatur voluptatibus dolore ut ut./);
  });

  it("It display error toast on save error", () => {
    // Mock error response on post
    cy.intercept("POST", "**/playlists", {
      statusCode: 500,
      fixture: "error.json",
    });

    // Displays error toast and stays on page
    cy.get(".Toastify").find(".Toastify__toast--error").should("not.exist");
    cy.get("#save_playlist").click();
    cy.get(".Toastify").find(".Toastify__toast--error").should("exist");
    cy.get(".Toastify")
      .find(".Toastify__toast--error")
      .contains("An error occurred");
    cy.url().should("include", "playlist/create");
  });

  it("It cancels create playlist", () => {
    cy.get("#cancel_playlist").should("exist");
    cy.get("#cancel_playlist").click();
    cy.get("#cancel_playlist").should("not.exist");
  });

  it("Add scheduling to playlist", () => {
    cy.get(".Schedule-item").should("not.exist");
    cy.get("#add_schedule").click();
    cy.get(".Schedule-item").should("exist");
    cy.get("#schedule_details").should("not.exist");
    cy.get("#schedule_details_button").click();
    cy.get("#schedule_details").should("exist");
  });
});
