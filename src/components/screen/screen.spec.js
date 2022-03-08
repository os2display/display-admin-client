describe("Screen pages work", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    // Mock successful response on get layouts
    cy.intercept("GET", "**/layouts*", { fixture: "screens/layouts.json" }).as(
      "layouts"
    );
    cy.visit("/screen/create");
    cy.get("#login").click();
    cy.wait(["@layouts"]);
  });
  it("It loads create screen page", () => {
    cy.get("#save_screen").should("exist");
  });

  it("It picks layout and redirects on save", () => {
    // Pick layout
    cy.get("#layout-section").find(".dropdown-container").type("{enter}");
    cy.get("#layout-section")
      .find(".item-renderer")
      .find("span")
      .eq(0)
      .invoke("text")
      .then((selectedLayoutTitle) => {
        // Check if selected layout preview is showed
        cy.get("#layout-section").find('[type="checkbox"]').eq(0).check();
        cy.get("#layout-section").find(".grid-item").should("have.length", 4);
        cy.get("#layout-section").find(".nav-item").should("have.length", 4);
        cy.get("#layout-section")
          .find(".dropdown-heading-value")
          .contains(selectedLayoutTitle);
      });

    // Close dropdown
    cy.get("#layout-section").find(".dropdown-container").type("{esc}");

    // Mock error response on post
    cy.intercept("POST", "**/screens", {
      statusCode: 201,
      fixture: "screens/screen-successful.json",
    });

    // Mock successful response on get
    cy.intercept("GET", "**/screens/*", {
      fixture: "screens/screen-successful.json",
    });

    // Displays success toast and redirects
    cy.get(".Toastify").find(".Toastify__toast--success").should("not.exist");
    cy.get("#save_screen").click();
    cy.get(".Toastify").find(".Toastify__toast--success").contains("gemt");
    cy.url().should("include", "screen/edit/");

    cy.get("#title")
      .invoke("val")
      .should("match", /^Ab eos dolorum minima inventore./);
  });

  it("It display error toast on save error", () => {
    // Mock error response on post
    cy.intercept("POST", "**/screens", {
      statusCode: 500,
      fixture: "error.json",
    });

    // Displays error toast and stays on page
    cy.get(".Toastify").find(".Toastify__toast--error").should("not.exist");
    cy.get("#save_screen").click();
    cy.get(".Toastify").find(".Toastify__toast--error").should("exist");
    cy.get(".Toastify")
      .find(".Toastify__toast--error")
      .contains("An error occurred");
    cy.url().should("include", "screen/create");
  });

  it("It cancels create screen", () => {
    cy.get("#cancel_screen").should("exist");
    cy.get("#cancel_screen").click();
    cy.get("#cancel_screen").should("not.exist");
  });
});
