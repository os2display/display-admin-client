describe("Theme pages work", () => {
  beforeEach(() => {
    cy.visit("/themes/list");
    cy.intercept("POST", "**/token", {
      statusCode: 201,
      fixture: "token.json",
    }).as("token");
    cy.visit("/themes/create");
    cy.get("#login").click();
    cy.wait(["@token"]);
  });

  it("It loads create theme page", () => {
    cy.get("#save_theme").should("exist");
  });

  it("It redirects on save", () => {
    // Mock error response on post
    cy.intercept("POST", "**/themes", {
      statusCode: 201,
      fixture: "themes/theme-successful.json",
    });

    // Mock successful response on get
    cy.intercept("GET", "**/themes/*", {
      fixture: "themes/theme-successful.json",
    });

    // Displays success toast and redirects
    cy.get(".Toastify").find(".Toastify__toast--success").should("not.exist");
    cy.get("#save_theme").click();
    cy.get(".Toastify").find(".Toastify__toast--success").contains("gemt");
    cy.url().should("include", "themes/list");
  });

  it("It display error toast on save error", () => {
    // Mock error response on post
    cy.intercept("POST", "**/themes", {
      statusCode: 500,
      fixture: "error.json",
    });

    // Displays error toast and stays on page
    cy.get(".Toastify").find(".Toastify__toast--error").should("not.exist");
    cy.get("#save_theme").click();
    cy.get(".Toastify").find(".Toastify__toast--error").should("exist");
    cy.get(".Toastify")
      .find(".Toastify__toast--error")
      .contains("An error occurred");
    cy.url().should("include", "themes/create");
  });

  it("It cancels create theme", () => {
    cy.get("#cancel_theme").should("exist");
    cy.get("#cancel_theme").click();
    cy.get("#cancel_theme").should("not.exist");
  });
});
