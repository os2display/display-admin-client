describe("Theme pages work", () => {
  it("It loads create theme page", () => {
    cy.visit("/themes/create");
    cy.get("#save_theme").should("exist");
  });

  it("It redirects on save", () => {
    cy.visit("/themes/create");

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
    cy.url().should("include", "themes/edit");

    cy.get("#title")
      .invoke("val")
      .should("match", /^Hic minus et omnis porro./);
  });

  it("It display error toast on save error", () => {
    cy.visit("/themes/create");

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
    cy.visit("/themes/create");
    cy.get("#cancel_theme").should("exist");
    cy.get("#cancel_theme").click();
    cy.get("#cancel_theme").should("not.exist");
  });
});
